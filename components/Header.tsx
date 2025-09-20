import React, { useState, useEffect } from 'react';
import { ArbitraLogo } from './icons/Icons';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a 
      href={href} 
      onClick={(e) => handleNavClick(e, href.substring(1))}
      className="relative text-brand-light uppercase tracking-wider group pb-1"
    >
      {children}
      <span className="absolute bottom-0 left-0 h-0.5 bg-brand-cyan w-0 group-hover:w-full transition-all duration-300"></span>
    </a>
  );

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-brand-dark/90 border-b-2 border-brand-dark-accent animate-fade-in-down' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')} aria-label="Back to top">
            <ArbitraLogo className="h-8 text-brand-light" />
          </a>
          <nav className="hidden md:flex items-center space-x-10">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#solutions">Solutions</NavLink>
            <NavLink href="#how-it-works">How It Works</NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
            <NavLink href="#faq">FAQ</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </nav>
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="hidden md:inline-block relative px-5 py-2 text-brand-cyan uppercase tracking-wider border-2 border-brand-cyan/50 hover:bg-brand-cyan/10 transition-colors duration-200">
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