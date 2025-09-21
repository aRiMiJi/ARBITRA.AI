import React, { useState, useMemo, useLayoutEffect, useCallback } from 'react';
import Button from './common/Button';
import { BranchIcon, StarIcon } from './icons/Icons';
import Modal from './common/Modal';

const initialNodes = [
  { id: 'root-1', parentId: null, title: 'Original Sci-Fi Concept', prompt: 'Generate a concept for a new sci-fi movie blending cyberpunk and ancient mythology.', author: 'Admin', stats: { upvotes: 15, remixes: 2, successRate: 88 } },
  { id: 'a-1', parentId: 'root-1', title: 'Noir Detective Variant', prompt: 'Rewrite the sci-fi concept as a 1940s noir detective story set in a futuristic city.', author: 'UserA', stats: { upvotes: 45, remixes: 1, successRate: 92 } },
  { id: 'a-2', parentId: 'root-1', title: 'Comedic Twist', prompt: 'Take the sci-fi concept but make it a buddy-cop comedy.', author: 'UserB', stats: { upvotes: 22, remixes: 0, successRate: 85 } },
  { id: 'b-1', parentId: 'a-1', title: 'Hard-Boiled AI', prompt: 'Further refine the noir concept: the detective is a self-aware AI struggling with existential dread.', author: 'UserC', stats: { upvotes: 89, remixes: 0, successRate: 95 } },
];

type PromptNodeData = typeof initialNodes[0];
type TreeNode = PromptNodeData & { children: TreeNode[] };
type Connector = { start: { x: number, y: number }, end: { x: number, y: number } };

