import React, { useState, useEffect, FormEvent, DragEvent, useRef } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Button from './common/Button';
import { DnaIcon, ShuffleIcon } from './icons/Icons';

type DnaBlock = {
  id: string;
  name: string;
  content: string;
};

const BlinkingCursor: React.FC = () => (
  <span className="inline-block w-2.5 h-7 bg-brand-cyan animate-flicker" />
);

const PromptDnaVisualizer: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [promptDna, setPromptDna] = useState<DnaBlock[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ai, setAi] = useState<GoogleGenAI | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [editingBlock, setEditingBlock] = useState<{ id: string, content: string } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const blockColors = [
    'border-brand-cyan',
    'border-brand-orange',
    'border-brand-gray/80',
    'border-brand-cyan/70',
    'border-brand-orange/70',
    'border-brand-gray/60'
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if(currentRef) observer.unobserve(currentRef) };
  }, []);

  useEffect(() => {
    if (process.env.API_KEY) {
      setAi(new GoogleGenAI({ apiKey: process.env.API_KEY }));
    }
  }, []);

  useEffect(() => {
    const promptText = promptDna.map(block => `### ${block.name}\n${block.content}`).join('\n\n');
    setGeneratedPrompt(promptText);
  }, [promptDna]);

  useEffect(() => {
    if (editingBlock && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [editingBlock]);

  const handleGenerateDna = async (e?: FormEvent, mutate = false) => {
    if (e) e.preventDefault();
    if (!ai || !userInput || isLoading) return;

    setIsLoading(true);
    setError(null);
    setPromptDna([]);

    const mutationInstruction = mutate
      ? "Generate a creative and unconventional variation of the previous structure. Use different component names or structures if it enhances the prompt."
      : "";

    const systemInstruction = `You are an AI prompt engineering expert. Your task is to deconstruct a user's request into fundamental components of an effective prompt.
Respond ONLY with a JSON object that follows the provided schema. The JSON object should contain an array of 5-7 "genes" or components. Each "gene" must have an 'id', 'name', and 'content' field.
The 'id' and 'name' should be short and descriptive (e.g., 'role', 'context', 'task', 'constraints', 'tone', 'format', 'example', 'guardrails').
The 'content' should be the generated text for that component based on the user's request.
${mutationInstruction}
User Request: "${userInput}"`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: systemInstruction,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              genes: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    name: { type: Type.STRING },
                    content: { type: Type.STRING },
                  },
                  required: ["id", "name", "content"],
                }
              }
            },
            required: ["genes"]
          }
        }
      });
      const jsonResponse = JSON.parse(response.text);
      setPromptDna(jsonResponse.genes);
    } catch (err) {
      console.error("Error generating DNA:", err);
      setError("Failed to generate prompt DNA. Please check your request and try again.");
      setPromptDna([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.dataTransfer.setData('draggedIndex', index.toString());
    e.currentTarget.classList.add('opacity-50');
    e.currentTarget.style.zIndex = '31';
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, dropIndex: number) => {
    e.preventDefault();
    const draggedIndex = parseInt(e.dataTransfer.getData('draggedIndex'), 10);
    const newDna = [...promptDna];
    const [draggedItem] = newDna.splice(draggedIndex, 1);
    newDna.splice(dropIndex, 0, draggedItem);
    setPromptDna(newDna);
    e.currentTarget.classList.remove('border-brand-cyan');
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-brand-cyan');
    e.currentTarget.style.zIndex = '32';
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-brand-cyan');
    e.currentTarget.style.zIndex = '';
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('opacity-50');
    e.currentTarget.style.zIndex = '';
  };

  const handleEditClick = (block: DnaBlock) => {
    setEditingBlock({ id: block.id, content: block.content });
  };

  const handleSaveEdit = () => {
    if (!editingBlock) return;
    const newDna = promptDna.map(block =>
      block.id === editingBlock.id ? { ...block, content: editingBlock.content } : block
    );
    setPromptDna(newDna);
    setEditingBlock(null);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (editingBlock) {
      setEditingBlock({ ...editingBlock, content: e.target.value });
      e.target.style.height = 'auto';
      e.target.style.height = `${e.target.scrollHeight}px`;
    }
  };

  return (
    <section
      id="dna-visualizer"
      ref={sectionRef}
      className={`py-20 sm:py-24 opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
      aria-labelledby="dna-heading"
    >
      <div className="text-center mb-16">
        <h2 id="dna-heading" className="text-4xl font-bold font-sans tracking-wider text-brand-light uppercase">
          Prompt DNA Visualizer
        </h2>
        <p className="mt-4 text-lg text-brand-gray max-w-3xl mx-auto">
          Deconstruct your ideas into powerful, editable prompt components. Drag, drop, and mutate to engineer the perfect AI instruction.
        </p>
      </div>
      <div className="border-2 border-brand-dark-accent bg-brand-dark/50 p-6 sm:p-8">
        <form onSubmit={handleGenerateDna} className="space-y-4">
          <label htmlFor="dna-user-input" className="sr-only">Describe your goal</label>
          <textarea
            id="dna-user-input"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Start with a simple goal, e.g., 'Create a marketing tweet for a new sci-fi movie'"
            className="w-full h-24 bg-brand-dark-accent border-2 border-brand-gray/30 text-brand-light p-4 font-mono focus:outline-none focus:ring-0 focus:border-brand-cyan transition-colors duration-200 resize-none"
            disabled={isLoading}
          />
          <div className="flex flex-col sm:flex-row gap-4">
            <Button type="submit" variant="primary" className="flex-grow" disabled={isLoading || !userInput} withSound>
              <DnaIcon className="h-5 w-5 inline-block mr-2" />
              {isLoading ? 'Generating...' : 'Generate DNA'}
            </Button>
            <Button type="button" onClick={() => handleGenerateDna(undefined, true)} variant="secondary" className="w-full sm:w-auto" disabled={isLoading || promptDna.length === 0} withSound>
              <ShuffleIcon className="h-5 w-5 inline-block mr-2" />
              Mutate
            </Button>
          </div>
        </form>

        {error && <p className="mt-4 text-center text-brand-orange font-mono animate-fade-in">{error}</p>}

        {/* DNA Strand */}
        <div className="mt-8 min-h-[12rem] flex items-center justify-center relative z-10">
          {isLoading ? <BlinkingCursor /> : promptDna.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap justify-center animate-fade-in">
              {promptDna.map((block, index) => (
                <React.Fragment key={block.id}>
                  {index > 0 && <div className="h-px w-8 bg-brand-gray/30 hidden md:block"></div>}
                  <div
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragEnd={handleDragEnd}
                    onClick={() => handleEditClick(block)}
                    className={`group relative p-4 border-2 ${blockColors[index % blockColors.length]} bg-brand-dark-accent rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-[0_0_22px_theme(colors.brand.cyan)] z-10`}
                    style={{ zIndex: editingBlock?.id === block.id ? 30 : 10 }}
                    title="Click to edit, drag to reorder"
                  >
                    <h4 className="font-mono text-sm uppercase text-brand-light tracking-widest">{`[${block.name}]`}</h4>
                    {editingBlock?.id !== block.id && (
                      <p className="text-brand-gray text-xs mt-2 truncate max-w-[120px]">{block.content}</p>
                    )}
                    {editingBlock?.id === block.id && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-30 w-72">
                        <div className="p-4 bg-brand-dark border-2 border-brand-cyan shadow-lg rounded-lg">
                          <textarea
                            ref={textareaRef}
                            value={editingBlock.content}
                            onChange={handleTextareaChange}
                            onBlur={handleSaveEdit}
                            className="w-full bg-brand-dark-accent text-brand-light p-2 font-mono text-sm border-0 focus:ring-0 resize-none overflow-hidden"
                            style={{ zIndex: 40 }}
                          />
                          <p className="text-xs text-brand-gray mt-2 text-right">Click away to save</p>
                        </div>
                      </div>
                    )}
                  </div>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {/* Generated Prompt Output */}
        {generatedPrompt && !isLoading && (
          <div className="mt-8 animate-fade-in">
            <h3 className="text-sm font-mono uppercase text-brand-gray tracking-widest mb-2 text-left">
              [ Live Prompt Blueprint ]
            </h3>
            <div className="p-4 bg-brand-dark font-mono text-brand-light/90 text-sm border-2 border-brand-dark-accent text-left overflow-y-auto max-h-[400px]">
              <SyntaxHighlighter
                language="markdown"
                style={vscDarkPlus}
                customStyle={{ background: 'transparent', padding: '0', margin: '0', fontFamily: 'inherit', fontSize: 'inherit' }}
                codeTagProps={{ style: { whiteSpace: 'pre-wrap', wordBreak: 'break-word' } }}
              >
                {generatedPrompt}
              </SyntaxHighlighter>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PromptDnaVisualizer;
