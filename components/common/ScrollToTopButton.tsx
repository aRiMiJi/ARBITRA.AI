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
        fixed bottom-6 right-6 z-40
        bg-brand-dark text-brand-cyan
        h-14 w-14
        flex items-center justify-center
        border-2 border-brand-cyan
        hover:bg-brand-cyan hover:text-brand-dark
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