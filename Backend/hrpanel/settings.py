"""
Django settings for hrpanel project.
"""

from pathlib import Path

# ---------------------------------------------------------
# BASE DIRECTORY
# ---------------------------------------------------------
BASE_DIR = Path(__file__).resolve().parent.parent

import os
try:
    from dotenv import load_dotenv
    load_dotenv(BASE_DIR / '.env')
except ImportError:
    pass

# Built-in .env loader fallback
_env_path = BASE_DIR / '.env'
if _env_path.exists():
    try:
        with open(_env_path, 'r', encoding='utf-8') as _f:
            for _line in _f:
                _line = _line.strip()
                if _line and not _line.startswith('#') and '=' in _line:
                    _k, _v = _line.split('=', 1)
                    os.environ[_k.strip()] = _v.strip()
    except Exception:
        pass


# ---------------------------------------------------------
# SECURITY SETTINGS
# ---------------------------------------------------------
SECRET_KEY = 'django-insecure-$y=&_43u!=r%&^1phr-@@d-!3ajdhax^k26pbyanw2+n5mc7m3'
DEBUG = True
ALLOWED_HOSTS = [
    "localhost",
    "127.0.0.1",
    "::1",
    "rrgobalitservices.com",
    "www.rrgobalitservices.com",
    "ygrgobalitservices.com",
    "www.ygrgobalitservices.com",
    "ygrglobalitservices.com",
    "www.ygrglobalitservices.com",
    "*",
]

AUTH_USER_MODEL = 'hr.User'
# ---------------------------------------------------------
# INSTALLED APPS
# ---------------------------------------------------------
INSTALLED_APPS = [
    'daphne',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'channels',
    'corsheaders',
    'rest_framework',
    'hr',
    'main',
]


ASGI_APPLICATION = 'hrpanel.asgi.application'

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels.layers.InMemoryChannelLayer',
    },
}


# ---------------------------------------------------------
# MIDDLEWARE
# ---------------------------------------------------------
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'hr.middleware.HRMSAccessControlMiddleware',
]



# ---------------------------------------------------------
# URLS & WSGI
# ---------------------------------------------------------
ROOT_URLCONF = 'hrpanel.urls'
WSGI_APPLICATION = 'hrpanel.wsgi.application'


# ---------------------------------------------------------
# TEMPLATES
# ---------------------------------------------------------
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            BASE_DIR / "templates",
            BASE_DIR / "static" / "dist",  # Added to allow Django to serve React's built index.html
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                
            ],
        },
    },
]


# ---------------------------------------------------------
# DATABASE
# ---------------------------------------------------------
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# ---------------------------------------------------------
# PASSWORD VALIDATION
# ---------------------------------------------------------
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]


# ---------------------------------------------------------
# INTERNATIONALIZATION
# ---------------------------------------------------------
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Kolkata'
USE_I18N = True
USE_TZ = True


# ---------------------------------------------------------
# STATIC FILES
# ---------------------------------------------------------
STATIC_URL = '/static/'

# ✅ Adjust this path based on your folder location
# If your "static" folder is inside the MAIN project (same level as manage.py):
STATICFILES_DIRS = [
    BASE_DIR / "static",
]

# (If your static folder is inside hrpanel/, change to BASE_DIR / "hrpanel" / "static")

STATIC_ROOT = BASE_DIR / "staticfiles"  # for collectstatic




# ---------------------------------------------------------
# DEFAULT AUTO FIELD
# ---------------------------------------------------------
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


MEDIA_URL = '/media/'

MEDIA_ROOT = BASE_DIR / 'media'

LOGIN_URL = '/login/'

# ---------------------------------------------------------
# CORS & REST FRAMEWORK SETTINGS
# ---------------------------------------------------------
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://rrgobalitservices.com",
    "https://www.rrgobalitservices.com",
    "http://rrgobalitservices.com",   
    "http://www.rrgobalitservices.com",
    "https://ygrgobalitservices.com",
    "https://www.ygrgobalitservices.com",
    "http://ygrgobalitservices.com",
    "http://www.ygrgobalitservices.com",
    "https://ygrglobalitservices.com",
    "https://www.ygrglobalitservices.com",
    "http://ygrglobalitservices.com",
    "http://www.ygrglobalitservices.com",
]
CORS_ALLOW_CREDENTIALS = True

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://rrgobalitservices.com",
    "https://www.rrgobalitservices.com",
    "http://rrgobalitservices.com",
    "http://www.rrgobalitservices.com",
    "https://ygrgobalitservices.com",
    "https://www.ygrgobalitservices.com",
    "http://ygrgobalitservices.com",
    "http://www.ygrgobalitservices.com",
    "https://ygrglobalitservices.com",
    "https://www.ygrglobalitservices.com",
    "http://ygrglobalitservices.com",
    "http://www.ygrglobalitservices.com",
]

# ---------------------------------------------------------
# COOKIE SETTINGS (Required for cross-origin dev setup)
# Allow session & CSRF cookies to be sent from frontend (5173) to backend (8000)
# ---------------------------------------------------------
SESSION_COOKIE_SAMESITE = 'Lax'
SESSION_COOKIE_SECURE = False      # Set True in production (HTTPS)
SESSION_COOKIE_HTTPONLY = True

CSRF_COOKIE_SAMESITE = 'Lax'
CSRF_COOKIE_SECURE = False         # Set True in production (HTTPS)
CSRF_COOKIE_HTTPONLY = False       # Must be False so JS (axios) can read it

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
}


# =========================================================
# RAZORPAY CONFIGURATION
# =========================================================
RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID", "rzp_live_TlvaqL8eJ1KsLc")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET", "jvWNoGHd1R6K5iJZz4jqsV4s")

EMAIL_BACKEND = os.getenv('EMAIL_BACKEND', 'django.core.mail.backends.smtp.EmailBackend')
EMAIL_HOST = os.getenv('EMAIL_HOST', 'localhost')
EMAIL_PORT = int(os.getenv('EMAIL_PORT', 25))
EMAIL_USE_TLS = os.getenv('EMAIL_USE_TLS', 'False').lower() in ('true', '1')
EMAIL_USE_SSL = os.getenv('EMAIL_USE_SSL', 'False').lower() in ('true', '1')
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER', '')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD', '')
EMAIL_TIMEOUT = int(os.getenv('EMAIL_TIMEOUT', 10))
DEFAULT_FROM_EMAIL = os.getenv('DEFAULT_FROM_EMAIL', 'info@ygrgobalitservices.com')
SERVER_EMAIL = os.getenv('SERVER_EMAIL', DEFAULT_FROM_EMAIL)
SITE_URL = os.getenv('SITE_URL', 'https://ygrgobalitservices.com')


