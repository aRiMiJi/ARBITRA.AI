
import React from 'react';
import { AlertIcon } from '../icons/Icons';

interface ErrorDisplayProps {
  message: string | null;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div
      className="mt-4 p-4 border-2 border-brand-orange/50 bg-brand-orange/10 text-brand-orange font-mono text-sm flex items-start gap-4 animate-fade-in rounded-lg"
      role="alert"
    >
      <AlertIcon className="h-5 w-5 flex-shrink-0 mt-0.5 text-brand-orange" />
      <span>{message}</span>
    </div>
  );
};

export default ErrorDisplay;
