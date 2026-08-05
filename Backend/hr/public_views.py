"""
Public API Views — No authentication required.
Serves data for the public React pages: Portfolio, Blog, Careers.
Falls back gracefully if no DB records exist (returns empty list).
"""
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from django.views.decorators.csrf import csrf_exempt


@require_GET
@csrf_exempt
def public_portfolio(request):
    """Returns all active portfolio items as JSON."""
    from .models import PublicPortfolio
    items = PublicPortfolio.objects.filter(is_active=True)
    data = []
    for p in items:
        tech = [t.strip() for t in p.technology_stack.split(',') if t.strip()] if p.technology_stack else []
        data.append({
            'id': p.id,
            'title': p.title,
            'category': p.category,
            'tech': tech,
            'desc': p.description,
            'color': p.color,
            'img': request.build_absolute_uri(p.image.url) if p.image else None,
            'link': p.project_url or '',
        })
    return JsonResponse(data, safe=False)


@require_GET
@csrf_exempt
def public_blogs(request):
    """Returns all published blog posts as JSON."""
    from .models import PublicBlog
    items = PublicBlog.objects.filter(is_published=True)
    data = []
    for b in items:
        data.append({
            'id': b.id,
            'title': b.title,
            'cat': b.category,
            'desc': b.description,
            'img': request.build_absolute_uri(b.image.url) if b.image else None,
            'date': b.published_at.strftime('%B %d, %Y') if b.published_at else '',
            'readTime': b.read_time,
            'author': b.author,
        })
    return JsonResponse(data, safe=False)


@require_GET
@csrf_exempt
def public_jobs(request):
    """Returns all active job openings as JSON."""
    from .models import PublicJob
    items = PublicJob.objects.filter(is_active=True)
    data = []
    for j in items:
        skills = [s.strip() for s in j.skills.split(',') if s.strip()] if j.skills else []
        data.append({
            'id': j.id,
            'title': j.title,
            'type': j.job_type,
            'exp': j.experience,
            'location': j.location,
            'dept': j.department,
            'desc': j.description,
            'skills': skills,
        })
    return JsonResponse(data, safe=False)


from django.views.decorators.http import require_POST
import json

@require_POST
@csrf_exempt
def submit_inquiry(request):
    """Saves a client inquiry/lead from the contact or quote forms."""
    try:
        data = json.loads(request.body)
    except Exception:
        # Fallback to POST parameters if not JSON
        data = request.POST

    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    phone = data.get('phone', '').strip()
    # service might come from subject or a service dropdown
    service = data.get('service', data.get('subject', 'General Inquiry')).strip()

    if not name or not email:
        return JsonResponse({'status': 'error', 'message': 'Name and Email are required.'}, status=400)

    from .models import ClientLead
    lead = ClientLead.objects.create(
        name=name,
        email=email,
        phone=phone,
        service=service
    )

    return JsonResponse({
        'status': 'success',
        'message': 'Your inquiry has been submitted successfully!',
        'id': lead.id
    })

