
import React, { useState, useEffect, FormEvent } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Button from './common/Button';
import { AlertIcon, CopyIcon } from './icons/Icons';
import { getApiErrorMessage } from '../utils/errorUtils';
import ErrorDisplay from './common/ErrorDisplay';


const BlinkingCursor: React.FC = () => (
  <div className="flex justify-center items-center h-full">
    <span className="inline-block w-2.5 h-7 bg-brand-orange animate-flicker" />
  </div>
);

const CopyButton: React.FC<{ textToCopy: string }> = ({ textToCopy }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (!textToCopy || isCopied) return;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }).catch(err => console.error('Failed to copy:', err));
  };
  
  const isDisabled = !textToCopy;

  return (
    <button
      onClick={handleCopy}
      disabled={isDisabled || isCopied}
      className={`px-3 py-1 text-xs font-mono uppercase tracking-widest flex items-center gap-2 bg-brand-dark-accent border-2 border-brand-gray/30 text-brand-gray hover:border-brand-cyan hover:text-brand-cyan disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-brand-gray/30 disabled:hover:text-brand-gray transition-all duration-200 ${isCopied ? '!border-brand-cyan !text-brand-cyan' : ''}`}
      aria-label={isCopied ? "Copied to clipboard" : "Copy to clipboard"}
    >
      <CopyIcon className="h-4 w-4" />
      {isCopied ? 'Copied!' : 'Copy'}
    </button>
  );
};

const IncidentMode: React.FC = () => {
  const [scenario, setScenario] = useState('');
  const [crisisPrompt, setCrisisPrompt] = useState('');
  const [mitigationPrompt, setMitigationPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ai, setAi] = useState<GoogleGenAI | null>(null);

  useEffect(() => {
    if (process.env.API_KEY) {
      setAi(new GoogleGenAI({ apiKey: process.env.API_KEY }));
    }
  }, []);

  const handleSimulate = async (e: FormEvent) => {
    e.preventDefault();
    if (!ai || !scenario || isLoading) return;
    setIsLoading(true);
    setError(null);
    setCrisisPrompt('');
    setMitigationPrompt('');

    const systemInstruction = `You are an expert in AI safety and red-teaming. Your task is to analyze a potential AI failure scenario described by the user. Based on this scenario, you must generate two distinct prompts in a JSON object format.
1. "crisisPrompt": A prompt designed to deliberately trigger the described failure for testing purposes. It should exploit ambiguities or lack of constraints.
2. "mitigationPrompt": A revised, hardened prompt that includes specific guardrails, structured instructions, and explicit constraints to prevent the failure.
Respond ONLY with the JSON object that adheres to the schema.

User's failure scenario: "${scenario}"`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: systemInstruction,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              crisisPrompt: {
                type: Type.STRING,
                description: "A prompt designed to cause the specified failure."
              },
              mitigationPrompt: {
                type: Type.STRING,
                description: "A prompt designed to prevent the specified failure."
              }
            },
            required: ["crisisPrompt", "mitigationPrompt"]
          }
        }
      });
      const result = JSON.parse(response.text);
      setCrisisPrompt(result.crisisPrompt);
      setMitigationPrompt(result.mitigationPrompt);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold font-sans tracking-wider text-brand-light uppercase">Incident Simulation</h2>
        <p className="mt-2 text-brand-gray max-w-2xl mx-auto">
          Describe a potential AI failure to generate prompts for red-teaming (attack) and hardening (defense).
        </p>
      </div>

      <form onSubmit={handleSimulate} className="flex-shrink-0">
        <label htmlFor="scenario-input" className="sr-only">Describe Failure Scenario</label>
        <textarea
          id="scenario-input"
          value={scenario}
          onChange={(e) => setScenario(e.target.value)}
          placeholder="e.g., 'An AI assistant gives harmful medical advice' or 'A chatbot leaks user data when asked cleverly'"
          className="w-full h-24 bg-brand-dark-accent border-2 border-brand-gray/30 text-brand-light p-4 font-mono focus:outline-none focus:ring-0 focus:border-brand-orange transition-colors duration-200 resize-none"
          disabled={isLoading}
        />
        <Button
          type="submit"
          variant="primary"
          className="w-full mt-4 !bg-brand-orange !shadow-[0_0_20px_theme(colors.brand-orange)]"
          disabled={isLoading || !scenario}
        >
          <AlertIcon className="h-5 w-5 inline-block mr-2" />
          {isLoading ? 'Simulating...' : 'Simulate Incident'}
        </Button>
      </form>

      <ErrorDisplay message={error} />

      <div className="flex-grow mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden">
        {/* Crisis Prompt */}
        <div className="flex flex-col border-2 border-brand-orange/50 bg-brand-dark/30 p-4 animate-fade-in">
          <div className="flex justify-between items-center border-b-2 border-brand-orange/30 pb-2 mb-2">
            <h3 className="font-mono uppercase text-brand-orange tracking-widest">
              [ Crisis Prompt // For Red Teaming ]
            </h3>
            <CopyButton textToCopy={crisisPrompt} />
          </div>
          <div className="flex-grow overflow-y-auto min-h-[150px]">
            {isLoading && !crisisPrompt ? <BlinkingCursor /> : crisisPrompt ? (
              <SyntaxHighlighter
                language="markdown"
                style={vscDarkPlus}
                customStyle={{
                  background: 'transparent',
                  padding: '0',
                  margin: '0',
                  fontFamily: 'inherit',
                  fontSize: '0.875rem'
                }}
                codeTagProps={{ style: { whiteSpace: 'pre-wrap', wordBreak: 'break-word' } }}
              >
                {crisisPrompt}
              </SyntaxHighlighter>
            ) : null}
          </div>
        </div>

        {/* Mitigation Prompt */}
        <div
          className="flex flex-col border-2 border-brand-cyan/50 bg-brand-dark/30 p-4 animate-fade-in"
          style={{ animationDelay: '200ms' }}
        >
          <div className="flex justify-between items-center border-b-2 border-brand-cyan/30 pb-2 mb-2">
            <h3 className="font-mono uppercase text-brand-cyan tracking-widest">
              [ Mitigation Prompt // For Defense ]
            </h3>
            <CopyButton textToCopy={mitigationPrompt} />
          </div>
          <div className="flex-grow overflow-y-auto min-h-[150px]">
            {isLoading && !mitigationPrompt ? <BlinkingCursor /> : mitigationPrompt ? (
              <SyntaxHighlighter
                language="markdown"
                style={vscDarkPlus}
                customStyle={{
                  background: 'transparent',
                  padding: '0',
                  margin: '0',
                  fontFamily: 'inherit',
                  fontSize: '0.875rem'
                }}
                codeTagProps={{ style: { whiteSpace: 'pre-wrap', wordBreak: 'break-word' } }}
              >
                {mitigationPrompt}
              </SyntaxHighlighter>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentMode;
