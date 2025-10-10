import React, { useEffect, useRef } from 'react';
import { CloseIcon } from '../icons/Icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    if (isOpen) {
      triggerRef.current = document.activeElement;
      window.addEventListener('keydown', handleEsc);
      window.setTimeout(() => {
        const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements && focusableElements.length > 0) {
            focusableElements[0].focus();
        } else {
            modalRef.current?.focus();
        }
      }, 100); // Delay focus to allow for transitions
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      if (triggerRef.current instanceof HTMLElement) {
        triggerRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);


  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in bg-brand-dark/95 backdrop-blur-md"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="relative bg-brand-dark border-2 border-brand-dark-accent rounded-br-[2.5rem] w-full max-w-2xl max-h-[90vh] shadow-[0_0_48px_#00fff744] overflow-y-auto transition-all duration-300 flex flex-col"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <header className="sticky top-0 bg-brand-dark/80 backdrop-blur-sm z-10 flex items-center justify-between p-6 border-b-2 border-brand-dark-accent flex-shrink-0">
          <h2 id="modal-title" className="text-2xl font-bold font-sans text-brand-light uppercase tracking-wide">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 text-brand-gray hover:text-brand-cyan transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-cyan"
            aria-label="Close modal"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </header>
        <div className="p-6 flex-grow">{children}</div>
      </div>
    </div>
  );
};

export default Modal;