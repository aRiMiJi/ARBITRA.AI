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

const tools: {
  id: string;
  name: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  description: string;
  component: React.FC;
}[] = [
  {
    id: 'dna-visualizer',
    name: 'Prompt DNA Visualizer',
    Icon: DnaIcon,
    description: 'Visualize and mutate your prompt’s gene structure.',
    component: PromptDnaVisualizer,
  },
  {
    id: 'prompt-generator',
    name: 'Gold Prompt Generator',
    Icon: GeneratorIcon,
    description: 'Turn casual ideas into production-grade prompts.',
    component: PromptGenerator,
  },
  {
    id: 'graffiti-wall',
    name: 'Graffiti Wall',
    Icon: GraffitiIcon,
    description: 'Remix and vote on user-submitted prompt graffiti.',
    component: GraffitiWall,
  },
  {
    id: 'evolution-tree',
    name: 'Evolution Tree',
    Icon: TreeIcon,
    description: 'Trace and evolve prompt generations in a live tree.',
    component: EvolutionTree,
  },
  {
    id: 'analytics-dashboard',
    name: 'Analytics Dashboard',
    Icon: AnalyticsIcon,
    description: 'Visualize AI usage, success rates, and API consumption.',
    component: AnalyticsDashboard,
  },
  {
    id: 'incident-mode',
    name: 'Incident Mode',
    Icon: AlertIcon,
    description: 'Simulate AI breakdowns and crisis prompt scenarios.',
    component: IncidentMode,
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

  // Tooltip animation keyframes in tailwind config is best, else use inline style fallback below:
  const TOOL_GLITCH_ANIM =
    'group-hover:animate-toolglitch shadow-[0_0_20px_#00f6ff,0_0_24px_#00f6ff66]';

  // Individual Tool Block
  const ToolBlock: React.FC<{
    tool: typeof tools[0];
    index: number;
    onExpand: () => void;
    isExpanded: boolean;
  }> = ({ tool, index, onExpand, isExpanded }) => (
    <div className={`group relative flex-1 min-w-[140px] max-w-[220px]`} tabIndex={0}>
      <div
        className={`
          relative bg-brand-dark-accent border-2
          border-brand-gray/30
          group-hover:border-brand-cyan
          transition-all duration-300 cursor-pointer
          p-6 h-full flex flex-col items-center justify-center text-center
          shadow-[8px_8px_0_rgba(0,0,0,0.21)]
          group-hover:shadow-[0_0_32px_#00f6ffb3]
          group-hover:-translate-x-1 group-hover:-translate-y-1
          select-none
        `}
        tabIndex={0}
        aria-label={`${tool.name} - expand for details`}
      >
        {/* Tool Icon */}
        <tool.Icon className="h-12 w-12 mb-2 text-brand-cyan drop-shadow-[0_2px_14px_#00f6ff33]" />
        <h4 className="font-mono text-base uppercase tracking-wide text-brand-light font-bold mt-1 mb-1">
          {tool.name}
        </h4>
        {/* Brutalist Animated Tooltip */}
        <div
          className={`
            absolute bottom-full left-1/2 -translate-x-1/2 mb-3
            w-max max-w-xs p-2
            bg-brand-dark border border-brand-cyan
            text-brand-cyan text-xs font-mono
            opacity-0 group-hover:opacity-100
            pointer-events-none
            z-20
            group-hover:scale-[1.1]
            duration-200 transition-all
            group-hover:animate-toolglitch
            shadow-[0_0_20px_#00f6ff,0_0_20px_#00f6ff66]
          `}
          style={{
            animation:
              'toolglitch 330ms cubic-bezier(.58,-0.12,.36,1.3)',
            // fallback if your tailwind config does not have 'toolglitch'
          }}
        >
          {tool.description}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-brand-cyan"></div>
        </div>
        {/* Expand Button */}
        <button
          onClick={onExpand}
          className={`
            absolute top-2 right-2 p-1 rounded font-bold text-brand-cyan border-2 border-transparent
            hover:border-brand-cyan bg-brand-dark/60
            transition-all duration-150
            focus:outline-none
          `}
          aria-label={`Expand ${tool.name}`}
        >
          <ExpandIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );

  const handleExpand = useCallback((index: number) => {
    setExpandedIndex(index);
  }, []);

  const handleClose = useCallback(() => {
    setExpandedIndex(null);
  }, []);

  // Mount tool's real component only if expanded
  const ExpandedToolComponent = expandedIndex !== null ? tools[expandedIndex].component : null;

  return (
    <>
      {/* The brutalist horizontal toolbar */}
      <section id="tools" className="py-20 sm:py-24 w-full" aria-labelledby="tools-heading">
        <div className="text-center mb-10">
          <h2 id="tools-heading" className="text-4xl font-bold font-sans tracking-wider text-brand-light uppercase">
            AI Toolkit
          </h2>
          <p className="mt-2 text-lg text-brand-gray max-w-3xl mx-auto">
            A suite of industrial-grade utilities for professional prompt engineering and management.
          </p>
        </div>
        <div className="flex flex-wrap gap-7 w-full max-w-6xl mx-auto justify-center">
          {tools.map((tool, idx) => (
            <ToolBlock
              key={tool.id}
              tool={tool}
              index={idx}
              onExpand={() => handleExpand(idx)}
              isExpanded={expandedIndex === idx}
            />
          ))}
        </div>
      </section>

      {/* The brutalist expand/modal for tools */}
      <div
        className={`
          fixed inset-0 z-[120]
          bg-brand-dark/96
          ${expandedIndex !== null ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
          transition-all duration-500
        `}
        aria-modal="true"
        role="dialog"
      >
        <div
          className={`
            absolute inset-2 sm:inset-4 md:inset-8
            border-4 transition-all
            bg-brand-dark
            ${expandedIndex !== null ? 'opacity-100 scale-100 border-brand-orange shadow-[0_0_64px_12px_#ffae51]' : 'opacity-0 scale-95 border-transparent shadow-none'}
            duration-400 ease-[cubic-bezier(.65,-0.36,.38,1.43)]
            overflow-y-auto
            flex flex-col
          `}
        >
          {expandedIndex !== null && (
            <>
              {/* Expand modal header */}
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
              <div className="p-4 sm:p-6 lg:p-8 flex-1 min-h-[320px]">
                {/* Mount the actual tool component, fully hydrated every expand */}
                {ExpandedToolComponent && <ExpandedToolComponent />}
              </div>
            </>
          )}
        </div>
      </div>
      {/* Keyframes for glitch animation - add this to your global CSS or Tailwind config:

      @keyframes toolglitch {
        0%   { transform: translateY(10px) scale(.92) rotate(-2deg);}
        38%  { transform: translateY(-7px) scale(1.08) rotate(2deg);}
        66%  { transform: translateY(2px)  scale(.93);}
        98%  { transform: translateY(-1.5px) scale(1.01);}
        100% { transform: translateY(0) scale(1) rotate(0deg);}
      }

      .animate-toolglitch { animation: toolglitch 0.33s cubic-bezier(.6,-0.12,.2,1.20) both; }
      */}
    </>
  );
};

export default ToolsBar;