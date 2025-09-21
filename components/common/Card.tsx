import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  isHighlighted?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', isHighlighted = false }) => {
  const baseClasses =
    'relative overflow-hidden bg-brand-dark-accent border-2 transition-all duration-300 p-8 h-full shadow-[0_8px_32px_0_#00fff711] hover:shadow-[0_0_24px_#ff760c38]';
  // Border and glow depend on highlight state.
  const highlightClasses = isHighlighted
    ? 'border-brand-orange shadow-[0_0_40px_4px_#ff760c72]'
    : 'border-brand-gray/30 hover:border-brand-cyan';

  return (
    <div className={`${baseClasses} ${highlightClasses} ${className}`}>
      {/* Subtle overlay for depth & glass/brutal feel */}
      <div className="absolute inset-0 bg-black/10 backdrop-brightness-95 pointer-events-none"></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Card;
