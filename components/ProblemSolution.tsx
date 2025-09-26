import React, { useRef, useState, useEffect } from 'react';
import AnimatedDivider from './common/AnimatedDivider';

const ProblemSolution: React.FC = () => {
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

  const problems = [
    { title: "IP Leakage:", text: "Proprietary logic embedded in prompts can be easily copied, shared, or stolen." },
    { title: "Compliance Nightmares:", text: "No audit trails or version control, making regulatory compliance impossible." },
    { title: "Lack of Control:", text: "Inconsistent and unvetted prompts lead to unreliable AI outputs and security vulnerabilities." },
    { title: "No ROI Tracking:", text: "Impossible to measure the value and performance of your most critical AI assets." },
  ];

  const solutions = [
    { title: "Licensed & Encrypted:", text: "Prompts are treated as licensed assets with end-to-end encryption." },
    { title: "Audit-Ready:", text: "Immutable logs for every action, ensuring you're always ready for an audit." },
    { title: "Centralized Governance:", text: "A single source of truth for all prompts with robust access control." },
    { title: "Performance Analytics:", text: "Real-time dashboards to track usage, costs, and effectiveness." },
  ];

  return (
    <section
      id="solutions"
      ref={sectionRef}
      className={`py-20 sm:py-24`}
      aria-labelledby="problem-solution-heading"
    >
      <div className={`text-center mb-16 opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}>
        <div className="glitch-text-container" data-text="From Unmanaged Risk to Strategic Asset">
          <h2 id="problem-solution-heading" className="glitch-text text-4xl font-bold font-sans tracking-wider text-brand-light uppercase">
            From Unmanaged Risk to Strategic Asset
          </h2>
        </div>
        <p className="mt-4 text-lg text-brand-gray max-w-3xl mx-auto">
          The unregulated use of AI prompts exposes your organization to significant IP, security, and compliance risks. arbitra.ai transforms them into secure, manageable, and auditable assets.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Problem Side */}
        <div className={`border-2 border-brand-orange/50 p-8 bg-brand-dark/10 rounded-lg opacity-0 ${isVisible ? 'animate-fade-in-left' : ''}`}>
          <h3 className="text-2xl font-bold font-sans text-brand-orange uppercase mb-6">The Problem: Unsecured Prompts</h3>
          <ul className="space-y-4">
            {problems.map((item, index) => (
              <li
                key={index}
                className="flex items-start opacity-0"
                style={isVisible ? { animation: 'fadeInUp 0.6s ease-out forwards', animationDelay: `${0.2 + index * 0.1}s` } : {}}
              >
                <span className="text-brand-orange mr-4 mt-1 font-bold text-xl">✗</span>
                <p className="text-brand-gray">
                  <strong className="text-brand-light">{item.title}</strong> {item.text}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Solution Side */}
        <div className={`border-2 border-brand-cyan/50 p-8 bg-brand-dark/10 rounded-lg opacity-0 ${isVisible ? 'animate-fade-in-right' : ''}`}>
          <h3 className="text-2xl font-bold font-sans text-brand-cyan uppercase mb-6">The Solution: arbitra.ai</h3>
          <ul className="space-y-4">
            {solutions.map((item, index) => (
              <li
                key={index}
                className="flex items-start opacity-0"
                style={isVisible ? { animation: 'fadeInUp 0.6s ease-out forwards', animationDelay: `${0.2 + index * 0.1}s` } : {}}
              >
                <span className="text-brand-cyan mr-4 mt-1 font-bold text-xl">✓</span>
                <p className="text-brand-gray">
                  <strong className="text-brand-light">{item.title}</strong> {item.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <AnimatedDivider />
    </section>
  );
};

export default ProblemSolution;