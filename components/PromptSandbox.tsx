import React, { useState, useEffect, FormEvent } from 'react';
import { useGenAI } from '../contexts/GenAIContext';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Button from './common/Button';
import CopyButton from './common/CopyButton';
import ErrorDisplay from './common/ErrorDisplay';
import { getApiErrorMessage } from '../utils/errorUtils';
import { CloseIcon } from './icons/Icons';
import Modal from './common/Modal';

type PromptVersion = {
  id: number;
  prompt: string;
  timestamp: string;
  output?: string;
  llm?: string;
};

type PromptTemplate = {
  id: number;
  name: string;
  prompt: string;
};

const llms = ['gemini-2.5-flash', 'claude-3-opus-20240229', 'gpt-4-turbo'];

const initialTemplates: PromptTemplate[] = [
  { id: 1, name: "Summarization", prompt: "Summarize the following text into 3 key bullet points:\n\n[Insert text here]" },
  { id: 2, name: "Code Generation (Python)", prompt: "You are an expert Python programmer. Write a Python script that does the following:\n\n1. [Describe task 1]\n2. [Describe task 2]\n\nEnsure the code is well-commented and follows PEP 8 standards." },
  { id: 3, name: "Email Draft", prompt: "Draft a professional email.\n\nTo: [Recipient]\nFrom: [Your Name]\nSubject: [Subject]\n\nBody:\n[Provide key points for the email body here]" }
];

const BlinkingCursor: React.FC = () => (
  <span className="inline-block w-2.5 h-7 bg-brand-cyan animate-flicker" />
);

