import React, { useState, useEffect } from 'react';
import { ArrowUpIcon } from '../icons/Icons';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`
        fixed bottom-8 right-8 z-40
        bg-brand-cyan text-brand-dark
        h-14 w-14 rounded-full
        flex items-center justify-center
        shadow-[0_0_25px_rgba(0,246,255,0.5)]
        hover:shadow-[0_0_35px_rgba(0,246,255,0.8)]
        hover:-translate-y-1
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-cyan
        transition-all duration-300 transform
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}
      `}
      aria-label="Scroll to top"
    >
      <ArrowUpIcon className="h-7 w-7" />
    </button>
  );
};

export default ScrollToTopButton;
