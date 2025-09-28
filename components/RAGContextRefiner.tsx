import React, { useState } from 'react';
import { useGenAI } from '../contexts/GenAIContext';
import { Type } from '@google/genai';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Button from './common/Button';
import ErrorDisplay from './common/ErrorDisplay';
import { getApiErrorMessage } from '../utils/errorUtils';

type Chunk = {
    id: number;
    text: string;
    isIncluded: boolean;
};

const BlinkingCursor: React.FC = () => (
    <div className="flex justify-center items-center h-full">
      <span className="inline-block w-2.5 h-7 bg-brand-cyan animate-flicker" />
    </div>
);

const RAGContextRefiner: React.FC = () => {
    const { ai } = useGenAI();
    const [step, setStep] = useState(1);
    const [query, setQuery] = useState('');
    const [context, setContext] = useState('');
    const [chunks, setChunks] = useState<Chunk[]>([]);
    const [finalResponse, setFinalResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleRetrieveChunks = async () => {
        if (!ai || !query || !context) return;
        setIsLoading(true);
        setError(null);
        setChunks([]);

        const systemInstruction = `Based on the user's query, split the following document into a JSON array of self-contained, meaningful text chunks. Each chunk should be a string. Aim for 5-8 reasonably sized chunks.
        QUERY: "${query}"
        DOCUMENT: "${context}"`;

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: systemInstruction,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                    }
                }
            });
            const result = JSON.parse(response.text);
            const retrievedChunks = result.map((text: string, index: number) => ({ id: index, text, isIncluded: true }));
            setChunks(retrievedChunks);
            setStep(2);
        } catch (err) {
            setError(getApiErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerateResponse = async () => {
        if (!ai) return;
        const includedChunks = chunks.filter(c => c.isIncluded).map(c => c.text);
        if (includedChunks.length === 0) {
            setError("At least one context chunk must be selected.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setFinalResponse('');

        const refinedContext = includedChunks.join('\n---\n');
        const systemInstruction = `Using ONLY the following context, provide a comprehensive answer to the user's query. If the context does not contain the answer, state that.
        CONTEXT: "${refinedContext}"
        QUERY: "${query}"`;

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: systemInstruction,
            });
            setFinalResponse(response.text ?? '');
            setStep(3);
        } catch (err) {
            setError(getApiErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    };

    const toggleChunk = (id: number) => {
        setChunks(chunks.map(c => c.id === id ? { ...c, isIncluded: !c.isIncluded } : c));
    };

    const reset = () => {
        setStep(1);
        setQuery('');
        setContext('');
        setChunks([]);
        setFinalResponse('');
        setError(null);
    }

    return (
        <div className="flex flex-col h-full min-h-[75vh]">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold font-sans tracking-wider text-brand-light uppercase">Interactive RAG Context Refiner</h2>
                <p className="mt-2 text-brand-gray max-w-2xl mx-auto">Review and refine retrieved context before it's sent to the LLM for a more accurate response.</p>
            </div>
            
            {/* Step 1: Input */}
            {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                    <div>
                        <label htmlFor="rag-query" className="block text-xs font-mono uppercase tracking-wider text-brand-gray mb-2">1. Your Query</label>
                        <input id="rag-query" type="text" value={query} onChange={e => setQuery(e.target.value)} className="w-full bg-brand-dark-accent border-2 border-brand-gray/30 text-brand-light p-3 font-mono focus:outline-none focus:ring-0 focus:border-brand-cyan" />
                    </div>
                    <div>
                        <label htmlFor="rag-context" className="block text-xs font-mono uppercase tracking-wider text-brand-gray mb-2">2. Your Document/Context</label>
                        <textarea id="rag-context" value={context} onChange={e => setContext(e.target.value)} rows={10} className="w-full bg-brand-dark-accent border-2 border-brand-gray/30 text-brand-light p-3 font-mono focus:outline-none focus:ring-0 focus:border-brand-cyan resize-y" />
                    </div>
                    <Button onClick={handleRetrieveChunks} variant="primary" className="w-full" disabled={isLoading || !query || !context}>{isLoading ? "Retrieving..." : "Retrieve & Refine Context"}</Button>
                    <ErrorDisplay message={error} />
                </div>
            )}

            {/* Step 2: Refine */}
            {step === 2 && (
                 <div className="flex flex-col flex-grow min-h-0 animate-fade-in">
                    <h3 className="font-mono uppercase text-brand-gray tracking-widest mb-2">3. Refine Retrieved Context ({chunks.filter(c => c.isIncluded).length}/{chunks.length} selected)</h3>
                    <div className="flex-grow overflow-y-auto border-2 border-brand-dark-accent p-2 space-y-2">
                        {chunks.map(chunk => (
                            <div key={chunk.id} className={`p-3 border-2 transition-colors cursor-pointer ${chunk.isIncluded ? 'border-brand-cyan bg-brand-cyan/10' : 'border-transparent hover:bg-brand-dark-accent'}`} onClick={() => toggleChunk(chunk.id)}>
                               <p className="text-sm text-brand-light font-mono">{chunk.text}</p>
                            </div>
                        ))}
                    </div>
                    <Button onClick={handleGenerateResponse} variant="primary" className="w-full mt-4" disabled={isLoading}>{isLoading ? "Generating..." : "Generate Response with Refined Context"}</Button>
                     <ErrorDisplay message={error} />
                </div>
            )}

            {/* Step 3: Output */}
            {step === 3 && (
                <div className="flex flex-col flex-grow min-h-0 animate-fade-in">
                    <h3 className="font-mono uppercase text-brand-gray tracking-widest mb-2">4. Final Response</h3>
                     <div className="relative flex-grow border-2 border-brand-dark-accent bg-brand-dark/50 p-4 overflow-y-auto scanline-container">
                        {isLoading ? <BlinkingCursor /> : (
                            <SyntaxHighlighter language="markdown" style={vscDarkPlus} customStyle={{ background: 'transparent', padding: '0', margin: '0' }} codeTagProps={{ style: { whiteSpace: 'pre-wrap' } }}>
                                {finalResponse}
                            </SyntaxHighlighter>
                        )}
                    </div>
                    <Button onClick={reset} variant="secondary" className="w-full mt-4">Start Over</Button>
                </div>
            )}
        </div>
    );
};

export default RAGContextRefiner;
