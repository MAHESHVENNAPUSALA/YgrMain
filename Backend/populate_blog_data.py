import os
import django
import json

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hrpanel.settings')
django.setup()

from django.utils.text import slugify
from main.models import Blog, BlogCategory, BlogAuthor, BlogTag

print("--- Seeding YGR Blog Module Data ---")

# 1. Categories
categories_data = [
    {"name": "Technology", "icon": "fa-microchip", "description": "Core software architectural insights, emerging tech trends, and digital transformation strategy."},
    {"name": "AI", "icon": "fa-brain", "description": "Artificial Intelligence, LLM integrations, Machine Learning models, and Neural Network pipelines."},
    {"name": "Cloud", "icon": "fa-cloud-upload-alt", "description": "AWS, Azure, GCP infrastructure, Serverless microservices, and Kubernetes orchestration."},
    {"name": "Java", "icon": "fa-coffee", "description": "Core Java performance tuning, JVM internals, garbage collection, and modern Java features."},
    {"name": "Spring Boot", "icon": "fa-leaf", "description": "Enterprise Spring Boot REST APIs, Spring Security 6, JPA performance, and Reactive WebFlux."},
    {"name": "React", "icon": "fa-react", "description": "Modern React 19, custom hooks, state management, concurrent rendering, and performance optimization."},
    {"name": "Angular", "icon": "fa-angular", "description": "Enterprise Angular applications, RxJS reactive patterns, Signals, and Nx Monorepo structures."},
    {"name": "Python", "icon": "fa-python", "description": "FastAPI, Asyncio parallelism, PyTorch deep learning, and scalable Python microservices."},
    {"name": "DevOps", "icon": "fa-infinity", "description": "CI/CD pipelines, Docker containerization, Terraform Infrastructure as Code, and GitOps."},
    {"name": "Mobile", "icon": "fa-mobile-alt", "description": "Cross-platform Flutter & React Native app engineering, Swift, Kotlin, and offline synchronization."},
    {"name": "Digital Marketing", "icon": "fa-chart-line", "description": "Growth hacking, Technical SEO, Conversion Rate Optimization, and algorithmic B2B marketing."},
    {"name": "Company News", "icon": "fa-building", "description": "YGR Global milestone announcements, enterprise partnerships, innovation labs, and culture."}
]

cat_map = {}
for item in categories_data:
    cat_slug = slugify(item["name"])
    cat, created = BlogCategory.objects.get_or_create(
        name=item["name"],
        defaults={
            "slug": cat_slug,
            "icon": item["icon"],
            "description": item["description"]
        }
    )
    cat_map[item["name"]] = cat
    print(f"Category: {cat.name} ({'Created' if created else 'Existing'})")

# 2. Authors
authors_data = [
    {"name": "Dr. Aris Thorne", "role": "Chief Technology Architect", "bio": "Leading AI & Distributed Systems research at YGR Global with 15+ years in high-throughput enterprise architectures."},
    {"name": "Elena Vance", "role": "Principal Cloud Engineer", "bio": "AWS Certified Solutions Architect specialization in multi-region Kubernetes clusters & FinOps."},
    {"name": "Vikramaditya Rao", "role": "Senior Fullstack Lead", "bio": "Passionate about React 19, Spring Boot 3, and high-concurrency microservice design."}
]

author_map = {}
for item in authors_data:
    author, created = BlogAuthor.objects.get_or_create(
        name=item["name"],
        defaults={
            "role": item["role"],
            "bio": item["bio"]
        }
    )
    author_map[item["name"]] = author

