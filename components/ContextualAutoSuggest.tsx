import React, { useState, useEffect, useCallback } from 'react';
import { useGenAI } from '../contexts/GenAIContext';
import { Type } from '@google/genai';
import Button from './common/Button';
import ErrorDisplay from './common/ErrorDisplay';
import { getApiErrorMessage } from '../utils/errorUtils';
import CopyButton from './common/CopyButton';

// A simple debounce hook
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

const ContextualAutoSuggest: React.FC = () => {
  const { ai } = useGenAI();
  const [context, setContext] = useState('');
  const [prompt, setPrompt] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedPrompt = useDebounce(prompt, 1000);

  const fetchSuggestions = useCallback(async () => {
    if (!ai || !debouncedPrompt || debouncedPrompt.length < 15) {
        setSuggestions([]);
        return;
    }
    
    setIsLoading(true);
    setError(null);

    const systemInstruction = `You are an AI assistant that helps users write better prompts. Given the user's context and their current draft, provide 3 brief, distinct, and actionable suggestions to improve or continue the prompt. The suggestions could be rephrasing, adding detail, or specifying a format.
Return a JSON object with a "suggestions" key containing an array of 3 strings.
CONTEXT: "${context || 'No context provided.'}"
DRAFT: "${debouncedPrompt}"`;

    try {
      const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              suggestions: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ['suggestions']
          }
        }
      });
      const response = await chat.sendMessage({ message: systemInstruction });
      const result = JSON.parse(response.text);
      setSuggestions(result.suggestions || []);
    } catch (err) {
      setError(getApiErrorMessage(err));
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, [ai, debouncedPrompt, context]);

  useEffect(() => {
    fetchSuggestions();
  }, [fetchSuggestions]);
  
  const applySuggestion = (suggestion: string) => {
    setPrompt(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="flex flex-col h-full min-h-[75vh]">
        <div className="text-center mb-8">
            <h2 className="text-2xl font-bold font-sans tracking-wider text-brand-light uppercase">Contextual Suggester</h2>
            <p className="mt-2 text-brand-gray max-w-2xl mx-auto">
                Provide context and start writing your prompt. The AI will offer real-time suggestions to improve it.
            </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
            {/* Context & Prompt Input */}
            <div className="flex flex-col gap-6">
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label htmlFor="context-input" className="block text-xs font-mono uppercase tracking-wider text-brand-gray">Context (Optional)</label>
                        <CopyButton textToCopy={context} label="Copy context to clipboard" />
                    </div>
                    <textarea
                        id="context-input"
                        value={context}
                        onChange={e => setContext(e.target.value)}
                        placeholder="Paste any relevant context, data, or documents here..."
                        className="w-full h-48 bg-brand-dark-accent border-2 border-brand-gray/30 text-brand-light p-4 font-mono focus:outline-none focus:ring-0 focus:border-brand-cyan transition-colors duration-200 resize-y"
                    />
                </div>
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label htmlFor="prompt-input" className="block text-xs font-mono uppercase tracking-wider text-brand-gray">Your Prompt</label>
                        <CopyButton textToCopy={prompt} label="Copy your prompt to clipboard" />
                    </div>
                    <textarea
                        id="prompt-input"
                        value={prompt}
                        onChange={e => setPrompt(e.target.value)}
                        placeholder="Start typing your prompt (at least 15 characters)..."
                        className="w-full h-48 bg-brand-dark-accent border-2 border-brand-gray/30 text-brand-light p-4 font-mono focus:outline-none focus:ring-0 focus:border-brand-cyan transition-colors duration-200 resize-y"
                    />
                </div>
            </div>

            {/* Suggestions */}
            <div className="flex flex-col">
                <h3 className="font-mono uppercase text-brand-gray tracking-widest mb-2 text-center">Suggestions</h3>
                <div className="relative flex-grow border-2 border-brand-dark-accent bg-brand-dark/50 p-4">
                    {isLoading && <p className="text-brand-cyan animate-pulse">Analyzing...</p>}
                    {!isLoading && suggestions.length === 0 && <p className="text-brand-gray text-center">Suggestions will appear here as you type.</p>}
                    <div className="space-y-4">
                        {suggestions.map((s, i) => (
                            <button key={i} onClick={() => applySuggestion(s)} className="w-full text-left p-4 border-2 border-brand-gray/30 hover:border-brand-cyan hover:bg-brand-cyan/10 transition-colors duration-200 animate-fade-in">
                                <p className="text-brand-light font-mono text-sm">{s}</p>
                            </button>
                        ))}
                    </div>
                </div>
                <ErrorDisplay message={error} />
            </div>
        </div>
    </div>
  );
};

export default ContextualAutoSuggest;