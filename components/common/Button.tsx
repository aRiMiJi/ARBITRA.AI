import React, { useState } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  onClick,
  ...props
}) => {
  const baseClasses =
    'relative group px-8 py-4 font-bold tracking-wider uppercase focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out overflow-hidden';

  const [flicker, setFlicker] = useState(false);

  const variantClasses = {
    primary:
      'bg-brand-cyan text-brand-dark shadow-[0_8px_32px_0_#00fff780] hover:shadow-[0_0_24px_#ff760c88] hover:brightness-110 active:bg-brand-orange active:shadow-none active:brightness-125 border-2 border-transparent',
    secondary:
      'bg-transparent border-2 border-brand-cyan text-brand-cyan overflow-hidden hover:shadow-[0_0_16px_#00fff755] focus-visible:shadow-[0_0_24px_#00fff799]',
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Keep the visual flicker effect, but remove sound
    if (!props.disabled) {
      setFlicker(true);
      window.setTimeout(() => setFlicker(false), 100);
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type={props.type || 'button'}
      aria-label={props['aria-label'] || (typeof children === 'string' ? children : undefined)}
      className={`${baseClasses} ${variantClasses[variant]} ${className} ${flicker ? 'animate-cyberflicker' : ''}`}
      onClick={handleClick}
      {...props}
    >
      {variant === 'secondary' && (
        <span
          className="absolute inset-0 bg-brand-cyan/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out origin-left"
          aria-hidden="true"
        />
      )}

      {flicker && (
        <span className="absolute left-1/2 bottom-0 w-7 h-1 rounded opacity-75 bg-brand-orange animate-flick-twice" style={{ transform: 'translateX(-50%)' }} aria-hidden="true" />
      )}

      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;