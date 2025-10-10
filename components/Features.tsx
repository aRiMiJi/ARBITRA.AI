import React, { useRef, useState, useEffect } from 'react';
import Card from './common/Card';
import AnimatedText from './common/AnimatedText';

const featuresData = [
  {
    title: "Secure Prompt Licensing",
    description: "Create, manage, and distribute licensed prompts with enterprise-grade security. Ensure your proprietary AI logic is protected.",
    delay: '0.2s',
  },
  {
    title: "Immutable Audit Trails",
    description: "Track every prompt's lifecycle with a verifiable, unchangeable history. Meet compliance requirements and gain full visibility.",
    delay: '0.4s',
  },
  {
    title: "Role-Based Access Control",
    description: "Define granular permissions for who can create, access, and deploy prompts. Maintain strict control over your AI assets.",
    delay: '0.6s',
  },
];

const Features: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
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

  const handleCardClick = (index: number) => {
    setActiveCard(index);
    window.setTimeout(() => setActiveCard(null), 220); // Slightly longer for visible effect
  };

  return (
    <section
      id="features"
      ref={sectionRef}
      className={`py-20 sm:py-24 opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
      aria-labelledby="features-heading"
    >
      <div className="text-center mb-16">
        <div className="glitch-text-container" data-text="Built for the Enterprise">
          <h2 id="features-heading" className="glitch-text text-4xl font-bold font-sans tracking-wider text-brand-light uppercase">
            Built for the Enterprise
          </h2>
        </div>
        <AnimatedText 
            text="arbitra.ai provides the critical infrastructure to secure, manage, and scale your AI development."
            start={isVisible}
            delay={200}
            className="mt-4 text-lg text-brand-gray max-w-3xl mx-auto"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuresData.map((feature, index) => {
          const delayMs = parseFloat(feature.delay) * 1000;
          return (
            <div
              key={index}
              className={`opacity-0 cursor-pointer select-none ${isVisible ? 'animate-fade-in-up' : ''}`}
              style={{ animationDelay: feature.delay }}
              onClick={() => handleCardClick(index)}
              tabIndex={0}
              role="button"
              aria-pressed={activeCard === index}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') handleCardClick(index);
              }}
            >
              <Card isHighlighted={activeCard === index}>
                <h3 className="text-2xl font-bold font-sans text-brand-light uppercase mb-4">{feature.title}</h3>
                <AnimatedText
                    text={feature.description}
                    start={isVisible}
                    delay={delayMs + 300}
                    className="text-brand-gray"
                />
              </Card>
            </div>
          )
        })}
      </div>
    </section>
  );
};

export default Features;
