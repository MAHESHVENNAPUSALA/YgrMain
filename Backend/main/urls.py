from django.urls import path, re_path, include
from django.contrib.auth.views import LogoutView
from django.contrib.sitemaps.views import sitemap   # ✅ CORRECT IMPORT
from . import views
from main.sitemaps import StaticViewSitemap
from main import public_api_views

sitemaps = {
    'static': StaticViewSitemap,
}

urlpatterns = [

    # ================= PUBLIC API (No Auth Required) =================
    path('api/public/projects/', public_api_views.public_projects, name='public_projects'),
    path('api/public/blogs/', public_api_views.public_blogs, name='public_blogs'),
    path('api/public/team/', public_api_views.public_team, name='public_team'),
    path('api/public/events/', public_api_views.public_events, name='public_events'),
    path('api/public/carousel/', public_api_views.public_carousel, name='public_carousel'),
    path('api/public/jobs/', public_api_views.public_jobs, name='public_jobs'),
    path('api/public/internships/', public_api_views.public_internships, name='public_internships'),
    path('api/public/testimonials/', public_api_views.public_testimonials, name='public_testimonials'),

    # ── BLOG MODULE DYNAMIC APIs ──
    path('api/blogs', public_api_views.public_blogs, name='api_blogs_clean'),
    path('api/blogs/', public_api_views.public_blogs, name='api_blogs'),
    path('api/blogs/<str:slug>', public_api_views.public_blog_detail, name='api_blog_detail_clean'),
    path('api/blogs/<str:slug>/', public_api_views.public_blog_detail, name='api_blog_detail'),
    path('api/blog/categories', public_api_views.public_blog_categories, name='api_blog_categories_clean'),
    path('api/blog/categories/', public_api_views.public_blog_categories, name='api_blog_categories'),
    path('api/blog/trending', public_api_views.public_blog_trending, name='api_blog_trending_clean'),
    path('api/blog/trending/', public_api_views.public_blog_trending, name='api_blog_trending'),
    path('api/blog/newsletter/subscribe', public_api_views.public_newsletter_subscribe, name='api_newsletter_subscribe_clean'),
    path('api/blog/newsletter/subscribe/', public_api_views.public_newsletter_subscribe, name='api_newsletter_subscribe'),

    # ── BLOG ADMIN CMS APIs ──
    path('api/admin/blogs/', views.admin_api_blogs_list, name='admin_api_blogs_list'),
    path('api/admin/blogs/create/', views.admin_api_blog_create, name='admin_api_blog_create'),
    path('api/admin/blogs/<int:blog_id>/update/', views.admin_api_blog_update, name='admin_api_blog_update'),
    path('api/admin/blogs/<int:blog_id>/delete/', views.admin_api_blog_delete, name='admin_api_blog_delete'),
    path('api/admin/blogs/<int:blog_id>/toggle-visibility/', views.admin_api_blog_toggle_visibility, name='admin_api_blog_toggle_visibility'),
    path('api/admin/blogs/<int:blog_id>/toggle-featured/', views.admin_api_blog_toggle_featured, name='admin_api_blog_toggle_featured'),
    path('api/admin/blog/categories/', views.admin_api_categories, name='admin_api_categories'),
    path('api/admin/blog/authors/', views.admin_api_authors, name='admin_api_authors'),

    # ── DYNAMIC SERVICES & CONTACT APIs ──
    path('api/services', public_api_views.public_services, name='api_services_clean'),
    path('api/services/', public_api_views.public_services, name='api_services'),
    path('api/contact', public_api_views.public_contact_submit, name='api_contact_clean'),
    path('api/contact/', public_api_views.public_contact_submit, name='api_contact'),




    # ================= PUBLIC WEBSITE (REACT SPA) =================
    path("", views.home, name="home"),
    path("about", views.aboutus, name="about_clean"),
    path("about/", views.aboutus, name="about"),
    path("aboutus", views.aboutus, name="aboutus_clean"),
    path("aboutus/", views.aboutus, name="aboutus"),
    path("services", views.services, name="services_clean"),
    path("services/", views.services, name="services"),
    path("portfolio", views.home, name="portfolio_clean"),
    path("portfolio/", views.home, name="portfolio"),
    path("careers", views.careers, name="careers_clean"),
    path("careers/", views.careers, name="careers"),
    path("contact", views.contact, name="contact_clean"),
    path("contact/", views.contact, name="contact"),
    path("blog", views.blog_list, name="blog_clean"),
    path("blog/", views.blog_list, name="blog_list"),
    path("blogs", views.blog_list, name="blogs_clean"),
    path("blogs/", views.blog_list, name="blogs_list"),
    path("blog/<str:slug>", views.blog_detail, name="blog_detail_slug_clean"),
    path("blog/<str:slug>/", views.blog_detail, name="blog_detail_slug"),
    path("team", views.team_list, name="team_clean"),
    path("team/", views.team_list, name="team_list"),
    path("global-internships", views.home, name="global_internships_clean"),
    path("global-internships/", views.home, name="global_internships"),
    path("internships/<str:slug>", views.home, name="internship_detail_clean"),
    path("internships/<str:slug>/", views.home, name="internship_detail"),
    path("register-internship", views.home, name="register_internship_clean"),
    path("register-internship/", views.home, name="register_internship"),
    path("client-registration", views.home, name="client_registration_clean"),
    path("client-registration/", views.home, name="client_registration"),
    path("candidate-exam", views.home, name="candidate_exam_clean"),
    path("candidate-exam/", views.home, name="candidate_exam"),
    path("vacancies", views.home, name="vacancies_clean"),
    path("vacancies/", views.home, name="vacancies"),
    path("internships/candidate-dashboard/<str:registration_id>", views.home, name="candidate_dashboard_slug_clean"),
    path("internships/candidate-dashboard/<str:registration_id>/", views.home, name="candidate_dashboard_slug"),
    path("candidate-dashboard/<str:registration_id>", views.home, name="candidate_dashboard_direct_clean"),
    path("candidate-dashboard/<str:registration_id>/", views.home, name="candidate_dashboard_direct"),
    path("candidate-dashboard", views.home, name="candidate_dashboard_home_clean"),
    path("candidate-dashboard/", views.home, name="candidate_dashboard_home"),
    path("internships/candidate-dashboard", views.home, name="internships_candidate_dashboard_clean"),
    path("internships/candidate-dashboard/", views.home, name="internships_candidate_dashboard"),
    path("internships/candidate-login", views.home, name="candidate_login_clean"),
    path("internships/candidate-login/", views.home, name="candidate_login"),
    path("candidate-login", views.home, name="candidate_login_direct_clean"),
    path("candidate-login/", views.home, name="candidate_login_direct"),
    path("internships/exam/<str:token>", views.home, name="candidate_exam_session_clean"),
    path("internships/exam/<str:token>/", views.home, name="candidate_exam_session"),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='sitemap'),

    # ================= STATIC PAGES =================
    path("terms", views.home, name="terms_clean"),
    path("terms/", views.home, name="terms"),
    path("privacy", views.home, name="privacy_clean"),
    path("privacy/", views.home, name="privacy"),
    path("cookies", views.home, name="cookies_clean"),
    path("cookies/", views.home, name="cookies"),
    path("help/", views.help, name="help"),
    path("faqs/", views.faqs, name="faqs"),
    path("refund/", views.refund, name="refund"),
    path("shipping/", views.shipping, name="shipping"),


    # ================= CAROUSEL DASHBOARD =================
    path("dashboard/carousel/", views.carousel_dashboard, name="carousel_dashboard"),
    path("dashboard/carousel/add/", views.carousel_create, name="carousel_create"),
    path("dashboard/carousel/edit/<int:id>/", views.carousel_edit, name="carousel_edit"),
    path("dashboard/carousel/delete/<int:id>/", views.carousel_delete, name="carousel_delete"),


    # ================= PROJECTS =================
    path("projects/", views.project_list, name="project_list"),
    path("projects/admin/", views.admin_project_list, name="admin_project_list"),
    path("projects/add/", views.project_add, name="project_add"),
    path("projects/<int:id>/edit/", views.project_edit, name="project_edit"),
    path("projects/<int:id>/delete/", views.project_delete, name="project_delete"),


    # ================= BLOG ADMIN =================
    path("dashboard/blogs/", views.admin_blog_list, name="admin_blog_list"),
    path("dashboard/blogs/add/", views.add_blog, name="add_blog"),
    path("dashboard/blogs/edit/<int:blog_id>/", views.edit_blog, name="edit_blog"),
    path("dashboard/blogs/delete/<int:blog_id>/", views.delete_blog, name="delete_blog"),


    # ================= TEAM ADMIN =================
    path("dashboard/team/", views.team_dashboard, name="team_dashboard"),
    path("dashboard/team/add/", views.team_create, name="team_create"),
    path("dashboard/team/edit/<int:id>/", views.team_edit, name="team_edit"),
    path("dashboard/team/delete/<int:id>/", views.team_delete, name="team_delete"),


    # ================= EVENTS =================
    path("dashboard/event/add/", views.event_create, name="event_create"),
    path("dashboard/event/delete/<int:id>/", views.event_delete, name="event_delete"),


    # ================= TESTIMONIALS =================
    path("dashboard/testimonials/", views.admin_testimonial_list, name="admin_testimonial_list"),
    path("dashboard/testimonials/add/", views.testimonial_create, name="testimonial_create"),
    path("dashboard/testimonials/edit/<int:pk>/", views.testimonial_update, name="testimonial_update"),
    path("dashboard/testimonials/delete/<int:pk>/", views.testimonial_delete, name="testimonial_delete"),


    # ================= USER AUTH =================
    path("intern-login/", views.login_view, name="login"),
    path("logout/", LogoutView.as_view(next_page="careers"), name="logout"),
    path("dashboard/", views.user_dashboard, name="dashboard"),


    # ================= EXAM =================
    path("exam/", views.exam_page, name="exam_page"),
    path("exam/success/", views.exam_success, name="exam_success"),
    path("start_exam/", views.start_exam, name="start_exam"),
    path("save-answer/", views.save_answer, name="save_answer"),
    path("submit_exam/", views.submit_exam, name="submit_exam"),


    # ================= QUESTIONS =================
    path("create-question/", views.create_question_page, name="create_question_page"),
    path("save-question/", views.save_question, name="save_question"),
    path("get-questions/", views.get_questions, name="get_questions"),
    path("update-question/<int:id>/", views.update_question, name="update_question"),
    path("delete-question/<int:id>/", views.delete_question, name="delete_question"),
    path("view-questions/", views.view_questions, name="view_questions"),
    path('registers/', views.register_page, name='registers'),
    path('create-payment/', views.create_payment, name='create_payment'),
    path('payment-success/<int:reg_id>/', views.payment_success, name='payment_success'),
    path('admin-payments/', views.payment_dashboard, name='payment_dashboard'),
    path('export-excel/', views.export_excel, name='export_excel'),
    path('student-login/', views.student_login, name='student_login'),
    path('dashboards/', views.student_dashboard, name='student_dashboard'),

    # ================= PAYMENT =================
    path("api/create-order/", views.create_order, name="create_order"),
    path("api/verify-payment/", views.verify_payment, name="verify_payment"),
    path("api/razorpay-webhook/", views.razorpay_webhook),
    path("api/payment-status/", views.payment_status, name="payment-status"),
    path("payment-success/", views.PaymentSuccessView.as_view(), name="payment-success"),
    path("api/delete-pending-user/", views.delete_pending_user),


    # ================= INTERNSHIPS ================= 
    path("internships/", views.home, name="internships"),
    path("internships_list/", views.home, name="internships_list"),
    path("profile/", views.profile, name="profile"),
    path("edit_profile/<int:id>/", views.edit_profile, name="edit_profile"),
    path("api/register/<int:course_id>/", views.register_view, name="api_register"),
    path("register/<int:course_id>/", views.register_view, name="register"),
    path('create-payment/', views.create_payment, name='create_payment'),
    path('payment_success/<int:reg_id>/', views.payment_success, name='payment_success'),

    # ================= ADMIN DATA =================
    path("getdata/", views.get_data, name="get_data"),
    path("vacancies/", views.vacancies, name="vacancies"),


    # ================= ADMIN AUTH ================= 
    path("admin-login/", views.admin_login, name="admin_login"),
    path("admin-login", views.admin_login, name="admin_login_no_slash"),
    path("admin-logout/", views.admin_logout, name="admin_logout"),
    path("admin-logout", views.admin_logout, name="admin_logout_no_slash"),


    # ================= ADMIN DASHBOARD =================
    path("admin-base/", views.admin_base, name="admin_base"),
    path("admin-base", views.admin_base, name="admin_base_no_slash"),

    # internship dashboard

    path("internship-dashboard/", views.internship_dashboard, name="internship_dashboard"),
    path("internship-edit/<int:id>/", views.internship_edit, name="internship_edit"),
    path("internship-delete/<int:id>/", views.internship_delete, name="internship_delete"),
    path("profile/download_certificate/<int:user_id>/", views.download_certificate, name="download_certificate"),

    # user admin dashboard

    path("internship_users_dashboard/", views.internship_users_dashboard, name="internship_users_dashboard"),
    path("internship-registration-profile/<int:id>/", views.internship_registration_profile, name="internship_registration_profile"),
    path("delete-internship-registration/<int:id>/", views.delete_internship_registration, name="delete_internship_registration"),
    path("user-profile/<int:id>/", views.user_profile, name="user_profile"),
    path("delete-user/<int:id>/", views.delete_user, name="delete_user"),

    # vacancies
     
    path("vacancies/", views.vacancies, name="vacancies"),
    path("dashboard/vacancies/", views.admin_vacancies, name="admin_vacancies"),
    path("dashboard/vacancy/add/", views.add_vacancy, name="add_vacancy"),
    path("dashboard/vacancy/edit/<int:id>/", views.edit_vacancy, name="edit_vacancy"),
    path("dashboard/vacancy/delete/<int:id>/", views.delete_vacancy, name="delete_vacancy"),

    # job applications
    path("apply/<int:job_id>/", views.job_application, name="job_application"),
    path("apply/", views.job_application, name="job_application_general"),   
    path("my-jobs/", views.user_job_dashboard, name="user_job_dashboard"),
    path("job-login/", views.job_applicant_login, name="job_applicant_login"), 
    path('dashboard/job_application/update-status/', views.update_job_application_status, name='update_job_application_status'),
   
    path("apply/course/", views.coures, name="apply_course"),        
    path("apply/success/", views.application_success, name="application_success"),
    path("dashboard/job_applications/", views.job_applications_dashboard, name="job_applications_dashboard"),
    path("dashboard/job_application/<int:id>/", views.view_job_application, name="view_job_application"),
    path("dashboard/job_application/<int:id>/download_resume/", views.download_resume, name="download_resume"),
    path('applications/delete/<int:id>/', views.delete_job_application,name='delete_job_application'),
    path('blog/<int:id>/', views.home, name='blog_detail_id'),
    path('client_form/', views.client_form, name='client_form'),
    path('clients/', views.client_list, name='client_list'),

    # Catch-all fallback for React Single Page Application (SPA) routing on live server
    re_path(r'^(?!(api|media|static|admin|dashboard)(?:/|$)).*$', views.home, name='spa_fallback'),
    path('api/exam/login/', views.api_exam_login, name='api_exam_login'),
    path('api/exam/profile/', views.api_exam_profile, name='api_exam_profile'),
    path('api/exam/dashboard/', views.api_exam_profile, name='api_exam_dashboard'),
    path('api/exam/start/', views.api_exam_start, name='api_exam_start'),
    path('api/exam/submit/', views.api_exam_submit, name='api_exam_submit'),
    path('api/hr/internship-applicants/', views.api_hr_internship_applicants, name='api_hr_internship_applicants'),
    path('api/hr/internship-applicants/<int:pk>/', views.api_hr_internship_applicant_detail, name='api_hr_internship_applicant_detail'),
]

from rest_framework.routers import DefaultRouter
from .internship_portal_views import (
    PublicInternshipRegistrationViewSet,
    AdminInternshipRegistrationViewSet,
    InternshipInterviewViewSet,
    InternshipOfferViewSet,
    InternshipExamSessionViewSet
)

router = DefaultRouter()
router.register(r'portal/internships/register', PublicInternshipRegistrationViewSet, basename='portal_internships_register')
router.register(r'portal/admin/internships/candidates', AdminInternshipRegistrationViewSet, basename='portal_admin_internships')
router.register(r'portal/admin/internships/interviews', InternshipInterviewViewSet, basename='portal_admin_interviews')
router.register(r'portal/admin/internships/offers', InternshipOfferViewSet, basename='portal_admin_offers')
router.register(r'portal/admin/internships/exams', InternshipExamSessionViewSet, basename='portal_admin_exams')

urlpatterns += [
    path('api/', include(router.urls)),
]


