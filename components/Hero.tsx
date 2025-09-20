import React, { useState, useEffect, FormEvent } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Button from './common/Button';
import { WandIcon, PlayIcon } from './icons/Icons';

// A simple blinking cursor component
const BlinkingCursor: React.FC = () => (
  <span className="inline-block w-2.5 h-7 bg-brand-cyan animate-flicker" />
);

const PromptGenerator: React.FC = () => {
    const [userInput, setUserInput] = useState('');
    const [optimizedPrompt, setOptimizedPrompt] = useState('// Your optimized, high-performance prompt will appear here.');
    const [testOutput, setTestOutput] = useState('');
    const [isLoadingPrompt, setIsLoadingPrompt] = useState(false);
    const [isLoadingOutput, setIsLoadingOutput] = useState(false);
    const [ai, setAi] = useState<GoogleGenAI | null>(null);

    useEffect(() => {
        if (process.env.API_KEY) {
            setAi(new GoogleGenAI({ apiKey: process.env.API_KEY }));
        }
    }, []);

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
            // FIX: Ensure response.text is not null or undefined before calling trim()
            setOptimizedPrompt((response.text ?? '').trim());
        } catch (error) {
            console.error("Error generating prompt:", error);
            setOptimizedPrompt("// Error: Could not generate the prompt. Please check API key and network status.");
        } finally {
            setIsLoadingPrompt(false);
        }
    };
    
    const handleTestOutput = async () => {
        if (!ai || !optimizedPrompt || isLoadingPrompt || isLoadingOutput || optimizedPrompt.startsWith('// Error')) return;

        setIsLoadingOutput(true);
        setTestOutput('');

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: optimizedPrompt,
            });
            // FIX: Ensure response.text is not null or undefined before calling trim()
            setTestOutput((response.text ?? '').trim());
        } catch (error) {
            console.error("Error generating test output:", error);
            setTestOutput("// Error: Could not generate the test output.");
        } finally {
            setIsLoadingOutput(false);
        }
    };

    const isGenerating = isLoadingPrompt || isLoadingOutput;
    
    return (
        <section id="hero" className="flex flex-col items-center justify-center text-center min-h-screen py-20" aria-labelledby="hero-heading">
            <div className="w-full max-w-4xl mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <div className="border-2 border-brand-dark-accent bg-brand-dark/50 p-6 sm:p-8">
                    <h1 id="hero-heading" className="text-4xl sm:text-5xl font-sans font-bold tracking-tighter uppercase text-brand-light mb-2">
                        ARBITRA<span className="text-brand-cyan" style={{ textShadow: '0 0 15px #00f6ff' }}>.AI</span> GOLD PROMPT GENERATOR
                    </h1>
                    <p className="text-brand-gray font-mono uppercase tracking-widest text-sm mb-8">
                        Turn simple ideas into high-performance, structured prompts.
                    </p>

                    <form onSubmit={handleGeneratePrompt} className="space-y-4">
                        <label htmlFor="user-input" className="sr-only">What do you want the AI to do?</label>
                        <textarea
                            id="user-input"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="What do you want the AI to do? (Type it in plain language, as you would ask a friend)"
                            className="w-full h-32 bg-brand-dark-accent border-2 border-brand-gray/30 text-brand-light p-4 font-mono focus:outline-none focus:ring-0 focus:border-brand-cyan transition-colors duration-200 resize-none"
                            disabled={isGenerating}
                        />
                        <div className="flex flex-col sm:flex-row gap-4">
                             <Button type="button" onClick={handleSuggestPrompt} variant="secondary" className="w-full sm:w-auto" disabled={isGenerating}>
                                <WandIcon className="h-5 w-5 inline-block mr-2"/>
                                Suggest Idea
                            </Button>
                            <Button type="submit" variant="primary" className="flex-grow" disabled={isGenerating || !userInput}>
                                {isLoadingPrompt ? 'Generating...' : 'Generate Gold Prompt'}
                            </Button>
                        </div>
                    </form>

                    {/* Optimized Prompt Output */}
                    <div className="mt-6">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-sm font-mono uppercase text-brand-gray tracking-widest text-left">
                               [ Optimized Prompt ]
                            </h3>
                            <Button 
                                onClick={handleTestOutput} 
                                variant="secondary" 
                                className="px-4 py-1 text-xs"
                                disabled={isGenerating || !optimizedPrompt || optimizedPrompt.startsWith('//')}
                            >
                                <PlayIcon className="h-4 w-4 inline-block mr-2"/>
                                Test Output
                            </Button>
                        </div>
                        <div className={`p-4 bg-brand-dark min-h-[160px] font-mono text-brand-light/90 text-sm border-2 border-brand-dark-accent text-left overflow-y-auto transition-shadow duration-300 ${isLoadingPrompt ? 'animate-pulse-glow border-brand-cyan/50' : ''}`}>
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
                            <h3 className="text-sm font-mono uppercase text-brand-gray tracking-widest mb-2 text-left">
                               [ Test Output ]
                            </h3>
                            <div className={`p-4 bg-brand-dark min-h-[160px] font-mono text-brand-light/90 text-sm border-2 border-brand-dark-accent text-left overflow-y-auto transition-shadow duration-300 ${isLoadingOutput ? 'animate-pulse-glow border-brand-cyan/50' : ''}`}>
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
            </div>
        </section>
    );
};

export default PromptGenerator;