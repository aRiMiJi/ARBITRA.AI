import React from 'react';
import { useTypingEffect } from '../../hooks/useTypingEffect';

const BlinkingCursor: React.FC<{className?: string}> = ({className = ''}) => (
  <span className={`inline-block w-2.5 bg-brand-cyan ml-1 align-middle animate-flicker ${className}`} style={{ boxShadow: '0 0 5px #00f6ff' }} />
);

interface AnimatedTextProps {
  text: string;
  start: boolean;
  className?: string;
  delay?: number;
  as?: 'p' | 'span';
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, start, className = '', delay = 0, as = 'p' }) => {
  // Speed up typing for a better user experience on longer texts
  const { displayedText, isTyping } = useTypingEffect(text, start, delay, 30, 20);

  const Tag = as;

  const glowStyles: React.CSSProperties = {
    color: '#00f6ff',
    textShadow: '0 0 5px #00f6ff, 0 0 9px #00f6ff',
  };

  // Adjust cursor height based on parent text size for better alignment
  const cursorHeightClass = className.includes('text-lg') || className.includes('text-xl') ? 'h-5' : 'h-4';

  return (
    <Tag 
      className={className}
      // Apply glowing styles only when animation has started or is in progress
      style={ (isTyping || displayedText) ? glowStyles : { visibility: 'hidden' }}
      // Add aria-label for screen readers to read the full text immediately
      aria-label={text}
    >
      {displayedText}
      {isTyping && <BlinkingCursor className={cursorHeightClass} />}
      {/* This renders the text invisibly to hold the space, preventing layout shift */}
      {!(isTyping || displayedText) && <span className="opacity-0">{text}</span>}
    </Tag>
  );
};

export default AnimatedText;
