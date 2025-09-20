import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  isHighlighted?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', isHighlighted = false }) => {
  const baseClasses = 'relative bg-brand-dark-accent border-2 transition-all duration-300 p-8 h-full';
  
  // The border color now depends on the highlight state. 
  // Features section uses this for the orange "click" effect.
  // Pricing section uses this for the cyan "popular" effect.
  const highlightClasses = isHighlighted 
    ? 'border-brand-orange' 
    : 'border-brand-gray/30 hover:border-brand-cyan';

  return (
    <div className={`${baseClasses} ${highlightClasses} ${className}`}>
      <div className="absolute inset-0 bg-black/10 backdrop-brightness-95"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Card;