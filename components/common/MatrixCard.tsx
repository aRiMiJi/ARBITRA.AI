import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useTypingEffect } from '../../hooks/useTypingEffect';

interface MatrixCardProps {
  icon: React.ElementType;
  name: string;
  description: string;
  onLaunch: () => void;
}

const BlinkingCursor: React.FC = () => (
  <span className="inline-block w-2.5 h-4 bg-brand-cyan ml-1 align-middle animate-flicker" style={{ boxShadow: '0 0 5px #00f6ff' }} />
);


const MatrixCard: React.FC<MatrixCardProps> = ({ icon: Icon, name, description, onLaunch }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const { displayedText, isTyping } = useTypingEffect(description, isHovered, 100);


  const drawMatrix = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const characters = latin + nums;
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);

    const drops = Array(columns).fill(1).map(() => Math.floor(Math.random() * canvas.height));
    const colors = ['#00f6ff', '#ff7a00', '#EAEAEA'];

    const draw = () => {
      ctx.fillStyle = 'rgba(16, 16, 16, 0.1)'; // Slower fade for more visible trails
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `bold ${fontSize}px "IBM Plex Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        const randomColor = Math.random();
        if (randomColor > 0.98) ctx.fillStyle = colors[2]; // White highlight
        else if (randomColor > 0.85) ctx.fillStyle = colors[1]; // Orange
        else ctx.fillStyle = colors[0]; // Cyan
        
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationFrameId.current = requestAnimationFrame(draw);
    };
    draw();
  }, []);

  useEffect(() => {
    if (isHovered) {
      drawMatrix();
    } else {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    }
    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isHovered, drawMatrix]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group aspect-[4/5] bg-brand-dark-accent border-2 border-brand-gray/20 overflow-hidden transition-all duration-300 ease-in-out transform hover:border-brand-cyan hover:shadow-[0_0_32px_#00f6ff55] hover:-translate-y-1"
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 z-10 bg-brand-dark/60 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-300" />

      {/* Default Content */}
      <div className="relative z-20 p-6 flex flex-col h-full items-center justify-center text-center transition-opacity duration-300 group-hover:opacity-0 group-hover:pointer-events-none">
        <Icon className="h-16 w-16 text-brand-light transition-all duration-300 group-hover:scale-110 group-hover:text-brand-cyan group-hover:drop-shadow-[0_0_8px_theme(colors.brand.cyan)]" />
        <h3 className="mt-4 font-sans text-xl font-bold uppercase tracking-wider text-brand-light transition-colors duration-300 group-hover:text-brand-cyan">{name}</h3>
      </div>

      {/* Hover Content */}
      <div className="absolute inset-0 z-30 p-6 flex flex-col items-center justify-center text-center transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
        <div 
          className="text-brand-cyan mb-6 text-sm font-mono h-[7.5rem] text-left w-full transform transition-all duration-300 ease-out opacity-0 translate-y-12 group-hover:opacity-100 group-hover:translate-y-0 delay-100" 
          style={{ textShadow: '0 0 6px #00f6ff, 0 0 10px #00f6ff' }} // Brighter, more saturated glow
          aria-live="polite"
          aria-label={description}
        >
          {displayedText}
          {isTyping && <BlinkingCursor />}
        </div>
        <button 
          onClick={onLaunch}
          className="px-6 py-2 font-mono uppercase text-sm tracking-widest bg-transparent border-2 border-brand-cyan text-brand-cyan hover:bg-brand-cyan hover:text-brand-dark hover:shadow-[0_0_28px_#ffae51cc] hover:scale-105 transition-all duration-300 ease-out transform opacity-0 translate-y-12 group-hover:opacity-100 group-hover:translate-y-0 delay-200"
          aria-label={`Launch ${name}`}
        >
          Launch Tool
        </button>
      </div>
    </div>
  );
};

export default MatrixCard;
