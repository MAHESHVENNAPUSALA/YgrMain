import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OriginalTeam = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const [data, setData] = useState([]);
    
    useEffect(() => {
        fetch('/api/public/team/')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.error(err));
            
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

    const htmlBefore = `<link href="/images/logo.png" rel="icon" type="image/png"/>
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet"/>
<link href="/css/modern_ui.css" rel="stylesheet"/>
<style>
        :root {
            --primary-navy: #091c47;
            --accent-gold: #fbcc27;
            --text-slate: #475569;
            --bg-light: #f8fafc;
            --glass-bg: rgba(255, 255, 255, 0.8);
            --shadow-premium: 0 20px 50px rgba(9, 28, 71, 0.08);
        }

        body {
            margin: 0;
            background: var(--bg-light);
            color: var(--primary-navy);
            font-family: 'Plus Jakarta Sans', sans-serif;
        }

        /* --- Reveal Logic (Disabled) --- */
        .reveal {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
        }

        /* ================= PANORAMIC STUDIO HERO ================= */
        .team-hero {
            min-height: auto;
            background: radial-gradient(circle at 50% 50%, #fff 0%, var(--bg-light) 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            position: relative;
            overflow: hidden;
            padding: 40px 10% 40px;
            margin-bottom: 30px;
        }

        .hero-title-box {
            text-align: center;
            margin-bottom: 50px;
            z-index: 100;
        }

        .hero-title-box h1 {
            margin: 0;
            font-size: 50px;
            font-weight: 300;
            color: var(--primary-navy);
            letter-spacing: -2px;
            line-height: 1;
        }

        .hero-title-box h1 span {
            display: block;
            font-size: 1.1rem;
            letter-spacing: 12px;
            color: var(--accent-gold);
            text-transform: uppercase;
            margin-top: 15px;
        }

        .cinerama-stage {
            width: 100%;
            height: 480px;
            perspective: 2000px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }

        .cinerama-track {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            transform-style: preserve-3d;
            transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cinerama-item {
            position: absolute;
            width: 650px;
            height: 420px;
            border-radius: 30px;
            overflow: hidden;
            box-shadow: 0 30px 60px rgba(9, 28, 71, 0.15);
            transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
            border: 5px solid #fff;
            transform-origin: center;
            backface-visibility: hidden;
        }

        .cinerama-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.8s ease;
            image-rendering: -webkit-optimize-contrast;
            backface-visibility: hidden;
            transform: translateZ(0);
        }

        .cinerama-item.active {
            z-index: 100;
            border-color: var(--accent-gold);
            box-shadow: 0 40px 100px rgba(9, 28, 71, 0.25);
        }

        /* Nav Controls */
        .cinerama-control {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.9);
            border: 2px solid #fff;
            color: var(--primary-navy);
            font-size: 18px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            z-index: 200;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        }

        .cinerama-control:hover {
            background: var(--accent-gold);
            border-color: var(--accent-gold);
            transform: translateY(-50%) scale(1.1);
        }

        .prev-btn {
            left: 2%;
        }

        .next-btn {
            right: 2%;
        }

        /* Dot Indicators */
        .cinerama-dots {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 10px;
            z-index: 200;
            padding: 8px 16px;
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            border-radius: 30px;
        }

        .cinerama-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: var(--primary-navy);
            opacity: 0.3;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .cinerama-dot.active {
            background: var(--accent-gold);
            opacity: 1;
            width: 25px;
            border-radius: 5px;
        }

        .cinerama-item {
            cursor: pointer;
        }

        /* ================= 3D KINETIC DIRECTOR STACK ================= */
        .director-kinetic-sec {
            padding: 30px 10%;
            margin-top: 100px;
            background: #fff;
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 80vh;
        }

        /* Diagonal Accent */
        .director-kinetic-sec::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 60%;
            height: 100%;
            /* Expanded width */
            background: var(--primary-navy);
            color: #ffff;
            clip-path: polygon(25% 0, 100% 0, 100% 100%, 0% 100%);
            /* Refined angle */
            z-index: 1;
        }

        .kinetic-container {
            max-width: 1400px;
            width: 100%;
            display: grid;
            grid-template-columns: 1.1fr 1fr;
            gap: 80px;
            align-items: center;
            position: relative;
            z-index: 10;
            /* Ensures everything is above the diagonal background */
        }

        /* Reversed Layout (Matter Left, Image Right) */
        .director-kinetic-sec.reverse-layout::before {
            right: auto;
            left: 0;
            clip-path: polygon(0 0, 75% 0, 100% 100%, 0% 100%);
        }

        .director-kinetic-sec.reverse-layout .kinetic-container {
            grid-template-columns: 1fr 1.1fr;
        }

        /* The 3D Fan-Out Stack */
        .kinetic-stack {
            position: relative;
            height: 650px;
            width: 500px;
            perspective: 2000px;
            z-index: 5;
        }

        .stack-card {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 40px;
            overflow: hidden;
            transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
            border: 4px solid #fff;
        }

        .stack-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: grayscale(20%);
            transition: 0.6s ease;
            image-rendering: -webkit-optimize-contrast;
        }

        .card-main {
            z-index: 5;
            transform: rotate(-2deg);
        }

        .card-sub1 {
            z-index: 3;
            transform: rotate(5deg) translateX(40px) translateY(20px);
            opacity: 0.7;
        }

        .card-sub2 {
            z-index: 2;
            transform: rotate(-8deg) translateX(-40px) translateY(-20px);
            opacity: 0.4;
        }

        .kinetic-stack:hover .card-main {
            transform: rotate(0deg) scale(1.02);
            z-index: 10;
        }

        .kinetic-stack:hover .card-sub1 {
            transform: rotate(12deg) translateX(120px) translateY(40px);
            opacity: 0.9;
        }

        .kinetic-stack:hover .card-sub2 {
            transform: rotate(-15deg) translateX(-120px) translateY(-40px);
            opacity: 0.8;
        }

        .kinetic-stack:hover img {
            filter: grayscale(0%);
        }

        /* Typography */
        .kinetic-content {
            z-index: 20;
            /* Keep text above everything */
            position: relative;
            padding-left: 20px;
        }

        .outline-bg-text {
            position: absolute;
            top: -70px;
            left: -120px;
            font-size: 11rem;
            font-weight: 900;
            color: transparent;
            -webkit-text-stroke: 1.5px rgba(9, 28, 71, 0.15);
            /* Increased visibility */
            z-index: -1;
            pointer-events: none;
            white-space: nowrap;
            letter-spacing: 15px;
            text-transform: uppercase;
        }

        .kinetic-content h1,
        .kinetic-content h4 {
            color: var(--accent-gold);
            font-weight: 800;
            letter-spacing: 6px;
            text-transform: uppercase;
            margin-bottom: 20px;
        }

        .kinetic-content h2 {
            font-size: 30px;
            /* Reduced to prevent cutoff */
            font-weight: 400;
            line-height: 1.1;
            margin-bottom: 40px;
            color: #fff;
            /* White for better visibility on navy side */
        }

        .executive-summary {

            padding-left: 20px;

            border-left: 6px solid var(--accent-gold);
            border-radius: 0 30px 30px 0;
            position: relative;
            margin-top: 20px;
        }



        .signature-box {
            margin-top: 40px;
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .sig-line {
            width: 100px;
            height: 2px;
            background: var(--accent-gold);
        }

        .sig-name {
            font-family: serif;
            font-style: italic;
            font-size: 1.8rem;
            color: #ffffff;
            opacity: 0.8;
        }

        @media (max-width: 1200px) {
            .director-kinetic-sec {
                background: var(--primary-navy) !important;
                border-radius: 20px;
                padding: 40px 5% 20px !important;
                margin-top: 40px !important;
                margin-bottom: 40px !important;
                overflow: hidden;
            }

            .kinetic-container {
                display: flex !important;
                flex-direction: column !important;
                text-align: center !important;
                width: 100% !important;
                gap: 0 !important;
            }

            .kinetic-stack {
                order: 3 !important;
                margin: 0 auto 30px !important;
                width: 100% !important;
                max-width: 340px !important;
                height: 420px !important;
            }

            .kinetic-content {
                display: contents !important;
            }

            .outline-bg-text {
                font-size: 5rem !important;
                top: 0 !important;
                left: 0 !important;
                width: 100% !important;
                text-align: center !important;
                -webkit-text-stroke: 1px rgba(255, 255, 255, 0.05) !important;
            }

            .executive-summary {
                order: 4 !important;
                border-left: none !important;
                border-top: 1px solid rgba(251, 204, 39, 0.3) !important;
                border-radius: 0 !important;
                padding: 20px 10px !important;
                background: transparent !important;
            }

            .director-kinetic-sec::before {
                display: none !important;
            }

            .kinetic-content h2 {
                order: 2 !important;
                font-size: 2.2rem !important;
                color: #fff !important;
                margin-top: 0 !important;
                margin-bottom: 25px !important;
            }

            .kinetic-content h1,
            .kinetic-content h4 {
                order: 1 !important;
                font-size: 1.4rem !important;
                letter-spacing: 3px !important;
                margin-top: 0 !important;
                margin-bottom: 15px !important;
                color: var(--accent-gold) !important;
                text-transform: uppercase;
            }
        }

        /* ================= TEAM GRID ================= */
        .team-nav-outer {
            margin-top: 60px;
            display: flex;
            justify-content: center;
            position: relative;
            z-index: 20;
        }

        .team-toggle {
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            padding: 10px;
            border-radius: 50px;
            display: flex;
            gap: 5px;
            box-shadow: var(--shadow-premium);
            border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .toggle-btn {
            padding: 15px 35px;
            border-radius: 50px;
            border: none;
            background: transparent;
            color: var(--primary-navy);
            font-weight: 800;
            font-size: 0.9rem;
            text-transform: uppercase;
            cursor: pointer;
            transition: 0.3s ease;
        }

        .toggle-btn.active {
            background: var(--primary-navy);
            color: #fff;
        }

        .team-section {
            padding: 20px 20px;
            max-width: 1400px;
            margin-left: 200px;
            margin-right: 200px;

        }

        .team-grid {
            display: none;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 30px;
        }

        .team-grid.active {
            display: grid;
        }

        .member-card {
            background: #fff;
            border-radius: 24px;
            padding: 12px;
            border: 1px solid #f1f5f9;
            transition: 0.4s ease;
            text-align: center;
        }

        .member-card:hover {
            transform: translateY(-10px);
            border-color: var(--accent-gold);
            box-shadow: var(--shadow-premium);
        }

        .member-img-wrap {
            height: 350px;
            border-radius: 18px;
            overflow: hidden;
            position: relative;
        }

        .member-img-wrap img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            image-rendering: -webkit-optimize-contrast;
            backface-visibility: hidden;
            transform: translateZ(0);
        }


        .member-info h3 {
            font-size: 18px;
            font-weight: 800;
            margin: 15px 0 5px;
        }

        .member-info p {
            color: var(--accent-gold);
            font-weight: 700;
            text-transform: uppercase;
            font-size: 0.8rem;
            letter-spacing: 1px;
        }

        /* --- SINGLE UNIFIED MOBILE OVERRIDE (991px) --- */
        @media (max-width: 991px) {
            body {
                overflow-x: hidden !important;
            }

            .team-hero {
                height: auto !important;
                min-height: auto !important;
                padding-top: 25px !important;
                padding-bottom: 0 !important;
                margin-bottom: 30px !important;
            }

            .hero-title-box h1 {
                font-size: 2rem !important;
                letter-spacing: -1px !important;
            }

            .hero-title-box h1 span {
                font-size: 0.8rem !important;
                letter-spacing: 5px !important;
            }

            .cinerama-stage {
                height: 230px !important;
            }

            .cinerama-item {
                width: 300px !important;
                height: 220px !important;
                border-width: 3px !important;
                border-radius: 20px !important;
            }

            .cinerama-control {
                width: 25px !important;
                height: 25px !important;
                font-size: 12px !important;
            }

            .director-kinetic-sec {
                padding: 40px 5% 20px !important;
                margin-top: 30px !important;
                margin-bottom: 30px !important;
                min-height: auto !important;
                display: block !important;
                background: var(--primary-navy) !important;
                border-radius: 20px;
                overflow: hidden;
            }

            .director-kinetic-sec::before {
                display: none !important;
            }

            .kinetic-container {
                display: flex !important;
                flex-direction: column !important;
                text-align: center !important;
                width: 100% !important;
                gap: 0 !important;
            }

            .kinetic-stack {
                order: 3 !important;
                margin: 0 auto 30px !important;
                width: 100% !important;
                max-width: 340px !important;
                height: 420px !important;
            }

            .kinetic-content {
                display: contents !important;
            }

            .outline-bg-text {
                font-size: 4rem !important;
                top: 0 !important;
                left: 0 !important;
                width: 100% !important;
                text-align: center !important;
                -webkit-text-stroke: 1px rgba(255, 255, 255, 0.05) !important;
            }

            .kinetic-content h2 {
                order: 2 !important;
                font-size: 1.8rem !important;
                color: #fff !important;
                margin-top: 0 !important;
                margin-bottom: 25px !important;
            }

            .kinetic-content h1,
            .kinetic-content h4 {
                order: 1 !important;
                font-size: 1.2rem !important;
                letter-spacing: 3px !important;
                margin-top: 0 !important;
                margin-bottom: 15px !important;
                color: var(--accent-gold) !important;
                text-transform: uppercase;
            }

            .executive-summary {
                order: 4 !important;
                padding: 20px 10px !important;
                border-left: none !important;
                border-top: 1px solid rgba(251, 204, 39, 0.3) !important;
                border-radius: 0 !important;
                text-align: left !important;
                background: transparent !important;
            }

            .executive-summary p {
                font-size: 1rem !important;
            }

            .sig-name {
                font-size: 1.4rem !important;
            }

            .team-section {
                margin-left: 0 !important;
                margin-right: 0 !important;
                padding: 20px 15px 80px !important;
            }

            .team-grid {
                display: none !important;
            }

            .team-grid.active {
                display: flex !important;
                overflow-x: auto !important;
                scroll-snap-type: x mandatory !important;
                gap: 20px !important;
                padding: 15px 20px 40px !important;
                margin: 0 -20px !important;
                -webkit-overflow-scrolling: touch !important;
            }

            .team-grid::-webkit-scrollbar {
                display: none !important;
            }

            .team-grid .member-card {
                flex: 0 0 85% !important;
                scroll-snap-align: start !important;
                margin-bottom: 0 !important;
                box-sizing: border-box !important;
            }

            .team-grid .member-card:first-child {
                margin-left: 10px !important;
            }

            .member-img-wrap {
                height: 250px !important;
            }

            .member-info p {
                margin-left: 0 !important;
                margin-right: 0 !important;
                text-align: center !important;
            }

            #grid-mgmt .member-info p:first-of-type {
                text-align: right !important;
                margin-right: 20px !important;
            }

            .toggle-btn {
                padding: 12px 20px !important;
                font-size: 0.8rem !important;
            }
        }


        /* ================= ULTRA-PREMIUM COMPANY STATS ================= */
        :root {
            --stat-navy: #091c47;
            --stat-accent: #fbcc27;
            --stat-font: 'Plus Jakarta Sans', sans-serif;
        }

        .stats-section {
            font-family: var(--stat-font);
            background: var(--stat-navy);
            padding: 50px 0;
            position: relative;
            overflow: hidden;
        }

        /* Animated Background Orbs */
        .stat-orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(100px);
            z-index: 0;
            animation: stat-pulse 10s infinite alternate ease-in-out;
        }

        .stat-orb-1 {
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(251, 204, 39, 0.15), transparent);
            top: -100px;
            left: -200px;
        }

        .stat-orb-2 {
            width: 500px;
            height: 500px;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.05), transparent);
            bottom: -150px;
            right: -100px;
            animation-delay: -5s;
        }

        @keyframes stat-pulse {
            0% {
                transform: scale(1);
                opacity: 0.8;
            }

            100% {
                transform: scale(1.2);
                opacity: 1;
            }
        }

        .stats-container {
            position: relative;
            z-index: 2;
            max-width: 1400px;
            margin: 0 auto;
        }

        .stats-header-theatre {
            text-align: center;
            margin-bottom: 30px;
        }

        .stat-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: rgba(251, 204, 39, 0.1);
            color: var(--stat-accent);
            padding: 4px 12px;
            border-radius: 50px;
            font-weight: 700;
            font-size: 0.7rem;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-bottom: 10px;
            border: 1px solid rgba(251, 204, 39, 0.3);
        }

        .stats-header-theatre h2 {
            font-size: 1.8rem;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 8px;
            letter-spacing: -0.5px;
        }

        .stats-header-theatre p {
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.7);
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.5;
        }

        .stats-theatre-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
        }

        .stat-panel {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 20px 15px;
            border-radius: 8px;
            text-align: center;
            transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
            position: relative;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }

        .stat-panel::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 8px;
            padding: 1px;
            background: linear-gradient(135deg, var(--stat-accent), transparent);
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            opacity: 0;
            transition: opacity 0.4s ease;
        }

        .stat-panel:hover {
            transform: translateY(-2px);
            background: rgba(255, 255, 255, 0.06);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .stat-panel:hover::before {
            opacity: 1;
        }

        .stat-icon-wrapper {
            width: 35px;
            height: 35px;
            background: rgba(251, 204, 39, 0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 10px;
            color: var(--stat-accent);
            font-size: 1rem;
            transition: all 0.4s ease;
            position: relative;
            z-index: 1;
        }

        .stat-panel:hover .stat-icon-wrapper {
            background: var(--stat-accent);
            color: var(--stat-navy);
        }

        .stat-num-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 2px;
            position: relative;
            z-index: 1;
        }

        .stat-num {
            font-size: 1.8rem;
            font-weight: 800;
            color: #ffffff;
            line-height: 1;
            letter-spacing: -0.5px;
        }

        .stat-plus {
            font-size: 1.2rem;
            font-weight: 800;
            color: var(--stat-accent);
            margin-left: 2px;
        }

        .stat-desc {
            font-size: 0.75rem;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.7);
            position: relative;
            z-index: 1;
        }

        .stat-watermark {
            position: absolute;
            bottom: -10px;
            right: -10px;
            font-size: 2rem;
            color: rgba(255, 255, 255, 0.02);
            transform: rotate(-15deg);
            transition: all 0.5s ease;
            z-index: 0;
            pointer-events: none;
        }

        .stat-panel:hover .stat-watermark {
            color: rgba(251, 204, 39, 0.05);
            transform: rotate(0deg) scale(1.1);
        }

        /* --- SINGLE UNIFIED MOBILE OVERRIDE (991px) --- */
        @media (max-width: 991px) {
            body {
                overflow-x: hidden !important;
            }

            .stats-section {
                padding: 30px 0 !important;
            }

            .stats-header-theatre {
                margin-bottom: 25px !important;
                padding: 0 10px !important;
            }

            .stat-badge {
                padding: 4px 10px !important;
                font-size: 0.65rem !important;
                margin-bottom: 8px !important;
            }

            .stats-header-theatre h2 {
                font-size: 1.4rem !important;
                line-height: 1.2 !important;
            }

            .stats-header-theatre p {
                font-size: 0.8rem !important;
                line-height: 1.5 !important;
            }

            .stats-theatre-grid {
                grid-template-columns: repeat(2, 1fr) !important;
                gap: 12px !important;
                padding: 0 10px !important;
            }

            .stat-panel {
                padding: 15px 10px !important;
                border-radius: 8px !important;
            }

            .stat-icon-wrapper {
                width: 32px !important;
                height: 32px !important;
                font-size: 0.9rem !important;
                margin-bottom: 8px !important;
            }

            .stat-num {
                font-size: 1.4rem !important;
            }

            .stat-plus {
                font-size: 1rem !important;
            }

            .stat-desc {
                font-size: 0.65rem !important;
            }
        }

        /* ================= ZOOM LIGHTBOX ================= */
        .zoom-modal {
            display: none;
            position: fixed;
            z-index: 9999;
            padding-top: 50px;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(9, 28, 71, 0.95);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .zoom-modal.show {
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 1;
        }

        .zoom-modal-content {
            margin: auto;
            display: block;
            max-width: 90%;
            max-height: 85vh;
            border-radius: 20px;
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
            transform: scale(0.8);
            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            border: 4px solid var(--accent-gold);
            object-fit: contain;
        }

        .zoom-modal.show .zoom-modal-content {
            transform: scale(1);
        }

        .zoom-close {
            position: absolute;
            top: 30px;
            right: 40px;
            color: #fff;
            font-size: 50px;
            font-weight: 300;
            transition: 0.3s;
            cursor: pointer;
            z-index: 10000;
        }

        .zoom-close:hover,
        .zoom-close:focus {
            color: var(--accent-gold);
            text-decoration: none;
            cursor: pointer;
            transform: scale(1.1);
        }

        @media (max-width: 768px) {
            .zoom-close {
                top: 15px;
                right: 25px;
                font-size: 40px;
            }

            .zoom-modal-content {
                width: 95%;
            }
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
 HERO WITH PANORAMIC TRACK 
<section class="team-hero">
<div class="cinerama-stage">
<!-- Navigation Arrows -->
<button aria-label="Previous" class="cinerama-control prev-btn" onclick="prevCinerama()" type="button">
<i class="fas fa-chevron-left"></i>
</button>
<div class="cinerama-track" id="cinerama-track">
<div class="cinerama-item" onclick="selectCinerama()">
<img alt="Team Scene" src=""/>
</div>
<div class="cinerama-item" onclick="selectCinerama(0)">
<img alt="Team Scene" src="/images/placeholder.jpg"/>
</div>
</div>
<button aria-label="Next" class="cinerama-control next-btn" onclick="nextCinerama()" type="button">
<i class="fas fa-chevron-right"></i>
</button>
</div>
</section>
<section class="stats-section">
<!-- Animated Orbs -->
<div class="stat-orb stat-orb-1"></div>
<div class="stat-orb stat-orb-2"></div>
<div class="container-fluid px-lg-5 px-3 stats-container">
<div class="stats-header-theatre">
<div class="stat-badge">
<i class="fas fa-chart-line"></i> Our Impact
                </div>
<h2>The Global Footprint</h2>
<p>Our metrics of success reflect our relentless dedication to delivering world-class IT solutions and
                    transformative growth.</p>
</div>
<div class="stats-theatre-grid">
<!-- Stat 1 -->
<div class="stat-panel">
<i class="fas fa-users stat-watermark"></i>
<div class="stat-icon-wrapper">
<i class="fas fa-users"></i>
</div>
<div class="stat-num-wrapper">
<span class="stat-num counter" data-count="97">0</span>
<span class="stat-plus">+</span>
</div>
<span class="stat-desc">Active Clients</span>
</div>
<!-- Stat 2 -->
<div class="stat-panel">
<i class="fas fa-layer-group stat-watermark"></i>
<div class="stat-icon-wrapper">
<i class="fas fa-layer-group"></i>
</div>
<div class="stat-num-wrapper">
<span class="stat-num counter" data-count="98">0</span>
<span class="stat-plus">+</span>
</div>
<span class="stat-desc">Projects Delivered</span>
</div>
<!-- Stat 3 -->
<div class="stat-panel">
<i class="fas fa-medal stat-watermark"></i>
<div class="stat-icon-wrapper">
<i class="fas fa-medal"></i>
</div>
<div class="stat-num-wrapper">
<span class="stat-num counter" data-count="5">0</span>
<span class="stat-plus">+</span>
</div>
<span class="stat-desc">Years Expertise</span>
</div>
<!-- Stat 4 -->
<div class="stat-panel">
<i class="fas fa-earth-americas stat-watermark"></i>
<div class="stat-icon-wrapper">
<i class="fas fa-earth-americas"></i>
</div>
<div class="stat-num-wrapper">
<span class="stat-num counter" data-count="4">0</span>
<span class="stat-plus">+</span>
</div>
<span class="stat-desc">Market Regions</span>
</div>
</div>
</div>
</section>
 FOUNDER SECTION: 3D KINETIC IDENTITY STACK 
<section class="director-kinetic-sec reverse-layout reveal">
<div class="kinetic-container">
<div class="kinetic-content">
<h1>Chairman
                </h1>
<h2>Driving Excellence &amp; Growth</h2>
<!-- <h2>Driving Operational Excellence</h2> -->
<div class="executive-summary">
<p style="color: #ffff;">We provide professional IT services including Website Development, Web
                        Applications, Mobile Applications, and Digital Marketing solutions. Our goal is to deliver
                        quality services that help businesses grow and succeed in the digital world.

                        We are committed to innovation, customer satisfaction, and building long-term relationships with
                        our clients. Thank you for your trust and support.</p>
<div class="signature-box">
<div class="sig-line"></div>
<div class="sig-name">Y.Varalakshmi</div>
</div>
</div>
</div>
<div class="kinetic-stack">
<div class="outline-bg-text" style="right: 0; left: auto; text-align: right;">OPERATIONS</div>
<!-- Main Card -->
<div class="stack-card card-main">
<img alt="Suneetha Reddy" src="/images/yg.jpeg"/>
</div>
</div>
</div>
</section>
<section class="director-kinetic-sec reveal">
<div class="kinetic-container">
<div class="kinetic-stack">
<div class="outline-bg-text">LEADERSHIP</div>
<!-- Main Card -->
<div class="stack-card card-main">
<img alt="Y. Ravindra Reddy" src="/images/rr.jpeg"/>
</div>
</div>
<div class="kinetic-content">
<h4>Director's Message</h4>
<h2>Architect of Innovation</h2>
<div class="executive-summary">
<p style="color: #ffff;">We started our journey with a vision to empower individuals and businesses
                        through technology,
                        innovation, and quality services. With dedication, hard work, and continuous growth,

                        we have built a platform that provides professional IT training and reliable technology
                        solutions. <br/>Our commitment is to deliver excellence, create opportunities, and support our
                        students and clients in achieving success. We thank everyone who has been part of our journey
                        and trusted us throughout our growth. <br/>Together, let us build a smarter future with
                        technology.</p>
<div class="signature-box">
<div class="sig-line"></div>
<div class="sig-name">Y. Ravindra Reddy</div>
</div>
</div>
</div>
</div>
</section>
<section class="director-kinetic-sec reverse-layout reveal">
<div class="kinetic-container">
<div class="kinetic-content">
<h4>General Manager Message</h4>
<h2>Driving Operational Excellence</h2>
<div class="executive-summary">
<p style="color: #ffff;">As the General Manager of our organization, I am proud to lead a dedicated
                        team committed to excellence, innovation, and customer satisfaction. Our mission is to provide
                        high-quality services while building strong relationships with our clients and community. We
                        continuously strive to create new opportunities, maintain professional standards, and deliver
                        the best possible experience to everyone associated with our company.</p>
<div class="signature-box">
<div class="sig-line"></div>
<div class="sig-name">Y.Suneetha Reddy</div>
</div>
</div>
</div>
<div class="kinetic-stack">
<div class="outline-bg-text" style="right: 0; left: auto; text-align: right;">OPERATIONS</div>
<!-- Main Card -->
<div class="stack-card card-main">
<img alt="Suneetha Reddy" src="/images/su.jpeg"/>
</div>
</div>
</div>
</section>
 TOGGLE NAV 
<div class="team-nav-outer">
<div class="team-toggle">
<button class="toggle-btn active" onclick="switchTeam('mgmt', this)">Executive Board</button>
<button class="toggle-btn" onclick="switchTeam('team', this)">Creative Core</button>
</div>
</div>
 TEAM GRID SECTION 
<section class="team-section">
`;
    const htmlAfter = `
<div class="team-grid" id="grid-team">
<div class="member-card">
<div class="member-img-wrap">
<img alt="" src=""/>
</div>
<div class="member-info">
<h3></h3>
<p></p>
</div>
</div>
<div style="text-align: center; width: 100%; grid-column: 1/-1; padding: 50px;">
<p style="color: var(--text-slate); font-weight: 600;">The creative ensemble is growing. Stay tuned.</p>
</div>
</div>
</section>
<script>
        const items = document.querySelectorAll('.cinerama-item');
        let centerIndex = Math.floor(items.length / 2);
        let cineramaInterval;

        function updateCinerama() {
            const isMobile = window.innerWidth <= 991;
            const offset = isMobile ? 300 : 500;

            items.forEach((item, i) => {
                let diff = i - centerIndex;

                // Circular Logic: shortest distance wrap
                if (diff > items.length / 2) diff -= items.length;
                if (diff < -items.length / 2) diff += items.length;

                let x = diff * offset;
                let z = diff === 0 ? (isMobile ? 150 : 300) : -250;
                let r = diff * -20;
                let scale = diff === 0 ? 1.1 : 0.85;
                let opacity = Math.abs(diff) > 1 && isMobile ? 0 : (Math.abs(diff) > 2 ? 0 : 1);

                item.style.transform = \`translateX(\${x}px) translateZ(\${z}px) rotateY(\${r}deg) scale(\${scale})\`;
                item.style.opacity = opacity;
                item.style.zIndex = 100 - Math.abs(diff);
                item.classList.toggle('active', diff === 0);
            });
        }

        let userPaused = false;

        function stopCineramaTimer() {
            clearInterval(cineramaInterval);
            userPaused = true;
        }

        function prevCinerama() {
            stopCineramaTimer(); // Manual click stops the auto photo scroll
            if (items.length > 0) {
                centerIndex = (centerIndex - 1 + items.length) % items.length;
                updateCinerama();
            }
        }

        function nextCinerama() {
            stopCineramaTimer(); // Manual click stops the auto photo scroll
            if (items.length > 0) {
                centerIndex = (centerIndex + 1) % items.length;
                updateCinerama();
            }
        }

        function selectCinerama(idx) {
            stopCineramaTimer(); // Clicking a photo stops the auto photo scroll!

            if (idx === centerIndex) {
                // If it's already in the center, open the zoom lightbox!
                const imgSrc = items[idx].querySelector('img').src;
                openZoomModal(imgSrc);
            } else {
                centerIndex = idx;
                updateCinerama();
            }
        }

        function openZoomModal(imgSrc) {
            const modal = document.getElementById('photo-zoom-modal');
            const modalImg = document.getElementById('zoomed-image');
            modalImg.src = imgSrc;
            modal.style.display = "flex";

            setTimeout(() => {
                modal.classList.add('show');
            }, 10);

            document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
        }

        function closeZoomModal() {
            const modal = document.getElementById('photo-zoom-modal');
            modal.classList.remove('show');

            setTimeout(() => {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }, 300);
        }

        function startCineramaTimer() {
            cineramaInterval = setInterval(() => {
                if (items.length > 0) {
                    centerIndex = (centerIndex + 1) % items.length;
                    updateCinerama();
                }
            }, 5000);
        }

        // Pause on Hover for desktop
        const stage = document.querySelector('.cinerama-stage');
        if (stage) {
            stage.addEventListener('mouseenter', () => clearInterval(cineramaInterval));
            stage.addEventListener('mouseleave', () => {
                if (!userPaused) startCineramaTimer();
            });
        }

        // Start Initial
        if (items.length > 0) {
            updateCinerama();
            startCineramaTimer();
        }

        function switchTeam(type, btn) {
            document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.team-grid').forEach(g => g.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(\`grid-\${type}\`).classList.add('active');
        }

        window.addEventListener('scroll', () => {
            const reveals = document.querySelectorAll('.reveal');
            reveals.forEach(el => {
                if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                    el.classList.add('active');
                }
            });
        });
    </script>
<script>
        document.addEventListener('DOMContentLoaded', () => {
            const panels = document.querySelectorAll('.counter');

            const runStatCounter = (el) => {
                const target = +el.getAttribute('data-count');
                let count = 0;
                const speed = 2000;
                const inc = target / (speed / 16);

                const update = () => {
                    count += inc;
                    if (count < target) {
                        el.innerText = Math.ceil(count);
                        requestAnimationFrame(update);
                    } else {
                        el.innerText = target;
                    }
                };
                update();
            };

            const statObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        runStatCounter(entry.target);
                        statObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            panels.forEach(p => statObserver.observe(p));
        });
    </script>
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
`;

    return (
        <div ref={containerRef}>
            <div dangerouslySetInnerHTML={{ __html: htmlBefore }} />
            
            <div className="team-grid">
                {data.length > 0 ? data.map(item => (
                    
                    <div key={item.id} className="member-card">
                        <div className="member-img-wrap">
                            <img src={item.image} alt={item.name} />
                        </div>
                        <div className="member-info">
                            <h3 className="member-name">{item.name}</h3>
                            <p className="member-role" style={{ color: 'var(--accent-gold)' }}>{item.role}</p>
                        </div>
                    </div>
        
                )) : (
                    <div style={{textAlign: 'center', width: '100%', padding: '50px'}}>
                        <h3>No items found</h3>
                    </div>
                )}
            </div>
            
            <div dangerouslySetInnerHTML={{ __html: htmlAfter }} />
        </div>
    );
};

export default OriginalTeam;
