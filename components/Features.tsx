import React, { useRef, useState, useEffect } from 'react';
import Card from './common/Card';
import { LockIcon, CustomizeIcon, MonitorIcon } from './icons/Icons';

const featuresData = [
  {
    icon: <LockIcon className="h-10 w-10 text-brand-cyan mb-4" />,
    title: 'Enterprise-Grade Security',
    description: 'Protect your proprietary prompts with end-to-end encryption, access controls, and comprehensive audit trails. Fully compliant with industry standards.',
  },
  {
    icon: <CustomizeIcon className="h-10 w-10 text-brand-cyan mb-4" />,
    title: 'Custom Licensing Solutions',
    description: 'Develop and deploy custom AI prompt models tailored to your specific business needs. Our platform scales with you from development to production.',
  },
  {
    icon: <MonitorIcon className="h-10 w-10 text-brand-cyan mb-4" />,
    title: 'Advanced Monitoring',
    description: 'Gain real-time insights into prompt performance, usage, and costs. Optimize your AI investments with powerful analytics and reporting dashboards.',
  },
];

const Features: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger animation when the element is partially in view
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Stop observing after animation is triggered
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
      id="features" 
      ref={sectionRef}
      // Apply animation class when isVisible is true
      className={`py-20 sm:py-24 opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
      style={{ animationDelay: '0.2s' }}>
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-slate-100 tracking-tight">The Foundation for Your AI Strategy</h2>
        <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">arbitra.ai provides the critical infrastructure for managing your most valuable AI assets.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuresData.map((feature, index) => (
          <Card key={index}>
            <div className="flex flex-col items-center text-center">
              {feature.icon}
              <h3 className="text-2xl font-bold text-slate-100 mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Features;