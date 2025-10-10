import React, { useState, useMemo } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import Modal from './common/Modal';
import CopyButton from './common/CopyButton';

const mockPrompts = [
  { id: 1, title: "Product Description Generator", description: "Generates a compelling e-commerce product description from a list of features.", tags: ["marketing", "e-commerce"], author: "UserA", version: "2.1", metrics: { avgLatency: "1.2s", costPerCall: "$0.0015", successRate: 94, executions: 1250 }, fullPrompt: "ROLE: E-commerce Copywriter\nGOAL: Create a persuasive and SEO-friendly product description.\nCONTEXT: The product is [Product Name]. Key features are: [Feature 1], [Feature 2], [Feature 3]. Target audience is [Target Audience].\nINSTRUCTIONS: Write a 150-word description. Start with a catchy hook. Highlight the benefits of the key features. End with a strong call to action.\nFORMAT: Plain text." },
  { id: 2, "title": "SQL Query Generator", "description": "Translates a natural language question into a functional SQL query.", "tags": ["technical", "database"], author: "UserB", version: "1.8", metrics: { avgLatency: "0.9s", costPerCall: "$0.0011", successRate: 98, executions: 3400 }, fullPrompt: "ROLE: SQL Expert\nGOAL: Translate the user's question into an efficient SQL query.\nCONTEXT: The database schema involves tables: `users` (user_id, name, signup_date), `orders` (order_id, user_id, amount, order_date).\nUSER QUESTION: \"How many users who signed up in the last month have made a purchase?\"\nINSTRUCTIONS: Generate a single, runnable SQL query for PostgreSQL. Do not explain the query, just provide the code.\nFORMAT: SQL code block." },
  { id: 3, "title": "Customer Support Email Drafter", "description": "Creates empathetic and professional replies to common customer support issues.", "tags": ["support", "communication"], author: "UserC", version: "3.0", metrics: { avgLatency: "1.5s", costPerCall: "$0.0018", successRate: 91, executions: 850 }, fullPrompt: "ROLE: Senior Customer Support Agent\nGOAL: Draft a helpful and empathetic email reply.\nCONTEXT: Customer is reporting issue: [Issue Description]. Customer name is [Customer Name].\nINSTRUCTIONS: 1. Acknowledge and validate the customer's frustration. 2. Apologize for the inconvenience. 3. Provide a clear next step or solution. 4. Maintain a professional and friendly tone.\nFORMAT: A complete email draft." },
  { id: 4, "title": "Code Explainer (Python)", "description": "Explains a snippet of Python code in simple terms, describing its function and logic.", "tags": ["technical", "code", "python"], author: "UserD", version: "1.2", metrics: { avgLatency: "2.1s", costPerCall: "$0.0025", successRate: 89, executions: 520 }, fullPrompt: "ROLE: Python Tutor\nGOAL: Explain a piece of Python code to a beginner.\nCODE SNIPPET: [Paste Python code here]\nINSTRUCTIONS: Explain what the code does, line by line. Describe the overall purpose of the script. Identify any complex concepts and explain them simply. Avoid overly technical jargon.\nFORMAT: Markdown with code blocks for examples." },
  { id: 5, "title": "Social Media Post Creator", "description": "Generates a short, engaging social media post for a given topic and platform.", "tags": ["marketing", "social-media"], author: "UserA", version: "2.5", metrics: { avgLatency: "0.8s", costPerCall: "$0.0009", successRate: 96, executions: 4500 }, fullPrompt: "ROLE: Social Media Manager\nGOAL: Create an engaging social media post.\nTOPIC: [Topic]\nPLATFORM: [e.g., Twitter, LinkedIn]\nINSTRUCTIONS: Write a post that is concise and includes 2-3 relevant hashtags. Use an attention-grabbing first sentence. If for LinkedIn, be more professional. If for Twitter, be more casual and witty.\nFORMAT: Plain text, ready to paste." },
  { id: 6, "title": "Legal Clause Summarizer", "description": "Summarizes complex legal clauses into plain, understandable language.", "tags": ["legal", "summarization"], author: "UserE", version: "1.0", metrics: { avgLatency: "2.8s", costPerCall: "$0.0032", successRate: 93, executions: 210 }, fullPrompt: "ROLE: Legal Analyst\nGOAL: Summarize a legal clause for a non-lawyer.\nLEGAL CLAUSE: [Paste legal clause here]\nINSTRUCTIONS: Rewrite the clause in simple, plain English. Focus on the key rights and obligations of the parties involved. Do not provide legal advice, simply explain what the text means. The summary should be no more than 50 words.\nFORMAT: A single paragraph of plain text." },
];

type Prompt = typeof mockPrompts[0];

