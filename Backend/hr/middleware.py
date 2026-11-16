from django.http import HttpResponseForbidden
from django.shortcuts import redirect
from django.urls import resolve, Resolver404

class HRMSAccessControlMiddleware:
    """
    Enforces Role-Based Access Control and authentication routing:
    1. Redirects unauthenticated users to the unified login page (/).
    2. Restricts 'Employee' users from accessing administrative areas (/hr, /md, /manager, /teamleader, etc.).
    3. Prevents browser back-button caching for authenticated sessions.
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        path = request.path
        print(f"MIDDLEWARE: {path}")
        
        # Bypass for static, media, and api files
        if path.startswith('/static/') or path.startswith('/media/') or path.startswith('/api/'):
            return self.get_response(request)
            
        # Resolve URL name to identify the view
        try:
            resolver_match = resolve(request.path_info)
            url_name = resolver_match.url_name
            view_name = resolver_match.view_name
        except Resolver404:
            url_name = None
            view_name = None
            
        # Public views that don't require authentication
        public_url_names = {
            'viewlogins', 'hr_login', 'tl_login', 'employee_login', 
            'manager_login', 'login', 'exam_login', 'exam_register',
            'react_app', 'register', 'apply', 'job_application',
            'spa_fallback', 'home', 'about', 'aboutus', 'about_clean', 'aboutus_clean',
            'services', 'services_clean', 'portfolio', 'portfolio_clean',
            'careers', 'careers_clean', 'contact', 'contact_clean',
            'blog_clean', 'blog_list', 'blogs_clean', 'blogs_list',
            'blog_detail_slug_clean', 'blog_detail_slug', 'blog_detail_id',
            'team_clean', 'team_list',
            'global_internships', 'global_internships_clean',
            'internships', 'internships_list',
            'internship_detail', 'internship_detail_clean',
            'register_internship', 'register_internship_clean',
            'client_registration', 'client_registration_clean',
            'candidate_exam', 'candidate_exam_clean',
            'candidate_dashboard_slug', 'candidate_dashboard_slug_clean',
            'candidate_dashboard_direct', 'candidate_dashboard_direct_clean',
            'candidate_dashboard_home', 'candidate_dashboard_home_clean',
            'internships_candidate_dashboard', 'internships_candidate_dashboard_clean',
            'candidate_login', 'candidate_login_clean',
            'candidate_login_direct', 'candidate_login_direct_clean',
            'candidate_exam_session', 'candidate_exam_session_clean',
            'vacancies', 'vacancies_clean',
            'terms', 'terms_clean', 'privacy', 'privacy_clean',
            'cookies', 'cookies_clean', 'help', 'faqs', 'refund', 'shipping',
        }
        
        public_path_prefixes = (
            '/admin', '/admin-', '/dashboard/', '/projects/', '/login', '/assets/',
            '/internships', '/candidate-', '/vacancies', '/register-internship',
            '/global-internships', '/careers', '/about', '/aboutus', '/services',
            '/portfolio', '/contact', '/team', '/blog', '/blogs', '/client-',
            '/terms', '/privacy', '/cookies', '/help', '/faqs', '/refund', '/shipping',
            '/legacy/',
        )
        is_public = (
            url_name in public_url_names or 
            (view_name and view_name.startswith('admin:')) or 
            path == '/' or
            path.startswith(public_path_prefixes)
        )
        
        # 1. Route Protection: Redirect unauthenticated users to unified login
        if not request.user.is_authenticated:
            if not is_public:
                return redirect('/')
        else:
            # Track user presence and activity
            try:
                from .models import UserPresence
                presence, created = UserPresence.objects.get_or_create(user=request.user)
                if created or presence.status == 'Offline':
                    presence.status = 'Online'
                presence.save()  # Auto-updates last_activity because of auto_now=True
            except Exception:
                pass

            # 2. Route Protection: Prevent Employee from accessing admin paths
            if request.user.role == 'Employee':
                path_lower = path.lower()
                if (
                    path_lower.startswith('/hr') or 
                    path_lower.startswith('/md') or 
                    path_lower.startswith('/manager') or 
                    path_lower.startswith('/teamleader') or 
                    path_lower.startswith('/teamlead') or 
                    path_lower.startswith('/tl') or 
                    path_lower.startswith('/dashboard') or
                    url_name in {'home', 'md_dashboard', 'index', 'tl_dashboard'}
                ):
                    return HttpResponseForbidden("403 Forbidden: Employees are not allowed to access administrative areas.")
                    
        response = self.get_response(request)
        
        # 3. Disable browser back-button cache for authenticated pages
        if request.user.is_authenticated:
            response['Cache-Control'] = 'no-cache, no-store, must-revalidate, max-age=0'
            response['Pragma'] = 'no-cache'
            response['Expires'] = '0'
            
        return response

