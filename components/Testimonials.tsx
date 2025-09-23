import React, { useRef, useState, useEffect } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import Modal from './common/Modal';
import TestimonialForm from './TestimonialForm';

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
        className={`py-20 sm:py-24 opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
        style={{ animationDelay: '0.4s' }}
        aria-labelledby="testimonials-heading"
        aria-describedby="testimonials-description"
      >
        <p id="testimonials-description" className="sr-only">
          See how industry leaders are using arbitra.ai to revolutionize their AI workflows. Read customer testimonials about our security, control, and performance.
        </p>
        <div className="text-center mb-16">
          <h2
            id="testimonials-heading"
            className="text-4xl font-bold font-sans tracking-wider text-brand-light uppercase"
          >
            Trusted by Industry Leaders
          </h2>
          <p className="mt-4 text-lg text-brand-gray max-w-3xl mx-auto">
            Hear what our customers have to say about arbitra.ai.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <Card key={index} className="flex flex-col justify-between">
              <div className="flex-grow">
                <p className="text-8xl font-sans font-bold text-brand-cyan/20 leading-none">“</p>
                <blockquote className="text-brand-light -mt-8">"{testimonial.quote}"</blockquote>
              </div>
              <div className="mt-6 flex items-center">
                <div className="w-14 h-14 p-0.5 border-2 border-transparent hover:border-brand-cyan rounded-full transition-colors duration-200">
                  <img
                    className="h-full w-full object-cover filter grayscale hover:grayscale-0 rounded-full transition-all duration-200"
                    src={testimonial.avatar}
                    alt={`Avatar of ${testimonial.name}`}
                  />
                </div>
                <div className="ml-4">
                  <p className="font-bold font-sans text-brand-light uppercase">{testimonial.name}</p>
                  <p className="text-sm text-brand-gray">
                    {testimonial.title}, {testimonial.company}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-16 text-center">
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
