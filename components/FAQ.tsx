import React, { useState, useRef, useEffect } from 'react';
import { PlusIcon, MinusIcon } from './icons/Icons';

const faqData = [
  {
    question: 'What is arbitra.ai?',
    answer:
      "arbitra.ai is an enterprise-grade platform for licensing, managing, and securing your company's AI prompts. It provides the critical infrastructure to protect your proprietary AI assets, monitor their usage, and ensure compliance.",
  },
  {
    question: 'How does arbitra.ai handle security?',
    answer:
      'Security is our top priority. We use end-to-end encryption for all prompts, provide granular role-based access controls, and maintain immutable audit trails for every action. Our platform is compliant with standards like SOC 2 and ISO 27001.',
  },
  {
    question: 'Can I create custom licensing models?',
    answer:
      'Absolutely. Our platform is designed for flexibility. You can create custom licensing solutions tailored to specific teams, projects, or use cases, ensuring your AI prompts are used efficiently and within your defined policies.',
  },
  {
    question: 'What kind of analytics do you provide?',
    answer:
      'arbitra.ai offers a powerful analytics dashboard with real-time insights into prompt performance, usage statistics, and cost analysis. This allows you to understand the ROI of your AI initiatives and optimize your investments.',
  },
  {
    question: 'Is there an on-premise deployment option?',
    answer:
      'Yes, we offer on-premise deployment for our Enterprise plan customers. This provides maximum control and security for organizations with strict data residency or privacy requirements. Please contact our sales team for more details.',
  },
];

const FAQItem: React.FC<{
  item: { question: string; answer: string };
  isOpen: boolean;
  onClick: () => void;
  index: number;
}> = ({ item, isOpen, onClick, index }) => {
  return (
    <div className="border-b-2 border-brand-dark-accent">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left py-6 group"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <span className={`text-lg font-medium font-sans uppercase transition-colors duration-200 ${isOpen ? 'text-brand-cyan' : 'text-brand-light'} group-hover:tracking-wider`}>
          {item.question}
        </span>
        {isOpen ? (
          <MinusIcon className="h-6 w-6 text-brand-cyan flex-shrink-0" />
        ) : (
          <PlusIcon className="h-6 w-6 text-brand-gray flex-shrink-0 group-hover:text-brand-cyan transition-colors" />
        )}
      </button>
      <div
        id={`faq-answer-${index}`}
        className="grid overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          gridTemplateRows: isOpen ? '1fr' : '0fr',
        }}
        aria-hidden={!isOpen}
      >
        <div className="min-h-0">
          <p className="pb-6 text-brand-gray leading-relaxed">{item.answer}</p>
        </div>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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

  const handleItemClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className={`py-20 sm:py-24 opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
      style={{ animationDelay: '0.8s' }}
      aria-labelledby="faq-heading"
    >
      <div className="text-center mb-16">
        <div className="glitch-text-container" data-text="Frequently Asked Questions">
          <h2 id="faq-heading" className="glitch-text text-4xl font-bold font-sans tracking-wider text-brand-light uppercase">
            Frequently Asked Questions
          </h2>
        </div>
        <p className="mt-4 text-lg text-brand-gray max-w-3xl mx-auto">
          Have questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
        </p>
      </div>
      <div className="max-w-4xl mx-auto">
        {faqData.map((item, index) => (
          <FAQItem
            key={index}
            index={index}
            item={item}
            isOpen={openIndex === index}
            onClick={() => handleItemClick(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQ;