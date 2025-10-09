import React, { useState, useEffect, DragEvent, FormEvent } from 'react';
import Button from './common/Button';
import { StarIcon } from './icons/Icons';

type Prompt = {
  id: number;
  text: string;
  upvotes: number;
  position: { top: number; left: number };
  style: {
    color: string;
    fontSize: string;
    rotation: number;
  };
};

const initialPrompts: Prompt[] = [
  { id: 1, text: "Generate a synthwave album cover featuring a chrome T-Rex driving a DeLorean.", upvotes: 12, position: { top: 20, left: 10 }, style: { color: 'text-brand-cyan', fontSize: 'text-2xl', rotation: -3 } },
  { id: 2, text: "Write a short story in the style of a 1940s noir detective, but the mystery is a missing rubber duck.", upvotes: 25, position: { top: 5, left: 40 }, style: { color: 'text-brand-orange', fontSize: 'text-xl', rotation: 2 } },
  { id: 3, text: "Describe the process of making a sandwich as if it were a sacred, ancient ritual.", upvotes: 5, position: { top: 45, left: 60 }, style: { color: 'text-brand-light', fontSize: 'text-lg', rotation: 4 } },
];

const neonColors = [
  { name: 'Cyan', class: 'text-brand-cyan', hex: '#00f6ff' },
  { name: 'Orange', class: 'text-brand-orange', hex: '#ff7a00' },
  { name: 'Hot Pink', class: 'text-pink-500', hex: '#ec4899' },
  { name: 'Lime', class: 'text-lime-400', hex: '#a3e635' },
];

const GraffitiWall: React.FC = () => {
  const [prompts, setPrompts] = useState<Prompt[]>(initialPrompts);
  const [newPrompt, setNewPrompt] = useState('');
  const [selectedColor, setSelectedColor] = useState(neonColors[0]);

  // Animate floating up of popular prompts
  useEffect(() => {
    const sortedPrompts = [...prompts].sort((a, b) => b.upvotes - a.upvotes);
    const wallHeight = 70; // Represents 70% of height to position within

    const updatedPrompts = prompts.map(p => {
      const rank = sortedPrompts.findIndex(sp => sp.id === p.id);
      const newTop = 5 + (rank / prompts.length) * wallHeight;
      return { ...p, position: { ...p.position, top: newTop } };
    });

    if (JSON.stringify(prompts) !== JSON.stringify(updatedPrompts)) {
      setPrompts(updatedPrompts);
    }
    // eslint-disable-next-line
  }, [prompts.map(p => p.upvotes).join(',')]);

  const handleUpvote = (id: number) => {
    setPrompts(prompts.map(p => p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p));
  };

  const handleDragStart = (e: DragEvent<HTMLSpanElement>, text: string) => {
    e.dataTransfer.setData('text/plain', text);
  };

  const handleDrop = (e: DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const draggedText = e.dataTransfer.getData('text/plain');
    setNewPrompt(prev => `${prev} ${draggedText}`.replace(/\s{2,}/g, ' ').trim());
    e.currentTarget.classList.remove('border-brand-cyan');
  };

  const handleDragOver = (e: DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-brand-cyan');
  };

  const handleDragLeave = (e: DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-brand-cyan');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newPrompt.trim()) return;

    const newEntry: Prompt = {
      id: Date.now(),
      text: newPrompt,
      upvotes: 0,
      position: {
        top: 50 + Math.random() * 20,
        left: 10 + Math.random() * 70,
      },
      style: {
        color: selectedColor.class,
        fontSize: `text-${['lg', 'xl', '2xl'][Math.floor(Math.random() * 3)]}`,
        rotation: Math.random() * 10 - 5,
      }
    };
    setPrompts(prev => [...prev, newEntry]);
    setNewPrompt('');
  };

  const getGlowClass = (upvotes: number) => {
    if (upvotes > 20) return 'animate-pulse-glow';
    if (upvotes > 10) return 'opacity-100';
    if (upvotes > 5) return 'opacity-90';
    return 'opacity-80';
  };

  const getGlowStyle = (colorClass: string, upvotes: number) => {
    if (upvotes <= 10) return {};
    const color = neonColors.find(c => c.class === colorClass)?.hex || '#00f6ff';
    const intensity = Math.min((upvotes - 10) / 2, 15);
    return {
      textShadow: `0 0 ${intensity}px ${color}, 0 0 ${intensity * 2}px ${color}`,
      filter: `brightness(1.12) drop-shadow(0 0 7px ${color})`
    };
  };

  return (
    <div className="flex flex-col h-[80vh] min-h-[600px]">
      {/* The Wall */}
      <div
        className="flex-grow relative overflow-hidden p-4 border-2 border-brand-dark-accent bg-black/20"
        style={{
          backgroundImage:
            'url(data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23282828%22%20fill-opacity%3D%220.4%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M0%2040L40%200H20L0%2020M40%2040V20L20%2040%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E)'
        }}
      >
        {prompts.map(prompt => (
          <div
            key={prompt.id}
            className={`absolute p-2 group transition-all duration-1000 ease-out animate-fade-in select-none cursor-pointer ${getGlowClass(prompt.upvotes)}`}
            style={{
              top: `${prompt.position.top}%`,
              left: `${prompt.position.left}%`,
              transform: `rotate(${prompt.style.rotation}deg)`,
              zIndex: 10 + prompt.upvotes
            }}
            tabIndex={0}
          >
            <p
              className={`font-mono break-words whitespace-pre-line ${prompt.style.fontSize} ${prompt.style.color} transition-all duration-500 tracking-wider`}
              style={getGlowStyle(prompt.style.color, prompt.upvotes)}
            >
              {prompt.text.split(' ').map((word, i) => (
                <span key={i} draggable onDragStart={e => handleDragStart(e, word)} className="cursor-grab select-text">
                  {word}{' '}
                </span>
              ))}
            </p>
            <div className="absolute -bottom-2 -right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs font-mono text-brand-cyan">{prompt.upvotes}</span>
              <button onClick={() => handleUpvote(prompt.id)} className="p-1 text-brand-gray hover:text-brand-orange hover:scale-125 transition-all" aria-label="Upvote prompt">
                <StarIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 p-4 border-t-2 border-brand-dark-accent bg-brand-dark/50">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <textarea
            value={newPrompt}
            onChange={e => setNewPrompt(e.target.value)}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            placeholder="Type or drag to remix a prompt..."
            className="w-full flex-grow bg-brand-dark-accent border-2 border-brand-gray/30 text-brand-light p-2 font-mono focus:outline-none focus:ring-0 focus:border-brand-cyan transition-colors duration-200 resize-none rounded-lg"
            rows={2}
          />
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-center gap-2">
              {neonColors.map(color => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${selectedColor.name === color.name ? 'border-brand-light scale-110 ring-2 ring-brand-cyan' : 'border-transparent'} shadow-[0_0_8px_#00f6ff66]`}
                  style={{ backgroundColor: color.hex }}
                  aria-label={`Select ${color.name} color`}
                />
              ))}
            </div>
            <Button type="submit" variant="primary" className="w-full">
              Spray
            </Button>
          </div>
        </form>
        <p className="text-xs text-center text-brand-gray mt-2 font-mono">
          [ DRAG WORDS FROM THE WALL TO REMIX ] - [ UPVOTE THE BEST PROMPTS ]
        </p>
      </div>
    </div>
  );
};

export default GraffitiWall;