# 3. Blogs Data
sample_blogs = [
    {
        "title": "Architecting Enterprise AI Agents with Spring Boot & Python Microservices",
        "category": "AI",
        "author": "Dr. Aris Thorne",
        "reading_time": "7 min read",
        "is_featured": True,
        "is_trending": True,
        "image_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
        "short_description": "Discover how YGR Global integrates LLMs and multi-agent workflows into robust Java Spring Boot enterprise backends using resilient async Python workers.",
        "youtube_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "pdf_url": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        "attachments": [
            {"name": "Enterprise_AI_Architecture_Whitepaper.pdf", "size": "2.4 MB", "url": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"},
            {"name": "spring-boot-ai-starter-code.zip", "size": "1.1 MB", "url": "#"}
        ],
        "tags": ["AI", "Spring Boot", "Python", "Microservices"],
        "content": json.dumps([
            {"type": "paragraph", "value": "Modern enterprise applications require high-throughput AI intelligence without sacrificing transactional safety or low latency. At YGR Global IT Services, we designed a hybrid blueprint combining Spring Boot 3.2 resilience with Python 3.12 GPU acceleration."},
            {"type": "heading", "value": "The Dual-Core Architecture Pattern"},
            {"type": "paragraph", "value": "By isolating heavy LLM prompt evaluation and embeddings computation to asynchronous Python microservices, the main Spring Boot gateway remains hyper-responsive for core HTTP request execution."},
            {"type": "code", "language": "python", "code": "import asyncio\nfrom fastapi import FastAPI\nfrom pydantic import BaseModel\n\napp = FastAPI(title='YGR AI Inference Service')\n\nclass PromptPayload(BaseModel):\n    context: str\n    user_query: str\n\n@app.post('/api/v1/agent/evaluate')\nasync def evaluate_agent(payload: PromptPayload):\n    # Asynchronous GPU inference pipeline\n    result = await execute_llm_chain(payload.context, payload.query)\n    return {'status': 'success', 'response': result}"},
            {"type": "quote", "value": "Decoupling deterministic enterprise business rules from non-deterministic AI generation is the single most critical decision in enterprise AI architecture.", "author": "Dr. Aris Thorne"},
            {"type": "heading", "value": "Benchmark Comparison"},
            {"type": "table", "headers": ["Architecture Type", "Avg Latency (ms)", "Max RPS", "Error Rate"], "rows": [
                ["Monolithic Python", "1450ms", "420", "1.8%"],
                ["Monolithic Java Native", "820ms", "1200", "0.4%"],
                ["YGR Hybrid Microservices Blueprint", "190ms", "4800", "< 0.01%"]
            ]}
        ])
    },
    {
        "title": "Mastering React 19 Server Actions and Concurrent Rendering at Scale",
        "category": "React",
        "author": "Vikramaditya Rao",
        "reading_time": "6 min read",
        "is_featured": True,
        "is_trending": True,
        "image_url": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80",
        "short_description": "A deep dive into React 19's groundbreaking features: useActionState, useOptimistic, and zero-bundle-size server components for enterprise web portals.",
        "youtube_url": "",
        "pdf_url": "",
        "attachments": [
            {"name": "React19_Performance_Guide.pdf", "size": "1.8 MB", "url": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"}
        ],
        "tags": ["React", "Frontend", "JavaScript", "Web Performance"],
        "content": json.dumps([
            {"type": "paragraph", "value": "React 19 revolutionizes client-side state management and server synchronization. With native support for Server Actions and automatic async state handling, developers can eliminate thousands of lines of boilerplate code."},
            {"type": "heading", "value": "Optimistic UI Updates for Instant Feedback"},
            {"type": "code", "language": "javascript", "code": "import { useOptimistic, useState } from 'react';\n\nexport function CommentSection({ comments, sendCommentAction }) {\n  const [optimisticComments, setOptimistic] = useOptimistic(\n    comments,\n    (state, newText) => [...state, { text: newText, pending: true }]\n  );\n\n  async function handleFormSubmit(formData) {\n    const text = formData.get('comment');\n    setOptimistic(text);\n    await sendCommentAction(text);\n  }\n\n  return (\n    <form action={handleFormSubmit}>\n      <input name=\"comment\" placeholder=\"Share your insights...\" />\n      <button type=\"submit\">Post Insight</button>\n    </form>\n  );\n}"},
            {"type": "quote", "value": "Perceived latency is standard latency. React 19's optimistic hooks make cloud applications feel zero-latency instantly.", "author": "Vikramaditya Rao"}
        ])
    },
    {
        "title": "AWS Multi-Region Kubernetes Failover with Terraform & GitOps",
        "category": "Cloud",
        "author": "Elena Vance",
        "reading_time": "8 min read",
        "is_featured": False,
        "is_trending": True,
        "image_url": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        "short_description": "Building zero-downtime, 99.999% availability multi-region EKS clusters using Terraform modules, ArgoCD, and AWS Route53 Application Recovery Controller.",
        "youtube_url": "",
        "pdf_url": "",
        "attachments": [],
        "tags": ["AWS", "Cloud", "Kubernetes", "DevOps", "Terraform"],
        "content": json.dumps([
            {"type": "paragraph", "value": "High-availability enterprise systems cannot afford regional cloud outages. Here is YGR Global's automated blueprint for active-active AWS EKS cluster deployment with global failover in under 3 seconds."},
            {"type": "heading", "value": "Terraform Multi-Region Module Snippet"},
            {"type": "code", "language": "hcl", "code": "module \"primary_eks\" {\n  source         = \"terraform-aws-modules/eks/aws\"\n  version        = \"~> 19.0\"\n  cluster_name   = \"ygr-prod-us-east-1\"\n  cluster_version = \"1.29\"\n  subnet_ids     = module.vpc_primary.private_subnets\n}\n\nmodule \"secondary_eks\" {\n  providers      = { aws = aws.us_west_2 }\n  source         = \"terraform-aws-modules/eks/aws\"\n  version        = \"~> 19.0\"\n  cluster_name   = \"ygr-prod-us-west-2\"\n  cluster_version = \"1.29\"\n  subnet_ids     = module.vpc_secondary.private_subnets\n}"}
        ])
    },
    {
        "title": "Spring Boot 3.3 Virtual Threads (Project Loom) Performance Benchmark",
        "category": "Spring Boot",
        "author": "Dr. Aris Thorne",
        "reading_time": "5 min read",
        "is_featured": False,
        "is_trending": False,
        "image_url": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
        "short_description": "How Java 21 Virtual Threads eliminate thread pool exhaustion in Spring Boot REST controllers handling millions of concurrent HTTP requests.",
        "youtube_url": "",
        "pdf_url": "",
        "attachments": [],
        "tags": ["Spring Boot", "Java", "Performance", "Backend"],
        "content": json.dumps([
            {"type": "paragraph", "value": "With Java 21 and Spring Boot 3.2+, developer code no longer needs to jump through reactive WebFlux hoops to achieve millions of concurrent requests per server node."},
            {"type": "code", "language": "java", "code": "@Configuration\npublic class ThreadConfig {\n    @Bean\n    public TomcatProtocolHandlerCustomizer<?> protocolHandlerVirtualThreadExecutorCustomizer() {\n        return protocolHandler -> {\n            protocolHandler.setExecutor(Executors.newVirtualThreadPerTaskExecutor());\n        };\n    }\n}"}
        ])
    },
    {
        "title": "Building High-Throughput Data Pipelines in Python 3.12 with Polars & PyArrow",
        "category": "Python",
        "author": "Dr. Aris Thorne",
        "reading_time": "6 min read",
        "is_featured": False,
        "is_trending": False,
        "image_url": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
        "short_description": "Replace sluggish Pandas code with Rust-powered Polars for 50x faster ETL batch processing and SIMD vector execution in Python.",
        "youtube_url": "",
        "pdf_url": "",
        "attachments": [],
        "tags": ["Python", "Data Engineering", "Polars", "Performance"],
        "content": json.dumps([
            {"type": "paragraph", "value": "Polars brings Rust memory safety and multithreaded query optimization to Python data science workflows."},
            {"type": "code", "language": "python", "code": "import polars as pl\n\n# Lazy evaluation query engine\ndf = (pl.scan_csv('million_rows.csv')\n      .filter(pl.col('status') == 'ACTIVE')\n      .group_by('category')\n      .agg(pl.col('amount').sum())\n      .collect())\nprint(df)"}
        ])
    },
    {
        "title": "Cross-Platform Mobile Mastery: Flutter 3.22 vs React Native Architecture",
        "category": "Mobile",
        "author": "Vikramaditya Rao",
        "reading_time": "5 min read",
        "is_featured": False,
        "is_trending": False,
        "image_url": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
        "short_description": "Comparing Flutter Impeller GPU rendering against React Native's New Architecture (Fabric + TurboModules) for enterprise banking applications.",
        "youtube_url": "",
        "pdf_url": "",
        "attachments": [],
        "tags": ["Mobile", "Flutter", "React Native", "iOS", "Android"],
        "content": json.dumps([
            {"type": "paragraph", "value": "Mobile user experience demands 120fps smooth animations and instant cold startup times. We break down the technical trade-offs for enterprise mobile app development."}
        ])
    },
    {
        "title": "Algorithmic Growth Marketing: Using Technical SEO & AI Insights in 2026",
        "category": "Digital Marketing",
        "author": "Elena Vance",
        "reading_time": "4 min read",
        "is_featured": False,
        "is_trending": False,
        "image_url": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        "short_description": "How YGR Global leverages structured schema JSON-LD, core web vitals, and programmatic AI content hubs to drive organic B2B lead pipelines.",
        "youtube_url": "",
        "pdf_url": "",
        "attachments": [],
        "tags": ["Digital Marketing", "SEO", "Growth", "Analytics"],
        "content": json.dumps([
            {"type": "paragraph", "value": "Modern B2B marketing relies on technical precision, semantic HTML5 structure, and ultra-fast page speeds to win top search engine visibility."}
        ])
    },
    {
        "title": "YGR Global Expands Enterprise AI & Cloud Innovation Lab",
        "category": "Company News",
        "author": "Dr. Aris Thorne",
        "reading_time": "3 min read",
        "is_featured": False,
        "is_trending": False,
        "image_url": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
        "short_description": "Announcing our new state-of-the-art Technology Innovation Center focusing on Generative AI, Cloud Migration, and Next-Gen Enterprise Software Engineering.",
        "youtube_url": "",
        "pdf_url": "",
        "attachments": [],
        "tags": ["Company News", "Innovation", "YGR Global", "AI"],
        "content": json.dumps([
            {"type": "paragraph", "value": "YGR Global IT Services is proud to launch our state-of-the-art AI Lab aimed at delivering continuous technology innovation to our global client ecosystem."}
        ])
    }
]

for b_data in sample_blogs:
    b_slug = slugify(b_data["title"])
    category_obj = cat_map.get(b_data["category"])
    author_obj = author_map.get(b_data["author"])

    blog_obj, created = Blog.objects.get_or_create(
        slug=b_slug,
        defaults={
            "title": b_data["title"],
            "short_description": b_data["short_description"],
            "content": b_data["content"],
            "category": category_obj,
            "author": author_obj,
            "author_name": b_data["author"],
            "author_role": author_obj.role if author_obj else "Tech Lead",
            "reading_time": b_data["reading_time"],
            "is_featured": b_data["is_featured"],
            "is_trending": b_data["is_trending"],
            "is_published": True,
            "image_url": b_data["image_url"],
            "youtube_url": b_data.get("youtube_url", ""),
            "pdf_url": b_data.get("pdf_url", ""),
            "attachments_json": json.dumps(b_data.get("attachments", []))
        }
    )

    if b_data.get("tags"):
        for tname in b_data["tags"]:
            tag_obj, _ = BlogTag.objects.get_or_create(name=tname, defaults={"slug": slugify(tname)})
            blog_obj.tags.add(tag_obj)

    print(f"Blog Post: {blog_obj.title} ({'Created' if created else 'Existing'})")

print("--- Blog Seeding Complete Successfully! ---")
