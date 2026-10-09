import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hrpanel.settings")
django.setup()

from main.models import Internships, Question

def seed():
    # 1. Seed Internships
    internships_data = [
        {
            "title": "Python Full Stack Development",
            "duration": "6 Months",
            "description": "Master Python, Django, and React to build scalable web applications. Learn database management and API integrations.",
            "syllabus": "1. Python Basics\n2. Object-Oriented Programming\n3. Django Framework\n4. REST APIs\n5. React & Frontend integration\n6. Deployment",
            "skills": "Python, Django, React, AWS",
            "certificate": "Industry Certified",
            "stipend": "Stipend Included"
        },
        {
            "title": "Java Full Stack Development",
            "duration": "6 Months",
            "description": "Learn enterprise-grade development with Java, Spring Boot, and modern frontend frameworks like React or Angular.",
            "syllabus": "1. Core Java\n2. Advanced Java & JDBC\n3. Spring Boot\n4. Hibernate / JPA\n5. Microservices\n6. React / Angular integration",
            "skills": "Java, Spring Boot, React, SQL",
            "certificate": "Industry Certified",
            "stipend": "Stipend Included"
        },
        {
            "title": "Digital Marketing",
            "duration": "3 Months",
            "description": "Master SEO, SEM, Social Media Marketing, and Analytics to drive massive growth and digital presence.",
            "syllabus": "1. SEO Optimization\n2. Social Media Marketing\n3. Google Ads & SEM\n4. Content Strategy\n5. Analytics & Tracking\n6. Email Marketing",
            "skills": "SEO, SEM, Social Media, Google Ads",
            "certificate": "Industry Certified",
            "stipend": "Stipend Included"
        }
    ]

    for data in internships_data:
        obj, created = Internships.objects.update_or_create(
            title=data["title"],
            defaults={
                "duration": data["duration"],
                "description": data["description"],
                "syllabus": data["syllabus"],
                "skills": data["skills"],
                "certificate": data["certificate"],
                "stipend": data["stipend"],
                "completed_topics": []
            }
        )
        if created:
            print(f"Created Internship: {data['title']}")
        else:
            print(f"Updated Internship: {data['title']}")

    # 2. Seed Questions for Exams
    questions_data = [
        # Python
        {
            "language": "python_full_stack_development",
            "question_text": "What is the output of print(2 ** 3)?",
            "option_a": "5",
            "option_b": "6",
            "option_c": "8",
            "option_d": "9",
            "correct_option": "C",
        },
        {
            "language": "python_full_stack_development",
            "question_text": "Which of the following is used to define a block of code in Python?",
            "option_a": "Indentation",
            "option_b": "Key",
            "option_c": "Brackets",
            "option_d": "All of the mentioned",
            "correct_option": "A",
        },
        {
            "language": "python_full_stack_development",
            "question_text": "In Django, what is the default database engine?",
            "option_a": "PostgreSQL",
            "option_b": "MySQL",
            "option_c": "SQLite",
            "option_d": "MongoDB",
            "correct_option": "C",
        },
        
        # Java
        {
            "language": "java_full_stack_development",
            "question_text": "Which of these cannot be used for a variable name in Java?",
            "option_a": "identifier & keyword",
            "option_b": "identifier",
            "option_c": "keyword",
            "option_d": "none of the mentioned",
            "correct_option": "C",
        },
        {
            "language": "java_full_stack_development",
            "question_text": "What is the extension of java code files?",
            "option_a": ".js",
            "option_b": ".txt",
            "option_c": ".class",
            "option_d": ".java",
            "correct_option": "D",
        },
        {
            "language": "java_full_stack_development",
            "question_text": "In Spring Boot, which annotation is used to mark a class as a REST Controller?",
            "option_a": "@Controller",
            "option_b": "@RestController",
            "option_c": "@Service",
            "option_d": "@Api",
            "correct_option": "B",
        },
        
        # Digital Marketing
        {
            "language": "digital_marketing",
            "question_text": "What does SEO stand for?",
            "option_a": "Search Engine Optimization",
            "option_b": "Social Engine Optimization",
            "option_c": "Search Engine Orientation",
            "option_d": "Sales Engine Optimization",
            "correct_option": "A",
        },
        {
            "language": "digital_marketing",
            "question_text": "Which tool is commonly used to track website traffic?",
            "option_a": "Photoshop",
            "option_b": "Google Analytics",
            "option_c": "Slack",
            "option_d": "MailChimp",
            "correct_option": "B",
        },
        {
            "language": "digital_marketing",
            "question_text": "What does CPC stand for in digital advertising?",
            "option_a": "Cost Per Click",
            "option_b": "Cost Per Customer",
            "option_c": "Campaign Per Click",
            "option_d": "Clicks Per Campaign",
            "correct_option": "A",
        }
    ]

    for q in questions_data:
        obj, created = Question.objects.get_or_create(
            language=q["language"],
            question_text=q["question_text"],
            defaults={
                "option_a": q["option_a"],
                "option_b": q["option_b"],
                "option_c": q["option_c"],
                "option_d": q["option_d"],
                "correct_option": q["correct_option"]
            }
        )
        if created:
            print(f"Created Question for {q['language']}")
        else:
            print(f"Question already exists for {q['language']}")

if __name__ == '__main__':
    print("Starting DB Seed...")
    seed()
    print("Done!")
