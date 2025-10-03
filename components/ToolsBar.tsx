import React, { useState, useRef, useEffect } from 'react';
import {
  GoldPromptIcon,
  DnaIcon,
  AnalyticsIcon,
  PromptSandboxIcon,
  RAGPipelineIcon,
  AutoSuggestIcon,
  PromptLibraryIcon,
  RAGRefinerIcon,
  TreeIcon,
  AlertIcon,
} from './icons/Icons';
import MatrixCard from './common/MatrixCard';
import { CloseIcon } from './icons/Icons';

// Direct imports to fix the lazy loading issue
import GoldPromptGenerator from './GoldPromptGenerator';
import PromptDnaVisualizer from './PromptDnaVisualizer';
import AnalyticsDashboard from './AnalyticsDashboard';
import IncidentMode from './IncidentMode';
import EvolutionTree from './EvolutionTree';
import PromptSandbox from './PromptSandbox';
import RAGPipelineDesigner from './RAGPipelineDesigner';
import ContextualAutoSuggest from './ContextualAutoSuggest';
import PromptLibrary from './PromptLibrary';
import RAGContextRefiner from './RAGContextRefiner';

const tools = [
  { id: 'gold-prompt', name: 'Gold Prompt Generator', description: 'Turn simple ideas into high-performance, structured prompts.', icon: GoldPromptIcon, component: <GoldPromptGenerator /> },
  { id: 'dna-visualizer', name: 'Prompt DNA Visualizer', description: 'Deconstruct prompts into editable, re-orderable components.', icon: DnaIcon, component: <PromptDnaVisualizer /> },
  { id: 'sandbox', name: 'Prompt Sandbox', description: 'Version, test, and compare prompts against multiple LLMs.', icon: PromptSandboxIcon, component: <PromptSandbox /> },
  { id: 'rag-designer', name: 'RAG Pipeline Designer', description: 'Visually configure and generate code for RAG pipelines.', icon: RAGPipelineIcon, component: <RAGPipelineDesigner /> },
  { id: 'rag-refiner', name: 'RAG Context Refiner', description: 'Interactively review and refine context before generation.', icon: RAGRefinerIcon, component: <RAGContextRefiner /> },
  { id: 'auto-suggest', name: 'Contextual Auto-Suggest', description: 'Get real-time suggestions to improve your prompts as you type.', icon: AutoSuggestIcon, component: <ContextualAutoSuggest /> },
  { id: 'library', name: 'Prompt Library', description: 'Access a federated library of curated, performance-tracked prompts.', icon: PromptLibraryIcon, component: <PromptLibrary /> },
  { id: 'evolution-tree', name: 'Evolution Tree', description: 'Visualize how prompts are remixed and improved by your team.', icon: TreeIcon, component: <EvolutionTree /> },
  { id: 'incident-mode', name: 'Incident Simulation', description: 'Red-team your prompts to generate and mitigate failure modes.', icon: AlertIcon, component: <IncidentMode /> },
];

const ExpandedToolView = ({ tool, onClose }: { tool: any, onClose: () => void }) => {
  return (
    <div
      className="fixed inset-0 z-[60] bg-brand-dark/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tool-modal-title"
    >
      <div
        className="relative w-full h-full bg-brand-dark border-2 border-brand-dark-accent shadow-[0_0_48px_#00fff744] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{
          '--draw-duration': '0.5s',
          animation: 'drawBorder var(--draw-duration) ease-out forwards',
        } as React.CSSProperties}
      >
        <header className="sticky top-0 bg-brand-dark/80 backdrop-blur-sm z-10 flex items-center justify-between p-4 border-b-2 border-brand-dark-accent flex-shrink-0">
          <div className="flex items-center gap-4">
            <tool.icon className="h-8 w-8 text-brand-cyan" />
            <h2 id="tool-modal-title" className="text-2xl font-bold font-sans text-brand-light uppercase tracking-wide">{tool.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-brand-gray hover:text-brand-cyan transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-cyan"
            aria-label="Close tool"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </header>
        <main className="flex-grow overflow-y-auto p-4 sm:p-8">
          {tool.component}
        </main>
      </div>
       <style>{`
        @keyframes drawBorder {
          0% { clip-path: inset(100% 100% 100% 100%); }
          25% { clip-path: inset(0 100% 100% 0); }
          50% { clip-path: inset(0 0 100% 0); }
          75% { clip-path: inset(0 0 0 100%); }
          100% { clip-path: inset(0 0 0 0); }
        }
      `}</style>
    </div>
  );
};

const ToolsBar: React.FC = () => {
  const [expandedTool, setExpandedTool] = useState<(typeof tools[0]) | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
    return () => { if (currentRef) observer.unobserve(currentRef) };
  }, []);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setExpandedTool(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      <section
        id="tools"
        ref={sectionRef}
        className={`py-20 sm:py-24 opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
        aria-labelledby="tools-heading"
      >
        <div className="text-center mb-16 relative">
             <div className="absolute inset-0 z-0 opacity-10" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, #8883, #8883 1px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, #8883, #8883 1px, transparent 1px, transparent 20px)'
             }}/>
          <div className="relative z-10 glitch-text-container" data-text="AI Toolkit v3.0">
            <h2 id="tools-heading" className="glitch-text text-4xl font-bold font-sans tracking-wider text-brand-light uppercase">
              AI Toolkit v3.0
            </h2>
          </div>
          <p className="relative z-10 mt-4 text-lg text-brand-gray max-w-3xl mx-auto">
            A comprehensive suite of powerful tools to secure, manage, and optimize your entire prompt engineering lifecycle.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {tools.map((tool, index) => (
                <div 
                    key={tool.id} 
                    className={`opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
                    style={{ animationDelay: `${100 + index * 75}ms` }}
                >
                    <MatrixCard
                        icon={tool.icon}
                        name={tool.name}
                        description={tool.description}
                        onLaunch={() => setExpandedTool(tool)}
                    />
                </div>
            ))}
        </div>
      </section>
      
      {expandedTool && <ExpandedToolView tool={expandedTool} onClose={() => setExpandedTool(null)} />}
    </>
  );
};

export default ToolsBar;