import json
from django.http import JsonResponse
from django.db.models import Q, F, Count
from django.utils.text import slugify
from .models import Testimonial, Project, Blog, BlogCategory, BlogAuthor, BlogTag, NewsletterSubscription, TeamMember, JobVacancy, AddCarouselImages, Internships

def public_projects(request):
    projects = Project.objects.all().order_by('-id')
    data = []
    for p in projects:
        image1_url = request.build_absolute_uri(p.image1.url) if p.image1 else ''
        image2_url = request.build_absolute_uri(p.image2.url) if p.image2 else ''
        image3_url = request.build_absolute_uri(p.image3.url) if p.image3 else ''
        image4_url = request.build_absolute_uri(p.image4.url) if p.image4 else ''

        gallery = [url for url in [image1_url, image2_url, image3_url, image4_url] if url]

        raw_tech = getattr(p, 'tech_stack', '') or ''
        if isinstance(raw_tech, str):
            tech_list = [t.strip() for t in raw_tech.split(',') if t.strip()]
        elif isinstance(raw_tech, list):
            tech_list = raw_tech
        else:
            tech_list = ['React', 'Python', 'AWS']

        category_val = getattr(p, 'category', '') or 'Web Applications'
        case_study_val = getattr(p, 'case_study', '') or 'Enterprise cloud & web application solution.'

        data.append({
            'id': p.id,
            'name': p.name,
            'title': p.name,
            'time_taken': p.time_taken,
            'duration': p.time_taken,
            'link': p.link,
            'projectUrl': p.link,
            'github_url': getattr(p, 'github_url', '') or '',
            'category': category_val,
            'industry': category_val,
            'tech_stack': raw_tech,
            'technologyStack': tech_list if tech_list else ['React', 'Python', 'AWS'],
            'case_study': case_study_val,
            'shortDescription': case_study_val,
            'overview': case_study_val,
            'is_featured': getattr(p, 'is_featured', False),
            'meta_title': getattr(p, 'meta_title', '') or '',
            'meta_description': getattr(p, 'meta_description', '') or '',
            'image1': image1_url,
            'image2': image2_url,
            'image3': image3_url,
            'image4': image4_url,
            'thumbnail': image1_url or (gallery[0] if gallery else 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'),
            'gallery': gallery
        })
    return JsonResponse(data, safe=False)


def _format_blog(b, request):
    image_uri = ''
    if b.image:
        try:
            image_uri = request.build_absolute_uri(b.image.url)
        except Exception:
            image_uri = b.image.url
    elif b.image_url:
        image_uri = b.image_url

    author_avatar = ''
    if b.author and b.author.avatar:
        try:
            author_avatar = request.build_absolute_uri(b.author.avatar.url)
        except Exception:
            author_avatar = b.author.avatar.url


    attachments = []
    if b.attachments_json:
        try:
            attachments = json.loads(b.attachments_json)
        except Exception:
            attachments = []

    tags_list = list(b.tags.values_list('name', flat=True)) if b.pk else []

    return {
        'id': b.id,
        'title': b.title,
        'slug': b.slug or slugify(b.title),
        'short_description': b.short_description or (b.content[:150] + '...' if b.content else ''),
        'content': b.content or '',
        'image': image_uri,
        'category': b.category.name if b.category else 'Technology',
        'category_slug': b.category.slug if b.category else 'technology',
        'category_icon': b.category.icon if b.category else 'fa-layer-group',
        'author': {
            'name': b.author.name if b.author else b.author_name,
            'role': b.author.role if b.author else b.author_role,
            'avatar': author_avatar,
            'bio': b.author.bio if b.author else '',
        },
        'tags': tags_list,
        'reading_time': b.reading_time or '5 min read',
        'is_featured': b.is_featured,
        'is_trending': b.is_trending,
        'is_published': b.is_published,
        'views_count': b.views_count,
        'meta_title': b.meta_title or b.title,
        'meta_description': b.meta_description or b.short_description,
        'youtube_url': b.youtube_url or '',
        'pdf_url': b.pdf_url or '',
        'attachments': attachments,
        'created_at': b.created_at.strftime("%b %d, %Y") if b.created_at else '',
        'created_at_iso': b.created_at.isoformat() if b.created_at else '',
    }

def public_blogs(request):
    """GET /api/blogs or /api/public/blogs/"""
    qs = Blog.objects.filter(is_published=True)
    
    category = request.GET.get('category', '').strip()
    search = request.GET.get('search', '').strip()
    tag = request.GET.get('tag', '').strip()
    featured = request.GET.get('featured', '').strip()
    trending = request.GET.get('trending', '').strip()

    if category and category.lower() != 'all':
        qs = qs.filter(Q(category__name__iexact=category) | Q(category__slug__iexact=category))

    if search:
        qs = qs.filter(
            Q(title__icontains=search) |
            Q(short_description__icontains=search) |
            Q(content__icontains=search) |
            Q(tags__name__icontains=search)
        ).distinct()

    if tag:
        qs = qs.filter(tags__name__iexact=tag)

    if featured == 'true':
        qs = qs.filter(is_featured=True)

    if trending == 'true':
        qs = qs.filter(is_trending=True)

    blogs = [ _format_blog(b, request) for b in qs.select_related('category', 'author').prefetch_related('tags') ]
    return JsonResponse(blogs, safe=False)

def public_blog_detail(request, slug):
    """GET /api/blogs/{slug} or /api/public/blogs/{slug}/"""
    try:
        if slug.isdigit():
            blog = Blog.objects.select_related('category', 'author').prefetch_related('tags').get(id=int(slug))
        else:
            blog = Blog.objects.select_related('category', 'author').prefetch_related('tags').get(slug=slug)
    except Blog.DoesNotExist:
        return JsonResponse({'error': 'Blog post not found'}, status=404)

    # Increment view count
    Blog.objects.filter(pk=blog.pk).update(views_count=F('views_count') + 1)
    blog.views_count += 1

    formatted_blog = _format_blog(blog, request)

    # Fetch related articles
    related_qs = Blog.objects.filter(is_published=True).exclude(pk=blog.pk)
    if blog.category:
        related_qs = related_qs.filter(category=blog.category)
    related_blogs = [_format_blog(rb, request) for rb in related_qs[:3]]

    return JsonResponse({
        'blog': formatted_blog,
        'related': related_blogs
    })

def public_blog_categories(request):
    """GET /api/blog/categories or /api/public/blog/categories/"""
    categories = BlogCategory.objects.annotate(
        post_count=Count('blogs', filter=Q(blogs__is_published=True))
    ).order_by('name')

    data = [{
        'id': c.id,
        'name': c.name,
        'slug': c.slug,
        'icon': c.icon,
        'description': c.description,
        'post_count': c.post_count
    } for c in categories]

    return JsonResponse(data, safe=False)

def public_blog_trending(request):
    """GET /api/blog/trending or /api/public/blog/trending/"""
    trending_blogs = Blog.objects.filter(is_published=True).order_by('-is_trending', '-views_count', '-created_at')[:5]
    data = [_format_blog(b, request) for b in trending_blogs]
    return JsonResponse(data, safe=False)

def public_newsletter_subscribe(request):
    """POST /api/blog/newsletter/subscribe"""
    if request.method == 'POST':
        try:
            payload = json.loads(request.body.decode('utf-8'))
            email = payload.get('email', '').strip()
            if not email or '@' not in email:
                return JsonResponse({'error': 'Please provide a valid email address.'}, status=400)
            
            sub, created = NewsletterSubscription.objects.get_or_create(email=email)
            if created:
                return JsonResponse({'message': 'Thank you for subscribing to YGR Tech Insights!'}, status=201)
            else:
                return JsonResponse({'message': 'You are already subscribed to our newsletter!'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Method not allowed'}, status=405)


def public_team(request):
    # Admin CMS needs all members; public website only shows active
    show_all = request.headers.get('X-Requested-With') == 'XMLHttpRequest'
    if show_all:
        team = TeamMember.objects.all().order_by('id')
    else:
        team = TeamMember.objects.filter(is_active=True).order_by('id')
    data = []
    for t in team:
        data.append({
            'id': t.id,
            'name': t.name,
            'role': t.role,
            'is_active': t.is_active,
            'image': request.build_absolute_uri(t.image.url) if t.image else '',
        })
    return JsonResponse(data, safe=False)

def public_jobs(request):
    jobs = JobVacancy.objects.filter(is_active=True).order_by('-id')
    data = []
    for j in jobs:
        data.append({
            'id': j.id,
            'title': j.title,
            'location': j.location,
            'role': j.role,
            'experience': j.role,
            'job_type': j.package,
            'package': j.package,
            'description': j.description,
            'requirements': j.requirements,
            'vacancies': j.vacancies,
        })
    return JsonResponse(data, safe=False)

def public_testimonials(request):
    # Admin CMS needs all testimonials; public website only shows active
    show_all = request.headers.get('X-Requested-With') == 'XMLHttpRequest'
    if show_all:
        testimonials = Testimonial.objects.all().order_by('-created_at')
    else:
        testimonials = Testimonial.objects.filter(is_active=True).order_by('-created_at')
    data = []
    for t in testimonials:
        data.append({
            'id': t.id,
            'client_name': t.client_name,
            'company_name': t.company_name,
            'country': t.country,
            'message': t.message,
            'is_active': t.is_active,
        })
    return JsonResponse(data, safe=False)

def public_events(request):
    from .models import LastMonthEvent
    events = LastMonthEvent.objects.all().order_by('-created_at')
    data = []
    for e in events:
        data.append({
            'id': e.id,
            'image': e.image.url if e.image else '',
        })
    return JsonResponse(data, safe=False)

def public_carousel(request):
    images = AddCarouselImages.objects.all()
    data = []
    for img in images:
        data.append({
            'id': img.id,
            'carouseltitle': img.carouseltitle,
            'carouselDesc': img.carouselDesc,
            'carouselImage': request.build_absolute_uri(img.carouselImage.url) if img.carouselImage else '',
            # Also provide aliases for backward compat
            'title': img.carouseltitle,
            'desc': img.carouselDesc,
            'image': request.build_absolute_uri(img.carouselImage.url) if img.carouselImage else ''
        })
    return JsonResponse(data, safe=False)

def public_internships(request):
    internships = Internships.objects.all().order_by('-id')
    data = []
    for i in internships:
        data.append({
            'id': i.id,
            'title': i.title,
            'duration': i.duration,
            'description': i.description,
            'syllabus': i.syllabus,
            'image': request.build_absolute_uri(i.image.url) if i.image else ''
        })
    return JsonResponse(data, safe=False)


from django.views.decorators.csrf import csrf_exempt
from .models import ServiceCategory, ContactEnquiry

def public_services(request):
    """GET /api/services or /api/public/services/"""
    cats = ServiceCategory.objects.filter(is_hidden=False).order_by('order', 'name')
    data = [{
        'id': c.id,
        'name': c.name,
        'slug': c.slug,
        'description': c.description,
        'icon': c.icon,
        'order': c.order
    } for c in cats]
    return JsonResponse(data, safe=False)

@csrf_exempt
def public_contact_submit(request):
    """POST /api/contact"""
    if request.method == 'POST':
        try:
            payload = json.loads(request.body.decode('utf-8'))
            name = payload.get('name', '').strip()
            email = payload.get('email', '').strip()
            message = payload.get('message', '').strip()
            
            if not name or not email or not message:
                return JsonResponse({'error': 'Name, email, and message are required.'}, status=400)

            x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
            if x_forwarded_for:
                ip = x_forwarded_for.split(',')[0]
            else:
                ip = request.META.get('REMOTE_ADDR')

            enquiry = ContactEnquiry.objects.create(
                name=name,
                company=payload.get('company', '').strip(),
                email=email,
                phone=payload.get('phone', '').strip(),
                service=payload.get('service', '').strip(),
                budget=payload.get('budget', '').strip(),
                timeline=payload.get('timeline', '').strip(),
                message=message,
                ip_address=ip
            )

            return JsonResponse({'message': 'Thank you! Your project enquiry has been submitted. Our team will contact you within one business day.', 'id': enquiry.id}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Method not allowed'}, status=405)

