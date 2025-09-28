import React from 'react';
import Button from './common/Button';

// This is the new Hero section, now the default export
const Hero: React.FC = () => {
  const handleScrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToTools = () => {
    document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
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
          <source src="https://videos.pexels.com/video-files/3254011/3254011-hd_1920_1080_30fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-brand-dark/80"></div>
      </div>
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <h1 
          id="hero-heading" 
          className="text-4xl sm:text-6xl lg:text-7xl font-sans font-bold tracking-tighter uppercase text-brand-light mb-6"
        >
          SECURE<span className="text-brand-cyan">.</span> LICENSE<span className="text-brand-orange">.</span> AUDIT<span className="text-brand-cyan">.</span>
          <br />
          YOUR AI PROMPTS
        </h1>
        <p className="text-lg md:text-xl text-brand-gray font-mono max-w-3xl mx-auto mb-10">
          The enterprise-grade platform for managing, securing, and distributing your proprietary AI prompts as licensed assets.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={handleScrollToContact} variant="primary" className="w-full sm:w-auto">
            Request a Demo
          </Button>
          <Button onClick={handleScrollToTools} variant="secondary" className="w-full sm:w-auto">
            Explore Toolkit
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;