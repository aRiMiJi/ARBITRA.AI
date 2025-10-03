import React, { useState, FormEvent } from 'react';
import { useGenAI } from '../contexts/GenAIContext';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Button from './common/Button';
import CopyButton from './common/CopyButton';
import { WandIcon, PlayIcon, TypewriterLogo } from './icons/Icons';
import { getApiErrorMessage } from '../utils/errorUtils';
import ErrorDisplay from './common/ErrorDisplay';

// Blinking cursor animation for output areas
const BlinkingCursor: React.FC = () => (
  <span className="inline-block w-2.5 h-7 bg-brand-cyan animate-flicker" />
);

const GoldPromptGenerator: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [optimizedPrompt, setOptimizedPrompt] = useState('// Your optimized, high-performance prompt will appear here.');
  const [testOutput, setTestOutput] = useState('');
  const [isLoadingPrompt, setIsLoadingPrompt] = useState(false);
  const [isLoadingOutput, setIsLoadingOutput] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { ai } = useGenAI();

  const promptSuggestions = [
    "Write a python script to parse a CSV file.",
    "Summarize the latest news about AI.",
    "Create a marketing plan for a new product.",
    "Explain quantum computing to me like I'm five.",
    "Draft a legal disclaimer for a website."
  ];

  const handleSuggestPrompt = () => {
    const randomPrompt = promptSuggestions[Math.floor(Math.random() * promptSuggestions.length)];
    setUserInput(randomPrompt);
  };

  const handleGeneratePrompt = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!ai || !userInput || isLoadingPrompt || isLoadingOutput) return;

    setIsLoadingPrompt(true);
    setError(null);
    setOptimizedPrompt('');
    setTestOutput('');

    const metaPrompt = `You are a world-class AI prompt engineer. Your sole task is to take a user's simple, plain-language request and rewrite it into a comprehensive, structured, and highly-effective "gold standard" prompt for a large language model. The generated prompt should be model-agnostic.

The optimized prompt must be detailed and should include the following sections where appropriate:
- **Role & Goal:** Define the AI's persona and its primary objective.
- **Context:** Provide necessary background information.
- **Step-by-Step Instructions:** Give clear, unambiguous commands.
- **Constraints & Guardrails:** Specify what the AI should avoid.
- **Output Format:** Clearly define the desired structure of the response (e.g., JSON, Markdown, a specific template).
- **Example:** Provide a clear example of the desired input/output if applicable.

Do NOT generate the answer to the user's request. Only generate the rewritten, optimized prompt itself.

The user's simple request is: "${userInput}"`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: metaPrompt,
      });
      setOptimizedPrompt((response.text ?? '').trim());
    } catch (error) {
      const friendlyError = getApiErrorMessage(error);
      setError(friendlyError);
      setOptimizedPrompt(`// Error: ${friendlyError}`);
    } finally {
      setIsLoadingPrompt(false);
    }
  };

  const handleTestOutput = async () => {
    if (!ai || !optimizedPrompt || isLoadingPrompt || isLoadingOutput || optimizedPrompt.startsWith('//')) return;

    setIsLoadingOutput(true);
    setError(null);
    setTestOutput('');

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: optimizedPrompt,
      });
      setTestOutput((response.text ?? '').trim());
    } catch (error) {
      const friendlyError = getApiErrorMessage(error);
      setError(friendlyError);
      setTestOutput(`// Error: ${friendlyError}`);
    } finally {
      setIsLoadingOutput(false);
    }
  };

  const isGenerating = isLoadingPrompt || isLoadingOutput;

  return (
    <div className="w-full">
        <div className="sr-only" aria-live="assertive">
            {isLoadingPrompt && "Generating optimized prompt..."}
            {isLoadingOutput && "Generating test output..."}
        </div>
        <TypewriterLogo className="w-32 h-auto mx-auto mb-4 text-brand-light opacity-80" />
        <h2 id="gold-prompt-heading" className="text-3xl sm:text-4xl font-sans font-bold tracking-tighter uppercase text-brand-light mb-2 text-center">
            GOLD PROMPT GENERATOR
        </h2>
        <p className="text-brand-gray font-mono uppercase tracking-widest text-sm mb-8 text-center">
            Turn simple ideas into high-performance, structured prompts.
        </p>

        <form onSubmit={handleGeneratePrompt} className="space-y-4">
            <div className="flex justify-between items-center">
                <label htmlFor="user-input" className="block text-brand-gray font-mono uppercase tracking-widest text-sm">What do you want the AI to do?</label>
                <CopyButton textToCopy={userInput} label="Copy your simple prompt idea" />
            </div>
            <textarea
              id="user-input"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type it in plain language, as you would ask a friend"
              className="w-full h-32 bg-brand-dark-accent border-2 border-brand-gray/30 text-brand-light p-4 font-mono focus:outline-none focus:ring-0 focus:border-brand-cyan transition-colors duration-200 resize-none"
              disabled={isGenerating}
              aria-label="Your simple prompt idea"
            />
            <div className="flex flex-col sm:flex-row gap-4">
              <Button type="button" onClick={handleSuggestPrompt} variant="secondary" className="w-full sm:w-auto" disabled={isGenerating}>
                <WandIcon className="h-5 w-5 inline-block mr-2" />
                Suggest Idea
              </Button>
              <Button type="submit" variant="primary" className="flex-grow" disabled={isGenerating || !userInput}>
                {isLoadingPrompt ? 'Generating...' : 'Generate Gold Prompt'}
              </Button>
            </div>
          </form>

          <ErrorDisplay message={error} />

          {/* Optimized Prompt Output */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2 gap-2">
              <h3 id="optimized-prompt-heading" className="text-sm font-mono uppercase text-brand-gray tracking-widest text-left">
                [ Optimized Prompt ]
              </h3>
              <div className="flex items-center gap-2">
                <CopyButton textToCopy={optimizedPrompt} label="Copy Optimized Prompt to clipboard"/>
                <Button
                  onClick={handleTestOutput}
                  variant="secondary"
                  className="px-4 py-1 text-xs"
                  disabled={isGenerating || !optimizedPrompt || optimizedPrompt.startsWith('//')}
                >
                  <PlayIcon className="h-4 w-4 inline-block mr-2" />
                  Test Output
                </Button>
              </div>
            </div>
            <div
              aria-labelledby="optimized-prompt-heading"
              aria-live="polite"
              aria-atomic="true"
              aria-busy={isLoadingPrompt}
              className={`relative overflow-hidden scanline-container p-4 bg-brand-dark min-h-[160px] font-mono text-brand-light/90 text-sm border-2 border-brand-dark-accent text-left overflow-y-auto transition-shadow duration-300 ${isLoadingPrompt ? 'animate-pulse-glow border-brand-cyan/50' : ''}`}
            >
              {isLoadingPrompt && !optimizedPrompt ? <BlinkingCursor /> : (
                <SyntaxHighlighter
                  language="markdown"
                  style={vscDarkPlus}
                  customStyle={{ background: 'transparent', padding: '0', margin: '0', fontFamily: 'inherit', fontSize: 'inherit' }}
                  codeTagProps={{ style: { whiteSpace: 'pre-wrap', wordBreak: 'break-word' } }}
                >
                  {optimizedPrompt}
                </SyntaxHighlighter>
              )}
            </div>
          </div>

          {/* Test Output */}
          {(isLoadingOutput || testOutput) && (
            <div className="mt-6 animate-fade-in">
              <div className="flex justify-between items-center mb-2">
                <h3 id="test-output-heading" className="text-sm font-mono uppercase text-brand-gray tracking-widest text-left">
                  [ Test Output ]
                </h3>
                <CopyButton textToCopy={testOutput} label="Copy Test Output to clipboard" />
              </div>
              <div
                aria-labelledby="test-output-heading"
                aria-live="polite"
                aria-atomic="true"
                aria-busy={isLoadingOutput}
                className={`relative overflow-hidden scanline-container p-4 bg-brand-dark min-h-[160px] font-mono text-brand-light/90 text-sm border-2 border-brand-dark-accent text-left overflow-y-auto transition-shadow duration-300 ${isLoadingOutput ? 'animate-pulse-glow border-brand-cyan/50' : ''}`}
              >
                {isLoadingOutput && !testOutput ? <BlinkingCursor /> : (
                  <SyntaxHighlighter
                    language="markdown"
                    style={vscDarkPlus}
                    customStyle={{ background: 'transparent', padding: '0', margin: '0', fontFamily: 'inherit', fontSize: 'inherit' }}
                    codeTagProps={{ style: { whiteSpace: 'pre-wrap', wordBreak: 'break-word' } }}
                  >
                    {testOutput}
                  </SyntaxHighlighter>
                )}
              </div>
            </div>
          )}
    </div>
  );
};

export default GoldPromptGenerator;