import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GoogleGenAI } from '@google/genai';

type GenAIContextType = {
  ai: GoogleGenAI | null;
};

const GenAIContext = createContext<GenAIContextType | undefined>(undefined);

export const GenAIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ai, setAi] = useState<GoogleGenAI | null>(null);

  useEffect(() => {
    try {
      // The API key must be provided from the environment variable `process.env.API_KEY`.
      // The SDK automatically handles the transport mechanism for web applications.
      const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
      setAi(genAI);
    } catch (e) {
      console.error("Failed to initialize GoogleGenAI", e);
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