import React, { useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import HeroBanner from '../components/home/HeroBanner';
import CompanyIntro from '../components/home/CompanyIntro';
import ServicesSection from '../components/home/ServicesSection';
import ScaleCTA from '../components/home/ScaleCTA';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Testimonials from '../components/home/Testimonials';
import ImpactStats from '../components/home/ImpactStats';
import GlobalPresence from '../components/home/GlobalPresence';

const Home = () => {
    
    // Global Scroll Reveal Engine
    useEffect(() => {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const handleReveals = () => {
            document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up').forEach(el => {
                revealObserver.observe(el);
            });
        };
        
        handleReveals();

        // Optional: Re-run reveal check after a small delay in case images or fonts load slowly
        const timer = setTimeout(() => {
            handleReveals();
        }, 500);

        return () => {
            clearTimeout(timer);
            revealObserver.disconnect();
        };
    }, []);

    return (
        <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
            <main className="home-page-wrapper">
                <HeroBanner />
                <CompanyIntro />
                <ServicesSection />
                <ScaleCTA />
                <WhyChooseUs />
                <Testimonials />
                <ImpactStats />
                <GlobalPresence />
            </main>
        </ReactLenis>
    );
};

export default Home;
