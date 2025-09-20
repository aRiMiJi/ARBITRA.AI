import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'relative group px-8 py-4 font-bold tracking-wider uppercase focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-cyan disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out';

  const variantClasses = {
    primary: 'bg-brand-cyan text-brand-dark hover:shadow-[0_0_20px_theme(colors.brand-cyan)] hover:brightness-110 active:bg-brand-orange active:shadow-none active:brightness-125',
    secondary: 'bg-transparent border-2 border-brand-cyan text-brand-cyan overflow-hidden',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {/* Background fill for secondary button hover effect */}
      {variant === 'secondary' && (
        <span 
            className="absolute inset-0 bg-brand-cyan/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"
            aria-hidden="true"
        ></span>
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;