
import React, { useRef, useState, useEffect } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import Modal from './common/Modal';
import TestimonialForm from './TestimonialForm';


const testimonialsData = [
  {
    quote: "arbitra.ai has revolutionized how we manage our AI prompts. The security and control it provides are unparalleled, giving us the confidence to deploy our most sensitive models.",
    name: "Jane Doe",
    title: "Chief Technology Officer",
    company: "Innovate Corp",
    avatar: "https://i.pravatar.cc/150?u=jane_doe"
  },
  {
    quote: "The ability to create custom, compliant licensing solutions has been a game-changer for our development workflow. We're moving faster and more securely than ever before.",
    name: "John Smith",
    title: "Head of AI Development",
    company: "Future Systems",
    avatar: "https://i.pravatar.cc/150?u=john_smith"
  },
  {
    quote: "The analytics dashboard is incredibly insightful. We can finally track prompt performance and ROI, which has been crucial for optimizing our AI investments.",
    name: "Emily White",
    title: "Senior Product Manager",
    company: "DataDriven Inc.",
    avatar: "https://i.pravatar.cc/150?u=emily_white"
  }
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
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-100 tracking-tight">Trusted by Industry Leaders</h2>
          <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">Hear what our customers have to say about arbitra.ai.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <Card key={index} className="flex flex-col justify-between">
              <div className="flex-grow">
                <svg className="w-10 h-10 text-brand-cyan/50 mb-4" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M9.33 6.984h5.328l-2.656 7.969h5.328v11.094h-13.313v-11.094l5.313-7.969zM22.016 6.984h5.328l-2.656 7.969h5.328v11.094h-13.313v-11.094l5.313-7.969z"></path>
                </svg>
                <blockquote className="text-slate-300 italic">"{testimonial.quote}"</blockquote>
              </div>
              <div className="mt-6 flex items-center">
                <img className="h-12 w-12 rounded-full object-cover flex-shrink-0" src={testimonial.avatar} alt={`Avatar of ${testimonial.name}`} />
                <div className="ml-4">
                  <p className="font-bold text-slate-100">{testimonial.name}</p>
                  <p className="text-sm text-slate-400">{testimonial.title}, {testimonial.company}</p>
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