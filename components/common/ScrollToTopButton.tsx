import React, { useState, useEffect } from 'react';
import { ArrowUpIcon } from '../icons/Icons';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(window.pageYOffset > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`
        fixed bottom-6 left-6 z-40
        bg-brand-dark text-brand-cyan
        h-14 w-14
        flex items-center justify-center
        border-2 border-brand-cyan
        shadow-[0_2px_28px_#00f6ff44]
        rounded-[1.25rem]
        hover:bg-brand-cyan hover:text-brand-dark hover:shadow-[0_0_28px_#ffae51cc]
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-cyan
        transition-all duration-300 transform
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}
      `}
      style={{
        boxShadow: isVisible ? '0 0 32px #00f6ff55' : undefined,
      }}
      aria-label="Scroll to top"
      tabIndex={isVisible ? 0 : -1}
    >
      <ArrowUpIcon className="h-7 w-7" />
    </button>
  );
};

export default ScrollToTopButton;