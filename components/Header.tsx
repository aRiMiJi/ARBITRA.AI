import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-brand-dark-accent/80 backdrop-blur-lg border-b border-slate-800 animate-fade-in' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="text-2xl font-bold tracking-widest uppercase text-slate-100">
            arbitra<span className="text-brand-cyan">.ai</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-300 hover:text-brand-cyan transition-colors duration-200">Features</a>
            <a href="#pricing" className="text-slate-300 hover:text-brand-cyan transition-colors duration-200">Pricing</a>
            <a href="#contact" className="text-slate-300 hover:text-brand-cyan transition-colors duration-200">Contact</a>
          </nav>
          <a href="#contact" className="hidden md:inline-block px-5 py-2 border border-slate-600 text-slate-200 font-semibold hover:bg-slate-700 hover:text-white transition-colors duration-200">
            Request Demo
          </a>
          <div className="md:hidden">
            {/* Mobile menu button can be added here */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;