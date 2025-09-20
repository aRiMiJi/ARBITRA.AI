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
          if(currentRef) {
              observer.unobserve(currentRef);
          }
      };
    }, []);

  return (
    <section
        id="solutions"
        ref={sectionRef}
        className={`py-20 sm:py-24 opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
        aria-labelledby="problem-solution-heading"
    >
        <div className="text-center mb-16">
            <h2 id="problem-solution-heading" className="text-4xl font-bold font-sans tracking-wider text-brand-light uppercase">From Unmanaged Risk to Strategic Asset</h2>
            <p className="mt-4 text-lg text-brand-gray max-w-3xl mx-auto">The unregulated use of AI prompts exposes your organization to significant IP, security, and compliance risks. arbitra.ai transforms them into secure, manageable, and auditable assets.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Problem Side */}
            <div className={`border-2 border-brand-orange/50 p-8 ${isVisible ? 'animate-fade-in-left' : ''}`}>
                <h3 className="text-2xl font-bold font-sans text-brand-orange uppercase mb-6">The Problem: Unsecured Prompts</h3>
                <ul className="space-y-4">
                    <li className="flex items-start">
                        <span className="text-brand-orange mr-4 mt-1 font-bold text-xl">✗</span>
                        <p className="text-brand-gray"><strong className="text-brand-light">IP Leakage:</strong> Proprietary logic embedded in prompts can be easily copied, shared, or stolen.</p>
                    </li>
                    <li className="flex items-start">
                        <span className="text-brand-orange mr-4 mt-1 font-bold text-xl">✗</span>
                        <p className="text-brand-gray"><strong className="text-brand-light">Compliance Nightmares:</strong> No audit trails or version control, making regulatory compliance impossible.</p>
                    </li>
                    <li className="flex items-start">
                        <span className="text-brand-orange mr-4 mt-1 font-bold text-xl">✗</span>
                        <p className="text-brand-gray"><strong className="text-brand-light">Lack of Control:</strong> Inconsistent and unvetted prompts lead to unreliable AI outputs and security vulnerabilities.</p>
                    </li>
                     <li className="flex items-start">
                        <span className="text-brand-orange mr-4 mt-1 font-bold text-xl">✗</span>
                        <p className="text-brand-gray"><strong className="text-brand-light">No ROI Tracking:</strong> Impossible to measure the value and performance of your most critical AI assets.</p>
                    </li>
                </ul>
            </div>

            {/* Solution Side */}
            <div className={`border-2 border-brand-cyan/50 p-8 ${isVisible ? 'animate-fade-in-right' : ''}`}>
                <h3 className="text-2xl font-bold font-sans text-brand-cyan uppercase mb-6">The Solution: arbitra.ai</h3>
                 <ul className="space-y-4">
                    <li className="flex items-start">
                        <span className="text-brand-cyan mr-4 mt-1 font-bold text-xl">✓</span>
                        <p className="text-brand-gray"><strong className="text-brand-light">Licensed & Encrypted:</strong> Prompts are treated as licensed assets with end-to-end encryption.</p>
                    </li>
                    <li className="flex items-start">
                        <span className="text-brand-cyan mr-4 mt-1 font-bold text-xl">✓</span>
                        <p className="text-brand-gray"><strong className="text-brand-light">Audit-Ready:</strong> Immutable logs for every action, ensuring you're always ready for an audit.</p>
                    </li>
                    <li className="flex items-start">
                        <span className="text-brand-cyan mr-4 mt-1 font-bold text-xl">✓</span>
                        <p className="text-brand-gray"><strong className="text-brand-light">Centralized Governance:</strong> A single source of truth for all prompts with robust access control.</p>
                    </li>
                     <li className="flex items-start">
                        <span className="text-brand-cyan mr-4 mt-1 font-bold text-xl">✓</span>
                        <p className="text-brand-gray"><strong className="text-brand-light">Performance Analytics:</strong> Real-time dashboards to track usage, costs, and effectiveness.</p>
                    </li>
                </ul>
            </div>
        </div>
        <AnimatedDivider />
    </section>
  );
};

export default ProblemSolution;
