import React, { useState } from 'react';
import { useGenAI } from '../contexts/GenAIContext';
import { Type } from '@google/genai';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Button from './common/Button';
import CopyButton from './common/CopyButton';
import ErrorDisplay from './common/ErrorDisplay';
import { getApiErrorMessage } from '../utils/errorUtils';

const pipelineOptions = {
  dataSources: ['File Upload', 'Web URL', 'Notion', 'S3 Bucket'],
  chunking: ['Fixed Size', 'Recursive Character', 'Semantic'],
  embeddingModels: ['text-embedding-004', 'multilingual-e5-large', 'bge-large-en-v1.5'],
  vectorDBs: ['ChromaDB', 'Pinecone', 'Weaviate', 'Qdrant'],
  llms: ['gemini-2.5-flash', 'claude-3-opus-20240229', 'gpt-4-turbo'],
};

const tooltipData = {
    dataSources: {
        'File Upload': 'Directly upload documents like .txt, .pdf, or .md from your local machine.',
        'Web URL': 'Scrape and ingest content from a public web page.',
        'Notion': 'Connect to a Notion integration to pull documents from a database.',
        'S3 Bucket': 'Ingest documents directly from a specified AWS S3 bucket.'
    },
    chunking: {
        'Fixed Size': 'Splits text into chunks of a specific character count with overlap. Simple and fast.',
        'Recursive Character': 'Splits text recursively by a list of characters (e.g., \\n\\n, \\n, " "), trying to keep related text together.',
        'Semantic': 'Splits text based on sentence meaning using embedding models for context-aware chunks. Most effective but slower.'
    },
    embeddingModels: {
        'text-embedding-004': 'Google\'s latest, high-quality embedding model for general purpose use.',
        'multilingual-e5-large': 'A powerful model that supports a wide range of languages for embedding.',
        'bge-large-en-v1.5': 'A popular open-source model from the BAAI collection, excellent for English text.'
    },
    vectorDBs: {
        'ChromaDB': 'An open-source, in-memory vector database, great for development and small projects.',
        'Pinecone': 'A popular, managed vector database service for production-scale applications.',
        'Weaviate': 'An open-source vector search engine with support for GraphQL APIs.',
        'Qdrant': 'A vector similarity search engine with advanced filtering capabilities.'
    },
    llms: {
        'gemini-2.5-flash': 'A powerful, multimodal model from Google, good for a wide range of tasks.',
        'claude-3-opus-20240229': 'Anthropic\'s most powerful model, capable of highly complex analysis.',
        'gpt-4-turbo': 'OpenAI\'s latest GPT-4 model, optimized for performance and knowledge.'
    }
}

type PipelineConfig = {
  dataSource: string;
  chunking: string;
  embeddingModel: string;
  vectorDB: string;
  llm: string;
};

const BlinkingCursor: React.FC = () => (
    <div className="flex justify-center items-center h-full">
      <span className="inline-block w-2.5 h-7 bg-brand-cyan animate-flicker" />
    </div>
);

const SelectMenu: React.FC<{ label: string; options: string[]; value: string; onChange: (value: string) => void; tooltips: { [key: string]: string; } }> = ({ label, options, value, onChange, tooltips }) => (
    <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-brand-gray mb-2">{label}</label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-brand-dark-accent border-2 border-brand-gray/30 text-brand-light p-3 font-mono focus:outline-none focus:ring-0 focus:border-brand-cyan transition-colors duration-200"
        >
            {options.map(opt => <option key={opt} value={opt} title={tooltips[opt] || ''}>{opt}</option>)}
        </select>
    </div>
);

const ConfigSeparator: React.FC = () => <div className="w-full h-px bg-brand-gray/20 my-1" />;


