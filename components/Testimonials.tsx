import React, { useRef, useState, useEffect } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import Modal from './common/Modal';
import TestimonialForm from './TestimonialForm';
import AnimatedText from './common/AnimatedText';

const testimonialsData = [
  {
    quote:
      "arbitra.ai has revolutionized how we manage our AI prompts. The security and control it provides are unparalleled, giving us the confidence to deploy our most sensitive models.",
    name: "Jane Doe",
    title: "Chief Technology Officer",
    company: "Innovate Corp",
    avatar: "https://placehold.co/150x150/1A1A1A/EAEAEA?text=JD",
  },
  {
    quote:
      "The ability to create custom, compliant licensing solutions has been a game-changer for our development workflow. We're moving faster and more securely than ever before.",
    name: "John Smith",
    title: "Head of AI Development",
    company: "Future Systems",
    avatar: "https://placehold.co/150x150/1A1A1A/EAEAEA?text=JS",
  },
  {
    quote:
      "The analytics dashboard is incredibly insightful. We can finally track prompt performance and ROI, which has been crucial for optimizing our AI investments.",
    name: "Emily White",
    title: "Senior Product Manager",
    company: "DataDriven Inc.",
    avatar: "https://placehold.co/150x150/1A1A1A/EAEAEA?text=EW",
  },
];

const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

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
    <>
      <section
        id="testimonials"
        ref={sectionRef}
        className={`py-20 sm:py-24`}
        aria-labelledby="testimonials-heading"
        aria-describedby="testimonials-description"
      >
        <p id="testimonials-description" className="sr-only">
          See how industry leaders are using arbitra.ai to revolutionize their AI workflows. Read customer testimonials about our security, control, and performance.
        </p>
        <div className={`text-center mb-16 opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <div className="glitch-text-container" data-text="Trusted by Industry Leaders">
            <h2
              id="testimonials-heading"
              className="glitch-text text-4xl font-bold font-sans tracking-wider text-brand-light uppercase"
            >
              Trusted by Industry Leaders
            </h2>
          </div>
          <div className="h-12 flex items-center justify-center">
            <AnimatedText
                text="Hear what our customers have to say about arbitra.ai."
                start={isVisible}
                delay={200}
                className="mt-4 text-lg text-brand-gray max-w-3xl mx-auto"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={index}
                className={`h-full group opacity-0 cursor-pointer ${isVisible ? 'animate-fade-in-up' : ''}`}
                style={{ animationDelay: `${index * 0.15}s` }}
                onClick={() => handleCardClick(index)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCardClick(index); }}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                aria-controls={`testimonial-content-${index}`}
                aria-label={`Read full testimonial from ${testimonial.name}, currently ${isActive ? 'expanded' : 'collapsed'}`}
              >
                <Card className="flex flex-col justify-between">
                   <div id={`testimonial-content-${index}`} className="flex flex-col justify-between h-full">
                    <div className="flex-grow">
                      <p className="text-8xl font-sans font-bold text-brand-cyan/20 leading-none">“</p>
                      <div className="relative -mt-8">
                        <blockquote className={`text-brand-light transition-all duration-500 ease-out ${isActive ? 'max-h-96' : 'max-h-24 overflow-hidden'}`}>
                          <AnimatedText as="span" text={`"${testimonial.quote}"`} start={isVisible} delay={index * 150 + 300} />
                        </blockquote>
                        {!isActive && testimonial.quote.length > 150 && (
                          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-brand-dark-accent to-transparent pointer-events-none" />
                        )}
                      </div>
                    </div>
                    <div className={`mt-6 flex items-center transition-all duration-300 ${isActive ? 'scale-105' : ''}`}>
                      <div className={`w-14 h-14 p-0.5 border-2 rounded-full transition-all duration-300 ${isActive ? 'border-brand-orange shadow-[0_0_15px_#ff7a00]' : 'border-transparent group-hover:border-brand-cyan'}`}>
                        <img
                          className="h-full w-full object-cover filter grayscale group-hover:grayscale-0 rounded-full transition-all duration-200"
                          src={testimonial.avatar}
                          alt={`Avatar of ${testimonial.name}`}
                        />
                      </div>
                      <div className="ml-4">
                        <p className={`font-bold font-sans text-brand-light uppercase transition-colors duration-300 ${isActive ? 'text-brand-orange' : 'text-brand-light'}`}>{testimonial.name}</p>
                        <p className="text-sm text-brand-gray">
                          {testimonial.title}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
        <div className={`mt-16 text-center opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '0.5s' }}>
          <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
            Share Your Experience
          </Button>
        </div>
      </section>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Share Your Experience">
        <TestimonialForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

export default Testimonials;
