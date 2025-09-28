import React, { useState, useMemo } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import Modal from './common/Modal';

const mockPrompts = [
  { id: 1, title: "Product Description Generator", description: "Generates a compelling e-commerce product description from a list of features.", tags: ["marketing", "e-commerce"], author: "UserA", version: "2.1", metrics: { avgLatency: "1.2s", costPerCall: "$0.0015", successRate: 94, executions: 1250 } },
  { id: 2, "title": "SQL Query Generator", "description": "Translates a natural language question into a functional SQL query.", "tags": ["technical", "database"], author: "UserB", version: "1.8", metrics: { avgLatency: "0.9s", costPerCall: "$0.0011", successRate: 98, executions: 3400 } },
  { id: 3, "title": "Customer Support Email Drafter", "description": "Creates empathetic and professional replies to common customer support issues.", "tags": ["support", "communication"], author: "UserC", version: "3.0", metrics: { avgLatency: "1.5s", costPerCall: "$0.0018", successRate: 91, executions: 850 } },
  { id: 4, "title": "Code Explainer (Python)", "description": "Explains a snippet of Python code in simple terms, describing its function and logic.", "tags": ["technical", "code", "python"], author: "UserD", version: "1.2", metrics: { avgLatency: "2.1s", costPerCall: "$0.0025", successRate: 89, executions: 520 } },
  { id: 5, "title": "Social Media Post Creator", "description": "Generates a short, engaging social media post for a given topic and platform.", "tags": ["marketing", "social-media"], author: "UserA", version: "2.5", metrics: { avgLatency: "0.8s", costPerCall: "$0.0009", successRate: 96, executions: 4500 } },
  { id: 6, "title": "Legal Clause Summarizer", "description": "Summarizes complex legal clauses into plain, understandable language.", "tags": ["legal", "summarization"], author: "UserE", version: "1.0", metrics: { avgLatency: "2.8s", costPerCall: "$0.0032", successRate: 93, executions: 210 } },
];

type Prompt = typeof mockPrompts[0];

const PromptCard: React.FC<{ prompt: Prompt }> = ({ prompt }) => (
    <Card className="flex flex-col h-full">
        <div className="flex-grow">
            <h4 className="text-xl font-bold font-sans text-brand-light uppercase">{prompt.title}</h4>
            <p className="text-xs text-brand-cyan font-mono mt-1">v{prompt.version} by {prompt.author}</p>
            <p className="text-brand-gray mt-4 text-sm">{prompt.description}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
            {prompt.tags.map(tag => <span key={tag} className="px-2 py-1 bg-brand-dark text-brand-cyan text-xs font-mono uppercase">{tag}</span>)}
        </div>
        <div className="mt-6 pt-4 border-t-2 border-brand-dark-accent grid grid-cols-2 gap-4 text-center">
            <div>
                <p className="text-xs uppercase text-brand-gray">Success</p>
                <p className="text-lg font-mono font-bold text-brand-orange">{prompt.metrics.successRate}%</p>
            </div>
            <div>
                <p className="text-xs uppercase text-brand-gray">Executions</p>
                <p className="text-lg font-mono font-bold text-brand-light">{prompt.metrics.executions.toLocaleString()}</p>
            </div>
        </div>
    </Card>
);

const PromptLibrary: React.FC = () => {
    const [prompts, setPrompts] = useState<Prompt[]>(mockPrompts);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredPrompts = useMemo(() => {
        return prompts.filter(p => 
            p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [prompts, searchTerm]);

    const handleNewPromptSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newPrompt: Prompt = {
            id: Date.now(),
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            tags: (formData.get('tags') as string).split(',').map(t => t.trim()),
            author: 'CurrentUser',
            version: '1.0',
            metrics: { avgLatency: "N/A", costPerCall: "N/A", successRate: 0, executions: 0 }
        };
        setPrompts(prev => [newPrompt, ...prev]);
        setIsModalOpen(false);
    };

    return (
        <>
        <div className="flex flex-col h-full min-h-[75vh]">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold font-sans tracking-wider text-brand-light uppercase">Federated Prompt Library</h2>
                <p className="mt-2 text-brand-gray max-w-2xl mx-auto">
                    A centralized, curated, and performance-tracked repository for effective LLM prompts.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <input
                    type="search"
                    placeholder="Search prompts by title, tag, or description..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="flex-grow bg-brand-dark-accent border-2 border-brand-gray/30 text-brand-light p-3 font-mono focus:outline-none focus:ring-0 focus:border-brand-cyan transition-colors duration-200"
                />
                <Button variant="primary" onClick={() => setIsModalOpen(true)}>Submit New Prompt</Button>
            </div>

            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto">
                {filteredPrompts.map(prompt => <PromptCard key={prompt.id} prompt={prompt} />)}
            </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Submit New Prompt">
             <form onSubmit={handleNewPromptSubmit} className="space-y-4">
                <div>
                    <label htmlFor="prompt-title" className="block text-xs font-medium text-brand-gray mb-2 uppercase tracking-wider">Title</label>
                    <input name="title" id="prompt-title" type="text" required className="w-full bg-brand-dark/50 border-2 border-brand-gray/30 text-brand-light px-4 py-3 focus:outline-none focus:ring-0 focus:border-brand-cyan transition-colors duration-200" />
                </div>
                <div>
                    <label htmlFor="prompt-desc" className="block text-xs font-medium text-brand-gray mb-2 uppercase tracking-wider">Description</label>
                    <textarea name="description" id="prompt-desc" required rows={3} className="w-full bg-brand-dark/50 border-2 border-brand-gray/30 text-brand-light px-4 py-3 focus:outline-none focus:ring-0 focus:border-brand-cyan transition-colors duration-200" />
                </div>
                 <div>
                    <label htmlFor="prompt-tags" className="block text-xs font-medium text-brand-gray mb-2 uppercase tracking-wider">Tags (comma-separated)</label>
                    <input name="tags" id="prompt-tags" type="text" required className="w-full bg-brand-dark/50 border-2 border-brand-gray/30 text-brand-light px-4 py-3 focus:outline-none focus:ring-0 focus:border-brand-cyan transition-colors duration-200" />
                </div>
                <div className="text-right pt-4">
                    <Button type="submit" variant="primary">Submit to Library</Button>
                </div>
            </form>
        </Modal>
        </>
    );
};

export default PromptLibrary;
