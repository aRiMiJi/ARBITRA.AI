import React, { useState, useEffect, useCallback } from 'react';
import {
  DnaIcon,
  GeneratorIcon,
  GraffitiIcon,
  TreeIcon,
  AlertIcon,
  ExpandIcon,
  CloseIcon,
  AnalyticsIcon,
} from './icons/Icons';
import PromptDnaVisualizer from './PromptDnaVisualizer';
import PromptGenerator from './Hero';
import GraffitiWall from './GraffitiWall';
import EvolutionTree from './EvolutionTree';
import IncidentMode from './IncidentMode';
import AnalyticsDashboard from './AnalyticsDashboard';
import MatrixCard from './common/MatrixCard';

const tools: {
  id: string;
  name: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  description: string;
  component: React.FC;
  version: string;
}[] = [
  {
    id: 'dna-visualizer',
    name: 'Prompt DNA',
    Icon: DnaIcon,
    description: 'Visualize and mutate your prompt’s gene structure.',
    component: PromptDnaVisualizer,
    version: 'v2.1'
  },
  {
    id: 'prompt-generator',
    name: 'Gold Prompt',
    Icon: GeneratorIcon,
    description: 'Turn casual ideas into production-grade prompts.',
    component: PromptGenerator,
    version: 'v1.8'
  },
  {
    id: 'graffiti-wall',
    name: 'Graffiti Wall',
    Icon: GraffitiIcon,
    description: 'Remix and vote on user-submitted prompt graffiti.',
    component: GraffitiWall,
    version: 'v1.3'
  },
  {
    id: 'evolution-tree',
    name: 'Evolution Tree',
    Icon: TreeIcon,
    description: 'Trace and evolve prompt generations in a live tree.',
    component: EvolutionTree,
    version: 'v1.5'
  },
  {
    id: 'analytics-dashboard',
    name: 'Analytics',
    Icon: AnalyticsIcon,
    description: 'Visualize AI usage, success rates, and API consumption.',
    component: AnalyticsDashboard,
    version: 'v1.0'
  },
  {
    id: 'incident-mode',
    name: 'Incident Mode',
    Icon: AlertIcon,
    description: 'Simulate AI breakdowns and crisis prompt scenarios.',
    component: IncidentMode,
    version: 'v2.4'
  },
];

const ToolsBar: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setExpandedIndex(null);
      }
    };
    if (expandedIndex !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [expandedIndex]);


  const handleExpand = useCallback((index: number) => {
    setExpandedIndex(index);
  }, []);

  const handleClose = useCallback(() => {
    setExpandedIndex(null);
  }, []);

  const ExpandedToolComponent = expandedIndex !== null ? tools[expandedIndex].component : null;

  return (
    <>
      <section id="tools" className="py-20 sm:py-24 w-full" aria-labelledby="tools-heading">
        <div className="text-center mb-16">
          <div className="glitch-text-container" data-text="AI Toolkit">
            <h2 id="tools-heading" className="glitch-text text-4xl font-bold font-sans tracking-wider text-brand-light uppercase">
              AI Toolkit
            </h2>
          </div>
          <p className="mt-2 text-lg text-brand-gray max-w-3xl mx-auto">
            A suite of industrial-grade utilities for professional prompt engineering and management.
          </p>
        </div>
        
        {/* Cyberdeck Grid using MatrixCard */}
        <div
          className={`perspective max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500 ease-[cubic-bezier(.65,-0.36,.38,1.43)]
            ${expandedIndex !== null ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}
        >
          {tools.map((tool, idx) => (
            <MatrixCard
              key={tool.id}
              Icon={tool.Icon}
              title={tool.name}
              description={tool.description}
              version={tool.version}
              onLaunch={() => handleExpand(idx)}
            />
          ))}
        </div>
      </section>

      {/* Expanded Tool View */}
      <div
        className={`fixed inset-0 z-[120] bg-brand-dark/90
          ${expandedIndex !== null ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
          transition-opacity duration-500`}
        aria-modal="true"
        role="dialog"
      >
        <div
          className={`absolute inset-2 sm:inset-4 md:inset-8 border-4 bg-brand-dark
            transition-all duration-400 ease-[cubic-bezier(.65,-0.36,.38,1.43)]
            ${expandedIndex !== null ? 'opacity-100 scale-100 border-brand-orange shadow-[0_0_64px_12px_#ffae51]' : 'opacity-0 scale-95 border-transparent shadow-none'}
            overflow-y-auto flex flex-col`}
        >
          {expandedIndex !== null && (
            <>
              <header className="flex items-center justify-between p-4 border-b-2 border-brand-dark-accent bg-brand-dark/80 backdrop-blur-sm sticky top-0 z-10">
                <h3 className="font-mono text-base uppercase tracking-wider text-brand-orange">{tools[expandedIndex].name}</h3>
                <button
                  onClick={handleClose}
                  className="p-2 text-brand-gray hover:text-brand-orange border-2 hover:border-brand-orange focus:outline-none"
                  aria-label="Close tool"
                >
                  <CloseIcon className="h-6 w-6" />
                </button>
              </header>
              <div className="p-4 sm:p-6 lg:p-8 flex-1">
                {ExpandedToolComponent && <ExpandedToolComponent />}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ToolsBar;