const EvolutionTree: React.FC = () => {
  const [nodes, setNodes] = useState<PromptNodeData[]>(initialNodes);
  const [hoveredNode, setHoveredNode] = useState<TreeNode | null>(null);
  const [hoverPos, setHoverPos] = useState<{ top: number, left: number } | null>(null);
  const [remixingNode, setRemixingNode] = useState<TreeNode | null>(null);
  const [connectors, setConnectors] = useState<Connector[]>([]);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [newPromptTitle, setNewPromptTitle] = useState('');
  const [newPromptBody, setNewPromptBody] = useState('');

  const treeData = useMemo(() => {
    const tree: TreeNode[] = [];
    const map = new Map(nodes.map(node => [node.id, { ...node, children: [] }]));
    map.forEach(node => {
      if (node.parentId && map.has(node.parentId)) {
        map.get(node.parentId)!.children.push(node);
      } else {
        tree.push(node);
      }
    });
    return tree;
  }, [nodes]);

  const calculateConnectors = useCallback(() => {
    if (!containerRef.current) return;
    const newConnectors: Connector[] = [];
    const containerRect = containerRef.current.getBoundingClientRect();
    nodes.forEach(node => {
      if (node.parentId) {
        const parentEl = document.getElementById(`node-${node.parentId}`);
        const childEl = document.getElementById(`node-${node.id}`);
        if (parentEl && childEl) {
          const parentRect = parentEl.getBoundingClientRect();
          const childRect = childEl.getBoundingClientRect();
          const start = {
            x: parentRect.right - containerRect.left,
            y: parentRect.top + parentRect.height / 2 - containerRect.top,
          };
          const end = {
            x: childRect.left - containerRect.left,
            y: childRect.top + childRect.height / 2 - containerRect.top,
          };
          newConnectors.push({ start, end });
        }
      }
    });
    setConnectors(newConnectors);
  }, [nodes]);

  useLayoutEffect(() => {
    calculateConnectors();
    window.addEventListener('resize', calculateConnectors);
    return () => window.removeEventListener('resize', calculateConnectors);
  }, [treeData, calculateConnectors]);

  const handleBranch = (node: TreeNode) => {
    setRemixingNode(node);
    setNewPromptTitle(`Remix of "${node.title}"`);
    setNewPromptBody(node.prompt + '\n\n---\nMy improvements:\n');
  };

  const handleVote = (id: string) => {
    setNodes(nodes.map(n => n.id === id ? { ...n, stats: { ...n.stats, upvotes: n.stats.upvotes + 1 } } : n));
  };

  const handleRemixSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!remixingNode || !newPromptTitle || !newPromptBody) return;
    const newNode: PromptNodeData = {
      id: `node-${Date.now()}`,
      parentId: remixingNode.id,
      title: newPromptTitle,
      prompt: newPromptBody,
      author: 'CurrentUser',
      stats: { upvotes: 1, remixes: 0, successRate: 0 }
    };
    const updatedNodes = nodes.map(n =>
      n.id === remixingNode.id ? { ...n, stats: { ...n.stats, remixes: n.stats.remixes + 1 } } : n
    );
    setNodes([...updatedNodes, newNode]);
    setRemixingNode(null);
    setNewPromptTitle('');
    setNewPromptBody('');
  };

  // Render tree nodes recursively:
  const PromptNode: React.FC<{ node: TreeNode }> = ({ node }) => {
    const isHighPerformer = node.stats.upvotes > 50;
    const borderClass = hoveredNode?.id === node.id ? 'border-brand-cyan' : 'border-brand-gray/30';

    return (
      <div className="flex items-center my-4">
        <div
          id={`node-${node.id}`}
          onMouseEnter={e => {
            setHoveredNode(node);
            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
            if (containerRef.current) {
              const containerRect = containerRef.current.getBoundingClientRect();
              setHoverPos({
                top: rect.bottom - containerRect.top + 10, // 10px below node
                left: rect.left - containerRect.left + rect.width / 2
              });
            }
          }}
          onMouseLeave={() => {
            setHoveredNode(null);
            setHoverPos(null);
          }}
          className={`relative group bg-brand-dark-accent border-2 ${borderClass} p-4 w-64 transition-all duration-200 shadow-lg hover:shadow-brand-cyan hover:-translate-x-0.5 hover:-translate-y-0.5 ${isHighPerformer ? 'animate-pulse-glow' : ''}`}
        >
          <h4 className="font-sans font-bold text-brand-light truncate">{node.title}</h4>
          <p className="text-xs text-brand-gray font-mono">by {node.author} | {node.stats.upvotes} votes</p>
          <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => handleVote(node.id)} className="p-1 hover:text-brand-cyan" title="Upvote"><StarIcon className="w-4 h-4" /></button>
            <button onClick={() => handleBranch(node)} className="p-1 hover:text-brand-cyan" title="Branch/Remix"><BranchIcon className="w-4 h-4" /></button>
          </div>
        </div>
        {node.children.length > 0 && (
          <div className="pl-12">
            {node.children.map(child => <PromptNode key={child.id} node={child} />)}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div ref={containerRef} className="relative w-full h-[70vh] min-h-[480px] max-h-[80vh] overflow-auto bg-brand-dark/50 p-6">
        {/* SVG connectors */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" width="100%" height="100%">
          {connectors.map((c, i) => {
            const d = `M ${c.start.x} ${c.start.y} C ${c.start.x + 50} ${c.start.y}, ${c.end.x - 50} ${c.end.y}, ${c.end.x} ${c.end.y}`;
            return <path key={i} d={d} stroke="#00f6ff" strokeWidth="2" fill="none" className="opacity-40" />;
          })}
        </svg>
        {/* Render nodes */}
        <div className="relative z-10">
          {treeData.map(rootNode => (
            <PromptNode key={rootNode.id} node={rootNode} />
          ))}
        </div>
        {/* FLOATING TOOLTIP ON HOVER */}
        {hoveredNode && hoverPos && (
          <div
            style={{
              position: 'absolute',
              top: hoverPos.top,
              left: hoverPos.left,
              zIndex: 50,
              minWidth: 260,
              maxWidth: 380,
              background: 'rgba(18,22,24,0.99)',
              border: '2px solid #00f6ff',
              borderRadius: 10,
              boxShadow: '0 2px 28px #00f6ff44',
              padding: '18px',
              pointerEvents: 'none',
              transform: 'translate(-50%, 0px)'
            }}
            className="animate-fade-in font-mono"
          >
            <div style={{ borderBottom: '1px solid #444', marginBottom: 12, paddingBottom: 6, fontFamily: "IBM Plex Mono, monospace", fontSize: 14, color: "#00f6ff", textTransform:'uppercase' }}>
              {hoveredNode.title}
            </div>
            <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 12, color: '#EAEAEA' }}>
              <b>Author:</b> {hoveredNode.author}<br />
              <b>Upvotes:</b> {hoveredNode.stats.upvotes}<br />
              <b>Prompt:</b>
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0 }}>{hoveredNode.prompt}</pre>
            </div>
          </div>
        )}
      </div>
      {/* Remix Modal */}
      <Modal isOpen={!!remixingNode} onClose={() => setRemixingNode(null)} title={`Branching from "${remixingNode?.title}"`}>
        <form onSubmit={handleRemixSubmit} className="space-y-4">
          <div>
            <label htmlFor="remix-title" className="block text-xs font-medium text-brand-gray mb-2 uppercase tracking-wider">
              New Prompt Title
            </label>
            <input
              id="remix-title"
              type="text"
              value={newPromptTitle}
              onChange={e => setNewPromptTitle(e.target.value)}
              required
              className="w-full bg-brand-dark/50 border-2 border-brand-gray/30 text-brand-light px-4 py-3 focus:outline-none focus:ring-0 focus:border-brand-cyan transition-colors duration-200"
            />
          </div>
          <div>
            <label htmlFor="remix-prompt" className="block text-xs font-medium text-brand-gray mb-2 uppercase tracking-wider">
              Evolved Prompt
            </label>
            <textarea
              id="remix-prompt"
              value={newPromptBody}
              onChange={e => setNewPromptBody(e.target.value)}
              rows={10}
              required
              className="w-full bg-brand-dark/50 border-2 border-brand-gray/30 text-brand-light px-4 py-3 font-mono focus:outline-none focus:ring-0 focus:border-brand-cyan transition-colors duration-200"
            />
          </div>
          <div className="text-right pt-4">
            <Button type="submit" variant="primary" withSound>
              Create Branch
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default EvolutionTree;
