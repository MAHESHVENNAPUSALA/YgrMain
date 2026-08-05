from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required
from django.views.decorators.cache import never_cache
from .models import *
from .forms import BlogForm, ProjectForm
 
from django.contrib import messages
 

from functools import wraps
from django.shortcuts import redirect

def admin_required(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        if not request.session.get("admin_id"):
            return redirect("admin_login")
        return view_func(request, *args, **kwargs)
    return _wrapped_view



# admin register view 

from .models import AdminAccount
from django.shortcuts import render, redirect
from django.contrib import messages
 
# admin login 
from django.contrib import messages
def admin_login(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")

        # 1. Try Django Superuser authentication (email field could be username)
        from django.contrib.auth import authenticate, login
        from django.contrib.auth import get_user_model
        
        user = authenticate(request, username=email, password=password)
        if not user:
            # Maybe they used email instead of username
            User = get_user_model()
            try:
                user_obj = User.objects.get(email=email)
                user = authenticate(request, username=user_obj.username, password=password)
            except (User.DoesNotExist, User.MultipleObjectsReturned):
                pass
                
        if user and user.is_superuser:
            login(request, user)
            request.session["admin_id"] = f"superuser_{user.id}"
            return redirect("admin_base")

        # 2. Fallback to AdminAccount authentication
        try:
            admin = AdminAccount.objects.get(email=email)
            if admin.check_password(password):
                request.session["admin_id"] = admin.id
                return redirect("admin_base")
        except AdminAccount.DoesNotExist:
            pass

        messages.error(request, "Invalid email or password")
        return redirect("admin_login")

    return render(request, "admin_login.html")

@never_cache
@admin_required
def admin_logout(request):
    request.session.flush()
    return redirect("admin_login")


# ================= BASIC PAGES =================

def home(request):
    Carousel = AddCarouselImages.objects.all()
    testimonials = Testimonial.objects.filter(is_active=True).order_by('-created_at')
    return render(request, 'home.html', {
        'carousel': Carousel,
        'testimonials': testimonials
    })


def services(request):
    service_type = request.GET.get('type')
    return render(request, 'services.html', {'service_type': service_type})


def demo(request):
    return render(request, 'demo.html')


def header(request):
    return render(request, 'header.html')


def footer(request):
    return render(request, 'footer.html')


def aboutus(request):
    return render(request, 'aboutus.html')


def contact(request):
    return render(request, "contact.html")


def careers(request):
    return render(request, 'careers.html')


def terms(request):
    return render(request, 'terms.html')


def privacy(request):
    return render(request, 'privacy.html')


def cookies(request):
    return render(request, 'cookies.html')


def help(request):
    return render(request, 'help.html')


def faqs(request):
    return render(request, 'faqs.html')


def refund(request):
    return render(request, 'refund.html')


def shipping(request):
    return render(request, 'shipping.html')


# ================= CAROUSEL =================
@admin_required
def carousel_dashboard(request):
    admin = get_admin_from_session(request)
    carousels = AddCarouselImages.objects.all()
    return render(request, "carousel_dashboard.html", {
        "carousels": carousels,
        "admin": admin
    })


@admin_required
def carousel_create(request):
    admin = get_admin_from_session(request)
    if request.method == "POST":
        AddCarouselImages.objects.create(
            carouseltitle=request.POST.get("carouseltitle"),
            carouselDesc=request.POST.get("carouselDesc"),
            carouselImage=request.FILES.get("carouselImage")
        )
        return redirect("carousel_dashboard")

    return render(request, "carousel_form.html", {
        "title": "Add Carousel Image",
        "admin": admin
    })


@admin_required
def carousel_edit(request, id):
    admin = get_admin_from_session(request)
    carousel = get_object_or_404(AddCarouselImages, id=id)

    if request.method == "POST":
        carousel.carouseltitle = request.POST.get("carouseltitle")
        carousel.carouselDesc = request.POST.get("carouselDesc")

        if request.FILES.get("carouselImage"):
            carousel.carouselImage = request.FILES.get("carouselImage")

        carousel.save()
        return redirect("carousel_dashboard")

    return render(request, "carousel_form.html", {
        "carousel": carousel,
        "title": "Edit Carousel Image",
        "admin": admin
    })


@admin_required
@require_POST
def carousel_delete(request, id):
    admin = get_admin_from_session(request)
    carousel = get_object_or_404(AddCarouselImages, id=id)
    carousel.delete()
    return redirect("carousel_dashboard")


# ================= BLOG =================

def blog_list(request):
    blogs = Blog.objects.all().order_by('-created_at')
    return render(request, 'blog_list.html', {'blogs': blogs})


@admin_required
def admin_blog_list(request):
    admin = get_admin_from_session(request)
    blogs = Blog.objects.all().order_by('-created_at')
    return render(request, 'admin_blog_list.html', {
        'blogs': blogs,
        'admin': admin
    })


@admin_required
def add_blog(request):
    admin = get_admin_from_session(request)
    if request.method == 'POST':
        form = BlogForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('admin_blog_list')
    else:
        form = BlogForm()

    return render(request, 'blog_form.html', {
        'form': form,
        'title': 'Add Blog',
        'admin': admin
    })


@admin_required
def edit_blog(request, blog_id):
    admin = get_admin_from_session(request)
    blog = get_object_or_404(Blog, id=blog_id)

    if request.method == 'POST':
        form = BlogForm(request.POST, request.FILES, instance=blog)
        if form.is_valid():
            form.save()
            return redirect('admin_blog_list')
    else:
        form = BlogForm(instance=blog)

    return render(request, 'blog_form.html', {
        'form': form,
        'title': 'Edit Blog',
        'admin': admin
    })


@admin_required
def delete_blog(request, blog_id):
    admin = get_admin_from_session(request)
    blog = get_object_or_404(Blog, id=blog_id)
    blog.delete()
    return redirect('admin_blog_list')


# ================= TEAM =================

def team_list(request):
    team = TeamMember.objects.filter(is_active=True)
    events = LastMonthEvent.objects.all()
    return render(request, 'team_list.html', {'team': team, 'events': events})

@admin_required
def team_dashboard(request):
    admin = get_admin_from_session(request)
    team = TeamMember.objects.all()
    events = LastMonthEvent.objects.all()
    return render(request, 'team_dashboard.html', {
        'team': team,
        'events': events,
        'admin': admin
    })


@admin_required
def team_create(request):
    admin = get_admin_from_session(request)
    if request.method == 'POST':
        TeamMember.objects.create(
            name=request.POST['name'],
            role=request.POST['role'],
            image=request.FILES['image']
        )
        return redirect('team_dashboard')
    return render(request, 'team_form.html', {'admin': admin})


@admin_required
def team_edit(request, id):
    admin = get_admin_from_session(request)
    member = get_object_or_404(TeamMember, id=id)
    if request.method == 'POST':
        member.name = request.POST['name']
        member.role = request.POST['role']
        if 'image' in request.FILES:
            member.image = request.FILES['image']
        member.save()
        return redirect('team_dashboard')
    return render(request, 'team_form.html', {
        'member': member,
        'admin': admin
    })


@admin_required
def team_delete(request, id):
    admin = get_admin_from_session(request)
    member = get_object_or_404(TeamMember, id=id)
    member.delete()
    return redirect('team_dashboard')


@admin_required
def event_create(request):
    admin = get_admin_from_session(request)
    if request.method == 'POST':
        LastMonthEvent.objects.create(image=request.FILES['image'])
        return redirect('team_dashboard')
    return render(request, 'team_form.html', {
        'is_event': True,
        'admin': admin
    })


@admin_required
def event_delete(request, id):
    admin = get_admin_from_session(request)
    event = get_object_or_404(LastMonthEvent, id=id)
    event.delete()
    return redirect('team_dashboard')


# ================= PROJECT =================

def project_list(request):
    projects = Project.objects.all()
    return render(request, 'project_list.html', {'projects': projects})

# ---------------- Helper ----------------
def get_admin_from_session(request):
    admin_id = request.session.get("admin_id")
    if not admin_id:
        return None
    
    if isinstance(admin_id, str) and admin_id.startswith("superuser_"):
        user_id = admin_id.split("_")[1]
        from django.contrib.auth import get_user_model
        User = get_user_model()
        return User.objects.filter(id=user_id).first()
        
    return AdminAccount.objects.filter(id=admin_id).first()

# ================= PROJECTS =================

@admin_required
def admin_project_list(request):
    admin = get_admin_from_session(request)
    projects = Project.objects.all()
    return render(request, 'admin_project_list.html', {
        'projects': projects,
        'admin': admin,
    })

@admin_required
def project_add(request):
    admin = get_admin_from_session(request)
    if request.method == 'POST':
        form = ProjectForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('admin_project_list')
    else:
        form = ProjectForm()
    return render(request, 'project_form.html', {
        'form': form,
        'admin': admin,
    })

@admin_required
def project_edit(request, id):
    admin = get_admin_from_session(request)
    project = get_object_or_404(Project, id=id)
    if request.method == 'POST':
        form = ProjectForm(request.POST, request.FILES, instance=project)
        if form.is_valid():
            form.save()
            return redirect('admin_project_list')
    else:
        form = ProjectForm(instance=project)
    return render(request, 'project_form.html', {
        'form': form,
        'admin': admin,
    })

@admin_required
def project_delete(request, id):
    admin = get_admin_from_session(request)
    project = get_object_or_404(Project, id=id)
    if request.method == 'POST':
        project.delete()
        return redirect('admin_project_list')
    return render(request, 'project_confirm_delete.html', {
        'project': project,
        'admin': admin,
    })

# ===========================
# IMPORTS
# ===========================

import json
import razorpay

from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods, require_POST
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib import messages
from django.contrib.auth import login as auth_login, get_user_model
from django.contrib.auth.decorators import login_required
from django.db.models import Q
from django.utils.crypto import get_random_string
from django.conf import settings

from .models import User, Score, Question, UserAnswer, Internships


User = get_user_model()


# ===========================
# REGISTER SECTION
# ===========================

@csrf_exempt
def register_view(request, course_id):
    course = get_object_or_404(Internships, id=course_id)
    errors = {}

    if request.method == "POST":
        username = request.POST.get('name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')

        if User.objects.filter(username=username).exists():
            errors['name'] = "Username already taken"

        if User.objects.filter(email=email).exists():
            errors['email'] = "Email already registered"

        if User.objects.filter(phone=phone).exists():
            errors['phone'] = "Phone number already registered"

        if errors:
            return JsonResponse({"status": "error", "errors": errors}, status=400)

        password = get_random_string(10)
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        user.phone = phone
        user.wnumber = request.POST.get('wphone')
        user.clg_name = request.POST.get('clg_name')
        user.clg_address = request.POST.get('clg_address')
        user.roll_no = request.POST.get('roll_no')
        user.branch = request.POST.get('branch')
        user.photo = request.FILES.get('photo')
        user.resume = request.FILES.get('resume')
        user.is_paid = False
        user.save()

        request.session["pending_user_id"] = user.id

        return JsonResponse({
            "status": "registered",
            "course": course.title
        })

    return render(request, "exampages/register.html", {"course": course, "errors": errors})


# ===========================
# LOGIN SECTION
# ===========================

def login_view(request):
    if request.method == "POST":
        identifier = request.POST.get('identifier')
        roll_no = request.POST.get('roll_no')

        try:
            user = User.objects.get(Q(username=identifier) | Q(email=identifier))
        except User.DoesNotExist:
            messages.error(request, "User not found")
            return render(request, 'exampages/login.html')

        if user.roll_no != roll_no:
            messages.error(request, "Invalid roll number")
            return render(request, 'exampages/login.html')

        auth_login(request, user, backend='django.contrib.auth.backends.ModelBackend')
        return redirect('dashboard')

    return render(request, 'exampages/login.html')


# ===========================
# DASHBOARD
# ===========================

@login_required
def dashboard(request):
    return render(request, "exampages/dashboard.html")


# ===========================
# ADMIN DATA
# ===========================

@staff_member_required
def get_data(request):
    users = User.objects.filter(is_staff=False)
    return render(request, "get_data.html", {"users": users})


# ===========================
# QUESTION MANAGEMENT (ADMIN ONLY)
# ===========================

@admin_required
def create_question_page(request):
    admin = get_admin_from_session(request)
    return render(request, "exampages/create_question_page.html", {
        "admin": admin
    })


@admin_required
@csrf_exempt
@require_POST
def save_question(request):
    try:
        data = json.loads(request.body.decode("utf-8"))

        Question.objects.create(
            language=data["language"],
            question_text=data["question"],
            option_a=data["optionA"],
            option_b=data["optionB"],
            option_c=data["optionC"],
            option_d=data["optionD"],
            correct_option=data["correct"],
        )

        return JsonResponse({
            "status": "success",
            "message": "Question saved successfully!"
        })

    except Exception as e:
        return JsonResponse({
            "status": "error",
            "message": str(e)
        })


@admin_required
def get_questions(request):
    language = request.GET.get("language")

    if language:
        questions = Question.objects.filter(language=language)
    else:
        questions = Question.objects.all()

    data = [
        {
            "id": q.id,
            "language": q.language,
            "question": q.question_text,
            "optionA": q.option_a,
            "optionB": q.option_b,
            "optionC": q.option_c,
            "optionD": q.option_d,
            "correct": q.correct_option,
        }
        for q in questions
    ]

    return JsonResponse({"questions": data})


@admin_required
@csrf_exempt
@require_http_methods(["POST"])
def update_question(request, id):
    try:
        data = json.loads(request.body.decode("utf-8"))
        q = Question.objects.get(id=id)

        q.language = data.get("language", q.language)
        q.question_text = data.get("question", q.question_text)
        q.option_a = data.get("optionA", q.option_a)
        q.option_b = data.get("optionB", q.option_b)
        q.option_c = data.get("optionC", q.option_c)
        q.option_d = data.get("optionD", q.option_d)
        q.correct_option = data.get("correct", q.correct_option)
        q.save()

        return JsonResponse({
            "status": "success",
            "message": "Question updated successfully!"
        })

    except Question.DoesNotExist:
        return JsonResponse({
            "status": "error",
            "message": "Question not found."
        })

    except Exception as e:
        return JsonResponse({
            "status": "error",
            "message": str(e)
        })


@admin_required
@csrf_exempt
@require_http_methods(["DELETE"])
def delete_question(request, id):
    try:
        q = Question.objects.get(id=id)
        q.delete()

        return JsonResponse({
            "status": "success",
            "message": "Question deleted successfully!"
        })

    except Question.DoesNotExist:
        return JsonResponse({
            "status": "error",
            "message": "Question not found."
        })

    except Exception as e:
        return JsonResponse({
            "status": "error",
            "message": str(e)
        })


@admin_required
def view_questions(request):
    admin = get_admin_from_session(request)
    return render(request, "exampages/view_questions.html", {
        "admin": admin
    })


# ===========================
# EXAM SECTION
# ===========================

@login_required
def exam_page(request):
    users = User.objects.all()
    questions = Question.objects.all()
    return render(request, 'exampages/exam.html', {'users': users, 'questions': questions})


@login_required
@csrf_exempt
def save_answer(request):
    if request.method == "POST":
        user = request.user
        question_id = request.POST.get('question_id')
        selected_option = request.POST.get('selected_option', '')

        try:
            question = Question.objects.get(id=question_id)
        except Question.DoesNotExist:
            return JsonResponse({'status': 'failed', 'error': 'Question not found'}, status=404)

        UserAnswer.objects.update_or_create(
            user=user,
            question=question,
            defaults={'selected_option': selected_option}
        )

        return JsonResponse({'status': 'success'})


@login_required
def submit_exam(request):
    user = request.user
    user_answers = UserAnswer.objects.filter(user=user)

    total_questions = Question.objects.count()
    correct_count = 0

    for ua in user_answers:
        if ua.selected_option == ua.question.correct_option:
            correct_count += 1

    if total_questions > 0:
        score = (correct_count / total_questions) * 100
    else:
        score = 0

    Score.objects.create(user=user, score=score)

    return render(request, 'exampages/exam_success.html', {
        'total_questions': total_questions,
        'correct_count': correct_count,
        'score': score,
    })


@login_required
def exam_success(request):
    user = request.user

    user_answers = UserAnswer.objects.filter(user=user)\
        .exclude(selected_option__isnull=True)\
        .exclude(selected_option='')

    attempted = user_answers.count()

    if attempted == 0:
        Score.objects.update_or_create(user=user, defaults={'score': 0})
        user.exam_attpemt = True
        user.save()

        return render(request, 'exampages/exam_success.html', {
            'attempted': 0,
            'correct': 0,
            'score': 0
        })

    correct = sum(
        1 for ua in user_answers
        if ua.selected_option == ua.question.correct_option
    )

    Score.objects.update_or_create(user=user, defaults={'score': correct})
    user.exam_attpemt = True
    user.save()

    return render(request, 'exampages/exam_success.html', {
        'attempted': attempted,
        'correct': correct,
        'score': correct
    })

import json
import razorpay

from django.conf import settings
from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView
from django.utils.crypto import get_random_string
from django.contrib.auth.decorators import login_required
from django.core.files.storage import default_storage

from .models import Internships, User, Score


# =========================
# CREATE RAZORPAY ORDER
# =========================
@csrf_exempt
def create_order(request):
    user_id = request.session.get("pending_user_id")
    if not user_id:
        return JsonResponse({"error": "No pending user"}, status=400)

    user = User.objects.get(id=user_id)

    client = razorpay.Client(
        auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
    )

    amount = 29900  # ₹299 in paise

    order = client.order.create({
        "amount": amount,
        "currency": "INR",
        "payment_capture": 1
    })

    user.razorpay_order_id = order["id"]
    user.save()

    return JsonResponse({
        "order_id": order["id"],
        "amount": order["amount"],
        "key": settings.RAZORPAY_KEY_ID
    })


# =========================
# VERIFY PAYMENT
# =========================
@csrf_exempt
def verify_payment(request):
    try:
        data = json.loads(request.body)

        client = razorpay.Client(
            auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
        )

        client.utility.verify_payment_signature({
            "razorpay_payment_id": data["razorpay_payment_id"],
            "razorpay_order_id": data["razorpay_order_id"],
            "razorpay_signature": data["razorpay_signature"]
        })

        user = User.objects.get(razorpay_order_id=data["razorpay_order_id"])
        user.is_paid = True
        user.save()

        if "pending_user_id" in request.session:
            del request.session["pending_user_id"]

        return JsonResponse({"status": "success"})

    except Exception as e:
        return JsonResponse({"status": "failed", "error": str(e)}, status=400)


# =========================
# PAYMENT SUCCESS PAGE
# =========================
class PaymentSuccessView(TemplateView):
    template_name = "exampages/payment_success.html"


# =========================
# DELETE PENDING USER
# =========================
@csrf_exempt
def delete_pending_user(request):
    user_id = request.session.get("pending_user_id")

    if user_id:
        try:
            user = User.objects.get(id=user_id, is_paid=False)

            if user.photo:
                user.photo.delete(save=False)
            if user.resume:
                user.resume.delete(save=False)

            user.delete()
        except User.DoesNotExist:
            pass

        if "pending_user_id" in request.session:
            del request.session["pending_user_id"]

    return JsonResponse({"status": "deleted"})


# =========================
# CHECK PAYMENT STATUS
# =========================
def payment_status(request):
    user_id = request.session.get("pending_user_id")
    if not user_id:
        return JsonResponse({"paid": False})

    user = User.objects.get(id=user_id)
    return JsonResponse({"paid": user.is_paid})


# =========================
# RAZORPAY WEBHOOK
# =========================
@csrf_exempt
def razorpay_webhook(request):
    payload = request.body
    signature = request.headers.get("X-Razorpay-Signature")

    client = razorpay.Client(
        auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
    )

    try:
        client.utility.verify_webhook_signature(
            payload,
            signature,
            settings.RAZORPAY_WEBHOOK_SECRET
        )

        event = json.loads(payload)

        if event.get("event") == "payment.captured":
            payment = event["payload"]["payment"]["entity"]
            order_id = payment["order_id"]

            user = User.objects.filter(razorpay_order_id=order_id).first()

            if user and not user.is_paid:
                user.is_paid = True
                user.save()

        return JsonResponse({"status": "ok"})

    except Exception:
        return JsonResponse({"status": "invalid"}, status=400)


# =========================
# REGISTER USER
# =========================
@csrf_exempt
def register_view(request, course_id):
    course = get_object_or_404(Internships, id=course_id)
    errors = {}

    if request.method == "POST":
        username = request.POST.get('name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')

        if User.objects.filter(username=username).exists():
            errors['name'] = "Username already taken"

        if User.objects.filter(email=email).exists():
            errors['email'] = "Email already registered"

        if User.objects.filter(phone=phone).exists():
            errors['phone'] = "Phone number already registered"

        if errors:
            return JsonResponse({"errors": errors}, status=400)

        password = get_random_string(10)

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        user.phone = phone
        user.wnumber = request.POST.get('wphone')
        user.clg_name = request.POST.get('clg_name')
        user.clg_address = request.POST.get('clg_address')
        user.roll_no = request.POST.get('roll_no')
        user.branch = request.POST.get('branch')
        user.photo = request.FILES.get('photo')
        user.resume = request.FILES.get('resume')
        user.course = course
        user.is_paid = False
        user.save()

        request.session["pending_user_id"] = user.id

        return JsonResponse({"status": "registered"})

    return render(request, "exampages/register.html", {"course": course, "errors": errors})



# =========================
# SAVE EXAM VIDEO
# =========================
@csrf_exempt
def save_exam_video(request, exam_id):
    if request.method == 'POST' and request.FILES.get('video'):
        video_file = request.FILES['video']
        path = default_storage.save(f'exam_videos/{video_file.name}', video_file)
        return JsonResponse({'status': 'success', 'path': path})

    return JsonResponse({'status': 'fail'})


# =========================
# START EXAM
# =========================
@login_required(login_url='login')
def start_exam(request):
    return render(request, "exampages/Start_Exam.html")


# =========================
# USER DASHBOARD
# =========================
@login_required(login_url='login')
def user_dashboard(request):
    user = request.user

 
    course = None
    if user.course_id:
        course = Internships.objects.filter(id=user.course_id).first()

    return render(request, "exampages/user_dashboard.html", {
        "user": user,
        "course": course
    })


# =========================
# COURSES PAGE
# =========================
def coures(request):
    return render(request, "exampages/job_application.html")


# =========================
# CREATE INTERNSHIP
# =========================
def internships_view(request):
    if request.method == "POST":
        title = request.POST.get("title")
        image = request.FILES.get("image")
        duration = request.POST.get("duration")
        description = request.POST.get("description")
        syllabus = request.POST.get("syllabus")

        Internships.objects.create(
            title=title,
            image=image,
            duration=duration,
            description=description,
            syllabus=syllabus,
        )

        return redirect("internship_dashboard")

    return render(request, "exampages/internships.html")


# =========================
# LIST INTERNSHIPS
# =========================
def internships_list(request):
    all_internships = Internships.objects.all()
    return render(request, "exampages/internship_list.html", {
        "internships": all_internships
    })



from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required

from .models import Internships, Testimonial, AddCarouselImages


# ------------------ PROFILE ------------------
 
@login_required(login_url='login')
def profile(request):
    user = request.user

    course_data = Internships.objects.filter(id=user.course_id).first()

    # example condition (adjust to your logic)
    exam_completed = user.exam_attpemt  # True only if exam completed

    context = {
        "user": user,
        "course_data": course_data,
        "exam_completed": exam_completed,
    }
    return render(request, "exampages/profile.html", context)



from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import User

@login_required
def edit_profile(request, id):
    # Get the user or 404
    user = get_object_or_404(User, id=id)

    # Only allow the user to edit their own profile
    if request.user != user:
        messages.error(request, "You are not allowed to edit this profile.")
        return redirect('profile')  # replace with your profile url name

    if request.method == 'POST':
        # Get editable fields
        email = request.POST.get('email', user.email)
        phone = request.POST.get('phone', user.phone)
        clg_name = request.POST.get('clg_name', user.clg_name)
        clg_address = request.POST.get('clg_address', user.clg_address)

        # Update photo and resume if uploaded
        if 'photo' in request.FILES:
            user.photo = request.FILES['photo']
        if 'resume' in request.FILES:
            user.resume = request.FILES['resume']

        # Save changes
        user.email = email
        user.phone = phone
        user.clg_name = clg_name
        user.clg_address = clg_address
        user.save()

        messages.success(request, "Profile updated successfully!")
        return redirect('profile')  # redirect to profile page

    # GET request, render edit page
    return render(request, 'exampages/edit_profile.html', {'user': user})


# ------------------ ADMIN TESTIMONIALS ------------------
@admin_required
def admin_testimonial_list(request):
    admin = get_admin_from_session(request)
    testimonials = Testimonial.objects.all().order_by("-created_at")
    return render(request, "admin_testimonial_list.html", {
        "testimonials": testimonials,
        "admin": admin
    })


@admin_required
def testimonial_create(request):
    admin = get_admin_from_session(request)
    if request.method == "POST":
        Testimonial.objects.create(
            client_name=request.POST["client_name"],
            company_name=request.POST["company_name"],
            country=request.POST["country"],
            message=request.POST["message"],
            is_active=request.POST.get("is_active") == "on",
        )
        return redirect("admin_testimonial_list")

    return render(request, "testimonial_form.html", {"admin": admin})


@admin_required
def testimonial_update(request, pk):
    admin = get_admin_from_session(request)
    testimonial = get_object_or_404(Testimonial, pk=pk)

    if request.method == "POST":
        testimonial.client_name = request.POST["client_name"]
        testimonial.company_name = request.POST["company_name"]
        testimonial.country = request.POST["country"]
        testimonial.message = request.POST["message"]
        testimonial.is_active = request.POST.get("is_active") == "on"
        testimonial.save()

        return redirect("admin_testimonial_list")

    return render(request, "testimonial_form.html", {
        "testimonial": testimonial,
        "admin": admin
    })


@admin_required
def testimonial_delete(request, pk):
    admin = get_admin_from_session(request)
    testimonial = get_object_or_404(Testimonial, pk=pk)

    if request.method == "POST":
        testimonial.delete()
        return redirect("admin_testimonial_list")

    return render(request, "testimonial_confirm_delete.html", {
        "testimonial": testimonial,
        "admin": admin
    })

# ------------------ FRONTEND ------------------

def home(request):
    # Get active testimonials
    testimonials = Testimonial.objects.filter(is_active=True).order_by("-created_at")

    # Get all carousel images
    carousel_images = AddCarouselImages.objects.all()

    return render(request, "home.html", {
        "testimonials": testimonials,
        "carousel_images": carousel_images,
    })




from django.shortcuts import render, redirect, get_object_or_404
from .models import JobVacancy


# =======================
# USER VACANCIES PAGE
# =======================
def vacancies(request):
    jobs = JobVacancy.objects.filter(is_active=True).order_by("-id")
    print("Jobs:", jobs)
    print("Count:", jobs.count())

    return render(request, "exampages/vacancies.html", {"jobs": jobs})

# =======================
# ADMIN DASHBOARD LIST
# =======================
@admin_required
def admin_vacancies(request):
    admin = get_admin_from_session(request)
    jobs = JobVacancy.objects.all().order_by("-id")

    return render(request, "exampages/admin_vacancies.html", {
        "jobs": jobs,
        "admin": admin,
    })


# =======================
# ADD VACANCY
# =======================
@admin_required
def add_vacancy(request):
    admin = get_admin_from_session(request)

    if request.method == "POST":
        JobVacancy.objects.create(
            title=request.POST.get("title"),
            location=request.POST.get("location"),
            role=request.POST.get("role"),
            package=request.POST.get("package"),
            description=request.POST.get("description"),
            requirements=request.POST.get("requirements"),
            vacancies=request.POST.get("vacancies"),   # Fixed
            is_active=True,
        )

        return redirect("admin_vacancies")

    return render(request, "exampages/admin_add_vacancy.html", {
        "admin": admin,
    })


# =======================
# EDIT VACANCY
# =======================
@admin_required
def edit_vacancy(request, id):
    admin = get_admin_from_session(request)
    job = get_object_or_404(JobVacancy, id=id)

    if request.method == "POST":
        job.title = request.POST.get("title")
        job.location = request.POST.get("location")
        job.role = request.POST.get("role")
        job.package = request.POST.get("package")
        job.description = request.POST.get("description")
        job.requirements = request.POST.get("requirements")
        job.vacancies = request.POST.get("vacancies")

        # Optional: update active status
        job.is_active = request.POST.get("is_active") == "on"

        job.save()

        return redirect("admin_vacancies")

    return render(request, "exampages/admin_add_vacancy.html", {
        "job": job,
        "edit_mode": True,
        "admin": admin,
    })


# =======================
# DELETE VACANCY
# =======================
@admin_required
def delete_vacancy(request, id):
    job = get_object_or_404(JobVacancy, id=id)
    job.delete()

    return redirect("admin_vacancies")

# vacancies 




# ------------------ DASHBOARD ------------------

# internship dashboard

from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@admin_required
def admin_base(request):
    admin = get_admin_from_session(request)

    return render(request, "admin_base.html", {
        "admin": admin
    })


from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404, redirect
from .models import Internships


# =======================
# INTERNSHIP DASHBOARD
# =======================
@admin_required
def internship_dashboard(request):
    admin = get_admin_from_session(request)
    internships = Internships.objects.all().order_by('-id')
    return render(request, "exampages/internship_dashboard.html", {
        "internships": internships,
        "admin": admin
    })


@admin_required
def internship_edit(request, id):
    admin = get_admin_from_session(request)
    internship = get_object_or_404(Internships, id=id)

    if request.method == "POST":
        internship.title = request.POST.get("title")
        internship.duration = request.POST.get("duration")
        internship.description = request.POST.get("description")
        internship.syllabus = request.POST.get("syllabus")

        if request.FILES.get("image"):
            internship.image = request.FILES.get("image")

        internship.save()
        return redirect("internship_dashboard")

    return render(request, "exampages/internships.html", {
        "internship": internship,
        "edit_mode": True,
        "admin": admin
    })


@admin_required
def internship_delete(request, id):
    admin = get_admin_from_session(request)
    internship = get_object_or_404(Internships, id=id)
    internship.delete()
    return redirect("internship_dashboard")


# =======================
# USER ADMIN DASHBOARD
# =======================
@admin_required
def internship_users_dashboard(request):
    admin = get_admin_from_session(request)
    # Only users registered for a course (internship)
    users = User.objects.filter(course__isnull=False)
    scores = Score.objects.select_related('user').all()
    return render(request, 'exampages/internship_users_dashboard.html', {
        'users': users,
        'scores': scores,
        'admin': admin
    })



@admin_required
def user_profile(request, id):
    admin = get_admin_from_session(request)
    user = get_object_or_404(User, id=id)
    return render(request, 'exampages/user_profile.html', {
        'user': user,
        'admin': admin
    })


@admin_required
def delete_user(request, id):
    admin = get_admin_from_session(request)
    user = get_object_or_404(User, id=id)
    if request.method == 'POST':
        user.delete()
    return redirect('user_admin_dashboard')

from django.contrib.auth.decorators import login_required
from django.http import FileResponse
from django.shortcuts import get_object_or_404
import os
from django.conf import settings

@login_required
def download_certificate(request, user_id):
    user = get_object_or_404(User, id=user_id)

    # Path to the certificate file
    certificate_path = os.path.join(settings.MEDIA_ROOT, "certificates", f"{user.username}_certificate.pdf")

    if not os.path.exists(certificate_path):
        messages.error(request, "Certificate not found.")
        return redirect("profile")

    return FileResponse(
        open(certificate_path, "rb"),
        as_attachment=True,
        filename=f"{user.username}_certificate.pdf"
    )

# job application

from django.shortcuts import render, redirect, get_object_or_404
from .models import JobApplication, JobVacancy
from django.contrib.auth import get_user_model

User = get_user_model()

def job_application(request, job_id=None):
    job = None
    if job_id:
        job = get_object_or_404(JobVacancy, id=job_id)

    if request.method == "POST":
        try:
            def empty_to_none(value):
                return value if value != '' else None

            email = request.POST.get("email")
            phone = request.POST.get("phone")
            first_name = request.POST.get("first_name")
            last_name = request.POST.get("last_name")

            password = phone
            user = User.objects.filter(email=email).first()

            if not user:
                user = User.objects.create_user(
                    username=email,
                    email=email,
                    password=password
                )
                user.phone = phone
                user.first_name = first_name
                user.last_name = last_name
                user.save()

            JobApplication.objects.create(
                user=user,
                job_role=job.title if job else request.POST.get("job_role"),
                first_name=first_name,
                last_name=last_name,
                dob=request.POST.get("dob"),
                gender=request.POST.get("gender"),
                phone=phone,
                email=email,
                current_city=request.POST.get("current_city"),
                current_address=request.POST.get("current_address"),
                permanent_address=request.POST.get("permanent_address"),
                department=request.POST.get("department"),
                employment_type=request.POST.get("employment_type"),
                preferred_work_mode=request.POST.get("preferred_work_mode"),
                preferred_job_location=request.POST.get("preferred_job_location"),
                highest_qualification=request.POST.get("highest_qualification"),
                college_university=request.POST.get("college_university"),
                passout_year=empty_to_none(request.POST.get("passout_year")),
                course=request.POST.get("course"),
                ssc_marks=request.POST.get("ssc_marks"),
                inter_diploma_marks=request.POST.get("inter_diploma_marks"),
                higher_education_marks=empty_to_none(request.POST.get("higher_education_marks")),
                backlogs=empty_to_none(request.POST.get("backlogs")),
                primary_skills=request.POST.get("primary_skills"),
                secondary_skills=request.POST.get("secondary_skills"),
                technical_skills=request.POST.get("technical_skills"),
                certifications=request.POST.get("certifications"),
                internship_details=request.POST.get("internship_details"),
                candidate_type=request.POST.get("candidate_type"),
                total_experience=empty_to_none(request.POST.get("total_experience")),
                relevant_experience=empty_to_none(request.POST.get("relevant_experience")),
                current_company=empty_to_none(request.POST.get("current_company")),
                current_designation=empty_to_none(request.POST.get("current_designation")),
                current_ctc=empty_to_none(request.POST.get("current_ctc")),
                expected_ctc=empty_to_none(request.POST.get("expected_ctc")),
                notice_period=empty_to_none(request.POST.get("notice_period")),
                reason_for_job_change=empty_to_none(request.POST.get("reason_for_job_change")),
                resume=request.FILES.get("resume"),
                profile_photo=request.FILES.get("profile_photo"),
                pan_number=empty_to_none(request.POST.get("pan_number")),
                pan_card_image=request.FILES.get("pan_card_image"),  
                aadhaar_number=empty_to_none(request.POST.get("aadhaar_number")),
                aadhaar_front_image=request.FILES.get("aadhaar_front_image"),   
                aadhaar_back_image=request.FILES.get("aadhaar_back_image"), 
                linkedin=empty_to_none(request.POST.get("linkedin")),
                github=empty_to_none(request.POST.get("github")),
            )

            return redirect("application_success")

        except Exception as e:
            return render(request, "exampages/job_application.html", {"error": str(e), "job": job})

    return render(request, "exampages/job_application.html", {"job": job})

from django.contrib.auth.decorators import login_required
# views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import JobApplication

@admin_required
def update_job_application_status(request):
    if request.method == "POST":
        app = JobApplication.objects.get(id=request.POST.get("app_id"))

        status = request.POST.get("status")
        date = request.POST.get("interview_date") or None
        link = request.POST.get("interview_link") or None
 
        if link and not date:
            return JsonResponse({
                "success": False,
                "message": "Please select date before adding link"
            })

        app.status = status

        
        if status == "assessment":
            app.basic_test_date = date
            app.test_link = link

        elif status == "hr_interview":
            app.interview_date = date
            app.interview_link = link

        elif status == "documentation":

            app.document_verification_date = date
            
        elif status == "technical_interview":
            app.technical_round_date = date
            app.technical_round_link = link

        elif status == "onboarding":
            app.join_date = request.POST.get("join_date") or None

        elif status == "not_selected":
            app.rejection_message = request.POST.get("rejection_message") or None

        app.note = request.POST.get("note") or None

        app.save()

        return JsonResponse({
            "success": True,
            "message": "Application updated successfully"
        })


 
 
def user_job_dashboard(request):
    applicant_id = request.session.get("job_applicant_id")

    if not applicant_id:
        return redirect("job_applicant_login")

    applications = JobApplication.objects.filter(id=applicant_id)
    return render(request, "exampages/user_job_dashboard.html", {
        "applications": applications
    })


from django.contrib.auth import authenticate, login
from django.db.models import Q
from django.contrib import messages

def job_applicant_login(request):
    if request.method == "POST":
        login_value = request.POST.get("login_value").strip()
        phone = request.POST.get("password").strip()

        try:
            applicant = JobApplication.objects.filter(
                email__iexact=login_value,
                phone=phone
            ).first()

            if not applicant:
                messages.error(request, "Job applicant not found.")
                return redirect("job_applicant_login")

            request.session["job_applicant_id"] = applicant.id
            return redirect("user_job_dashboard")

        except Exception as e:
            messages.error(request, "Something went wrong.")
            return redirect("job_applicant_login")
    return render(request, "exampages/job_applicant_login.html")


def application_success(request):
    return render(request, "exampages/application_success.html")

# job application dashboard

from django.shortcuts import render, get_object_or_404, redirect
from .models import JobApplication
from django.http import FileResponse
import os
from django.conf import settings
 
# =======================
# JOB APPLICATIONS DASHBOARD
# =======================
@admin_required
def job_applications_dashboard(request):
    admin = get_admin_from_session(request)
    applications = JobApplication.objects.all().order_by('-submitted_at')
    return render(request, "exampages/admin_job_applications.html", {
        "applications": applications,
        "admin": admin
    })


# =======================
# VIEW SINGLE APPLICATION
# =======================
@admin_required
def view_job_application(request, id):
    admin = get_admin_from_session(request)
    application = get_object_or_404(JobApplication, id=id)
    return render(request, "exampages/admin_view_application.html", {
        "application": application,
        "admin": admin
    })


# =======================
# DOWNLOAD RESUME
# =======================
@admin_required
def download_resume(request, id):
    application = get_object_or_404(JobApplication, id=id)
    filepath = application.resume.path
    return FileResponse(
        open(filepath, 'rb'),
        as_attachment=True,
        filename=os.path.basename(filepath)
    )

from django.shortcuts import get_object_or_404, redirect
from .models import JobApplication

def delete_job_application(request, id):
    application = get_object_or_404(JobApplication, id=id)

    if request.method == "POST":
        application.delete()
    
    return redirect('job_applications_dashboard') 





from .models import InternshipRegistration, Payment
from django.utils import timezone
from datetime import timedelta
import razorpay
from django.conf import settings
from django.shortcuts import render
from django.http import HttpResponse


def create_payment(request):
    if request.method == "POST":

        reg_id = request.POST.get('reg_id')

        if reg_id:
            reg = InternshipRegistration.objects.get(id=reg_id)

        else:
            # ✅ GET BASE AMOUNT FIRST
            base_amount = int(request.POST.get('amount'))

            # ✅ CALCULATE GST + TOTAL
            gst = round(base_amount * 0.18, 2)
            total = round(base_amount + gst, 2)

            # ✅ CREATE REGISTRATION WITH ALL REQUIRED FIELDS
            reg = InternshipRegistration.objects.create(
                    name=request.POST.get('name'),
                    phone=request.POST.get('phone'),
                    email=request.POST.get('email'),
                    course=request.POST.get('course'),
                    address=request.POST.get('address'),
                    plan=request.POST.get('plan'),
                
                    base_amount=base_amount,
                    gst_amount=gst,
                    total_amount=total,
                
                    amount_paid=0   # ✅ FIX
                )

        # ✅ USE EXISTING DATA
        base_amount = reg.base_amount
        gst = reg.gst_amount
        total = reg.total_amount

        payment_type = request.POST.get('payment_type')
        emi_part = request.POST.get('emi_part')

        # EMI calculation
        emi1 = round(total * 0.4, 2)
        emi2 = round(total * 0.4, 2)
        emi3 = round(total - (emi1 + emi2), 2)

        amount = total

        if payment_type == "emi":
            emi_part = int(emi_part)

            # 🔒 LOCK CHECK
            last_payment = Payment.objects.filter(
                registration=reg,
                is_paid=True
            ).order_by('-created_at').first()

            if last_payment:
                if (timezone.now() - last_payment.created_at).days < 25:
                    return HttpResponse("Next EMI locked. Try after 25 days.")

            if emi_part == 1:
                amount = emi1
            elif emi_part == 2:
                amount = emi2
            else:
                amount = emi3

        # Razorpay
        client = razorpay.Client(
            auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
        )

        order = client.order.create({
            "amount": int(amount * 100),
            "currency": "INR",
            "payment_capture": 1
        })

        # ✅ SAVE PAYMENT
        payment = Payment.objects.create(
            registration=reg,
            amount=amount,
            emi_part=emi_part,
            razorpay_order_id=order['id']
        )

        return render(request, "exampages/payment1.html", {
            "razorpay_key": settings.RAZORPAY_KEY_ID,
            "order_id": order['id'],
            "amount": int(amount * 100),

            "reg_id": reg.id,
            "payment_id": payment.id,

            "base_amount": base_amount,
            "gst": gst,
            "total": total,

            "emi_part": emi_part,
            "payment_type": payment_type,
            "payable_amount": amount
        })

    return HttpResponse("Invalid request")
    
    
    
from .models import Payment
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from django.conf import settings
import razorpay

def payment_success(request, reg_id):

    payment_id = request.POST.get('payment_id')

    razorpay_payment_id = request.POST.get('razorpay_payment_id')
    razorpay_signature = request.POST.get('razorpay_signature')

    client = razorpay.Client(
        auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
    )

    try:
        # ✅ Get payment from DB
        payment = get_object_or_404(Payment, id=payment_id)

        # ✅ VERY IMPORTANT: use DB order_id (NOT from POST)
        params_dict = {
            'razorpay_order_id': payment.razorpay_order_id,
            'razorpay_payment_id': razorpay_payment_id,
            'razorpay_signature': razorpay_signature
        }

        client.utility.verify_payment_signature(params_dict)

        # ✅ Mark payment success
        payment.razorpay_payment_id = razorpay_payment_id
        payment.razorpay_signature = razorpay_signature
        payment.is_paid = True
        payment.save()

        # ✅ Update total paid
        reg = payment.registration
        reg.amount_paid += payment.amount
        reg.save()

        # ✅ SEND ALL DATA TO TEMPLATE
        return render(request, "exampages/success1.html", {
            "name": reg.name,
            "amount": payment.amount,
            "total": reg.total_amount,
            "gst": reg.gst_amount
        })

    except Exception as e:
        return HttpResponse(f"Payment failed: {str(e)}")

def register_page(request):
    plan = request.GET.get('plan')
    amount = request.GET.get('amount')

    return render(request, "exampages/registration.html", {
        "selected_plan": plan,
        "amount": amount
    })  
  
    
from django.shortcuts import render
from .models import InternshipRegistration, Payment
from django.utils import timezone
from datetime import timedelta
from django.db.models import Q
@admin_required
def payment_dashboard(request):

    search = request.GET.get('search')
    course = request.GET.get('course')

    registrations = InternshipRegistration.objects.all()

    if search:
        registrations = registrations.filter(
            Q(name__icontains=search) |
            Q(email__icontains=search)
        )

    if course:
        registrations = registrations.filter(course=course)

    paid_students = []
    pending_students = []
    emi_due_students = []

    for reg in registrations:
        total = reg.total_amount
        paid = reg.amount_paid

        if paid >= total:
            paid_students.append(reg)
        else:
            remaining = total - paid

            pending_students.append({
                "name": reg.name,
                "total_amount": total,
                "amount_paid": paid,
                "remaining": remaining
            })

            # 🔔 EMI ALERT (25 days)
            last_payment = Payment.objects.filter(
                registration=reg, is_paid=True
            ).order_by('-created_at').first()

            if last_payment:
                if (timezone.now() - last_payment.created_at).days >= 25:
                    emi_due_students.append(reg)

    failed_payments = Payment.objects.filter(is_paid=False)

    return render(request, "exampages/payment_dashboard.html", {
        "paid_students": paid_students,
        "pending_students": pending_students,
        "failed_payments": failed_payments,
        "emi_due_students": emi_due_students
    })
    
    
    
    
from django.http import HttpResponse
import openpyxl
@admin_required
def export_excel(request):

    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Payments"

    ws.append(["Name", "Email", "Paid", "Total"])

    for r in InternshipRegistration.objects.all():
        ws.append([r.name, r.email, r.amount_paid, r.total_amount])

    response = HttpResponse(content_type='application/ms-excel')
    response['Content-Disposition'] = 'attachment; filename="payments.xlsx"'

    wb.save(response)
    return response
    
    
from django.shortcuts import render, redirect
from .models import InternshipRegistration

def student_login(request):

    if request.method == "POST":
        email = request.POST.get("email")
        phone = request.POST.get("phone")

        try:
            student = InternshipRegistration.objects.get(email=email, phone=phone)

            request.session['student_id'] = student.id
            return redirect('student_dashboard')

        except InternshipRegistration.DoesNotExist:
            return render(request, "exampages/servicesstudent.html", {"error": "Invalid details"})

    return render(request, "exampages/servicesstudent.html")
    
    
    
from django.shortcuts import get_object_or_404
from datetime import timedelta
from django.utils import timezone

def student_dashboard(request):

    student_id = request.session.get('student_id')

    if not student_id:
        return redirect('student_login')

    student = get_object_or_404(InternshipRegistration, id=student_id)

    payments = Payment.objects.filter(registration=student, is_paid=True)

    total = student.total_amount
    paid = student.amount_paid
    remaining = total - paid

    # EMI logic
    emi1 = round(total * 0.4, 2)
    emi2 = round(total * 0.4, 2)
    emi3 = round(total - (emi1 + emi2), 2)

    next_emi = None
    emi_locked = False

    last_payment = payments.order_by('-created_at').first()

    if last_payment:
        days = (timezone.now() - last_payment.created_at).days
        if days < 25:
            emi_locked = True

    if paid == 0:
        next_emi = 1
    elif paid < (emi1 + emi2):
        next_emi = 2
    elif paid < total:
        next_emi = 3

    return render(request, "exampages/studentdashboard.html", {
        "student": student,
        "payments": payments,
        "total": total,
        "paid": paid,
        "remaining": remaining,
        "next_emi": next_emi,
        "emi_locked": emi_locked
    })
    
    
from django.shortcuts import render, get_object_or_404
from .models import Blog

def blog_detail(request, id):
    blog = get_object_or_404(Blog, id=id)
    return render(request, 'blog_detail.html', {'blog': blog})
    
    
    
from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Client

def client_form(request):
    if request.method == "POST":
        name = request.POST.get('name')
        phone = request.POST.get('phone')
        email = request.POST.get('email')
        service = request.POST.get('service')

        Client.objects.create(
            name=name,
            phone=phone,
            email=email,
            service=service
        )

        messages.success(request, "Your details have been successfully submitted!")
        return redirect('client_form')

    return render(request, 'home/clients.html')


def client_list(request):
    clients = Client.objects.all()
    return render(request, 'home/client_list.html', {'clients': clients})