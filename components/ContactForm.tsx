import React, { useRef, useState, useEffect } from 'react';
import Card from './common/Card';
import Button from './common/Button';

const ContactForm: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'submitted'>('idle');

  const inputClasses =
    "w-full bg-brand-dark/50 border-2 border-brand-gray/30 text-brand-light px-4 py-3 focus:outline-none focus:ring-0 focus:border-brand-cyan transition-colors duration-200 rounded-lg";

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setSubmitStatus('submitted');
    }, 1500);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`py-20 sm:py-24 opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
      style={{ animationDelay: '0.6s' }}
      aria-labelledby="contact-heading"
      aria-describedby="contact-description"
    >
      <p id="contact-description" className="sr-only">
        Contact arbitra.ai. Send us a message for questions or demo requests using the form below.
      </p>
      <div className="text-center mb-16">
        <div className="glitch-text-container" data-text="Contact Us">
          <h2 id="contact-heading" className="glitch-text text-4xl font-bold font-sans tracking-wider text-brand-light uppercase">
            Contact Us
          </h2>
        </div>
        <p className="mt-4 text-lg text-brand-gray max-w-3xl mx-auto">
          Have a question or want to request a demo? Fill out the form below and our team will get back to you shortly.
        </p>
      </div>
      <div className="max-w-3xl mx-auto">
        <Card>
          {submitStatus === 'submitted' ? (
            <div className="text-center py-12 animate-fade-in">
              <h3 className="text-2xl font-bold font-sans text-brand-cyan uppercase">Message Sent</h3>
              <p className="mt-4 text-brand-gray">Thank you for your interest. We will be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-brand-gray mb-2 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input type="text" id="name" name="name" className={inputClasses} required disabled={submitStatus === 'submitting'} />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-brand-gray mb-2 uppercase tracking-wider">
                    Work Email
                  </label>
                  <input type="email" id="email" name="email" className={inputClasses} required disabled={submitStatus === 'submitting'} />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="company" className="block text-xs font-medium text-brand-gray mb-2 uppercase tracking-wider">
                    Company
                  </label>
                  <input type="text" id="company" name="company" className={inputClasses} required disabled={submitStatus === 'submitting'} />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="message" className="block text-xs font-medium text-brand-gray mb-2 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea id="message" name="message" rows={4} className={inputClasses} disabled={submitStatus === 'submitting'} />
                </div>
              </div>
              <div className="mt-8 text-center">
                <Button type="submit" variant="primary" className="w-full sm:w-auto" disabled={submitStatus === 'submitting'}>
                  {submitStatus === 'submitting' ? 'Submitting...' : 'Submit Request'}
                </Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </section>
  );
};

export default ContactForm;