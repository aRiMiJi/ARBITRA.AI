import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { useGenAI } from '../contexts/GenAIContext';
import { Chat } from '@google/genai';
import { ArbitraIcon, CloseIcon, SendIcon } from './icons/Icons';
import { getApiErrorMessage } from '../utils/errorUtils';

type Message = {
  role: 'user' | 'model';
  content: string;
};

const TypingIndicator: React.FC = () => (
  <div className="flex items-center space-x-1 p-2">
    <span className="w-2 h-2 bg-brand-cyan rounded-full animate-pulse" style={{ animationDelay: '0s' }}></span>
    <span className="w-2 h-2 bg-brand-cyan rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
    <span className="w-2 h-2 bg-brand-cyan rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
  </div>
);

const ChatbotWidget: React.FC = () => {
  const { ai } = useGenAI();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatSession = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ai) {
      chatSession.current = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: `You are a helpful and friendly support assistant for a company called arbitra.ai.
          Your purpose is to answer user questions about the company and its product.
          
          About arbitra.ai: It's an enterprise-grade platform for managing, securing, and distributing proprietary AI prompts as licensed assets.
          Key features: Secure Prompt Licensing, Immutable Audit Trails, Role-Based Access Control, and Performance Analytics.
          The platform solves problems like IP leakage, compliance issues, lack of control over AI prompts, and inability to track ROI.
          
          Keep your answers concise and helpful. Be professional but approachable. If you don't know an answer, say that you are a specialized AI and can't answer that, but you can help with questions about arbitra.ai. Do not make up information.`,
        },
      });
      setMessages([{ role: 'model', content: "Hello! How can I help you with arbitra.ai today?" }]);
    }
  }, [ai]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !chatSession.current) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await chatSession.current.sendMessage({ message: input });
      const modelMessage: Message = { role: 'model', content: response.text ?? '' };
      setMessages(prev => [...prev, modelMessage]);
    } catch (err) {
      const errorMessage = getApiErrorMessage(err);
      setError(errorMessage);
      setMessages(prev => [...prev, { role: 'model', content: `Sorry, I encountered an error: ${errorMessage}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Widget Container */}
      <div className={`fixed bottom-24 left-6 z-[100] w-[90vw] max-w-sm h-[70vh] max-h-[600px] transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <div className="flex flex-col h-full bg-brand-dark border-2 border-brand-dark-accent shadow-[0_0_48px_#00fff744]">
          {/* Header */}
          <header className="flex items-center justify-between p-4 border-b-2 border-brand-dark-accent flex-shrink-0">
            <div className="flex items-center gap-3">
              <ArbitraIcon className="h-7 w-7 text-brand-cyan" />
              <h3 className="font-sans font-bold text-brand-light uppercase text-lg">arbitra.ai Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-brand-gray hover:text-brand-cyan transition-all duration-300 transform hover:scale-110 hover:shadow-[0_0_16px_#ffae51cc] rounded-full"
              aria-label="Close chat"
            >
              <CloseIcon className="h-6 w-6" />
            </button>
          </header>

          {/* Messages */}
          <div className="flex-grow p-4 overflow-y-auto" aria-live="polite">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 font-mono text-sm ${msg.role === 'user' ? 'bg-brand-cyan text-brand-dark' : 'bg-brand-dark-accent text-brand-light'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                    <div className="bg-brand-dark-accent p-2">
                        <TypingIndicator />
                    </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t-2 border-brand-dark-accent flex-shrink-0">
            {error && <p className="text-brand-orange text-xs font-mono mb-2 text-center">{error}</p>}
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about arbitra.ai..."
                className="w-full bg-brand-dark-accent border-2 border-brand-gray/30 text-brand-light px-4 py-2 font-mono focus:outline-none focus:ring-0 focus:border-brand-cyan transition-colors duration-200"
                aria-label="Chat message input"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="h-11 w-11 flex items-center justify-center bg-brand-cyan text-brand-dark border-2 border-brand-cyan disabled:opacity-50 transition-all duration-300 transform hover:scale-110 hover:shadow-[0_0_28px_#ffae51cc] hover:bg-brand-orange"
                aria-label="Send message"
              >
                <SendIcon className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 left-6 z-50 h-16 w-16 flex items-center justify-center bg-brand-dark text-brand-cyan border-2 border-brand-cyan shadow-[0_2px_28px_#00f6ff44] rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-[0_0_28px_#ffae51cc] ${isOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}
        aria-label={isOpen ? "Close chat widget" : "Open chat widget"}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <ArbitraIcon className="h-8 w-8" />
      </button>
    </>
  );
};

export default ChatbotWidget;