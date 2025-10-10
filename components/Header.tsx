import React, { CSSProperties } from 'react';
import LanguageToggle from './LanguageToggle';
import AccessibilityToggle from './AccessibilityToggle';

// FIX: Explicitly type LOGO_FONT as React.CSSProperties to ensure type compatibility.
const LOGO_FONT: CSSProperties = {
  fontFamily: '"IBM Plex Mono", monospace',
  fontWeight: 700,
  letterSpacing: '0.03em',
  textTransform: 'uppercase',
  fontSize: 33,
  color: '#EAEAEA'
};

export const ArbitraLogo: React.FC<{ className?: string }> = ({ className }) => {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onFocus={() => setExpanded(true)}
      onBlur={() => setExpanded(false)}
      tabIndex={0}
      className={`relative select-none outline-none cursor-pointer ${className || ''}`}
      style={{ display: 'inline-block' }}
      aria-label="arbitra.ai logo"
    >
      <span
        style={{
          ...LOGO_FONT,
          display: 'inline-flex',
          alignItems: 'center',
          filter: expanded
            ? 'drop-shadow(0 0 16px #00f6ffb8)'
            : 'drop-shadow(0 0 6px #00f6ff38)',
          transition: 'filter 320ms cubic-bezier(.45,.04,.32,.93)'
        }}
      >
        A
        <span
          style={{
            overflow: 'hidden',
            width: expanded ? 104 : 0,
            maxWidth: expanded ? 110 : 0,
            opacity: expanded ? 1 : 0,
            display: 'inline-block',
            transition:
              'width 340ms cubic-bezier(.25,0,.3,1), max-width 340ms cubic-bezier(.25,0,.3,1), opacity 220ms cubic-bezier(.41,0,.4,1)',
            whiteSpace: 'nowrap',
            willChange: 'width, max-width, opacity'
          }}
          aria-hidden="true"
        >
          RBITR
        </span>
        A
      </span>
    </div>
  );
};

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Toolkit', href: '#tools' },
  { label: 'Analytics', href: '#analytics' },
  { label: 'Contact', href: '#contact' }
];

const Header: React.FC = () => {
  return (
    <header id="home" className="w-full px-4 py-2 flex items-center justify-between bg-brand-dark border-b-2 border-brand-dark-accent sticky top-0 z-50">
      <a href="#home" aria-label="Back to homepage">
        <ArbitraLogo />
      </a>
      <div className="flex items-center gap-4">
        <nav className="flex items-center gap-1">
          {navItems.map((item, idx) => (
            <React.Fragment key={item.href}>
              <a
                href={item.href}
                className="relative text-xs font-mono uppercase tracking-widest px-2 py-1 text-brand-light hover:text-brand-cyan transition-all duration-200 font-bold group transform hover:scale-105"
                tabIndex={0}
                style={{ outline: 'none', letterSpacing: '0.09em' }}
              >
                {item.label}
                 <span
                    className="absolute bottom-0 left-0 block h-px bg-brand-cyan w-full transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 origin-center"
                    aria-hidden="true"
                  />
              </a>
              {idx < navItems.length - 1 && (
                <span className="flex items-center mx-1" aria-hidden="true">
                  <span
                    className="block w-px h-4 bg-brand-gray/30 group-hover:bg-brand-orange transition-all duration-200"
                    style={{
                      opacity: 0.48,
                      transition: "background-color 230ms cubic-bezier(.4,0,.2,1), opacity 180ms cubic-bezier(.4,0,.2,1)"
                    }}
                  ></span>
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>
        <div className="w-px h-6 bg-brand-gray/30" aria-hidden="true"></div>
        <LanguageToggle />
        <AccessibilityToggle />
      </div>
      <style>{`
        nav > a:focus + span > span,
        nav > a:hover + span > span {
          background: #00f6ff !important;
          opacity: 1;
        }
      `}</style>
    </header>
  );
};

export default Header;