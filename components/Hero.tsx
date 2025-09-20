import React from 'react';
import Button from './common/Button';

const Hero: React.FC = () => {
  const mainPart = "arbitra";
  const accentPart = ".ai";

  return (
    <section className="text-center py-24 sm:py-32 lg:py-48">
      <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold tracking-tighter text-slate-100">
        <span className="relative">
          {/* Animate each character of the main part of the headline */}
          {mainPart.split('').map((char, index) => (
            <span
              key={index}
              className="inline-block opacity-0 animate-letter-in"
              style={{ animationDelay: `${100 + index * 75}ms` }}
            >
              {char}
            </span>
          ))}
          {/* Animate the accent part of the headline */}
          <span
            className="inline-block opacity-0 animate-letter-in text-brand-cyan"
            style={{ animationDelay: `${100 + mainPart.length * 75}ms` }}
          >
            {accentPart}
          </span>
          {/* Animate the underline to appear after the text */}
          <span
            className="absolute -bottom-2 left-0 w-full h-1 bg-brand-cyan/70 opacity-0 origin-left animate-scale-x"
            style={{ 
              animationDelay: `${300 + mainPart.length * 75}ms`,
              transform: 'scaleX(0)' // Set initial state
            }}
          ></span>
        </span>
      </h1>
      {/* Animate the tagline to appear after the headline */}
      <p 
        className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 opacity-0 animate-fade-in-up"
        style={{ animationDelay: '1000ms' }}
      >
        Secure, Compliant, and Scalable AI Prompt Licensing for the Modern Enterprise.
      </p>
      {/* Animate the buttons to appear last */}
      <div 
        className="mt-12 flex justify-center items-center gap-4 opacity-0 animate-fade-in-up"
        style={{ animationDelay: '1200ms' }}
      >
        <Button variant="primary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
          Request a Demo
        </Button>
        <Button variant="secondary" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
          Learn More
        </Button>
      </div>
    </section>
  );
};

export default Hero;