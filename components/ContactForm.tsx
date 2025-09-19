import React, { useRef, useState, useEffect } from 'react';
import Card from './common/Card';
import Button from './common/Button';

const ContactForm: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const inputClasses = "w-full bg-slate-900/50 border border-slate-700 text-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-brand-cyan transition-colors duration-200";

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
      id="contact" 
      ref={sectionRef}
      // Apply animation class when isVisible is true
      className={`py-20 sm:py-24 opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
      style={{ animationDelay: '0.6s' }}>
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-slate-100 tracking-tight">Ready to Secure Your AI Future?</h2>
        <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">Request a personalized demo and discover how arbitra.ai can transform your enterprise AI workflow.</p>
      </div>
      <div className="max-w-3xl mx-auto">
        <Card>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
                <input type="text" id="name" name="name" className={inputClasses} required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">Work Email</label>
                <input type="email" id="email" name="email" className={inputClasses} required />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="company" className="block text-sm font-medium text-slate-400 mb-2">Company</label>
                <input type="text" id="company" name="company" className={inputClasses} required />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">Message</label>
                <textarea id="message" name="message" rows={4} className={inputClasses}></textarea>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Button type="submit" variant="primary" className="w-full sm:w-auto">
                Submit Request
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default ContactForm;