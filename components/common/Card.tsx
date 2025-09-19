
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  isHighlighted?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', isHighlighted = false }) => {
  const baseClasses = 'bg-brand-dark-accent/50 border border-slate-800 backdrop-blur-sm transition-all duration-300 p-8';
  const highlightClasses = isHighlighted ? 'border-brand-cyan shadow-[0_0_30px_rgba(0,246,255,0.1)]' : 'hover:border-slate-600 hover:scale-[1.02]';

  return (
    <div className={`${baseClasses} ${highlightClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
