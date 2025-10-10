import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  isHighlighted?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', isHighlighted = false }) => {
  const baseClasses =
    'relative overflow-hidden bg-brand-dark-accent border-2 transition-all duration-300 p-8 h-full transform hover:-translate-y-2';

  // All border and shadow logic is now here for clarity, with enhanced hover effects.
  const highlightClasses = isHighlighted
    ? 'border-brand-orange shadow-[0_0_40px_4px_#ff760c72] hover:shadow-[0_0_35px_5px_#ff760c88] hover:border-orange-400'
    : 'border-brand-gray/30 shadow-[0_8px_32px_0_#00fff711] hover:border-brand-cyan hover:shadow-[0_0_20px_#00f6ff44]';

  return (
    <div className={`${baseClasses} ${highlightClasses} ${className}`}>
      {/* Subtle overlay for depth & glass/brutal feel */}
      <div className="absolute inset-0 bg-black/10 backdrop-brightness-95 pointer-events-none"></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Card;