const ComparisonOutputCard: React.FC<{ version: PromptVersion | null, onRemove: () => void, onRun: (version: PromptVersion) => void, isLoading: boolean, activeRunId: number | null }> = ({ version, onRemove, onRun, isLoading, activeRunId }) => {
    if (!version) {
        return (
            <div className="border-2 border-dashed border-brand-gray/30 h-full flex flex-col items-center justify-center p-6 text-center bg-brand-dark/20 rounded-lg transition-colors hover:border-brand-cyan hover:bg-brand-cyan/5">
                <svg className="w-12 h-12 text-brand-gray/20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <p className="text-brand-gray/70 font-mono text-lg">[ Empty Slot ]</p>
                <p className="text-brand-gray/50 text-sm mt-2">Select 'Compare' from the history panel to add a version.</p>
            </div>
        )
    }

    const isRunningThis = isLoading && activeRunId === version.id;

    return (
        <div className="border-2 border-brand-dark-accent bg-brand-dark/50 flex flex-col h-full overflow-hidden rounded-lg shadow-xl shadow-black/30">
            <div className="flex justify-between items-center p-4 border-b-2 border-brand-dark-accent bg-brand-dark-accent/50 flex-shrink-0">
                <div>
                    <p className="text-lg font-mono font-bold text-brand-light tracking-wider">VERSION #{version.id}</p>
                    <p className="text-xs text-brand-gray/80 font-mono" title={version.timestamp}>{version.timestamp}</p>
                </div>
                <div className="flex items-center gap-2">
                     <Button onClick={() => onRun(version)} variant="secondary" className="!px-3 !py-1 !text-xs" disabled={isLoading}>
                         {isRunningThis ? 'Running...' : 'Re-Run'}
                    </Button>
                    <button onClick={onRemove} aria-label="Remove from comparison" className="p-2 text-brand-gray hover:text-brand-orange transition-all duration-200 transform hover:scale-110 rounded-full hover:bg-brand-orange/10">
                        <CloseIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <div className="p-6 space-y-6 overflow-y-auto">
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h5 className="text-sm font-mono uppercase text-brand-cyan tracking-widest">[ Prompt ]</h5>
                        <CopyButton textToCopy={version.prompt} label={`Copy prompt for version #${version.id}`} />
                    </div>
                    <div className="text-sm font-mono bg-black/50 p-4 max-h-48 overflow-y-auto border border-brand-gray/20 rounded-md">
                        <pre className="whitespace-pre-wrap font-inherit">{version.prompt}</pre>
                    </div>
                </div>
                 <div>
                    <div className="flex justify-between items-center mb-2">
                        <h5 className="text-sm font-mono uppercase text-brand-orange tracking-widest">
                            [ Output <span className="text-brand-gray normal-case font-sans">from: {version.llm || 'N/A'}</span> ]
                        </h5>
                        <CopyButton textToCopy={version.output || ''} label={`Copy output for version #${version.id}`} />
                    </div>
                    <div className="text-sm bg-black/50 p-4 min-h-[12rem] overflow-y-auto border border-brand-gray/20 rounded-md">
                        {isRunningThis ? <div className="flex justify-center items-center h-full"><BlinkingCursor /></div> : version.output ? (
                            <SyntaxHighlighter
                                language="markdown"
                                style={vscDarkPlus}
                                customStyle={{ background: 'transparent', padding: '0', margin: '0', fontSize: '0.875rem' }}
                                codeTagProps={{ style: { whiteSpace: 'pre-wrap', wordBreak: 'break-word' } }}
                            >
                                {version.output}
                            </SyntaxHighlighter>
                        ) : (
                            <p className="text-brand-gray/70">No output generated yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

const PromptSandbox: React.FC = () => {
  const { ai } = useGenAI();
  const [currentPrompt, setCurrentPrompt] = useState<string>('');
  const [versions, setVersions] = useState<PromptVersion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeOutputId, setActiveOutputId] = useState<number | null>(null);
  const [comparisonSlots, setComparisonSlots] = useState<(PromptVersion | null)[]>([null, null]);
  const [templates, setTemplates] = useState<PromptTemplate[]>(initialTemplates);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');
  const [selectedLlm, setSelectedLlm] = useState<string>(llms[0]);


  const isComparing = comparisonSlots.some(slot => slot !== null);

  // Load versions from localStorage on mount
  useEffect(() => {
    try {
      const savedVersions = localStorage.getItem('promptSandboxVersions');
      if (savedVersions) setVersions(JSON.parse(savedVersions));

      const savedTemplates = localStorage.getItem('promptSandboxTemplates');
      if (savedTemplates) {
          const userTemplates = JSON.parse(savedTemplates);
          // Combine initial templates with user's saved templates, preventing duplicates
          const combined = [...initialTemplates];
          userTemplates.forEach((ut: PromptTemplate) => {
              if (!combined.some(it => it.id === ut.id)) {
                  combined.push(ut);
              }
          });
          setTemplates(combined);
      }
    } catch (e) {
      console.error("Failed to load data from localStorage", e);
    }
  }, []);

  // Save versions to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('promptSandboxVersions', JSON.stringify(versions));
    } catch (e) {
      console.error("Failed to save versions to localStorage", e);
    }
  }, [versions]);

  // Save templates to localStorage on change
  useEffect(() => {
    try {
        // Only save templates that are not part of the initial set
        const userTemplates = templates.filter(t => !initialTemplates.some(it => it.id === t.id));
        localStorage.setItem('promptSandboxTemplates', JSON.stringify(userTemplates));
    } catch (e) {
        console.error("Failed to save templates to localStorage", e);
    }
  }, [templates]);

  const handleSaveVersion = () => {
    if (!currentPrompt.trim()) return;
    const newVersion: PromptVersion = {
      id: Date.now(),
      prompt: currentPrompt,
      timestamp: new Date().toLocaleString(),
    };
    setVersions(prev => [newVersion, ...prev]);
  };

  const handleRunPrompt = async (e: React.MouseEvent, version: PromptVersion) => {
    e.stopPropagation();
    if (!ai || isLoading) return;
    setIsLoading(true);
    setError(null);
    setActiveOutputId(version.id);

    const llmForThisRun = selectedLlm;

    try {
      let output = '';
      if (llmForThisRun === 'gemini-2.5-flash') {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: version.prompt,
        });
        output = response.text ?? '';
      } else {
        // Simulate responses for other models
        await new Promise(resolve => window.setTimeout(resolve, 1000)); // Simulate network latency
        output = `// Simulated response from ${llmForThisRun}:\n\nThis is a placeholder response demonstrating the model selection functionality. The original prompt was:\n\n"${version.prompt}"`;
      }

      const updateCallback = (v: PromptVersion) => v.id === version.id ? { ...v, output, llm: llmForThisRun } : v;
      setVersions(prev => prev.map(updateCallback));
      setComparisonSlots(prev => prev.map(slot => slot && slot.id === version.id ? { ...slot, output, llm: llmForThisRun } : slot) as [PromptVersion | null, PromptVersion | null]);
    } catch (err) {
      const friendlyError = getApiErrorMessage(err);
      setError(friendlyError);
      const updateCallback = (v: PromptVersion) => v.id === version.id ? { ...v, output: `// Error: ${friendlyError}`, llm: llmForThisRun } : v;
      setVersions(prev => prev.map(updateCallback));
      setComparisonSlots(prev => prev.map(slot => slot && slot.id === version.id ? { ...slot, output: `// Error: ${friendlyError}`, llm: llmForThisRun } : slot) as [PromptVersion | null, PromptVersion | null]);
    } finally {
      setIsLoading(false);
    }
  };


  const loadVersion = (version: PromptVersion) => {
    setCurrentPrompt(version.prompt);
    setActiveOutputId(version.id);
  };

  const handleCloneVersion = (e: React.MouseEvent, versionToClone: PromptVersion) => {
    e.stopPropagation();
    const newVersion: PromptVersion = {
        id: Date.now(),
        prompt: versionToClone.prompt,
        timestamp: new Date().toLocaleString(),
    };
    setVersions(prev => [newVersion, ...prev]);
    setCurrentPrompt(versionToClone.prompt);
};

  const handleAddToCompare = (e: React.MouseEvent, version: PromptVersion) => {
    e.stopPropagation();
    if (comparisonSlots.some(s => s?.id === version.id)) return;
    const newSlots = [...comparisonSlots];
    const emptySlotIndex = newSlots.indexOf(null);
    if (emptySlotIndex !== -1) {
      newSlots[emptySlotIndex] = version;
    } else {
      newSlots[0] = version;
    }
    setComparisonSlots(newSlots as [PromptVersion | null, PromptVersion | null]);
  };

  const handleRemoveFromCompare = (slotIndex: number) => {
    const newSlots = [...comparisonSlots];
    newSlots[slotIndex] = null;
    setComparisonSlots(newSlots as [PromptVersion | null, PromptVersion | null]);
  };

  const handleSaveTemplate = (e: FormEvent) => {
      e.preventDefault();
      if (!newTemplateName.trim() || !currentPrompt.trim()) return;
      const newTemplate: PromptTemplate = {
          id: Date.now(),
          name: newTemplateName,
          prompt: currentPrompt,
      };
      setTemplates(prev => [...prev, newTemplate]);
      setIsTemplateModalOpen(false);
      setNewTemplateName('');
  };

  const handleLoadTemplate = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const templateId = parseInt(e.target.value, 10);
      if (!templateId) return;
      const template = templates.find(t => t.id === templateId);
      if (template) {
          setCurrentPrompt(template.prompt);
      }
  };

  const activeVersionForSingleView = versions.find(v => v.id === activeOutputId);

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-[75vh]">
      {/* Controls & Versions */}
      <div className="lg:col-span-1 flex flex-col gap-6">
        <div className="flex-shrink-0">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-mono uppercase text-brand-gray tracking-widest">Prompt Editor</h3>
            <CopyButton textToCopy={currentPrompt} label="Copy current prompt to clipboard" />
          </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
                 <select onChange={handleLoadTemplate} className="w-full bg-brand-dark-accent border-2 border-brand-gray/30 text-brand-light p-2 font-mono text-sm focus:outline-none focus:ring-0 focus:border-brand-cyan">
                    <option value="">Load template...</option>
                    {templates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
                <select onChange={(e) => setSelectedLlm(e.target.value)} value={selectedLlm} className="w-full bg-brand-dark-accent border-2 border-brand-gray/30 text-brand-light p-2 font-mono text-sm focus:outline-none focus:ring-0 focus:border-brand-cyan">
                    {llms.map(llm => <option key={llm} value={llm}>{llm}</option>)}
                </select>
            </div>
          <textarea
            value={currentPrompt}
            onChange={(e) => setCurrentPrompt(e.target.value)}
            placeholder="Enter your prompt here or load a template..."
            className="w-full h-48 bg-brand-dark-accent border-2 border-brand-gray/30 text-brand-light p-4 font-mono focus:outline-none focus:ring-0 focus:border-brand-cyan transition-colors duration-200 resize-y"
          />
          <div className="flex gap-2 mt-2">
            <Button onClick={() => setIsTemplateModalOpen(true)} variant="secondary" className="w-full" disabled={!currentPrompt.trim()}>Save as Template</Button>
            <Button onClick={handleSaveVersion} variant="secondary" className="w-full" disabled={!currentPrompt.trim()}>Save as Version</Button>
          </div>
        </div>

        <div className="flex flex-col flex-grow min-h-0">
            <h3 className="font-mono uppercase text-brand-gray tracking-widest mb-2">Version History</h3>
            <div className="flex-grow overflow-y-auto border-2 border-brand-dark-accent p-2 space-y-2">
                {versions.length === 0 ? (
                    <p className="text-brand-gray text-sm p-4 text-center">No versions saved yet.</p>
                ) : (
                    versions.map(v => {
                        const isInCompare = comparisonSlots.some(s => s?.id === v.id);
                        return (
                            <div 
                                key={v.id}
                                onClick={() => loadVersion(v)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') loadVersion(v)}}
                                aria-label={`Load version from ${v.timestamp}. Prompt: ${v.prompt}`}
                                className={`p-3 border-2 transition-all duration-200 cursor-pointer transform hover:scale-[1.02] hover:shadow-[0_0_16px_#ffae51cc] ${activeOutputId === v.id ? 'border-brand-cyan bg-brand-cyan/10' : 'border-transparent hover:bg-brand-dark-accent'}`}>
                                
                                <p className="text-sm text-brand-light font-mono truncate" title={v.prompt}>{v.prompt}</p>

                                <div className="flex justify-between items-center mt-2 gap-2">
                                    <p className="text-xs text-brand-gray">{v.timestamp}</p>
                                    <div className="flex gap-2">
                                        <Button onClick={(e) => handleCloneVersion(e, v)} variant="secondary" className="!px-3 !py-1 !text-xs">
                                            Clone
                                        </Button>
                                         <Button onClick={(e) => handleAddToCompare(e, v)} variant="secondary" className="!px-3 !py-1 !text-xs" disabled={isInCompare}>
                                            {isInCompare ? 'Selected' : 'Compare'}
                                        </Button>
                                        <Button onClick={(e) => handleRunPrompt(e, v)} variant="secondary" className="!px-3 !py-1 !text-xs" disabled={isLoading && activeOutputId !== v.id}>
                                            {isLoading && activeOutputId === v.id ? '...' : 'Run'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
      </div>

      {/* Output Area: Comparison or Single View */}
      <div className="lg:col-span-2 flex flex-col">
        {isComparing ? (
            <>
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-mono uppercase text-brand-gray tracking-widest">[ SIDE-BY-SIDE COMPARISON ]</h3>
                    <Button onClick={() => setComparisonSlots([null, null])} variant="secondary" className="!px-3 !py-1 !text-xs">
                        Clear Comparison
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
                    <ComparisonOutputCard 
                        version={comparisonSlots[0]} 
                        onRemove={() => handleRemoveFromCompare(0)}
                        onRun={(version) => handleRunPrompt(new MouseEvent('click') as any, version)}
                        isLoading={isLoading}
                        activeRunId={activeOutputId}
                    />
                    <ComparisonOutputCard 
                        version={comparisonSlots[1]} 
                        onRemove={() => handleRemoveFromCompare(1)}
                        onRun={(version) => handleRunPrompt(new MouseEvent('click') as any, version)}
                        isLoading={isLoading}
                        activeRunId={activeOutputId}
                    />
                </div>
            </>
        ) : (
            <>
                <div className="flex justify-between items-center mb-2">
                     <h3 className="font-mono uppercase text-brand-gray tracking-widest">
                        Output {activeVersionForSingleView?.llm && <span className="text-brand-gray/80 normal-case">({activeVersionForSingleView.llm})</span>}
                    </h3>
                    <CopyButton textToCopy={activeVersionForSingleView?.output ?? ''} label="Copy LLM Output to clipboard" />
                </div>
                <div className="relative flex-grow border-2 border-brand-dark-accent bg-brand-dark/50 p-4 overflow-y-auto scanline-container">
                    {isLoading && <BlinkingCursor />}
                    {!isLoading && !activeVersionForSingleView && <p className="text-brand-gray text-center">Run a version to see its output here.</p>}
                    {!isLoading && activeVersionForSingleView?.output && (
                         <SyntaxHighlighter
                            language="markdown"
                            style={vscDarkPlus}
                            customStyle={{ background: 'transparent', padding: '0', margin: '0', fontFamily: 'inherit', fontSize: 'inherit' }}
                            codeTagProps={{ style: { whiteSpace: 'pre-wrap', wordBreak: 'break-word' } }}
                         >
                            {activeVersionForSingleView.output}
                        </SyntaxHighlighter>
                    )}
                </div>
            </>
        )}
        <ErrorDisplay message={error} />
      </div>
    </div>
    <Modal isOpen={isTemplateModalOpen} onClose={() => setIsTemplateModalOpen(false)} title="Save Prompt as Template">
        <form onSubmit={handleSaveTemplate}>
            <label htmlFor="template-name" className="block text-xs font-mono uppercase tracking-wider text-brand-gray mb-2">Template Name</label>
            <input
                id="template-name"
                type="text"
                value={newTemplateName}
                onChange={e => setNewTemplateName(e.target.value)}
                placeholder="e.g., 'Weekly Report Summarizer'"
                required
                className="w-full bg-brand-dark-accent border-2 border-brand-gray/30 text-brand-light p-3 font-mono focus:outline-none focus:ring-0 focus:border-brand-cyan"
            />
            <div className="mt-6 text-right">
                <Button type="submit" variant="primary" disabled={!newTemplateName.trim()}>Save Template</Button>
            </div>
        </form>
    </Modal>
    </>
  );
};

export default PromptSandbox;