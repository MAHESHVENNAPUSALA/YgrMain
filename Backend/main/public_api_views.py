from django.http import JsonResponse
from .models import Testimonial, Project, Blog, TeamMember, JobVacancy, AddCarouselImages, Internships

def public_projects(request):
    projects = Project.objects.all().order_by('-id')
    data = []
    for p in projects:
        data.append({
            'id': p.id,
            'name': p.name,
            'time_taken': p.time_taken,
            'link': p.link,
            'image1': request.build_absolute_uri(p.image1.url) if p.image1 else '',
            'image2': request.build_absolute_uri(p.image2.url) if p.image2 else '',
            'image3': request.build_absolute_uri(p.image3.url) if p.image3 else '',
            'image4': request.build_absolute_uri(p.image4.url) if p.image4 else ''
        })
    return JsonResponse(data, safe=False)

def public_blogs(request):
    blogs = Blog.objects.all().order_by('-created_at')
    data = []
    for b in blogs:
        data.append({
            'id': b.id,
            'title': b.title,
            'description': b.description,
            'image': b.image.url if b.image else '',
            'created_at': b.created_at.strftime("%Y-%m-%d")
        })
    return JsonResponse(data, safe=False)

def public_team(request):
    team = TeamMember.objects.filter(is_active=True).order_by('id')
    data = []
    for t in team:
        data.append({
            'id': t.id,
            'name': t.name,
            'role': t.role,
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
    testimonials = Testimonial.objects.filter(is_active=True).order_by('-created_at')
    data = []
    for t in testimonials:
        data.append({
            'id': t.id,
            'client_name': t.client_name,
            'company_name': t.company_name,
            'country': t.country,
            'message': t.message,
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
