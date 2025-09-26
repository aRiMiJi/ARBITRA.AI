import React, { useState } from 'react';
import { useAccessibility, personas, Persona } from '../contexts/AccessibilityContext';
import { AccessibilityIcon } from './icons/Icons';
import Modal from './common/Modal';

const AccessibilityToggle: React.FC = () => {
  const { persona, setPersona } = useAccessibility();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePersonaChange = (selectedPersona: Persona) => {
    setPersona(selectedPersona);
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 px-3 py-2 text-xs font-mono uppercase tracking-widest text-brand-gray hover:text-brand-cyan transition-colors duration-200 border-2 border-transparent focus:outline-none focus:border-brand-cyan"
        aria-haspopup="true"
        aria-expanded={isModalOpen}
        aria-label="Open accessibility options"
        title="Accessibility Personas"
      >
        <AccessibilityIcon className="h-5 w-5" />
      </button>
      
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Choose a mode to personalise experience"
      >
        <p className="text-brand-gray mb-6 text-center font-mono">
            Personalize your experience for disabilities.
        </p>
        <div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            role="radiogroup"
            aria-labelledby="modal-title"
        >
          {Object.entries(personas).map(([key, value]) => (
            <button
              key={key}
              onClick={() => handlePersonaChange(key as Persona)}
              className={`w-full text-left p-4 border-2 transition-all duration-200
                ${persona === key
                  ? 'bg-brand-cyan/20 border-brand-cyan shadow-[0_0_15px_theme(colors.brand.cyan/0.5)]'
                  : 'bg-brand-dark-accent border-brand-gray/30 hover:border-brand-cyan hover:bg-brand-dark-accent/50'
                }`
              }
              role="radio"
              aria-checked={persona === key}
            >
              <h3 className="font-sans font-bold text-brand-light uppercase">{value.name}</h3>
              <p className="text-sm text-brand-gray mt-1">{value.description}</p>
            </button>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default AccessibilityToggle;