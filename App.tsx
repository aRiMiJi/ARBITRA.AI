
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import ScrollToTopButton from './components/common/ScrollToTopButton';

// This component creates a subtle, textured SVG background pattern.
const BackgroundTexture: React.FC = () => {
    const svgPattern = `
      <svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'>
        <defs>
          <filter id='noise' x='0' y='0' width='100%' height='100%'>
            <feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='2' stitchTiles='stitch'/>
          </filter>
        </defs>
        <rect width='100%' height='100%' filter='url(#noise)' opacity='0.05'/>
        <line x1='0' y1='0' x2='100' y2='100' stroke='#1f2937' stroke-width='1' opacity='0.2'/>
        <line x1='100' y1='0' x2='0' y2='100' stroke='#1f2937' stroke-width='1' opacity='0.2'/>
      </svg>
    `;
    const dataUrl = `url("data:image/svg+xml,${encodeURIComponent(svgPattern)}")`;
  
    return (
      <div 
        className="absolute inset-0 z-[-1] bg-brand-dark" 
        style={{ backgroundImage: dataUrl }}
      />
    );
};


const App: React.FC = () => {
  return (
    <div className="relative min-h-screen font-sans text-slate-300 bg-brand-dark overflow-x-hidden">
      <BackgroundTexture />
      
      {/* A subtle background glow element */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-cyan/5 rounded-full filter blur-3xl animate-pulse opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-cyan/5 rounded-full filter blur-3xl animate-pulse opacity-20 animation-delay-4000"></div>

      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <Features />
        <Pricing />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default App;
