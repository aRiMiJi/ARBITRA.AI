import React, { useState, useEffect } from 'react';
import Button from './common/Button';
import DemoModal from './DemoModal';
import AnimatedText from './common/AnimatedText';

/**
 * Hero Section - Enterprise Landing Page
 * Optimized for conversion with clear value proposition and trust signals
 */
const Hero: React.FC = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setStartAnimation(true), 500); // Start after main fade-in
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <section 
        id="hero" 
        className="relative flex flex-col items-center justify-center text-center min-h-[calc(100vh-80px)] py-20 overflow-hidden" 
        aria-labelledby="hero-heading"
      >
        {/* Background Video & Overlay */}
        <div className="absolute top-0 left-0 w-full h-full z-0" aria-hidden="true">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="https://placehold.co/1920x1080/101010/101010.png"
            className="w-full h-full object-cover"
          >
            <source 
              src="https://videos.pexels.com/video-files/3254011/3254011-hd_1920_1080_30fps.mp4" 
              type="video/mp4" 
            />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-brand-dark/80"></div>
        </div>

        {/* Main Content */}
        <div 
          className="relative z-10 w-full max-w-5xl mx-auto px-4 opacity-0 animate-fade-in-up" 
          style={{ animationDelay: '200ms' }}
        >
          {/* Main Headline - Outcome-focused */}
          <h1 
            id="hero-heading" 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-brand-light mb-6 leading-tight"
          >
            Enterprise AI Prompts That Pass Audits
            <span className="text-brand-cyan">—</span>
            <br className="hidden sm:block" />
            Not Just Tests
          </h1>

          {/* Subheadline - Value proposition with specifics */}
           <div className="text-base sm:text-lg md:text-xl font-mono max-w-3xl mx-auto mb-8 leading-relaxed h-28 sm:h-20 flex items-center justify-center">
            <AnimatedText
              text="The only platform that turns your AI prompts into licensed, NIST-compliant, audit-ready assets. Secure IP protection, blockchain licensing, and proven risk mitigation."
              start={startAnimation}
              className="text-base sm:text-lg md:text-xl text-brand-gray font-mono max-w-3xl mx-auto leading-relaxed"
            />
          </div>


          {/* Trust Bar - Compliance badges */}
          <div 
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-brand-gray/90 mb-10 px-4" 
            aria-label="Compliance certifications"
          >
            {/* Badge 1: NIST */}
            <div className="flex items-center gap-2 transition-colors hover:text-brand-cyan">
              <svg 
                className="w-4 h-4 sm:w-5 sm:h-5 text-brand-cyan flex-shrink-0" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                  clipRule="evenodd" 
                />
              </svg>
              <span className="whitespace-nowrap">NIST AI RMF 1.0 Aligned</span>
            </div>

            <span className="text-brand-gray/30 hidden sm:inline">|</span>

            {/* Badge 2: EU AI Act */}
            <div className="flex items-center gap-2 transition-colors hover:text-brand-cyan">
              <svg 
                className="w-4 h-4 sm:w-5 sm:h-5 text-brand-cyan flex-shrink-0" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                  clipRule="evenodd" 
                />
              </svg>
              <span className="whitespace-nowrap">EU AI Act Ready</span>
            </div>

            <span className="text-brand-gray/30 hidden sm:inline">|</span>

            {/* Badge 3: ISO */}
            <div className="flex items-center gap-2 transition-colors hover:text-brand-cyan">
              <svg 
                className="w-4 h-4 sm:w-5 sm:h-5 text-brand-cyan flex-shrink-0" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                  clipRule="evenodd" 
                />
              </svg>
              <span className="whitespace-nowrap">ISO/IEC 23894:2023</span>
            </div>
          </div>

          {/* CTA Buttons - Primary actions only */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="primary" 
              className="w-full sm:w-auto px-8 py-3 text-base sm:text-lg font-semibold shadow-lg shadow-brand-cyan/20 hover:shadow-brand-cyan/40 transition-all" 
              onClick={() => setIsDemoModalOpen(true)}
              aria-label="See live demo of Arbitra platform"
            >
              See Live Demo
            </Button>
            
            <a href="#tools" className="w-full sm:w-auto">
              <Button 
                variant="secondary" 
                className="w-full sm:w-auto px-8 py-3 text-base sm:text-lg font-semibold hover:border-brand-cyan transition-all"
                aria-label="Explore AI toolkit features"
              >
                Explore Toolkit
              </Button>
            </a>
          </div>

          {/* Tertiary CTA */}
          <div className="mt-8">
            <a 
              href="#contact" 
              className="font-mono text-sm text-brand-gray hover:text-brand-light transition-colors duration-300 group inline-flex items-center gap-2"
              aria-label="Request a custom demo"
            >
              Request a Custom Demo
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>

          {/* Optional: Social Proof */}
          <p className="text-xs sm:text-sm text-brand-gray/60 mt-4 font-mono">
            Trusted by Fortune 500 legal & compliance teams
          </p>
        </div>
      </section>

      {/* Demo Modal */}
      <DemoModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
      />
    </>
  );
};

export default Hero;
