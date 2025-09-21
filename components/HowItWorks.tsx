import React, { useRef, useState, useEffect } from 'react';
import Card from './common/Card';

const steps = [
  {
    step: "01",
    title: "Create & Ingest",
    description: "Securely create new prompts in our editor or ingest existing ones via our API. All prompts are immediately encrypted and versioned.",
  },
  {
    step: "02",
    title: "License & Govern",
    description: "Define custom licensing policies and role-based access controls. Assign prompts to specific projects, teams, or applications.",
  },
  {
    step: "03",
    title: "Deploy & Monitor",
    description: "Integrate our secure SDK into your applications to call licensed prompts. Monitor usage, performance, and costs in real-time from your dashboard.",
  },
  {
    step: "04",
    title: "Audit & Optimize",
    description: "Leverage immutable audit trails for compliance. Use performance data to refine and optimize your prompts for maximum efficiency and ROI.",
  },
];

const HowItWorks: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
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
    <section
      id="how-it-works"
      ref={sectionRef}
      className={`py-20 sm:py-24 bg-brand-dark-accent/30 opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
      aria-labelledby="how-it-works-heading"
    >
      <div className="text-center mb-16">
        <h2 id="how-it-works-heading" className="text-4xl font-bold font-sans tracking-wider text-brand-light uppercase">How It Works</h2>
        <p className="mt-4 text-lg text-brand-gray max-w-3xl mx-auto">A streamlined, four-step process to secure and manage your entire prompt ecosystem.</p>
      </div>
      <div className="relative">
        {/* Connecting line for desktop */}
        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-brand-gray/30 -translate-y-1/2"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Dot on the line for desktop */}
              <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 bg-brand-dark border-2 border-brand-cyan rounded-full shadow-[0_0_10px_#00f6ff99]" />
              <Card>
                <div className="text-6xl font-black font-sans text-brand-cyan/30 mb-4 select-none">{step.step}</div>
                <h3 className="text-2xl font-bold font-sans text-brand-light uppercase mb-4">{step.title}</h3>
                <p className="text-brand-gray">{step.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
