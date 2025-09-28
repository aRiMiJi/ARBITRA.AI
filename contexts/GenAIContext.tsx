import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GoogleGenAI } from '@google/genai';

type GenAIContextType = {
  ai: GoogleGenAI | null;
};

const GenAIContext = createContext<GenAIContextType | undefined>(undefined);

export const GenAIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ai, setAi] = useState<GoogleGenAI | null>(null);

  useEffect(() => {
    if (process.env.API_KEY) {
      try {
        const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
        setAi(genAI);
      } catch (e) {
        console.error("Failed to initialize GoogleGenAI", e);
      }
    } else {
      console.warn("API_KEY environment variable not found.");
    }
  }, []);

  return <GenAIContext.Provider value={{ ai }}>{children}</GenAIContext.Provider>;
};

export const useGenAI = (): GenAIContextType => {
  const context = useContext(GenAIContext);
  if (context === undefined) {
    throw new Error('useGenAI must be used within a GenAIProvider');
  }
  return context;
};