const PromptCard: React.FC<{ prompt: Prompt }> = ({ prompt }) => (
    <Card className="flex flex-col h-full hover:border-brand-cyan transition-all duration-200">
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
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
    const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
    const [newPromptData, setNewPromptData] = useState({
        title: '',
        description: '',
        tags: '',
        fullPrompt: ''
    });

    const filteredPrompts = useMemo(() => {
        return prompts.filter(p => 
            p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [prompts, searchTerm]);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewPromptData(prev => ({ ...prev, [name]: value }));
    };

    const handleNewPromptSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newPrompt: Prompt = {
            id: Date.now(),
            title: newPromptData.title,
            description: newPromptData.description,
            tags: newPromptData.tags.split(',').map(t => t.trim()),
            author: 'CurrentUser',
            version: '1.0',
            metrics: { avgLatency: "N/A", costPerCall: "N/A", successRate: 0, executions: 0 },
            fullPrompt: newPromptData.fullPrompt
        };
        setPrompts(prev => [newPrompt, ...prev]);
        setIsSubmitModalOpen(false);
        setNewPromptData({ title: '', description: '', tags: '', fullPrompt: '' });
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
                <Button variant="primary" onClick={() => setIsSubmitModalOpen(true)}>Submit New Prompt</Button>
            </div>

            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto">
                {filteredPrompts.map(prompt => (
                    <div key={prompt.id} onClick={() => setSelectedPrompt(prompt)} className="cursor-pointer h-full">
                        <PromptCard prompt={prompt} />
                    </div>
                ))}
            </div>
        </div>
        
        {/* Submit New Prompt Modal */}
        <Modal isOpen={isSubmitModalOpen} onClose={() => setIsSubmitModalOpen(false)} title="Submit New Prompt">
             <form onSubmit={handleNewPromptSubmit} className="space-y-4">
                <div>
                    <label htmlFor="prompt-title" className="block text-xs font-medium text-brand-gray mb-2 uppercase tracking-wider">Title</label>
                    <input name="title" id="prompt-title" type="text" required value={newPromptData.title} onChange={handleFormChange} className="w-full bg-brand-dark/50 border-2 border-brand-gray/30 text-brand-light px-4 py-3 focus:outline-none focus:ring-0 focus:border-brand-cyan transition-colors duration-200" />
                </div>
                <div>
                    <label htmlFor="prompt-desc" className="block text-xs font-medium text-brand-gray mb-2 uppercase tracking-wider">Description</label>
                    <textarea name="description" id="prompt-desc" required rows={3} value={newPromptData.description} onChange={handleFormChange} className="w-full bg-brand-dark/50 border-2 border-brand-gray/30 text-brand-light px-4 py-3 focus:outline-none focus:ring-0 focus:border-brand-cyan transition-colors duration-200" />
                </div>
                 <div>
                    <label htmlFor="prompt-tags" className="block text-xs font-medium text-brand-gray mb-2 uppercase tracking-wider">Tags (comma-separated)</label>
                    <input name="tags" id="prompt-tags" type="text" required value={newPromptData.tags} onChange={handleFormChange} className="w-full bg-brand-dark/50 border-2 border-brand-gray/30 text-brand-light px-4 py-3 focus:outline-none focus:ring-0 focus:border-brand-cyan transition-colors duration-200" />
                </div>
                 <div>
                    <div className="flex justify-between items-center mb-2">
                         <label htmlFor="prompt-full" className="block text-xs font-medium text-brand-gray uppercase tracking-wider">Full Prompt Text</label>
                         <CopyButton textToCopy={newPromptData.fullPrompt} label="Copy full prompt text"/>
                    </div>
                    <textarea name="fullPrompt" id="prompt-full" required rows={6} value={newPromptData.fullPrompt} onChange={handleFormChange} className="w-full bg-brand-dark/50 border-2 border-brand-gray/30 text-brand-light px-4 py-3 font-mono focus:outline-none focus:ring-0 focus:border-brand-cyan transition-colors duration-200" />
                </div>
                <div className="text-right pt-4">
                    <Button type="submit" variant="primary">Submit to Library</Button>
                </div>
            </form>
        </Modal>

        {/* View Prompt Details Modal */}
        <Modal isOpen={!!selectedPrompt} onClose={() => setSelectedPrompt(null)} title={selectedPrompt?.title || 'Prompt Details'}>
            {selectedPrompt && (
                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between items-center mb-2">
                             <h4 className="font-mono uppercase text-brand-cyan tracking-widest">Full Prompt Text</h4>
                             <CopyButton textToCopy={selectedPrompt.fullPrompt} label={`Copy prompt for ${selectedPrompt.title}`} />
                        </div>
                        <div className="p-4 bg-brand-dark font-mono text-brand-light/90 text-sm border-2 border-brand-dark-accent max-h-80 overflow-y-auto">
                            <pre className="whitespace-pre-wrap font-inherit">{selectedPrompt.fullPrompt}</pre>
                        </div>
                    </div>
                    <div className="text-right">
                        <Button variant="secondary" onClick={() => setSelectedPrompt(null)}>Close</Button>
                    </div>
                </div>
            )}
        </Modal>
        </>
    );
};

export default PromptLibrary;