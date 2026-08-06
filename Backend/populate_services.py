import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hrpanel.settings')
django.setup()

from django.utils.text import slugify
from main.models import ServiceCategory

print("--- Seeding Service Categories ---")

services = [
    {"name": "Web Applications & Custom Portals", "icon": "fa-laptop-code", "order": 1, "desc": "Scalable React, Next.js, and Java Spring Boot enterprise portals."},
    {"name": "Mobile App Development (iOS & Android)", "icon": "fa-mobile-alt", "order": 2, "desc": "Native Swift, Kotlin, and Flutter cross-platform apps."},
    {"name": "Enterprise Cloud Systems & Migration", "icon": "fa-cloud", "order": 3, "desc": "AWS, Azure, Kubernetes microservices, and FinOps optimization."},
    {"name": "AI Engineering & LLM Automation", "icon": "fa-brain", "order": 4, "desc": "Generative AI agents, RAG pipelines, and machine learning models."},
    {"name": "Digital Strategy & Technical SEO", "icon": "fa-chart-line", "order": 5, "desc": "Algorithmic growth marketing, SEO schema, and conversion optimization."},
    {"name": "UI/UX Product Design & Prototyping", "icon": "fa-paint-brush", "order": 6, "desc": "Human-centered wireframing, Figma design systems, and UX audits."},
    {"name": "Software Testing & QA Automation", "icon": "fa-vial", "order": 7, "desc": "Playwright, Selenium, performance benchmarking, and security audits."},
    {"name": "24/7 Managed IT Support & Infrastructure", "icon": "fa-headset", "order": 8, "desc": "Round-the-clock server monitoring, SLA management, and DevOps support."}
]

for s in services:
    cat, created = ServiceCategory.objects.get_or_create(
        name=s["name"],
        defaults={
            "slug": slugify(s["name"]),
            "icon": s["icon"],
            "order": s["order"],
            "description": s["desc"],
            "is_hidden": False
        }
    )
    print(f"Service: {cat.name} ({'Created' if created else 'Existing'})")

print("--- Service Categories Seeding Complete! ---")
