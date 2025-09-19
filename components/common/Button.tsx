
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'px-6 py-3 font-bold tracking-wider uppercase transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark';

  const variantClasses = {
    primary: 'bg-brand-cyan text-brand-dark hover:shadow-[0_0_25px_rgba(0,246,255,0.7)] hover:-translate-y-1 focus:ring-brand-cyan',
    secondary: 'border-2 border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500 focus:ring-slate-500',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
