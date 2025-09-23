import React, { useRef, useState, useEffect } from 'react';

const AnimatedDivider: React.FC = () => {
  const dividerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "-100px" }
    );

    const currentRef = dividerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={dividerRef}
      className="relative my-24 w-full h-[2px] overflow-visible"
      role="separator"
      aria-label="Section Divider"
    >
      {/* Subtle gray background */}
      <div className="absolute inset-0 bg-brand-gray/20 h-px" />
      
      {/* Cyan animated bar with cyber shimmer and glow */}
      <div
        className={`absolute top-0 h-full bg-brand-cyan transition-all duration-[1200ms] ease-out
          ${isVisible ? 'left-0 w-full' : '-left-full w-0'}
          will-change-transform
        `}
        style={{
          boxShadow: '0 0 25px 4px #00f6ff, 0 0 8px 1.5px #0ff',
          filter: 'drop-shadow(0 0 12px #00f6ffa0)',
        }}
      >
        {/* Brutal cyber edges */}
        <div className="absolute -right-1.5 top-0 h-full w-3 bg-gradient-to-r from-transparent via-cyan-200 to-white/5 pointer-events-none opacity-70 rotate-[1.5deg]" />
        <div className="absolute -left-1.5 top-0 h-full w-3 bg-gradient-to-l from-transparent via-cyan-200 to-white/5 pointer-events-none opacity-70 -rotate-[1.5deg]" />
      </div>
      {/* (Optional) Shimmer overlay for more effect */}
      <div
        className={`pointer-events-none absolute top-0 left-0 w-full h-full opacity-0 ${
          isVisible ? 'animate-pulse-slow opacity-80' : ''
        }`}
        style={{
          background:
            'linear-gradient(90deg, transparent, #00f6ff44 30%, transparent 70%)',
          // FIX: Changed invalid `mixBlendMode` value 'lighter' to 'lighten'.
          mixBlendMode: 'lighten',
        }}
      />
    </div>
  );
};

export default AnimatedDivider;
