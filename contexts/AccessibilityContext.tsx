import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

export const personas = {
  'default': { name: 'Default Mode', description: 'Standard viewing experience.' },
  'adhd-friendly': { name: 'ADHD Friendly', description: 'More focus & fewer distractions' },
  'astigmatism': { name: 'Astigmatism', description: 'Reduce glare and eye strain' },
  'blindness': { name: 'Blindness', description: 'Optimize page for screen-readers & keyboard' },
  'color-blindness': { name: 'Color Blindness', description: 'Easier to discern and distinguish colors' },
  'dyslexia-friendly': { name: 'Dyslexia Friendly', description: 'Optimize page for dyslexic users' },
  'epilepsy-safe': { name: 'Epilepsy Safe', description: 'Reduces motion to prevent adverse reactions' },
  'for-the-elderly': { name: 'For The Elderly', description: 'Clearer, easier interface, reduced distractions' },
  'low-vision': { name: 'Low Vision', description: 'Enhanced legibility and visual elements' },
  'motor-disabilities': { name: 'Motor Disabilities', description: 'Efficient navigation with keyboard & mouse' },
  'seizure-safe': { name: 'Seizure Safe', description: 'Removed flashes & softened color contrasts' },
  'keyboard-navigation': { name: 'Keyboard Navigation (Motor)', description: 'Full keyboard navigation support' },
};

export type Persona = keyof typeof personas;

type AccessibilityContextType = {
  persona: Persona;
  setPersona: (persona: Persona) => void;
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [persona, setPersona] = useState<Persona>(() => {
    if (typeof window !== 'undefined') {
      const storedPersona = localStorage.getItem('arbitra-persona');
      return (storedPersona as Persona) || 'default';
    }
    return 'default';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('arbitra-persona', persona);
      document.documentElement.setAttribute('data-persona', persona);
    }
  }, [persona]);

  const value = { persona, setPersona };

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};