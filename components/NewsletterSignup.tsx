import React, { useRef, useState, useEffect } from 'react';
import Card from './common/Card';
import Button from './common/Button';

const NewsletterSignup: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'submitted'>('idle');

  const inputClasses =
    "w-full bg-brand-dark/50 border-2 border-brand-gray/30 text-brand-light px-4 py-3 focus:outline-none focus:ring-0 focus:border-brand-cyan transition-colors duration-200 rounded-lg placeholder-brand-gray/70";

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
    if (!email) return;
    setSubmitStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setSubmitStatus('submitted');
    }, 1500);
  };

  return (
    <section
      id="newsletter"
      ref={sectionRef}
      className={`py-20 sm:py-24 opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
      style={{ animationDelay: '0.4s' }}
      aria-labelledby="newsletter-heading"
    >
      <div className="max-w-3xl mx-auto">
        <Card className="text-center">
          {submitStatus === 'submitted' ? (
            <div className="py-12 animate-fade-in">
              <h3 className="text-2xl font-bold font-sans text-brand-cyan uppercase">Subscription Confirmed!</h3>
              <p className="mt-4 text-brand-gray">Thank you for subscribing. Welcome to the future of AI security.</p>
            </div>
          ) : (
            <>
              <div className="glitch-text-container" data-text="Stay Ahead of the Curve">
                <h2 id="newsletter-heading" className="glitch-text text-3xl font-bold font-sans tracking-wider text-brand-light uppercase">
                  Stay Ahead of the Curve
                </h2>
              </div>
              <p className="mt-4 text-lg text-brand-gray max-w-2xl mx-auto">
                Stay updated on AI security trends, compliance news, and exclusive arbitra.ai product updates.
              </p>
              <form onSubmit={handleSubmit} className="mt-8 max-w-lg mx-auto flex flex-col sm:flex-row gap-4">
                <label htmlFor="newsletter-email" className="sr-only">Email Address</label>
                <input
                  type="email"
                  id="newsletter-email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${inputClasses} flex-grow`}
                  placeholder="your.email@enterprise.com"
                  required
                  disabled={submitStatus === 'submitting'}
                />
                <Button
                  type="submit"
                  variant="primary"
                  className="sm:w-auto"
                  disabled={submitStatus === 'submitting' || !email}
                >
                  {submitStatus === 'submitting' ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
            </>
          )}
        </Card>
      </div>
    </section>
  );
};

export default NewsletterSignup;