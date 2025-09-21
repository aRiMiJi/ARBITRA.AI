\import React, { useEffect } from 'react';
import { CloseIcon } from '../icons/Icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in bg-brand-dark/95 backdrop-blur-md"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative bg-brand-dark border-2 border-brand-dark-accent rounded-br-[2.5rem] w-full max-w-2xl max-h-[90vh] shadow-[0_0_48px_#00fff744] overflow-y-auto transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-brand-dark/80 backdrop-blur-sm z-10 flex items-center justify-between p-6 border-b-2 border-brand-dark-accent">
          <h2 className="text-2xl font-bold font-sans text-brand-light uppercase tracking-wide">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 text-brand-gray hover:text-brand-cyan transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-cyan"
            aria-label="Close modal"
            tabIndex={0}
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
