import React, { useState } from 'react';
import { CopyIcon } from '../icons/Icons';

interface CopyButtonProps {
  textToCopy: string;
  label: string; // This should be the full descriptive label, e.g., "Copy Crisis Prompt to clipboard"
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy, label }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (!textToCopy || isCopied) return;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }).catch(err => console.error('Failed to copy text: ', err));
  };

  const isDisabled = !textToCopy || textToCopy.startsWith('//');

  return (
    <button
      onClick={handleCopy}
      disabled={isDisabled || isCopied}
      className={`px-3 py-1 text-xs font-mono uppercase tracking-widest flex items-center gap-2 bg-brand-dark-accent border-2 border-brand-gray/30 text-brand-gray hover:border-brand-cyan hover:text-brand-cyan disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-brand-gray/30 disabled:hover:text-brand-gray transition-all duration-200 ${isCopied ? '!border-brand-cyan !text-brand-cyan' : ''}`}
      aria-label={isCopied ? `Copied: ${label}` : label}
    >
      <CopyIcon className="h-4 w-4" />
      {isCopied ? 'Copied!' : 'Copy'}
    </button>
  );
};

export default CopyButton;
