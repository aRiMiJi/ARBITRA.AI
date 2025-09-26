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

  const handleButtonClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className={`py-20 sm:py-24`}
      aria-labelledby="pricing-heading"
      aria-describedby="pricing-description"
    >
      <p id="pricing-description" className="sr-only">
        Transparent and scalable pricing plans for arbitra.ai. Choose from Starter, Pro, and custom Enterprise solutions to fit your team's needs.
      </p>
      <div className={`text-center mb-16 opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}>
        <div className="glitch-text-container" data-text="Transparent & Scalable Pricing">
          <h2 id="pricing-heading" className="glitch-text text-4xl font-bold font-sans tracking-wider text-brand-light uppercase">Transparent & Scalable Pricing</h2>
        </div>
        <p className="mt-4 text-lg text-brand-gray max-w-3xl mx-auto">
          Choose the plan that fits your needs. No hidden fees, ever.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`h-full opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <Card
              className={`flex flex-col ${plan.isHighlighted ? 'border-brand-cyan shadow-[0_0_32px_#00fff7cc]' : ''}`}
              isHighlighted={plan.isHighlighted}
            >
              {plan.isHighlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-brand-cyan text-brand-dark text-sm font-bold tracking-widest uppercase shadow-lg ring-2 ring-brand-cyan/40">
                  Most Popular
                </div>
              )}
              <div className="flex-grow">
                <h3 className="text-2xl font-bold font-sans text-brand-light uppercase">{plan.name}</h3>
                <div className="my-4">
                  <span className="text-5xl font-bold font-sans text-white">{plan.price}</span>
                  <span className="text-brand-gray">{plan.period}</span>
                </div>
                <p className="text-brand-gray mb-8 h-20">{plan.description}</p>
                <ul className="space-y-4 text-brand-light">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="text-brand-cyan mr-3 font-bold">+</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10">
                <Button onClick={handleButtonClick} variant={plan.isHighlighted ? 'primary' : 'secondary'} className="w-full">
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <div className={`mt-24 text-center opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '0.5s' }}>
        <h3 className="text-sm font-bold tracking-widest text-brand-gray uppercase">
          Security is built into every plan
        </h3>
        <div className="mt-8 flex justify-center items-center gap-4 sm:gap-8 flex-wrap">
          <SOC2Badge />
          <ISO27001Badge />
          <GDPRBadge />
        </div>
      </div>
    </section>
  );
};

export default Pricing;