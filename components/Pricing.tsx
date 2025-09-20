import React, { useRef, useState, useEffect } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import { SOC2Badge, ISO27001Badge, GDPRBadge } from './icons/Icons';

const pricingPlans = [
  {
    name: 'Starter',
    price: '$49',
    period: '/ month',
    description: 'For individuals and small teams getting started with prompt management.',
    features: ['100 Licensed Prompts', 'Basic Security', 'Community Support', '1 Project'],
    isHighlighted: false,
  },
  {
    name: 'Pro',
    price: '$199',
    period: '/ month',
    description: 'For growing businesses that need advanced features and scalability.',
    features: ['Unlimited Prompts', 'Advanced Security & SSO', 'Priority Support', '10 Projects', 'API Access'],
    isHighlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large organizations requiring custom solutions and dedicated support.',
    features: ['Everything in Pro', 'Custom Integrations', 'Dedicated Account Manager', 'On-premise Deployment', 'SLA'],
    isHighlighted: false,
  },
];

const Pricing: React.FC = () => {
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
      id="pricing" 
      ref={sectionRef}
      // Apply animation class when isVisible is true
      className={`py-20 sm:py-24 opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
      style={{ animationDelay: '0.4s' }}>
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-slate-100 tracking-tight">Transparent & Scalable Pricing</h2>
        <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">Choose the plan that fits your needs. No hidden fees, ever.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {pricingPlans.map((plan, index) => (
          <Card key={index} isHighlighted={plan.isHighlighted} className="flex flex-col">
            {plan.isHighlighted && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-brand-cyan text-brand-dark text-sm font-bold tracking-wider uppercase">Most Popular</div>
            )}
            <div className="flex-grow">
              <h3 className="text-2xl font-bold text-slate-100">{plan.name}</h3>
              <div className="my-4">
                <span className="text-5xl font-extrabold text-white">{plan.price}</span>
                <span className="text-slate-400">{plan.period}</span>
              </div>
              <p className="text-slate-400 mb-8">{plan.description}</p>
              <ul className="space-y-4 text-slate-300">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <svg className="h-5 w-5 text-brand-cyan mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10">
              <Button variant={plan.isHighlighted ? 'primary' : 'secondary'} className="w-full">
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Trust Badges Section */}
      <div className="mt-24 text-center">
        <h3 className="text-sm font-semibold tracking-widest text-slate-500 uppercase">
          Security is built into every plan
        </h3>
        <div className="mt-8 flex justify-center items-center gap-8 filter grayscale hover:grayscale-0 transition-all duration-300">
          <SOC2Badge className="h-16 text-slate-400" />
          <ISO27001Badge className="h-16 text-slate-400" />
          <GDPRBadge className="h-16 text-slate-400" />
        </div>
      </div>
    </section>
  );
};

export default Pricing;