const RAGPipelineDesigner: React.FC = () => {
    const { ai } = useGenAI();
    const [config, setConfig] = useState<PipelineConfig>({
        dataSource: pipelineOptions.dataSources[0],
        chunking: pipelineOptions.chunking[0],
        embeddingModel: pipelineOptions.embeddingModels[0],
        vectorDB: pipelineOptions.vectorDBs[0],
        llm: pipelineOptions.llms[0],
    });
    const [generatedCode, setGeneratedCode] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleConfigChange = (field: keyof PipelineConfig, value: string) => {
        setConfig(prev => ({ ...prev, [field]: value }));
    };

    const handleGenerateCode = async () => {
        if (!ai) return;
        setIsLoading(true);
        setError(null);
        setGeneratedCode('');
        
        const systemInstruction = `You are a helpful AI assistant that generates Python code for building RAG pipelines using the LangChain library. Based on the user's configuration, generate a complete, runnable Python script. The script should be well-commented and clearly show each stage of the pipeline.
        
        User's Configuration:
        - Data Source: ${config.dataSource}
        - Chunking Strategy: ${config.chunking}
        - Embedding Model: ${config.embeddingModel}
        - Vector Database: ${config.vectorDB}
        - Language Model: ${config.llm}
        
        Generate the Python code now. Use placeholder API keys where necessary (e.g., 'YOUR_API_KEY'). Respond ONLY with the python code block.`;

        try {
            const chat = ai.chats.create({ model: 'gemini-2.5-flash' });
            const response = await chat.sendMessage({ message: systemInstruction });
            const cleanedCode = (response.text ?? '').replace(/^```python\n|```$/g, '').trim();
            setGeneratedCode(cleanedCode);
        } catch (err) {
            setError(getApiErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full min-h-[75vh]">
            {/* Configuration Panel */}
            <div className="md:col-span-1 flex flex-col gap-4">
                <h3 className="font-mono uppercase text-brand-gray tracking-widest text-center mb-2">Configure Pipeline</h3>
                <SelectMenu label="Data Source" options={pipelineOptions.dataSources} value={config.dataSource} onChange={val => handleConfigChange('dataSource', val)} tooltips={tooltipData.dataSources} />
                <ConfigSeparator />
                <SelectMenu label="Chunking Strategy" options={pipelineOptions.chunking} value={config.chunking} onChange={val => handleConfigChange('chunking', val)} tooltips={tooltipData.chunking} />
                <ConfigSeparator />
                <SelectMenu label="Embedding Model" options={pipelineOptions.embeddingModels} value={config.embeddingModel} onChange={val => handleConfigChange('embeddingModel', val)} tooltips={tooltipData.embeddingModels} />
                <ConfigSeparator />
                <SelectMenu label="Vector Database" options={pipelineOptions.vectorDBs} value={config.vectorDB} onChange={val => handleConfigChange('vectorDB', val)} tooltips={tooltipData.vectorDBs} />
                <ConfigSeparator />
                <SelectMenu label="Language Model (LLM)" options={pipelineOptions.llms} value={config.llm} onChange={val => handleConfigChange('llm', val)} tooltips={tooltipData.llms} />
                <Button onClick={handleGenerateCode} variant="primary" className="mt-auto" disabled={isLoading}>
                    {isLoading ? 'Generating Code...' : 'Generate Pipeline Code'}
                </Button>
            </div>

            {/* Code Output */}
            <div className="md:col-span-2 flex flex-col">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-mono uppercase text-brand-gray tracking-widest">Generated Python Code</h3>
                    {generatedCode && <CopyButton textToCopy={generatedCode} label="Generated Python code"/>}
                </div>
                <div className="relative flex-grow border-2 border-brand-dark-accent bg-brand-dark/50 p-4 overflow-y-auto scanline-container">
                    {isLoading && <BlinkingCursor />}
                    {!isLoading && !generatedCode && <p className="text-brand-gray text-center">Generated code will appear here.</p>}
                    {!isLoading && generatedCode && (
                        <SyntaxHighlighter language="python" style={vscDarkPlus} customStyle={{ background: 'transparent', padding: '0', margin: '0' }}>
                            {generatedCode}
                        </SyntaxHighlighter>
                    )}
                </div>
                <ErrorDisplay message={error} />
            </div>
        </div>
    );
};

export default RAGPipelineDesigner;