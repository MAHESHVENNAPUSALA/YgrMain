import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalServices = () => {
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

        return () => document.removeEventListener('click', handleLinkClick);
    }, [navigate]);

    const rawHTML = `<link href="/css/style.css" rel="stylesheet"/>
<link href="/images/logo.png" rel="icon" type="image/png"/>
<style>
        /* ================= SERVICES PAGE REFINEMENTS ================= */

        .service-main-container {
            background: var(--bg-light);
            padding-bottom: 100px;
        }

        /* Floating Navigation for Services */
        .service-nav-bar {
            background: var(--white);
            padding: 15px 0;
            box-shadow: var(--shadow-sm);
            position: sticky;
            top: 60px;
            z-index: 100;
            border-bottom: 1px solid #eee;
        }

        /* --- SINGLE UNIFIED MOBILE OVERRIDE (991px) --- */
        @media (max-width: 991px) {
            body {
                overflow-x: hidden !important;
            }

            .service-main-container {
                padding-bottom: 60px !important;
            }

            /* Sticky Nav Fix */
            .service-nav-bar {
                top: 70px !important;
                padding: 5px 0 !important;
                z-index: 999 !important;
            }

            .service-nav-bar .container {
                gap: 10px !important;
                padding-left: 15px !important;
                padding-right: 15px !important;
            }

            .service-nav-link {
                font-size: 11px !important;
                padding: 8px 12px !important;
                border-radius: 6px !important;
            }

            /* Hero Glass Fix */
            .hero-glass-container {
                text-align: center !important;
                padding: 60px 20px 40px !important;
                margin: 15px 10px !important;
                min-height: auto !important;
                border-radius: 24px !important;
                display: block !important;
            }

            .hero-glass-content h1 {
                font-size: 1.8rem !important;
                line-height: 1.2 !important;
                margin-bottom: 15px !important;
                color: #fff !important;
            }

            .hero-glass-content p {
                font-size: 0.95rem !important;
                line-height: 1.6 !important;
                margin-bottom: 25px !important;
            }

            .gold-btn {
                width: 100% !important;
                max-width: 280px !important;
                padding: 15px 30px !important;
                font-size: 0.85rem !important;
                margin: 0 auto !important;
                display: block !important;
            }

            /* Section Headings */
            .section-head {
                margin-bottom: 40px !important;
                padding: 0 15px !important;
            }

            .section-head h2 {
                font-size: 1.6rem !important;
                font-size: 40px;
            }

            /* Grid & Cards */
            .model-grid {
                display: block !important;
                width: 100% !important;
            }

            .model-card {
                margin-bottom: 20px !important;
                padding: 30px 20px !important;
            }

            .advantage-grid {
                display: block !important;
            }

            .execution-model-section {
                padding: 60px 0 20px !important;
            }

            .pricing-section {
                padding: 40px 0 !important;
            }

            .advantage-card {
                margin-bottom: 20px !important;
                padding: 30px 20px !important;
            }

            /* Pricing Card Mobile Adjustments */
            .pricing-card-modern {
                padding: 35px 20px !important;
                border-radius: 20px !important;
            }

            .pricing-card-modern .price-header h4 {
                font-size: 1.4rem !important;
                margin-bottom: 5px !important;
            }

            .pricing-card-modern .price-amount {
                font-size: 2rem !important;
            }

            .pricing-card-modern .price-amount span {
                font-size: 0.9rem !important;
            }

            .feature-list li {
                font-size: 0.85rem !important;
                padding: 8px 0 !important;
                gap: 10px !important;
            }

            .pricing-card-modern .gold-btn {
                padding: 14px 15px !important;
                font-size: 0.8rem !important;
                white-space: nowrap !important;
                letter-spacing: 1px !important;
            }
        }

        .service-nav-bar .container {
            display: flex;
            justify-content: center;
            gap: 15px;
            flex-wrap: nowrap;
            overflow-x: auto;
            padding-bottom: 5px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
        }

        .service-nav-bar .container::-webkit-scrollbar {
            display: none;
        }

        .service-nav-link {
            font-family: 'Oswald', sans-serif;
            text-transform: uppercase;
            font-size: 13px;
            letter-spacing: 1px;
            color: var(--text-muted);
            padding: 8px 15px;
            border-radius: 8px;
            transition: var(--transition-fast);
            white-space: nowrap;
        }

        .service-nav-link:hover,
        .service-nav-link.active {
            background: var(--primary-navy);
            color: var(--white);
            text-decoration: none;
        }

        /* Custom Hover Mobile Dropdown Nav */
        .mobile-nav-dropdown {
            display: none !important;
            width: 100%;
            padding: 10px 20px;
            overflow: visible !important;
            overflow-x: visible !important;
            overflow-y: visible !important;
            flex-wrap: wrap !important;
        }

        .custom-service-select {
            position: relative;
            width: 100%;
            z-index: 1000;
        }

        .custom-select-trigger {
            width: 100%;
            padding: 12px 20px;
            border-radius: 8px;
            border: 1px solid #edf2f7;
            background: var(--white);
            color: var(--primary-navy);
            font-family: 'Oswald', sans-serif;
            font-size: 14px;
            letter-spacing: 1px;
            text-transform: uppercase;
            outline: none;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            text-align: left;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .custom-select-trigger i {
            font-size: 12px;
            color: var(--primary-navy);
            transition: transform 0.3s ease;
        }

        .custom-select-options {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--white);
            border: 1px solid #edf2f7;
            border-radius: 8px;
            margin-top: 5px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.08);
            opacity: 0;
            visibility: hidden;
            transform: translateY(10px);
            transition: all 0.3s ease;
            overflow: hidden;
        }

        .custom-select-options a {
            display: block;
            padding: 12px 20px;
            color: var(--primary-navy) !important;
            font-family: 'Oswald', sans-serif;
            font-size: 13px;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            text-decoration: none !important;
            transition: all 0.2s ease;
            border-bottom: 1px solid #f8fafc;
        }

        .custom-select-options a:last-child {
            border-bottom: none;
        }

        .custom-select-options a:hover,
        .custom-select-options a.active {
            background-color: #0796fe0d;
            color: #0796fe !important;
        }

        /* Open when class .open is added (click toggle) */
        .custom-service-select.open .custom-select-options {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        .custom-service-select.open .custom-select-trigger i {
            transform: rotate(180deg);
        }

        /* Open on hover only on desktop (prevents sticky hover states on mobile touch) */
        @media (min-width: 769px) {
            .custom-service-select:hover .custom-select-options {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }

            .custom-service-select:hover .custom-select-trigger i {
                transform: rotate(180deg);
            }
        }

        @media (max-width: 768px) {
            .desktop-nav-links {
                display: none !important;
            }
            .mobile-nav-dropdown {
                display: block !important;
                overflow: visible !important;
                overflow-x: visible !important;
                overflow-y: visible !important;
            }
        }

        /* Enhanced Pricing Section */
        .pricing-section {
            padding: 70px 0;
            background: #fff;
            position: relative;
        }

        /* Pricing Mobile Scroll Snap */
        @media (max-width: 991px) {
            .pricing-scroll-track {
                display: flex !important;
                flex-wrap: nowrap !important;
                overflow-x: auto !important;
                scroll-snap-type: x mandatory;
                gap: 20px;
                padding: 20px 10px 40px !important;
                -webkit-overflow-scrolling: touch;
                scrollbar-width: none;
            }

            .pricing-scroll-track::-webkit-scrollbar {
                display: none;
            }

            .pricing-scroll-track>[class*="col-"] {
                flex: 0 0 92% !important;
                max-width: 92% !important;
                scroll-snap-align: center;
            }
        }

        .pricing-card-modern {
            background: var(--white);
            border-radius: 30px;
            padding: 60px 40px;
            text-align: center;
            border: 1px solid #f0f0f0;
            transition: var(--transition-slow);
            position: relative;
            height: 100%;
            display: flex;
            flex-direction: column;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.02);
        }

        .pricing-card-modern:hover {
            transform: translateY(-20px);
            box-shadow: var(--shadow-lg);
            border-color: var(--accent-gold);
        }

        .pricing-card-modern .badge-popular {
            position: absolute;
            top: 0;
            right: 0;
            background: linear-gradient(135deg, var(--accent-gold), var(--rich-gold));
            color: var(--primary-navy);
            padding: 8px 24px;
            border-radius: 0 30px 0 30px;
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 1px;
        }

        .pricing-card-modern .price-header {
            margin-bottom: 40px;
        }

        .pricing-card-modern .price-header h4 {
            font-size: 26px;
            color: var(--primary-navy);
            margin-bottom: 10px;
        }

        .pricing-card-modern .price-amount {
            font-size: 48px;
            font-family: 'Oswald', sans-serif;
            color: var(--primary-navy);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
        }

        .pricing-card-modern .price-amount span {
            font-size: 20px;
            color: var(--text-muted);
            font-weight: 400;
        }

        .feature-list {
            list-style: none;
            padding: 0;
            margin: 0 0 40px 0;
            text-align: left;
            flex: 1;
        }

        .feature-list li {
            padding: 12px 0;
            display: flex;
            align-items: center;
            gap: 15px;
            font-size: 16px;
            color: var(--text-muted);
            border-bottom: 1px solid #f9f9f9;
        }

        .feature-list li i {
            color: var(--accent-gold);
            font-size: 18px;
        }

        /* Info Cards Refined */
        .advantage-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 40px;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            color: var(--text-muted);
        }

        .advantage-card {
            padding: 50px 40px;
            border-radius: 25px;
            background: #fff;
            border: 1px solid #eee;
            transition: var(--transition-slow);
        }

        .advantage-card:hover {
            background: var(--primary-navy);
            color: var(--white);
            border-color: var(--primary-navy);
        }

        .advantage-card:hover h4 {
            color: var(--white);
        }

        .advantage-card i {
            font-size: 40px;
            color: var(--accent-gold);
            margin-bottom: 30px;
            display: block;
        }

        .advantage-card h4 {
            font-size: 24px;
            margin-bottom: 15px;
        }

        .advantage-card p {
            font-size: 16px;
            opacity: 0.8;
        }

        /* Execution Model Section */
        .execution-model-section {
            padding: 80px 0;
            background: var(--white);
        }

        .model-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-top: 50px;
        }

        .model-card {
            background: #f8fafc;
            padding: 40px 30px;
            border-radius: 20px;
            text-align: center;
            border: 1px solid #edf2f7;
            transition: var(--transition-slow);
            position: relative;
            overflow: hidden;
        }

        .model-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(to right, var(--accent-gold), var(--rich-gold));
            transform: scaleX(0);
            transition: var(--transition-fast);
            transform-origin: left;
        }

        .model-card:hover {
            transform: translateY(-10px);
            background: var(--white);
            box-shadow: var(--shadow-lg);
            border-color: var(--accent-gold);
        }

        .model-card:hover::before {
            transform: scaleX(1);
        }

        .model-icon-wrapper {
            width: 70px;
            height: 70px;
            background: var(--white);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 25px;
            font-size: 28px;
            color: var(--primary-navy);
            box-shadow: var(--shadow-sm);
            transition: var(--transition-fast);
        }

        .model-card:hover .model-icon-wrapper {
            background: var(--primary-navy);
            color: var(--accent-gold);
        }

        .model-card h4 {
            font-size: 20px;
            font-weight: 700;
            color: var(--primary-navy);
            margin-bottom: 15px;
        }

        .model-card p {
            font-size: 15px;
            color: var(--text-muted);
            line-height: 1.6;
        }

        .step-number {
            position: absolute;
            top: 20px;
            right: 25px;
            font-size: 40px;
            font-weight: 900;
            color: var(--primary-navy);
            opacity: 0.03;
            font-family: 'Oswald', sans-serif;
        }

        .student-card-modern {
            text-align: center;
            padding: 20px;
            border-radius: 20px;
            background: #fff;
            box-shadow: var(--shadow-sm);
            transition: var(--transition-fast);
        }

        .student-card-modern:hover {
            transform: scale(1.05);
            box-shadow: var(--shadow-md);
        }

        .student-card-modern img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            margin-bottom: 15px;
            border: 3px solid var(--accent-gold);
        }

        .student-card-modern h5 {
            font-size: 16px;
            margin-bottom: 5px;
        }

        .student-card-modern p {
            font-size: 12px;
            color: var(--text-muted);
        }

        /* Ensure all p tags have the specified color */
        /*p {*/
        /*    color: #121212 !important;*/
        /*}*/

        .hero-glass-content p {
            color: #ffffff !important;
        }

        .advantage-card:hover p {
            color: #ffffff !important;
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
<nav class="service-nav-bar">
<div class="container desktop-nav-links">
<a class="service-nav-link active" href="?type=web">Web Design</a>
<a class="service-nav-link active" href="?type=webapp">Web Apps</a>
<a class="service-nav-link active" href="?type=mobile">Mobile Apps</a>
<a class="service-nav-link active" href="?type=dm">Marketing</a>
<a class="service-nav-link active" href="?type=uiux">UI / UX</a>
<a class="service-nav-link active" href="?type=testing">Testing</a>
<a class="service-nav-link active" href="?type=support">Support</a>
<a class="service-nav-link active" href="?type=intern">Internships</a>
</div>
<div class="container mobile-nav-dropdown">
<div class="custom-service-select">
<button class="custom-select-trigger" type="button">
<span>
                        Web Design
                        Web Apps
                        Mobile Apps
                        Marketing
                        UI / UX
                        Testing
                        Support
                        Internships
                        Services
                        
                    </span>
<i class="fas fa-chevron-down"></i>
</button>
<div class="custom-select-options">
<a class="active" href="?type=web">Web Design</a>
<a class="active" href="?type=webapp">Web Apps</a>
<a class="active" href="?type=mobile">Mobile Apps</a>
<a class="active" href="?type=dm">Marketing</a>
<a class="active" href="?type=uiux">UI / UX</a>
<a class="active" href="?type=testing">Testing</a>
<a class="active" href="?type=support">Support</a>
<a class="active" href="?type=intern">Internships</a>
</div>
</div>
</div>
</nav>
<div class="service-main-container mesh-gradient animated-bg">
<!-- Immersive Hero -->
<section class="hero-glass-container reveal">
<div class="hero-glass-content">
<span class="reveal">Development Excellence</span>
<h1>Modern Website Architecture</h1>
<p>We blend aesthetic excellence with technical precision to build websites that are fast, secure, and
                    conversion-optimized.</p>
<div class="hero-actions">
<a class="gold-btn" href="/contact">Start Your Project</a>
</div>
</div>
<div class="hero-abstract-art d-none d-lg-block">
<img src="/images/web.png" style="max-width: 500px; border-radius: 30px; transform: perspective(1000px) rotateY(-15deg); box-shadow: var(--shadow-lg);"/>
</div>
</section>
<!-- Strategic Delivery Model -->
<section class="execution-model-section">
<div class="container">
<div class="section-head reveal">
<span>The Blueprint</span>
<h2>Strategic Delivery Model</h2>
<p>A structured approach to engineering digital excellence for your brand.</p>
</div>
<div class="model-grid">
<div class="model-card reveal">
<div class="step-number">01</div>
<div class="model-icon-wrapper">
<i class="fas fa-search-dollar"></i>
</div>
<h4>Discovery</h4>
<p>In-depth analysis of your market, competitors, and core business objectives to define a
                            winning strategy.</p>
</div>
<div class="model-card reveal">
<div class="step-number">02</div>
<div class="model-icon-wrapper">
<i class="fas fa-drafting-compass"></i>
</div>
<h4>Architecture</h4>
<p>Defining the technical stack and UI/UX wireframes to ensure scalability and user-centric
                            navigation.</p>
</div>
<div class="model-card reveal">
<div class="step-number">03</div>
<div class="model-icon-wrapper">
<i class="fas fa-layer-group"></i>
</div>
<h4>Development</h4>
<p>Agile engineering with clean code practices, transforming designs into a high-performance
                            digital asset.</p>
</div>
<div class="model-card reveal">
<div class="step-number">04</div>
<div class="model-icon-wrapper">
<i class="fas fa-rocket"></i>
</div>
<h4>Optimization</h4>
<p>Rigorous testing, SEO fine-tuning, and deployment followed by continuous performance
                            monitoring.</p>
</div>
</div>
</div>
</section>
<!-- Pricing Section -->
<section class="pricing-section">
<div class="container">
<div class="section-head reveal">
<span>Flexible Plans</span>
<h2>Choose Your Digital Scale</h2>
</div>
<div class="row g-4 pricing-scroll-track">
<!-- Startup -->
<div class="col-lg-4 reveal">
<div class="pricing-card-modern">
<div class="price-header">
<h4>Startup</h4>
<div class="price-amount">â‚¹16,999</div>
</div>
<ul class="feature-list">
<li><i class="fas fa-check-circle"></i> 5 Custom Pages</li>
<li><i class="fas fa-check-circle"></i> Basic Logo Design</li>
<li><i class="fas fa-check-circle"></i> Free Hosting (1st Year)</li>
<li><i class="fas fa-check-circle"></i> SSL Certificate</li>
<li><i class="fas fa-check-circle"></i> Social Integration</li>
</ul>
<a class="gold-btn w-100 d-inline-block text-center" href="">
    Get Started
</a>
</div>
</div>
<!-- Business -->
<div class="col-lg-4 reveal">
<div class="pricing-card-modern">
<div class="badge-popular">MOST POPULAR</div>
<div class="price-header">
<h4>Business</h4>
<div class="price-amount">â‚¹27,999</div>
</div>
<ul class="feature-list">
<li><i class="fas fa-check-circle"></i> 10 Professional Pages</li>
<li><i class="fas fa-check-circle"></i> Premium Logo Design</li>
<li><i class="fas fa-check-circle"></i> 2 Business Emails</li>
<li><i class="fas fa-check-circle"></i> Advanced SEO</li>
<li><i class="fas fa-check-circle"></i> Priority Support</li>
</ul>
<a class="gold-btn w-100 d-inline-block text-center" href="">
    Get Started
</a>
</div>
</div>
<!-- E-Commerce -->
<div class="col-lg-4 reveal">
<div class="pricing-card-modern">
<div class="price-header">
<h4>E-Commerce</h4>
<div class="price-amount">â‚¹39,999</div>
</div>
<ul class="feature-list">
<li><i class="fas fa-check-circle"></i> 30+ Products</li>
<li><i class="fas fa-check-circle"></i> Inventory Management</li>
<li><i class="fas fa-check-circle"></i> Payment Gateway</li>
<li><i class="fas fa-check-circle"></i> Order Tracking</li>
<li><i class="fas fa-check-circle"></i> Secure Checkout</li>
</ul>
<a class="gold-btn w-100 d-inline-block text-center" href="">
    Get Started
</a>
</div>
</div>
</div>
</div>
</section>
<!-- Why Us -->
<section class="advantage-section py-5">
<div class="section-head reveal">
<span>The YGR Advantage</span>
<h2>Why Businesses Trust Us</h2>
</div>
<div class="advantage-grid">
<div class="advantage-card reveal">
<i class="fas fa-code"></i>
<h4>Clean Architecture</h4>
<p>We write scalable, maintainable code using the latest industry standards.</p>
</div>
<div class="advantage-card reveal">
<i class="fas fa-shield-alt"></i>
<h4>Ironclad Security</h4>
<p>Advanced encryption and security protocols protect your data 24/7.</p>
</div>
<div class="advantage-card reveal">
<i class="fas fa-bolt"></i>
<h4>Lightning Speed</h4>
<p>Optimized assets and server-side performance for instant load times.</p>
</div>
</div>
</section>
</div>
 web app 
<div class="service-main-container mesh-gradient animated-bg">
<!-- Hero -->
<section class="hero-glass-container reveal">
<div class="hero-glass-content">
<span class="reveal">Enterprise Solutions</span>
<h1>Scalable Web Applications</h1>
<p>We build robust, multi-tenant web applications with seamless integrations and cloud-native
                    architectures.</p>
<div class="hero-actions">
<a class="gold-btn" href="/contact">Consult Our Experts</a>
</div>
</div>
<div class="hero-abstract-art d-none d-lg-block">
<img src="/images/wds.jpg" style="max-width: 500px; border-radius: 30px; transform: perspective(1000px) rotateY(-15deg); box-shadow: var(--shadow-lg);"/>
</div>
</section>
<!-- Application Execution Model -->
<section class="execution-model-section">
<div class="container">
<div class="section-head reveal">
<span>Engineering Core</span>
<h2>Scalability Framework</h2>
<p>How we build robust applications that grow with your enterprise.</p>
</div>
<div class="model-grid">
<div class="model-card reveal">
<div class="step-number">01</div>
<div class="model-icon-wrapper">
<i class="fas fa-microchip"></i>
</div>
<h4>System Design</h4>
<p>Architecting database schemas and server logic for maximum efficiency and data integrity.</p>
</div>
<div class="model-card reveal">
<div class="step-number">02</div>
<div class="model-icon-wrapper">
<i class="fas fa-network-wired"></i>
</div>
<h4>API Integration</h4>
<p>Building secure, RESTful endpoints and integrating third-party services seamlessly.</p>
</div>
<div class="model-card reveal">
<div class="step-number">03</div>
<div class="model-icon-wrapper">
<i class="fas fa-shield-virus"></i>
</div>
<h4>Security Layer</h4>
<p>Implementing JWT, OAuth, and multi-factor authentication to protect enterprise data.</p>
</div>
<div class="model-card reveal">
<div class="step-number">04</div>
<div class="model-icon-wrapper">
<i class="fas fa-cloud-upload-alt"></i>
</div>
<h4>CI/CD Pipeline</h4>
<p>Automated deployment workflows ensuring zero downtime and rapid feature releases.</p>
</div>
</div>
</div>
</section>
<!-- Pricing -->
<section class="pricing-section">
<div class="container">
<div class="section-head reveal">
<span>Tailored Engineering</span>
<h2>Scalable Pricing Models</h2>
</div>
<div class="row g-4 pricing-scroll-track">
<div class="col-lg-4 reveal">
<div class="pricing-card-modern">
<div class="price-header">
<h4>MVP</h4>
<div class="price-amount">â‚¹49,999</div>
</div>
<ul class="feature-list">
<li><i class="fas fa-check-circle"></i> Core Logic Dev</li>
<li><i class="fas fa-check-circle"></i> User Auth System</li>
<li><i class="fas fa-check-circle"></i> Basic Database</li>
<li><i class="fas fa-check-circle"></i> API Integration</li>
<li><i class="fas fa-check-circle"></i> Deployment Setup</li>
</ul>
<a class="gold-btn w-100 d-inline-block text-center" href="">
                                Start MVP
                            </a>
</div>
</div>
<div class="col-lg-4 reveal">
<div class="pricing-card-modern">
<div class="badge-popular">BEST FOR SCALING</div>
<div class="price-header">
<h4>Business</h4>
<div class="price-amount">â‚¹99,999</div>
</div>
<ul class="feature-list">
<li><i class="fas fa-check-circle"></i> Advanced Dashboard</li>
<li><i class="fas fa-check-circle"></i> Payment Gateways</li>
<li><i class="fas fa-check-circle"></i> Role Based Access</li>
<li><i class="fas fa-check-circle"></i> Data Analytics</li>
<li><i class="fas fa-check-circle"></i> 3 Months Maintenance</li>
</ul>
<a class="gold-btn w-100 d-inline-block text-center" href="">
                                Start Projectr
                            </a>
</div>
</div>
<div class="col-lg-4 reveal">
<div class="pricing-card-modern">
<div class="price-header">
<h4>Enterprise</h4>
<div class="price-amount">Custom</div>
</div>
<ul class="feature-list">
<li><i class="fas fa-check-circle"></i> Microservices Arch</li>
<li><i class="fas fa-check-circle"></i> Multi-region Cloud</li>
<li><i class="fas fa-check-circle"></i> AI/ML Integration</li>
<li><i class="fas fa-check-circle"></i> Dedicated DevOps</li>
<li><i class="fas fa-check-circle"></i> 24/7 SLA Support</li>
</ul>
<a class="gold-btn w-100 d-inline-block text-center" href="">
                            Contact Sales
                           </a>
</div>
</div>
</div>
</div>
</section>
<!-- Why Us -->
<section class="advantage-section py-5">
<div class="section-head reveal">
<span>The YGR Advantage</span>
<h2>Why Businesses Trust Us</h2>
</div>
<div class="advantage-grid">
<div class="advantage-card reveal">
<i class="fas fa-code"></i>
<h4>Clean Architecture</h4>
<p>We write scalable, maintainable code using the latest industry standards.</p>
</div>
<div class="advantage-card reveal">
<i class="fas fa-shield-alt"></i>
<h4>Ironclad Security</h4>
<p>Advanced encryption and security protocols protect your data 24/7.</p>
</div>
<div class="advantage-card reveal">
<i class="fas fa-bolt"></i>
<h4>Lightning Speed</h4>
<p>Optimized assets and server-side performance for instant load times.</p>
</div>
</div>
</section>
</div>
 mobile app development  
<div class="service-main-container mesh-gradient animated-bg">
<!-- Hero -->
<section class="hero-glass-container reveal">
<div class="hero-glass-content">
<span class="reveal">Mobility Innovation</span>
<h1>Next-Gen Mobile Experiences</h1>
<p>Native performance with cross-platform efficiency. We build apps that users love to keep on their
                    home screens.</p>
<div class="hero-actions">
<a class="gold-btn" href="/contact">Get a Quote</a>
</div>
</div>
<div class="hero-abstract-art d-none d-lg-block">
<img src="/images/mp.png" style="max-width: 500px; border-radius: 30px; transform: perspective(1000px) rotateY(-15deg); box-shadow: var(--shadow-lg);"/>
</div>
</section>
<!-- Mobile App Execution Model -->
<section class="execution-model-section">
<div class="container">
<div class="section-head reveal">
<span>Mobility Focus</span>
<h2>App Engineering Lifecycle</h2>
<p>Optimized for performance, battery life, and superior user engagement.</p>
</div>
<div class="model-grid">
<div class="model-card reveal">
<div class="step-number">01</div>
<div class="model-icon-wrapper">
<i class="fas fa-mobile-alt"></i>
</div>
<h4>Native Optimization</h4>
<p>Ensuring smooth 60FPS animations and responsive touch interactions across all devices.</p>
</div>
<div class="model-card reveal">
<div class="step-number">02</div>
<div class="model-icon-wrapper">
<i class="fas fa-sync-alt"></i>
</div>
<h4>Offline-First</h4>
<p>Implementing robust local caching to keep your app functional even without connectivity.</p>
</div>
<div class="model-card reveal">
<div class="step-number">03</div>
<div class="model-icon-wrapper">
<i class="fas fa-bell"></i>
</div>
<h4>Push Strategy</h4>
<p>Intelligent notification systems to drive user retention without being intrusive.</p>
</div>
<div class="model-card reveal">
<div class="step-number">04</div>
<div class="model-icon-wrapper">
<i class="fas fa-store"></i>
</div>
<h4>App Store Ready</h4>
<p>Full compliance with Apple and Google guidelines for a seamless approval process.</p>
</div>
</div>
</div>
</section>
<!-- Pricing -->
<section class="pricing-section">
<div class="container">
<div class="section-head reveal">
<span>App Store Success</span>
<h2>Mobile Development Packages</h2>
</div>
<div class="row g-4 pricing-scroll-track">
<div class="col-lg-4 reveal">
<div class="pricing-card-modern">
<div class="price-header">
<h4>Basic App</h4>
<div class="price-amount">â‚¹29,999</div>
</div>
<ul class="feature-list">
<li><i class="fas fa-check-circle"></i> Single Platform (Android)</li>
<li><i class="fas fa-check-circle"></i> 5 Screen Design</li>
<li><i class="fas fa-check-circle"></i> Firebase Auth</li>
<li><i class="fas fa-check-circle"></i> Basic Analytics</li>
<li><i class="fas fa-check-circle"></i> Play Store Upload</li>
</ul>
<a class="gold-btn w-100 d-inline-block text-center" href="">
                            Select Plan
                           </a>
</div>
</div>
<div class="col-lg-4 reveal">
<div class="pricing-card-modern">
<div class="badge-popular">RECOMMENDED</div>
<div class="price-header">
<h4>Cross-Platform</h4>
<div class="price-amount">â‚¹59,999</div>
</div>
<ul class="feature-list">
<li><i class="fas fa-check-circle"></i> Flutter / React Native</li>
<li><i class="fas fa-check-circle"></i> iOS + Android</li>
<li><i class="fas fa-check-circle"></i> Custom UI / UX</li>
<li><i class="fas fa-check-circle"></i> Push Notifications</li>
<li><i class="fas fa-check-circle"></i> API Integration</li>
</ul>
<a class="gold-btn w-100 d-inline-block text-center" href="">
                            Select Plan
                           </a>
</div>
</div>
<div class="col-lg-4 reveal">
<div class="pricing-card-modern">
<div class="price-header">
<h4>Premium App</h4>
<div class="price-amount">â‚¹99,999+</div>
</div>
<ul class="feature-list">
<li><i class="fas fa-check-circle"></i> Complex Logic / AI</li>
<li><i class="fas fa-check-circle"></i> Real-time Features</li>
<li><i class="fas fa-check-circle"></i> Payment Wallet</li>
<li><i class="fas fa-check-circle"></i> Offline Mode</li>
<li><i class="fas fa-check-circle"></i> 6 Months Support</li>
</ul>
<a class="gold-btn w-100 d-inline-block text-center" href="">
                            Select Plan
                           </a>
</div>
</div>
</div>
</div>
</section>
<!-- Why Us -->
<section class="advantage-section py-5">
<div class="section-head reveal">
<span>The YGR Advantage</span>
<h2>Why Businesses Trust Us</h2>
</div>
<div class="advantage-grid">
<div class="advantage-card reveal">
<i class="fas fa-code"></i>
<h4>Clean Architecture</h4>
<p>We write scalable, maintainable code using the latest industry standards.</p>
</div>
<div class="advantage-card reveal">
<i class="fas fa-shield-alt"></i>
<h4>Ironclad Security</h4>
<p>Advanced encryption and security protocols protect your data 24/7.</p>
</div>
<div class="advantage-card reveal">
<i class="fas fa-bolt"></i>
<h4>Lightning Speed</h4>
<p>Optimized assets and server-side performance for instant load times.</p>
</div>
</div>
</section>
</div>
 digital marketing  
<div class="service-main-container mesh-gradient animated-bg">
<!-- Hero -->
<section class="hero-glass-container reveal">
<div class="hero-glass-content">
<span class="reveal">Market Dominance</span>
<h1>Data-Driven Growth</h1>
<p>We combine analytics with creativity to drive meaningful engagement and ROI-focused marketing
                    campaigns.</p>
<div class="hero-actions">
<a class="gold-btn" href="/contact">Scale My Brand</a>
</div>
</div>
<div class="hero-abstract-art d-none d-lg-block">
<img src="/images/dmmm.jpg.jpeg" style="max-width: 500px; border-radius: 30px; transform: perspective(1000px) rotateY(-15deg); box-shadow: var(--shadow-lg);"/>
</div>
</section>
<!-- Marketing Model -->
<section class="execution-model-section">
<div class="container">
<div class="section-head reveal">
<span>Growth Engine</span>
<h2>ROI-First Strategy</h2>
<p>A data-driven approach to acquiring and retaining high-value customers.</p>
</div>
<div class="model-grid">
<div class="model-card reveal">
<div class="step-number">01</div>
<div class="model-icon-wrapper">
<i class="fas fa-bullseye"></i>
</div>
<h4>Precision Targeting</h4>
<p>Using demographic and behavioral data to reach the exact audience likely to convert.</p>
</div>
<div class="model-card reveal">
<div class="step-number">02</div>
<div class="model-icon-wrapper">
<i class="fas fa-funnel-dollar"></i>
</div>
<h4>Funnel Mastery</h4>
<p>Optimizing every touchpoint from awareness to final purchase for maximum conversion.</p>
</div>
<div class="model-card reveal">
<div class="step-number">03</div>
<div class="model-icon-wrapper">
<i class="fas fa-chart-line"></i>
</div>
<h4>Real-time Analytics</h4>
<p>Constant A/B testing and performance tracking to pivot strategies for better results.</p>
</div>
<div class="model-card reveal">
<div class="step-number">04</div>
<div class="model-icon-wrapper">
<i class="fas fa-users-cog"></i>
</div>
<h4>Retention Loop</h4>
<p>Implementing loyalty programs and remarketing to increase customer lifetime value.</p>
</div>
</div>
</div>
</section>
<!-- Pricing -->
<section class="pricing-section">
<div class="container">
<div class="section-head reveal">
<span>Strategic Performance</span>
<h2>Marketing Growth Plans</h2>
</div>
<div class="row g-4 pricing-scroll-track">
<div class="col-lg-4 reveal">
<div class="pricing-card-modern">
<div class="price-header">
<h4>Starter</h4>
<div class="price-amount">â‚¹9,999<span>/mo</span></div>
</div>
<ul class="feature-list">
<li><i class="fas fa-check-circle"></i> Basic SEO Optimization</li>
<li><i class="fas fa-check-circle"></i> Social Media (2 Plat.)</li>
<li><i class="fas fa-check-circle"></i> 8 Custom Posts</li>
<li><i class="fas fa-check-circle"></i> Google My Business</li>
<li><i class="fas fa-check-circle"></i> Monthly Report</li>
</ul>
<a class="gold-btn w-100 d-inline-block text-center" href="">
                            Select Plan
                           </a>
</div>
</div>
<div class="col-lg-4 reveal">
<div class="pricing-card-modern">
<div class="badge-popular">BEST ROI</div>
<div class="price-header">
<h4>Growth</h4>
<div class="price-amount">â‚¹19,999<span>/mo</span></div>
</div>
<ul class="feature-list">
<li><i class="fas fa-check-circle"></i> Advanced SEO (On/Off)</li>
<li><i class="fas fa-check-circle"></i> Social Media (3 Plat.)</li>
<li><i class="fas fa-check-circle"></i> 16 Custom Posts</li>
<li><i class="fas fa-check-circle"></i> Google Ads Setup</li>
<li><i class="fas fa-check-circle"></i> Bi-weekly Analytics</li>
</ul>
<a class="gold-btn w-100 d-inline-block text-center" href="">
                            Select Plan
                           </a>
</div>
</div>
<div class="col-lg-4 reveal">
<div class="pricing-card-modern">
<div class="price-header">
<h4>Scale</h4>
<div class="price-amount">â‚¹39,999<span>/mo</span></div>
</div>
<ul class="feature-list">
<li><i class="fas fa-check-circle"></i> Full Funnel Strategy</li>
<li><i class="fas fa-check-circle"></i> Ads (Google &amp; Meta)</li>
<li><i class="fas fa-check-circle"></i> Content Marketing</li>
<li><i class="fas fa-check-circle"></i> Lead Gen Focus</li>
<li><i class="fas fa-check-circle"></i> Weekly Deep Dive</li>
</ul>
<a class="gold-btn w-100 d-inline-block text-center" href="">
                            Select Plan
                           </a>
</div>
</div>
</div>
</div>
</section>
<!-- Why Us -->
<section class="advantage-section py-5">
<div class="section-head reveal">
<span>The YGR Advantage</span>
<h2>Why Businesses Trust Us</h2>
</div>
<div class="advantage-grid">
<div class="advantage-card reveal">
<i class="fas fa-code"></i>
<h4>Clean Architecture</h4>
<p>We write scalable, maintainable code using the latest industry standards.</p>
</div>
<div class="advantage-card reveal">
<i class="fas fa-shield-alt"></i>
<h4>Ironclad Security</h4>
<p>Advanced encryption and security protocols protect your data 24/7.</p>
</div>
<div class="advantage-card reveal">
<i class="fas fa-bolt"></i>
<h4>Lightning Speed</h4>
<p>Optimized assets and server-side performance for instant load times.</p>
</div>
</div>
</section>
</div>
 ui & ux design 
<div class="service-main-container mesh-gradient animated-bg">
<!-- Hero -->
<section class="hero-glass-container reveal">
<div class="hero-glass-content">
<span class="reveal">Visual Mastery</span>
<h1>Intuitive Product Design</h1>
<p>We create digital experiences that feel as good as they look. User-centric design that converts
                    curiosity into loyalty.</p>
<div class="hero-actions">
<a class="gold-btn" href="/contact">Discuss Design</a>
</div>
</div>
<div class="hero-abstract-art d-none d-lg-block">
<img src="/images/ui.png" style="max-width: 500px; border-radius: 30px; transform: perspective(1000px) rotateY(-15deg); box-shadow: var(--shadow-lg);"/>
</div>
</section>
<!-- UI/UX Process -->
<section class="execution-model-section">
<div class="container">
<div class="section-head reveal">
<span>Aesthetic Logic</span>
<h2>User-Centric Design Model</h2>
<p>Where behavioral psychology meets pixel-perfect digital craftsmanship.</p>
</div>
<div class="model-grid">
<div class="model-card reveal">
<div class="step-number">01</div>
<div class="model-icon-wrapper">
<i class="fas fa-user-friends"></i>
</div>
<h4>Persona Research</h4>
<p>Deep diving into user behaviors to understand their pain points and expectations.</p>
</div>
<div class="model-card reveal">
<div class="step-number">02</div>
<div class="model-icon-wrapper">
<i class="fas fa-stream"></i>
</div>
<h4>User Journeys</h4>
<p>Mapping every possible interaction to ensure the path to goal is frictionless.</p>
</div>
<div class="model-card reveal">
<div class="step-number">03</div>
<div class="model-icon-wrapper">
<i class="fas fa-palette"></i>
</div>
<h4>Visual Identity</h4>
<p>Crafting a unique design system that reflects your brand's soul across all screens.</p>
</div>
<div class="model-card reveal">
<div class="step-number">04</div>
<div class="model-icon-wrapper">
<i class="fas fa-vial"></i>
</div>
<h4>Usability Testing</h4>
<p>Validating designs with real users to refine interactions before development starts.</p>
</div>
</div>
</div>
</section>
<!-- Pricing -->
<section class="pricing-section">
<div class="container">
<div class="section-head reveal">
<span>Pixel Perfection</span>
<h2>Creative Design Packages</h2>
</div>
<div class="row g-4 pricing-scroll-track">
<div class="col-lg-4 reveal">
<div class="pricing-card-modern">
<div class="price-header">
<h4>Essential</h4>
<div class="price-amount">â‚¹14,999</div>
</div>
<ul class="feature-list">
<li><i class="fas fa-check-circle"></i> Up to 5 Key Screens</li>
<li><i class="fas fa-check-circle"></i> Basic Wireframing</li>
<li><i class="fas fa-check-circle"></i> Brand Style Guide</li>
<li><i class="fas fa-check-circle"></i> Clickable Prototype</li>
<li><i class="fas fa-check-circle"></i> Figma Source Files</li>
</ul>
<a class="gold-btn w-100 d-inline-block text-center" href="">
                            Order Design
                           </a>
</div>
</div>
<div class="col-lg-4 reveal">
<div class="pricing-card-modern">
<div class="badge-popular">BEST SELLER</div>
<div class="price-header">
<h4>Professional</h4>
<div class="price-amount">â‚¹29,999</div>
</div>
<ul class="feature-list">
<li><i class="fas fa-check-circle"></i> Up to 15 Screens</li>
<li><i class="fas fa-check-circle"></i> UX Research / Audits</li>
<li><i class="fas fa-check-circle"></i> Micro-animations</li>
<li><i class="fas fa-check-circle"></i> Design System</li>
<li><i class="fas fa-check-circle"></i> Dev Handoff Support</li>
</ul>
<a class="gold-btn w-100 d-inline-block text-center" href="">
                            Order Design
                           </a>
</div>
</div>
<div class="col-lg-4 reveal">
<div class="pricing-card-modern">
<div class="price-header">
<h4>Premium Suite</h4>
<div class="price-amount">â‚¹49,999+</div>
</div>
<ul class="feature-list">
<li><i class="fas fa-check-circle"></i> Unlimited Screens</li>
<li><i class="fas fa-check-circle"></i> Product Discovery</li>
<li><i class="fas fa-check-circle"></i> High-end Prototyping</li>
<li><i class="fas fa-check-circle"></i> User Testing Sessions</li>
<li><i class="fas fa-check-circle"></i> Icon &amp; Asset Library</li>
</ul>
<a class="gold-btn w-100 d-inline-block text-center" href="">
                            Order Design
                           </a>
</div>
</div>
</div>
</div>
</section>
<!-- Why Us -->
<section class="advantage-section py-5">
<div class="section-head reveal">
<span>The YGR Advantage</span>
<h2>Why Businesses Trust Us</h2>
</div>
<div class="advantage-grid">
<div class="advantage-card reveal">
<i class="fas fa-code"></i>
<h4>Clean Architecture</h4>
<p>We write scalable, maintainable code using the latest industry standards.</p>
</div>
<div class="advantage-card reveal">
<i class="fas fa-shield-alt"></i>
<h4>Ironclad Security</h4>
<p>Advanced encryption and security protocols protect your data 24/7.</p>
</div>
<div class="advantage-card reveal">
<i class="fas fa-bolt"></i>
<h4>Lightning Speed</h4>
<p>Optimized assets and server-side performance for instant load times.</p>
</div>
</div>
</section>
</div>
 software testing  
<div class="service-main-container mesh-gradient animated-bg">
<!-- Hero -->
<section class="hero-glass-container reveal">
<div class="hero-glass-content">
<span class="reveal">Quality Assurance</span>
<h1>Flawless Software Delivery</h1>
<p>We eliminate technical debt and security risks through rigorous manual and automated testing
                    protocols.</p>
<div class="hero-actions">
<a class="gold-btn" href="/contact">Secure My App</a>
</div>
</div>
<div class="hero-abstract-art d-none d-lg-block">
<img src="/images/st.webp" style="max-width: 500px; border-radius: 30px; transform: perspective(1000px) rotateY(-15deg); box-shadow: var(--shadow-lg);"/>
</div>
</section>
<!-- QA Model -->
<section class="execution-model-section">
<div class="container">
<div class="section-head reveal">
<span>Zero Bug Policy</span>
<h2>Quality Assurance Protocol</h2>
<p>Rigorous testing frameworks to ensure your software is bulletproof before launch.</p>
</div>
<div class="model-grid">
<div class="model-card reveal">
<div class="step-number">01</div>
<div class="model-icon-wrapper">
<i class="fas fa-vials"></i>
</div>
<h4>Manual Audit</h4>
<p>Human-led testing to verify UI consistency, usability, and edge-case behavior.</p>
</div>
<div class="model-card reveal">
<div class="step-number">02</div>
<div class="model-icon-wrapper">
<i class="fas fa-robot"></i>
</div>
<h4>Automation</h4>
<p>Scripted regression tests that run on every build to prevent technical debt.</p>
</div>
<div class="model-card reveal">
<div class="step-number">03</div>
<div class="model-icon-wrapper">
<i class="fas fa-tachometer-alt"></i>
</div>
<h4>Load Testing</h4>
<p>Simulating high-traffic scenarios to ensure your infrastructure scales under pressure.</p>
</div>
<div class="model-card reveal">
<div class="step-number">04</div>
<div class="model-icon-wrapper">
<i class="fas fa-user-check"></i>
</div>
<h4>UAT Phase</h4>
<p>User Acceptance Testing to ensure the final product meets all business requirements.</p>
</div>
</div>
</div>
</section>
<!-- Pricing -->
<section class="pricing-section">
<div class="container">
<div class="section-head reveal">
<span>Zero Bug Policy</span>
<h2>QA &amp; Testing Packages</h2>
</div>
<div class="row g-4 pricing-scroll-track">
<div class="col-lg-4 reveal">
<div class="pricing-card-modern">
<div class="price-header">
<h4>Basic QA</h4>
<div class="price-amount">â‚¹14,999</div>
</div>
<ul class="feature-list">
<li><i class="fas fa-check-circle"></i> Manual Testing</li>
<li><i class="fas fa-check-circle"></i> Bug Tracking</li>
<li><i class="fas fa-check-circle"></i> UI / UX Validation</li>
<li><i class="fas fa-check-circle"></i> Cross-browser Test</li>
<li><i class="fas fa-check-circle"></i> Final QA Report</li>
</ul>
<a class="gold-btn w-100 d-inline-block text-center" href="">
                            Start Testing
                           </a>
</div>
</div>
<div class="col-lg-4 reveal">
<div class="pricing-card-modern">
<div class="badge-popular">HIGH DEMAND</div>
<div class="price-header">
<h4>Standard</h4>
<div class="price-amount">â‚¹29,999</div>
</div>
<ul class="feature-list">
<li><i class="fas fa-check-circle"></i> Manual + Automation</li>
<li><i class="fas fa-check-circle"></i> API Testing</li>
<li><i class="fas fa-check-circle"></i> Performance Testing</li>
<li><i class="fas fa-check-circle"></i> Regression Cycles</li>
<li><i class="fas fa-check-circle"></i> Weekly Status</li>
</ul>
<a class="gold-btn w-100 d-inline-block text-center" href="">
                            Start Testing
                           </a>
</div>
</div>
<div class="col-lg-4 reveal">
<div class="pricing-card-modern">
<div class="price-header">
<h4>Full Suite</h4>
<div class="price-amount">â‚¹49,999+</div>
</div>
<ul class="feature-list">
<li><i class="fas fa-check-circle"></i> Security Pen-Testing</li>
<li><i class="fas fa-check-circle"></i> Load &amp; Stress Test</li>
<li><i class="fas fa-check-circle"></i> Continuous CI/CD QA</li>
<li><i class="fas fa-check-circle"></i> Database Validation</li>
<li><i class="fas fa-check-circle"></i> Dedicated Lead</li>
</ul>
<a class="gold-btn w-100 d-inline-block text-center" href="">
                            Start Testing
                           </a>
</div>
</div>
</div>
</div>
</section>
<!-- Why Us -->
<section class="advantage-section py-5">
<div class="section-head reveal">
<span>The YGR Advantage</span>
<h2>Why Businesses Trust Us</h2>
</div>
<div class="advantage-grid">
<div class="advantage-card reveal">
<i class="fas fa-code"></i>
<h4>Clean Architecture</h4>
<p>We write scalable, maintainable code using the latest industry standards.</p>
</div>
<div class="advantage-card reveal">
<i class="fas fa-shield-alt"></i>
<h4>Ironclad Security</h4>
<p>Advanced encryption and security protocols protect your data 24/7.</p>
</div>
<div class="advantage-card reveal">
<i class="fas fa-bolt"></i>
<h4>Lightning Speed</h4>
<p>Optimized assets and server-side performance for instant load times.</p>
</div>
</div>
</section>
</div>
 IT SUPPORT & MAINTENANCE 
<div class="service-main-container mesh-gradient animated-bg">
<!-- Hero -->
<section class="hero-glass-container reveal">
<div class="hero-glass-content">
<span class="reveal">Technical Stability</span>
<h1>24/7 Managed Infrastructure</h1>
<p>We provide proactive monitoring and maintenance to ensure your digital ecosystem is always
                    operational, secure, and fast.</p>
<div class="hero-actions">
<a class="gold-btn" href="/contact">Secure Support</a>
</div>
</div>
<div class="hero-abstract-art d-none d-lg-block">
<img src="/images/im.webp" style="max-width: 500px; border-radius: 30px; transform: perspective(1000px) rotateY(-15deg); box-shadow: var(--shadow-lg);"/>
</div>
</section>
<!-- Support Model -->
<section class="execution-model-section">
<div class="container">
<div class="section-head reveal">
<span>Uptime Priority</span>
<h2>Proactive Support Model</h2>
<p>Managed infrastructure designed for zero downtime and maximum security.</p>
</div>
<div class="model-grid">
<div class="model-card reveal">
<div class="step-number">01</div>
<div class="model-icon-wrapper">
<i class="fas fa-heartbeat"></i>
</div>
<h4>Real-time Mon.</h4>
<p>Continuous health checks on servers and databases to identify issues before they occur.</p>
</div>
<div class="model-card reveal">
<div class="step-number">02</div>
<div class="model-icon-wrapper">
<i class="fas fa-user-shield"></i>
</div>
<h4>Hardening</h4>
<p>Regular security patches and firewall optimizations to protect against evolving threats.</p>
</div>
<div class="model-card reveal">
<div class="step-number">03</div>
<div class="model-icon-wrapper">
<i class="fas fa-database"></i>
</div>
<h4>Data Safety</h4>
<p>Automated multi-region backups and disaster recovery drills to ensure data persistence.</p>
</div>
<div class="model-card reveal">
<div class="step-number">04</div>
<div class="model-icon-wrapper">
<i class="fas fa-headset"></i>
</div>
<h4>SLA Guarantee</h4>
<p>Dedicated response times and technical support to keep your business running smoothly.</p>
</div>
</div>
</div>
</section>
<!-- Pricing -->
<section class="pricing-section">
<div class="container">
<div class="section-head reveal">
<span>Reliable Care</span>
<h2>Maintenance &amp; Support</h2>
</div>
<div class="row g-4 pricing-scroll-track">
<div class="col-lg-4 reveal">
<div class="pricing-card-modern">
<div class="price-header">
<h4>Essential</h4>
<div class="price-amount">â‚¹7,999<span>/mo</span></div>
</div>
<ul class="feature-list">
<li><i class="fas fa-check-circle"></i> Weekly Backups</li>
<li><i class="fas fa-check-circle"></i> Security Updates</li>
<li><i class="fas fa-check-circle"></i> Bug Fixes (Standard)</li>
<li><i class="fas fa-check-circle"></i> Email Support</li>
<li><i class="fas fa-check-circle"></i> Performance Check</li>
</ul>
<a class="gold-btn w-100 d-inline-block text-center" href="">
                            Select Plan
                           </a>
</div>
</div>
<div class="col-lg-4 reveal">
<div class="pricing-card-modern">
<div class="badge-popular">PROACTIVE</div>
<div class="price-header">
<h4>Business</h4>
<div class="price-amount">â‚¹14,999<span>/mo</span></div>
</div>
<ul class="feature-list">
<li><i class="fas fa-check-circle"></i> Daily Backups</li>
<li><i class="fas fa-check-circle"></i> Priority Bug Fixes</li>
<li><i class="fas fa-check-circle"></i> 24/7 Monitoring</li>
<li><i class="fas fa-check-circle"></i> Chat Support</li>
<li><i class="fas fa-check-circle"></i> Monthly Health Audit</li>
</ul>
<a class="gold-btn w-100 d-inline-block text-center" href="">
                            Select Plan
                           </a>
</div>
</div>
<div class="col-lg-4 reveal">
<div class="pricing-card-modern">
<div class="price-header">
<h4>Enterprise</h4>
<div class="price-amount">â‚¹29,999<span>/mo</span></div>
</div>
<ul class="feature-list">
<li><i class="fas fa-check-circle"></i> Real-time Monitoring</li>
<li><i class="fas fa-check-circle"></i> Dedicated Engineer</li>
<li><i class="fas fa-check-circle"></i> Cloud Management</li>
<li><i class="fas fa-check-circle"></i> Phone Support</li>
<li><i class="fas fa-check-circle"></i> Disaster Recovery</li>
</ul>
<a class="gold-btn w-100 d-inline-block text-center" href="">
                            Select Plan
                           </a>
</div>
</div>
</div>
</div>
</section>
<!-- Why Us -->
<section class="advantage-section py-5">
<div class="section-head reveal">
<span>The YGR Advantage</span>
<h2>Why Businesses Trust Us</h2>
</div>
<div class="advantage-grid">
<div class="advantage-card reveal">
<i class="fas fa-code"></i>
<h4>Clean Architecture</h4>
<p>We write scalable, maintainable code using the latest industry standards.</p>
</div>
<div class="advantage-card reveal">
<i class="fas fa-shield-alt"></i>
<h4>Ironclad Security</h4>
<p>Advanced encryption and security protocols protect your data 24/7.</p>
</div>
<div class="advantage-card reveal">
<i class="fas fa-bolt"></i>
<h4>Lightning Speed</h4>
<p>Optimized assets and server-side performance for instant load times.</p>
</div>
</div>
</section>
</div>
 INTERNSHIPS & TRAINING 
<div class="service-main-container mesh-gradient animated-bg">
<!-- Hero -->
<section class="hero-glass-container reveal">
<div class="hero-glass-content">
<span class="reveal">Future Ready</span>
<h1>Industry-Led Training</h1>
<p>Bridge the gap between academia and industry with real-world projects, expert mentorship, and
                    career-launching certifications.</p>
<div class="hero-actions">
<a class="gold-btn" href="">Join Program</a>
</div>
</div>
<div class="hero-abstract-art d-none d-lg-block">
<img src="/images/internship.png" style="max-width: 500px; border-radius: 30px; transform: perspective(1000px) rotateY(-15deg); box-shadow: var(--shadow-lg);"/>
</div>
</section>
<!-- Internship Learning Model -->
<section class="execution-model-section">
<div class="container">
<div class="section-head reveal">
<span>The Career Path</span>
<h2>Learning &amp; Development Model</h2>
<p>A comprehensive roadmap designed to transform students into industry-ready professionals.</p>
</div>
<div class="model-grid">
<div class="model-card reveal">
<div class="step-number">01</div>
<div class="model-icon-wrapper">
<i class="fas fa-book-reader"></i>
</div>
<h4>Core Theory</h4>
<p>Deep dive into the fundamental principles of your chosen technology stack with expert
                            guidance.</p>
</div>
<div class="model-card reveal">
<div class="step-number">02</div>
<div class="model-icon-wrapper">
<i class="fas fa-laptop-code"></i>
</div>
<h4>Practical Labs</h4>
<p>Intensive hands-on coding sessions to apply theoretical knowledge in a controlled
                            environment.</p>
</div>
<div class="model-card reveal">
<div class="step-number">03</div>
<div class="model-icon-wrapper">
<i class="fas fa-project-diagram"></i>
</div>
<h4>Live Projects</h4>
<p>Working on real-world industry requirements under the mentorship of senior developers.</p>
</div>
<div class="model-card reveal">
<div class="step-number">04</div>
<div class="model-icon-wrapper">
<i class="fas fa-user-tie"></i>
</div>
<h4>Career Readiness</h4>
<p>Resume building, mock interviews, and certification to bridge the gap to your dream job.</p>
</div>
</div>
</div>
</section>
<!-- Success Stories -->
<section class="py-5 bg-white">
<div class="section-head reveal">
<span>Wall of Fame</span>
<h2>Our Success Stories</h2>
</div>
<div class="container">
<div class="row g-4 justify-content-center">
<div class="col-lg-2 col-md-4 col-6 reveal">
<div class="student-card-modern">
<img alt="Tharun" src="/media/team/tharun.jpeg"/>
<h5>Tharun</h5>
<p>JAVA Intern</p>
</div>
</div>
<div class="col-lg-2 col-md-4 col-6 reveal">
<div class="student-card-modern">
<img alt="Himesh" src="/media/team/reddy_odFoq3p.jpeg"/>
<h5>Himesh</h5>
<p>JAVA Intern</p>
</div>
</div>
<div class="col-lg-2 col-md-4 col-6 reveal">
<div class="student-card-modern">
<img alt="Pavan" src="/media/team/pavan.jpeg"/>
<h5>Pavan</h5>
<p>JAVA Intern</p>
</div>
</div>
<div class="col-lg-2 col-md-4 col-6 reveal">
<div class="student-card-modern">
<img alt="Vamsi" src="/media/team/vamsi.jpeg"/>
<h5>Vamsi</h5>
<p>JAVA Intern</p>
</div>
</div>
<div class="col-lg-2 col-md-4 col-6 reveal">
<div class="student-card-modern">
<img alt="Nikilesh" src="/media/team/sai.nikilesh.jpg.jpeg"/>
<h5>Nikilesh</h5>
<p>PYTHON Intern</p>
</div>
</div>
</div>
</div>
</section>
<!-- Pricing -->
<section class="pricing-section">
<div class="container">
<div class="section-head reveal">
<span>Invest in Yourself</span>
<h2>Certification Programs</h2>
</div>
<div class="row g-4 pricing-scroll-track">
<div class="col-lg-4 reveal">
<div class="pricing-card-modern">
<div class="price-header">
<h4>Starter</h4>
<div class="price-amount">â‚¹5,899<span>(incl. GST)</span></div>
</div>
<ul class="feature-list">
<li><i class="fas fa-check-circle"></i> Basics &amp; Fundamentals</li>
<li><i class="fas fa-check-circle"></i> Recorded Sessions</li>
<li><i class="fas fa-check-circle"></i> Weekly Assignments</li>
<li><i class="fas fa-check-circle"></i> Basic Certification</li>
<li><i class="fas fa-check-circle"></i> Community Access</li>
</ul>
<a class="gold-btn w-100" href="?plan=starter&amp;amount=4999">Enroll
                                Now</a>
</div>
</div>
<div class="col-lg-4 reveal">
<div class="pricing-card-modern">
<div class="badge-popular">CAREER TRACK</div>
<div class="price-header">
<h4>Professional</h4>
<div class="price-amount">â‚¹17,699<span>(incl. GST)</span></div>
</div>
<ul class="feature-list">
<li><i class="fas fa-check-circle"></i> Live Training Sessions</li>
<li><i class="fas fa-check-circle"></i> Hands-on Projects</li>
<li><i class="fas fa-check-circle"></i> Industry Certification</li>
<li><i class="fas fa-check-circle"></i> Code Reviews</li>
<li><i class="fas fa-check-circle"></i> Resume Building</li>
</ul>
<a class="gold-btn w-100" href="?plan=pro&amp;amount=14999">Enroll Now</a>
</div>
</div>
<div class="col-lg-4 reveal">
<div class="pricing-card-modern">
<div class="price-header">
<h4>Advanced Plus</h4>
<div class="price-amount">â‚¹29,499<span>(incl. GST)</span></div>
</div>
<ul class="feature-list">
<li><i class="fas fa-check-circle"></i> Live Industry Projects</li>
<li><i class="fas fa-check-circle"></i> 1-on-1 Mentorship</li>
<li><i class="fas fa-check-circle"></i> Interview Preparation</li>
<li><i class="fas fa-check-circle"></i> Placement Assistance</li>
<li><i class="fas fa-check-circle"></i> Portfolio Showcase</li>
</ul>
<a class="gold-btn w-100" href="?plan=advanced&amp;amount=24999">Enroll
                                Now</a>
</div>
</div>
</div>
</div>
</section>
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
<script>
        /* ================= REVEAL ANIMATION JS ================= */
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        /* ================= PRICING AUTO-SCROLL (MOBILE) ================= */
        if (window.innerWidth < 991) {
            const tracks = document.querySelectorAll('.pricing-scroll-track');
            tracks.forEach(track => {
                let isMoving = true;

                const autoScroll = () => {
                    if (!isMoving) return;
                    const cardWidth = track.offsetWidth * 0.85;
                    if (track.scrollLeft + track.offsetWidth >= track.scrollWidth - 10) {
                        track.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        track.scrollBy({ left: cardWidth, behavior: 'smooth' });
                    }
                };

                let scrollInterval = setInterval(autoScroll, 4000);

                track.addEventListener('touchstart', () => {
                    isMoving = false;
                    clearInterval(scrollInterval);
                }, { passive: true });
            });
        }

        /* ================= CUSTOM DROPDOWN MOBILE TOGGLE ================= */
        const dropdownTrigger = document.querySelector('.custom-select-trigger');
        const dropdownContainer = document.querySelector('.custom-service-select');
        
        if (dropdownTrigger && dropdownContainer) {
            dropdownTrigger.addEventListener('click', function(e) {
                e.stopPropagation();
                dropdownContainer.classList.toggle('open');
            });
            
            document.addEventListener('click', function(e) {
                if (!dropdownContainer.contains(e.target)) {
                    dropdownContainer.classList.remove('open');
                }
            });
        }
    </script>
`;

    return (
        <div ref={containerRef} dangerouslySetInnerHTML={{ __html: rawHTML }} />
    );
};

export default OriginalServices;
