
import React from 'react';
import Button from './common/Button';

const Hero: React.FC = () => {
  return (
    <section className="text-center py-24 sm:py-32 lg:py-48 opacity-0 animate-fade-in-up">
      <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold tracking-tighter text-slate-100">
        <span className="relative">
          arbitra.ai
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-brand-cyan/70"></span>
        </span>
      </h1>
      <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-slate-400">
        Secure, Compliant, and Scalable AI Prompt Licensing for the Modern Enterprise.
      </p>
      <div className="mt-12 flex justify-center items-center gap-4">
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
