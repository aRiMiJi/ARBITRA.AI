import React from 'react';
import { ArbitraLogo } from '../icons/Icons';

const Preloader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-dark">
      <div className="relative">
        {/* Base logo with pulse animation */}
        <ArbitraLogo className="h-12 text-brand-light opacity-50 animate-pulse" />

        {/* Animated shine effect using a mask */}
        <div 
          className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-brand-cyan to-transparent animate-preloader-shine"
          style={{
            maskImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 28'%3E%3Ctext x='0' y='22' font-family='monospace' font-size='28' font-weight='bold' fill='white' letter-spacing='0.05em'%3EARBITRA.AI%3C/text%3E%3C/svg%3E")`,
            maskSize: '100% 100%',
            maskRepeat: 'no-repeat',
          }}
        ></div>
      </div>
      <p className="mt-4 font-mono text-sm uppercase tracking-widest text-brand-gray animate-pulse">
        Securing AI Prompts...
      </p>
    </div>
  );
};

export default Preloader;
