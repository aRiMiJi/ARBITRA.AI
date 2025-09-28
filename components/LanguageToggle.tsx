import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { GlobeIcon, ChevronDownIcon } from './icons/Icons';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'jp', name: '日本語' },
  { code: 'de', name: 'Deutsch' },
  { code: 'fa', name: 'فارسی' },
];

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode: 'en' | 'jp' | 'de' | 'fa') => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-xs font-mono uppercase tracking-widest text-brand-gray hover:text-brand-cyan transition-colors duration-200 border-2 border-transparent focus:outline-none focus:border-brand-cyan"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Select language"
      >
        <GlobeIcon className="h-4 w-4" />
        <span>{language}</span>
        <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className="absolute top-full right-0 mt-2 w-40 bg-brand-dark-accent border-2 border-brand-gray/30 shadow-lg animate-fade-in-down z-50"
          role="menu"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code as 'en' | 'jp' | 'de' | 'fa')}
              className="w-full text-left px-4 py-2 text-sm font-mono text-brand-light hover:bg-brand-cyan hover:text-brand-dark transition-colors duration-200"
              role="menuitem"
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageToggle;
