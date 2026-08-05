import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalExampagesJobApplication = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    
    useEffect(() => {
        // Intercept link clicks for React Router
        const handleLinkClick = (e) => {
            const target = e.target.closest('a');
            if (target && target.getAttribute('href') && target.getAttribute('href').startsWith('/')) {
                e.preventDefault();
                navigate(target.getAttribute('href'));
            }
        };
        document.addEventListener('click', handleLinkClick);

        // Intercept form submission to add CSRF and correct action
        const handleFormSubmit = async (e) => {
            const form = e.target.closest('form#jobForm');
            if (!form) return;
            e.preventDefault();

            // Get CSRF token from Django cookie
            const getCookie = (name) => {
                let cookieValue = null;
                if (document.cookie && document.cookie !== '') {
                    const cookies = document.cookie.split(';');
                    for (let cookie of cookies) {
                        cookie = cookie.trim();
                        if (cookie.startsWith(name + '=')) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
                return cookieValue;
            };

            const csrfToken = getCookie('csrftoken');
            const formData = new FormData(form);

            // Show loading state
            const submitBtn = form.querySelector('.btn-submit');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Submitting...';
            }

            try {
                const response = await fetch('/apply/', {
                    method: 'POST',
                    headers: { 'X-CSRFToken': csrfToken },
                    body: formData,
                    credentials: 'same-origin',
                });

                if (response.redirected) {
                    window.location.href = response.url;
                } else if (response.ok) {
                    navigate('/apply/success/');
                } else {
                    const text = await response.text();
                    const errorDiv = form.querySelector('.alert-danger');
                    if (errorDiv) {
                        errorDiv.style.display = 'block';
                        const icon = errorDiv.querySelector('i');
                        errorDiv.textContent = 'Submission failed. Please check all fields and try again.';
                        if (icon) errorDiv.prepend(icon);
                    }
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = 'Submit Application <i class="fas fa-paper-plane ms-2"></i>';
                    }
                }
            } catch (err) {
                console.error('Form submission error:', err);
                const errorDiv = form.querySelector('.alert-danger');
                if (errorDiv) {
                    errorDiv.style.display = 'block';
                    errorDiv.textContent = 'Network error. Please try again.';
                }
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Submit Application <i class="fas fa-paper-plane ms-2"></i>';
                }
            }
        };

        document.addEventListener('submit', handleFormSubmit);
        
        // Re-run scripts
        if (containerRef.current) {
            const scripts = containerRef.current.querySelectorAll('script');
            scripts.forEach(oldScript => {
                if (oldScript.dataset.executed) return;
                const newScript = document.createElement('script');
                Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
                if (oldScript.innerHTML) newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                oldScript.parentNode.replaceChild(newScript, oldScript);
                newScript.dataset.executed = "true";
            });
        }

        return () => {
            document.removeEventListener('click', handleLinkClick);
            document.removeEventListener('submit', handleFormSubmit);
        };
    }, [navigate]);

    const rawHTML = `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
<link href="/images/logo.png" rel="icon" type="image/png"/>
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet"/>
<link href="/css/modern_ui.css" rel="stylesheet"/>
<style>
        :root {
            --primary-navy: #092a49;
            --accent-gold: #fbcc27;
            --white: #ffffff;
            --step-inactive: #e2e8f0;
        }

        body {
            background: #f0f4f8 !important;
            font-family: 'Lato', sans-serif;
        }

        /* Clearance for Sticky Header */
        .apply-offset {
            padding-top: 160px;
            padding-bottom: 100px;
            min-height: 100vh;
        }

        .application-card {
            background: rgba(255, 255, 255, 0.98);
            border-radius: 40px;
            box-shadow: 0 40px 100px rgba(9, 42, 73, 0.12);
            padding: 60px;
            max-width: 950px;
            margin: 0 auto;
            position: relative;
            border: 1px solid rgba(0,0,0,0.03);
        }

        .header-section {
            text-align: center;
            margin-bottom: 50px;
        }

        .header-section img {
            width: 110px;
            margin-bottom: 25px;
        }

        .header-section h1 {
            font-size: 36px;
            color: var(--primary-navy);
            font-family: 'Oswald', sans-serif !important;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 10px;
        }

        /* Progress Tracker */
        .progress-tracker {
            display: flex;
            justify-content: space-between;
            margin-bottom: 60px;
            position: relative;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
        }

        .progress-tracker::after {
            content: '';
            position: absolute;
            top: 20px;
            left: 0;
            width: 100%;
            height: 4px;
            background: var(--step-inactive);
            z-index: 0;
        }

        .step-item {
            width: 45px;
            height: 45px;
            background: var(--white);
            border: 4px solid var(--step-inactive);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            color: #94a3b8;
            position: relative;
            z-index: 1;
            transition: all 0.4s ease;
            font-size: 14px;
        }

        .step-item.active {
            border-color: var(--accent-gold);
            color: var(--primary-navy);
            background: var(--accent-gold);
            transform: scale(1.1);
        }

        .step-item.completed {
            border-color: var(--primary-navy);
            background: var(--primary-navy);
            color: var(--white);
        }

        /* Form Steps */
        .form-step {
            display: none;
            animation: fadeIn 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .form-step.active {
            display: block;
        }

        .section-title {
            font-family: 'Oswald', sans-serif;
            font-size: 24px;
            color: var(--primary-navy);
            margin-bottom: 30px;
            padding-bottom: 10px;
            border-bottom: 2px solid var(--accent-gold);
            display: inline-block;
        }

        .modern-label {
            display: block;
            font-weight: 700;
            font-size: 13px;
            color: #64748b;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .modern-input {
            width: 100%;
            padding: 15px 18px;
            background: #f8fafc;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            font-size: 15px;
            transition: all 0.3s ease;
            color: var(--primary-navy);
            margin-bottom: 20px;
        }

        .modern-input:focus {
            border-color: var(--primary-navy);
            background: #fff;
            outline: none;
            box-shadow: 0 10px 20px rgba(9, 42, 73, 0.05);
        }

        textarea.modern-input {
            height: 100px;
        }

        /* Buttons */
        .btn-group-custom {
            display: flex;
            gap: 15px;
            margin-top: 40px;
        }

        .action-btn {
            padding: 18px 35px;
            border-radius: 14px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            font-size: 14px;
            transition: all 0.3s ease;
            cursor: pointer;
            border: none;
            flex: 1;
        }

        .btn-next {
            background: var(--primary-navy);
            color: var(--white);
        }

        .btn-next:hover {
            background: #0d3b6c;
            transform: translateY(-3px);
            box-shadow: 0 15px 30px rgba(9, 42, 73, 0.2);
        }

        .btn-prev {
            background: #f1f5f9;
            color: #64748b;
        }

        .btn-submit {
            background: var(--accent-gold);
            color: var(--primary-navy);
        }

        /* File Upload */
        .file-upload-box {
            border: 2px dashed #cbd5e1;
            padding: 25px;
            border-radius: 15px;
            text-align: center;
            background: #f8fafc;
            position: relative;
            margin-bottom: 25px;
            transition: all 0.3s ease;
        }

        .file-upload-box:hover {
            border-color: var(--accent-gold);
            background: #fff;
        }

        .file-upload-box input {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            opacity: 0;
            cursor: pointer;
        }

        .file-upload-box i {
            font-size: 28px;
            color: var(--primary-navy);
            margin-bottom: 10px;
            display: block;
        }

        @media (max-width: 768px) {
            .apply-offset { padding-top: 120px; }
            .application-card { padding: 40px 20px; border-radius: 25px; }
            .progress-tracker { margin-bottom: 40px; }
            .step-item { width: 35px; height: 35px; font-size: 12px; }
        }
    </style>

<html lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<!-- Bootstrap -->
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet"/>
<!-- Font Awesome 6 ONLY -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet"/>
<!-- Bootstrap Icons -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet"/>
<!-- Modern UI Design System -->
<link href="/css/modern_ui.css" rel="stylesheet"/>
<style>
    /* ===== General Styles ===== */
    body {
      margin: 0;
      padding: 0;
      font-family: 'Lato', sans-serif;
      background-color: #f5f6fa;
      color: #797979
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: 'Oswald', sans-serif;
      color: #092a49;
      font-weight: 700
    }

    a {
      text-decoration: none;
      color: #092a49;
      transition: color 0.3s
    }

    a:hover {
      color: #fbcc27;
      text-decoration: none;
    }

    /* Top bar */
    .top-bar {
      position: relative;
      height: 45px;
      background: #0796fe;
      /* Solid blue as per image */
      display: flex;
      align-items: center;
    }

    .top-bar .text {
      display: flex;
      align-items: center;
      height: 45px;
      padding: 0 20px;
      border-right: 1px solid rgba(255, 255, 255, .2);
    }

    .top-bar .text:first-child {
      border-left: 1px solid rgba(255, 255, 255, .2);
    }

    .top-bar .text i {
      font-size: 15px;
      color: #ffffff;
      margin-right: 10px;
    }

    .top-bar .text h2,
    .top-bar .text a,
    .top-bar .text p {
      color: #ffffff !important;
      font-weight: 500;
      font-size: 14px;
      letter-spacing: 0.5px;
      margin: 0;
    }

    .top-bar .text h2+p,
    .top-bar .text a+p {
      margin-left: 12px;
    }

    .top-bar .social {
      display: flex;
      height: 45px;
      justify-content: flex-end;
    }

    .top-bar .social a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 45px;
      height: 100%;
      font-size: 16px;
      color: #ffffff;
      border-left: 1px solid rgba(255, 255, 255, .2);
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .top-bar .social a:hover {
      background: rgba(255, 255, 255, 0.1);
    }


    /* ================= TOP BAR SOCIAL BRAND COLORS ================= */

    .top-bar .social a[href*="x.com"]:hover {

      color: #000000;
    }

    .top-bar .social a[href*="facebook.com"]:hover {

      color: #1877f2;
    }

    .top-bar .social a[href*="linkedin.com"]:hover {

      color: #0a66c2;
    }

    .top-bar .social a[href*="instagram.com"]:hover {

      color: #e1306c;
      ;
    }

    .top-bar .social a[href*="youtube.com"]:hover {

      color: #ff0000;
    }

    /* Header */
    header {
      background-color: #092a49;
      padding: 0 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 70px;
      /* Increased for better logo fit */
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    header .logo img {
      height: 50px;
      width: auto;
      display: block;
    }

    header nav {
      display: flex;
      gap: 30px
    }

    header nav a {
      color: #ffffff !important;
      font-size: 15px;
      font-weight: 500;
      transition: all 0.3s ease;
      text-transform: capitalize;
    }

    header nav a:hover {
      color: #fbcc27 !important;
      text-decoration: none;
    }

    header nav a.active {
      font-weight: 700 !important;
      color: #ffffff !important;
    }

    /* About Us Dropdown */
    .nav-item.about-dropdown {
      position: relative
    }

    .nav-item.about-dropdown .about-menu {
      position: absolute;
      top: 40px;
      left: -30px;
      min-width: 200px;
      background: #092a49;
      border-radius: 4px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      opacity: 0;
      visibility: hidden;
      transform: translateY(10px);
      transition: all 0.3s ease;
      z-index: 999
    }

    .nav-item.about-dropdown:hover .about-menu {
      opacity: 1;
      visibility: visible;
      transform: translateY(0)
    }

    .about-menu a {
      display: block;
      padding: 10px 20px;
      font-size: 15px;
      color: #ffffff;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.2s ease
    }

    .about-menu a:hover {
      color: #fbcc27;
    }

    /* Floating Support Button */
    .support-btn {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 55px;
      height: 55px;
      background: #092a49;
      color: #fff;
      border-radius: 50%;
      font-size: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
      z-index: 9999;
      transition: all 0.3s ease
    }

    .support-btn:hover {
      background: #092a49;
      text-decoration: none;
      transform: translateY(-3px)
    }

    .support-btn i {
      color: #fff
    }

    @media(max-width:768px) {
      .support-btn {
        width: 48px;
        height: 48px;
        font-size: 22px;
        bottom: 90px;
        right: 15px
      }
    }

    header nav a.active {
      color: #fff !important;
      font-weight: 600
    }

    /* ================= EMPLOYEE LOGIN BUTTON ================= */
    .btn-employee-login {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: linear-gradient(135deg, #fbcc27, #f39c12);
      color: #092a49 !important;
      font-size: 14px;
      font-weight: 700;
      padding: 8px 18px;
      border-radius: 50px;
      text-decoration: none;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(251, 204, 39, 0.35);
      white-space: nowrap;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .btn-employee-login:hover {
      background: linear-gradient(135deg, #f39c12, #fbcc27);
      color: #092a49 !important;
      transform: translateY(-2px);
      box-shadow: 0 8px 22px rgba(251, 204, 39, 0.5);
      text-decoration: none;
    }

    .btn-employee-login i {
      font-size: 15px;
      color: #092a49 !important;
    }

    @media(max-width:991px) {
      .btn-employee-login {
        margin: 10px 20px;
        width: calc(100% - 40px);
        justify-content: center;
        padding: 12px 20px;
        font-size: 15px;
        border-radius: 8px;
      }
    }

    /* ================= MOBILE NAV ONLY ================= */
    @media(max-width:991px) {
      .top-bar {
        display: none !important
      }

      header {
        padding: 15px 20px;
        height: auto
      }

      header .logo img {
        height: 40px;
        border-radius: 50%;
      }

      .mobile-toggle {
        font-size: 26px;
        color: #fff;
        cursor: pointer;
        display: block
      }

      header nav {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: #092a49;
        flex-direction: column;
        gap: 0;
        display: none;
        z-index: 999;
        max-height: 70vh;
        overflow-y: auto
      }

      header nav.active {
        display: flex
      }

      header nav a {
        padding: 14px 20px;
        color: #fff;
        font-size: 16px;
        width: 100%
      }

      /* Services Mobile Scrollable */
      .nav-item.dropdown .dropdown-menu {
        position: static;
        width: 100%;
        background: #0b355a;
        display: none;
        opacity: 1;
        visibility: visible;
        max-height: 70vh;
        overflow-y: auto
      }

      .nav-item.dropdown .dropdown-menu.show {
        display: block
      }

      .dropdown-grid {
        grid-template-columns: 1fr;
        padding: 0
      }

      .dropdown-grid a {
        padding: 12px 30px;
        font-size: 14px;
        color: #fff
      }

      .dropdown-grid a::before {
        content: "&#8250;";
        color: #fff
      }

      /* About Us Mobile Clickable */
      .nav-item.about-dropdown .about-menu {
        position: static;
        background: #0b355a;
        box-shadow: none;
        display: none;
        max-height: 70vh;
        overflow-y: auto
      }

      .nav-item.about-dropdown .about-menu a {
        padding: 12px 30px;
        font-size: 14px;
        color: #fff
      }

      .nav-item.about-dropdown .about-menu a:hover {
        background-color: #0796fe33;
        color: #fff
      }

      .nav-item.about-dropdown.active .about-menu {
        display: block
      }

      .nav-item.about-dropdown {
        padding-bottom: 14px;
        padding-top: 14px;
      }

      .nav-item.dropdown {
        padding-bottom: 14px;
        padding-top: 14px;
      }
    }
  </style>
</head>
<body>
<!-- Top Bar Start -->
<div class="top-bar d-none d-md-block">
<div class="container-fluid">
<div class="row">
<div class="col-md-8">
<div class="top-bar-left">
<div class="text">
<i class="far fa-clock"></i>
<h2>9:30 AM 6:30 PM</h2>
<p> Mon - Fri</p>
</div>
<div class="text">
<i class="fa fa-phone-alt"></i>
<a href="tel:+917794053340">+91 77940 53340</a>
<p>For Quotation</p>
</div>
</div>
</div>
<div class="col-md-4">
<div class="top-bar-right">
<div class="social">
<a href="https://x.com/ygrgobalit2024"><i class="fab fa-x-twitter"></i></a>
<a href="https://www.facebook.com/profile.php?id=61568888033386"><i class="fab fa-facebook-f"></i></a>
<a href="https://www.linkedin.com/company/ygr-gobal-it-services-pvt-ltd/?viewAsMember=true/"><i class="fab fa-linkedin-in"></i></a>
<a href="https://www.instagram.com/ygrgobalitservices/"><i class="fab fa-instagram"></i></a>
<a href="https://www.youtube.com/@rrtalktrends"><i class="fab fa-youtube"></i></a>
</div>
</div>
</div>
</div>
</div>
</div>
<!-- Top Bar End -->
<header>
<div class="logo">
<a href="/"><img alt="logo" src="/images/logo1.jpeg"/></a>
</div>
<div class="mobile-toggle d-lg-none" id="mobileToggle">
<i class="fas fa-bars"></i>
</div>
<nav>
<a class="active" href="/">Home</a>
<!-- About Us Dropdown -->
<div class="nav-item about-dropdown">
<a class="active" href="javascript:void(0)" id="aboutToggle">About Us &#9662;</a>
<div class="about-menu">
<a href="/about">Company Overview</a>
<a href="/team">Meet the Team</a>
</div>
</div>
<div class="nav-item about-dropdown" id="servicesDropdown">
<a href="/services?type=web" id="servicesToggle">Services &#9662;</a>
<div class="about-menu">
<a href="/services?type=web">Web Design</a>
<a href="/services?type=webapp">Web Apps</a>
<a href="/services?type=mobile">Mobile Apps</a>
<a href="/services?type=dm">Marketing</a>
<a href="/services?type=uiux">UI / UX</a>
<a href="/services?type=testing">Testing</a>
<a href="/services?type=support">Support</a>
<a href="/services?type=intern">Internships</a>
</div>
</div>
<a class="active" href="/portfolio">Portfolio</a>
<a class="active" href="/careers">Careers</a>
<a class="active" href="/blog">Blog</a>
<a class="active" href="/contact">Contact Us</a>
<div class="nav-item about-dropdown">
<a href="javascript:void(0)" id="demoToggle">Demo For Client &#9662;</a>
<div class="about-menu">
<a href="http://demo.ygrgobalitservices.com/" target="_blank"> Customer Care Vizag</a>
<a href="http://trip.ygrgobalitservices.com/" target="_blank"> Trip</a>
<a href="http://uiux.ygrgobalitservices.com/" target="_blank">CodeLabs</a>
</div>
</div>
<!-- Employee Login Button -->
<a class="btn-employee-login" href="/login" id="employeeLoginBtn" rel="noopener noreferrer" target="_blank">
<i class="fas fa-user-circle"></i>
        Employee Login
      </a>
</nav>
</header>
<a aria-label="Chat on WhatsApp" class="support-btn" href="https://wa.me/917794053340" target="_blank">
<i class="bi bi-headset"></i>
</a>
<script>
    document.addEventListener("DOMContentLoaded", function () {
      const mobileToggle = document.getElementById("mobileToggle");
      const nav = document.querySelector("header nav");
      const aboutToggle = document.getElementById("aboutToggle");
      const aboutMenu = document.querySelector(".nav-item.about-dropdown .about-menu");
      const demoToggle = document.getElementById("demoToggle");
      const demoMenu = demoToggle.parentElement.querySelector(".about-menu");
      const servicesToggle = document.getElementById("servicesToggle");
      const servicesMenu = servicesToggle ? servicesToggle.parentElement.querySelector(".about-menu") : null;

      // Toggle mobile nav
      mobileToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        nav.classList.toggle("active");
      });

      // Toggle About Us
      aboutToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        aboutMenu.parentElement.classList.toggle("active");
      });

      // Toggle Services
      if (servicesToggle) { servicesToggle.addEventListener("click", function (e) { e.stopPropagation(); servicesMenu.parentElement.classList.toggle("active"); }); }

      // Toggle Demo For Client
      demoToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        demoMenu.parentElement.classList.toggle("active");
      });

      // Close everything on outside click
      document.addEventListener("click", function (e) {
        if (!nav.contains(e.target)) {
          nav.classList.remove("active");
          if (aboutMenu) aboutMenu.parentElement.classList.remove("active");
        }
      });

      // --- GOBAL REVEAL ENGINE ---
      const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      const handleReveals = () => {
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObserver.observe(el));
      };

      handleReveals();
      window.addEventListener('scroll', handleReveals);
    });
  </script>
</body>
</html>
<div class="apply-offset mesh-gradient">
<div class="container">
<div class="application-card reveal">
<div class="header-section">
<img alt="logo" src="/images/logo1.png"/>
<h1>Join Our Ecosystem</h1>
<p style="color: #64748b; font-weight: 600;">Fill out the form below to start your professional journey with YGR.</p>
</div>
<!-- Progress Tracker -->
<div class="progress-tracker" id="tracker">
<div class="step-item active" data-step="0">1</div>
<div class="step-item" data-step="1">2</div>
<div class="step-item" data-step="2">3</div>
<div class="step-item" data-step="3">4</div>
<div class="step-item" data-step="4">5</div>
<div class="step-item" data-step="5">6</div>
</div>
<form enctype="multipart/form-data" id="jobForm" method="post">
<div class="alert alert-danger mb-4" style="border-radius: 15px; font-weight: 600;">
<i class="fas fa-exclamation-circle me-2"></i>
</div>
<!-- STEP 1: PERSONAL -->
<div class="form-step active">
<div class="section-title">Personal Details</div>
<div class="row">
<div class="col-md-6">
<label class="modern-label">First Name *</label>
<input class="modern-input" name="first_name" placeholder="e.g. John" required="" type="text"/>
</div>
<div class="col-md-6">
<label class="modern-label">Last Name *</label>
<input class="modern-input" name="last_name" placeholder="e.g. Doe" required="" type="text"/>
</div>
</div>
<div class="row">
<div class="col-md-6">
<label class="modern-label">Date of Birth *</label>
<input class="modern-input" name="dob" required="" type="date"/>
</div>
<div class="col-md-6">
<label class="modern-label">Gender *</label>
<select class="modern-input" name="gender" required="">
<option value="">Select</option>
<option>Male</option>
<option>Female</option>
<option>Other</option>
</select>
</div>
</div>
<div class="row">
<div class="col-md-6">
<label class="modern-label">Phone *</label>
<input class="modern-input" maxlength="10" name="phone" pattern="[0-9]{10}" placeholder="10 Digit Number" required="" type="tel"/>
</div>
<div class="col-md-6">
<label class="modern-label">Email *</label>
<input class="modern-input" name="email" placeholder="john@email.com" required="" type="email"/>
</div>
</div>
<label class="modern-label">Current Address *</label>
<textarea class="modern-input" name="current_address" required=""></textarea>
<div class="btn-group-custom">
<button class="action-btn btn-next" type="button">Save &amp; Continue <i class="fas fa-arrow-right ms-2"></i></button>
</div>
</div>
<!-- STEP 2: JOB -->
<div class="form-step">
<div class="section-title">Job Information</div>
<label class="modern-label">Job Role Applying For *</label>
<input class="modern-input" name="job_role" readonly="" type="text" value=""/>
<label class="modern-label">Department *</label>
<input class="modern-input" name="department" placeholder="e.g. Software Engineering" required="" type="text"/>
<div class="row">
<div class="col-md-6">
<label class="modern-label">Employment Type *</label>
<select class="modern-input" name="employment_type" required="">
<option>Full Time</option>
<option>Part Time</option>
<option>Internship</option>
<option>Contract</option>
</select>
</div>
<div class="col-md-6">
<label class="modern-label">Preferred Work Mode *</label>
<select class="modern-input" name="preferred_work_mode" required="">
<option>Work From Office</option>
<option>Work From Home</option>
<option>Hybrid</option>
</select>
</div>
</div>
<div class="btn-group-custom">
<button class="action-btn btn-prev" type="button"><i class="fas fa-arrow-left me-2"></i> Back</button>
<button class="action-btn btn-next" type="button">Continue <i class="fas fa-arrow-right ms-2"></i></button>
</div>
</div>
<!-- STEP 3: EDUCATION -->
<div class="form-step">
<div class="section-title">Academic History</div>
<label class="modern-label">Highest Qualification *</label>
<select class="modern-input" name="highest_qualification" required="">
<option value="">Select Qualification</option>
<option>Graduate</option>
<option>Post Graduate</option>
<option>PhD</option>
</select>
<label class="modern-label">College / University *</label>
<input class="modern-input" name="college_university" required="" type="text"/>
<div class="row">
<div class="col-md-6">
<label class="modern-label">Passout Year *</label>
<input class="modern-input" min="1950" name="passout_year" required="" type="number"/>
</div>
<div class="col-md-6">
<label class="modern-label">Course / Stream *</label>
<input class="modern-input" name="course" required="" type="text"/>
</div>
</div>
<div class="btn-group-custom">
<button class="action-btn btn-prev" type="button">Back</button>
<button class="action-btn btn-next" type="button">Continue</button>
</div>
</div>
<!-- STEP 4: SKILLS -->
<div class="form-step">
<div class="section-title">Technical Expertise</div>
<label class="modern-label">Primary Skills *</label>
<input class="modern-input" name="primary_skills" placeholder="e.g. Python, React" required="" type="text"/>
<label class="modern-label">Technical Skills Description *</label>
<textarea class="modern-input" name="technical_skills" placeholder="Describe your proficiency..." required=""></textarea>
<label class="modern-label">Certifications</label>
<input class="modern-input" name="certifications" type="text"/>
<div class="btn-group-custom">
<button class="action-btn btn-prev" type="button">Back</button>
<button class="action-btn btn-next" type="button">Continue</button>
</div>
</div>
<!-- STEP 5: EXPERIENCE -->
<div class="form-step">
<div class="section-title">Experience Summary</div>
<label class="modern-label">Candidate Type *</label>
<select class="modern-input" id="candidate_type" name="candidate_type" required="">
<option value="">Select Type</option>
<option>Fresher</option>
<option>Experienced</option>
</select>
<div id="experience_fields" style="display:none;">
<div class="row">
<div class="col-md-6">
<label class="modern-label">Total Exp (Years)</label>
<input class="modern-input" name="total_experience" step="0.1" type="number"/>
</div>
<div class="col-md-6">
<label class="modern-label">Relevant Exp (Years)</label>
<input class="modern-input" name="relevant_experience" step="0.1" type="number"/>
</div>
</div>
<label class="modern-label">Current Company</label>
<input class="modern-input" name="current_company" type="text"/>
</div>
<div class="btn-group-custom">
<button class="action-btn btn-prev" type="button">Back</button>
<button class="action-btn btn-next" type="button">Continue</button>
</div>
</div>
<!-- STEP 6: DOCUMENTS -->
<div class="form-step">
<div class="section-title">Verification &amp; Submission</div>
<div class="row">
<div class="col-md-6">
<label class="modern-label">Upload Resume (PDF) *</label>
<div class="file-upload-box">
<i class="fas fa-file-pdf"></i>
<span>Upload Resume</span>
<input accept=".pdf" name="resume" required="" type="file"/>
</div>
</div>
<div class="col-md-6">
<label class="modern-label">Profile Photo *</label>
<div class="file-upload-box">
<i class="fas fa-user-circle"></i>
<span>Upload Photo</span>
<input accept="image/*" name="profile_photo" required="" type="file"/>
</div>
</div>
</div>
<label class="modern-label">PAN Number</label>
<input class="modern-input" maxlength="10" name="pan_number" placeholder="ABCDE1234F" type="text"/>
<label class="modern-label">LinkedIn / Portfolio URL</label>
<input class="modern-input" name="linkedin" placeholder="https://linkedin.com/in/yourprofile" type="url"/>
<div class="mt-4">
<label class="d-flex align-items-center gap-3" style="cursor: pointer;">
<input required="" style="width: 20px; height: 20px;" type="checkbox"/>
<span style="font-size: 14px; font-weight: 600; color: #64748b;">I declare that the information provided is accurate.</span>
</label>
</div>
<div class="btn-group-custom">
<button class="action-btn btn-prev" type="button">Back</button>
<button class="action-btn btn-submit" type="submit">Submit Application <i class="fas fa-paper-plane ms-2"></i></button>
</div>
</div>
</form>
</div>
</div>
</div>
<style>
/* ================= GOBAL FOOTER TYPOGRAPHY (MATCH SERVICES PAGE) ================= */
.footer,
.footer p,
.footer a,
.footer h2,
.mobile-footer,
.mobile-footer a {
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    line-height: 1.6;
    font-weight: 400;
}

/* ================= DESKTOP FOOTER ================= */
.footer {
    position: relative;
    margin-top: 45px;
    padding-top: 10px;
    background: #092a49;
}

.container {
    max-width: 90%;
    padding: 0 20px;
    margin: 0 auto;
}

.footer .logo {
    height: 100px;
    width: auto;
    display: block;
    padding-bottom: 10px;
}

.footer-row {
    display: flex;
    justify-content: flex-start;
    gap: 80px;
}

/* SECTION WRAPPERS */
.footer-contact,
.footer-link,
.footer-newsletter {
    flex: 1;
    max-width: 25%;
    color: #ffffff;
    margin-bottom: 45px;
}

/* HEADINGS */
.footer .footer-contact h2,
.footer .footer-link h2,
.footer .footer-newsletter h2 {
    font-size: 20px;
    font-weight: 500;
    color: #ffffff;
    letter-spacing: 0.5px;
    margin-bottom: 20px;
    padding-bottom: 8px;
    position: relative;
}

.footer .footer-contact h2::after,
.footer .footer-link h2::after,
.footer .footer-newsletter h2::after {
    content: "";
    position: absolute;
    width: 45px;
    height: 2px;
    bottom: 0;
    left: 0;
    background: #fbcc27;
}

/* TEXT & LINKS */
.footer p {
    color: #e6e6e6;
    margin-bottom: 12px;
}

.footer a {
    color: #e6e6e6;
    text-decoration: none;
    transition: 0.3s;
}

.footer a:hover {
    color: #fbcc27;
}

/* QUICK LINKS */
.footer .footer-link a {
    display: block;
    margin-bottom: 10px;
}

.footer .footer-link a::before {
    content: "\f105";
    font-family: "Font Awesome 6 Free";
    font-weight: 900;
    margin-right: 10px;
}

/* CONTACT ICONS */
.footer-contact p i {
    width: 25px;
    font-size: 16px;
}

.fa-phone-alt {
    transform: rotate(90deg);
}

/* SOCIAL ICONS */
.footer-social {
    margin-top: 20px;
}

.footer-social a i {
    margin-right: 15px;
    font-size: 18px;
    color: #f0f2f3;
    transition: 0.3s;
}

.footer-social a:hover i {
    color: #fbcc27;
}

/* COPYRIGHT */
.footer .copyright {
    padding: 0 30px;
}
.footer .copyright .row {
    padding: 25px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.footer .copyright p {
    margin: 0;
    color: #999999;
}
.footer .copyright p a {
    color: #ffffff;
}
.footer .copyright p a:hover {
    color: #fbcc27;
}
/* ================= SOCIAL MEDIA BRAND HOVER COLORS ================= */
 
.footer-social a[href*="x.com"]:hover i {
    color: #000000;
}
 
.footer-social a[href*="facebook.com"]:hover i {
    color: #1877f2;
}
 
.footer-social a[href*="linkedin.com"]:hover i {
    color: #0a66c2;
}
 
.footer-social a[href*="instagram.com"]:hover i {
    color: #e1306c;
}
 
.footer-social a[href*="youtube.com"]:hover i {
    color: #ff0000;
}

/* ================= MOBILE VISIBILITY ================= */
@media (max-width: 767px) {
    .footer {
        display: none;
    }
}

/* ================= MOBILE FOOTER ================= */
.mobile-footer {
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #092a49;
    border-top: 1px solid #fbcc27;
    justify-content: space-around;
    padding: 10px 0;
    z-index: 999;
}

.mobile-footer a {
    text-align: center;
    flex: 1;
    color: #ffffff;
    font-size: 14px;
    text-decoration: none;
    font-weight: 400;
}

.mobile-footer i {
    display: block;
    font-size: 20px;
    margin-bottom: 3px;
}

@media (max-width: 767px) {
    .mobile-footer {
        display: flex;
    }
}
</style>

<!-- ================= DESKTOP FOOTER HTML ================= -->

<div class="footer">
<div class="container">
<a href="/">
<img alt="YGR Gobal IT Services" class="logo" src="/images/logo1.jpeg"/>
</a>
<div class="footer-row">
<!-- CONTACT -->
<div class="footer-contact">
<h2>Our Head Office</h2>
<p><i class="fa fa-map-marker-alt"></i>
                    Manjeera Trinity Corporate,
                    Next to Lulu Mall, Kukatpally Housing Board Colony,
                    Hyderabad, Telangana 500072
                </p>
<p><i class="fa fa-phone"></i>
<a href="tel:+917794053340">+91 77940 53340</a>
</p>
<p><i class="fa fa-envelope"></i>
<a href="mailto:info@ygrgobalitservices.com">info@ygrgobalitservices.com</a>
</p>
<div class="footer-social">
<a href="https://x.com/ygrgobalit2024"><i class="fab fa-x-twitter"></i></a>
<a href="https://www.facebook.com/profile.php?id=61568888033386"><i class="fab fa-facebook-f"></i></a>
<a href="https://www.linkedin.com/company/ygr-gobal-it-services-pvt-ltd/"><i class="fab fa-linkedin-in"></i></a>
<a href="https://www.instagram.com/ygrgobalitservices/"><i class="fab fa-instagram"></i></a>
<a href="https://www.youtube.com/@rrtalktrends"><i class="fab fa-youtube"></i></a>
</div>
</div>
<!-- QUICK LINKS -->
<div class="footer-link">
<h2>Quick Links</h2>
<a href="/terms">Terms of Use</a>
<a href="/privacy">Privacy Policy</a>
<a href="/cookies">Cookies</a>
<a href="/help">Help</a>
<a href="/faqs">FAQs</a>
<a href="/refund">Refund Policy</a>
<a href="/shipping">Shipping</a>
</div>
<!-- NAVIGATION -->
<div class="footer-link">
<h2>Navigation</h2>
<a href="/">Home</a>
<a href="/about">About Us</a>
<a href="/portfolio">Portfolio</a>
<a href="/careers">Careers</a>
<a href="/blog">Blog</a>
<a href="/contact">Contact Us</a>
</div>
<!-- ABOUT -->
<div class="footer-newsletter">
<h2>YGR IT SERVICES</h2>
<p>
                    YGR Gobal IT Services Pvt. Ltd. provides complete IT solutions including software,
                    web &amp; mobile app development, digital marketing, professional IT training,
                    internships, and full stack courses.
                    <br/>
<a href="/about" style="color:#fbcc27;">Read more</a>
</p>
</div>
</div>
<!-- COPYRIGHT -->
<div class="container copyright" style="margin-top: 40px;">
<div class="row">
<div class="col-md-6">
<p>
                        &copy; <a href="https://ygrgobalitservices.com">YGR Gobal IT Services</a>. All Rights Reserved.
                    </p>
</div>
<div class="col-md-6 text-right">
<p>
                        Designed by <a href="https://ygrgobalitservices.com">YGR Gobal IT Services Pvt. Ltd, 2023.</a>
</p>
</div>
</div>
</div>
</div>
</div>
 ================= MOBILE FOOTER ================= 
<div class="mobile-footer">
<a href="/">
<i class="fa fa-home"></i>
</a>
<a href="/blog">
<i class="fa fa-blog"></i>
</a>
<a href="#">
<i class="fa fa-search"></i>
</a>
<a href="/careers">
<i class="fa fa-file-alt"></i>
</a>
<a href="#">
<i class="fa fa-shopping-cart"></i>
</a>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script>
        const steps = document.querySelectorAll(".form-step");
        const nextBtns = document.querySelectorAll(".btn-next");
        const prevBtns = document.querySelectorAll(".btn-prev");
        const stepItems = document.querySelectorAll(".step-item");
        
        let current = 0;

        nextBtns.forEach(btn => {
            btn.onclick = () => {
                const inputs = steps[current].querySelectorAll("input,select,textarea");
                for(let i of inputs){
                    if(!i.checkValidity()){
                        i.reportValidity();
                        return;
                    }
                }
                current++;
                update();
                window.scrollTo({ top: 100, behavior: 'smooth' });
            };
        });

        prevBtns.forEach(btn => {
            btn.onclick = () => {
                current--;
                update();
                window.scrollTo({ top: 100, behavior: 'smooth' });
            };
        });

        function update(){
            steps.forEach((s,i) => s.classList.toggle("active", i === current));
            stepItems.forEach((item, i) => {
                item.classList.toggle("active", i === current);
                item.classList.toggle("completed", i < current);
            });
        }

        document.getElementById("candidate_type").addEventListener("change", function(){
            const exp = document.getElementById("experience_fields");
            exp.style.display = this.value === "Experienced" ? "block" : "none";
        });

        // Reveal Logic
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('active');
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    </script>
`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalExampagesJobApplication;
