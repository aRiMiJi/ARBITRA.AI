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
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={dividerRef} className="my-24 h-px w-full relative overflow-hidden bg-brand-gray/20">
      <div 
        className={`absolute top-0 h-full bg-brand-cyan transition-all duration-1000 ease-out ${isVisible ? 'left-0 w-full' : '-left-full w-0'}`}
        style={{
            boxShadow: '0 0 15px 2px #00f6ff'
        }}
      ></div>
    </div>
  );
};

export default AnimatedDivider;
