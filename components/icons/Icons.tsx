import React from 'react';
type SVGProps = React.SVGProps<SVGSVGElement>;

// ——— Brand/Cyber Icons ———
export const ArbitraIcon: React.FC<SVGProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        {/* Paper */}
        <path d="M8 4V2h8v2" />
        {/* Roller & Top Carriage */}
        <path d="M3 8V6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2" />
        <path d="M3 8h18" />
        {/* Carriage Return Lever */}
        <path d="M3 8v3l-1 1" />
        {/* Type Hammers/Basket */}
        <path d="M8 8.5 10 12h4l2-3.5" />
        {/* Main Body Shape */}
        <path d="M2 12.5c0-1 1-1.5 2-1.5h16c1 0 2 .5 2 1.5L20 19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1l-2-6.5z" />
        {/* Keyboard hint */}
        <path d="M6 14h12" />
        <path d="M5 16h14" />
        <path d="M7 18h10" />
    </svg>
);

export const TypewriterLogo: React.FC<SVGProps> = (props) => (
    <svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            {/* A subtle glow filter that takes its color from the source graphic */}
            <filter id="typewriter-glow" x="-25%" y="-25%" width="150%" height="150%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" in="SourceGraphic" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
        
        {/* Main group for the line art, applying the glow filter */}
        <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#typewriter-glow)">
            
            {/* Main Body */}
            <path d="M50,220 C20,220 20,180 50,180 H350 C380,180 380,220 350,220 Z" />
            <path d="M60,180 C60,160 80,150 100,150 H300 C320,150 340,160 340,180" />
            
            {/* Keyboard Area */}
            <g strokeOpacity="0.7">
                <path d="M80,215 H320" />
                <path d="M85,205 H315" />
                <path d="M90,195 H310" />
                <path d="M95,185 H305" />
                
                {/* Simplified Keys */}
                <circle cx="90" cy="210" r="4" /> <circle cx="110" cy="210" r="4" /> <circle cx="130" cy="210" r="4" /> <circle cx="150" cy="210" r="4" /> <circle cx="170" cy="210" r="4" /> <circle cx="190" cy="210" r="4" /> <circle cx="210" cy="210" r="4" /> <circle cx="230" cy="210" r="4" /> <circle cx="250" cy="210" r="4" /> <circle cx="270" cy="210" r="4" /> <circle cx="290" cy="210" r="4" /> <circle cx="310" cy="210" r="4" />
                <circle cx="95" cy="200" r="4" /> <circle cx="115" cy="200" r="4" /> <circle cx="135" cy="200" r="4" /> <circle cx="155" cy="200" r="4" /> <circle cx="175" cy="200"r="4" /> <circle cx="195" cy="200" r="4" /> <circle cx="215" cy="200" r="4" /> <circle cx="235" cy="200" r="4" /> <circle cx="255" cy="200" r="4" /> <circle cx="275" cy="200" r="4" /> <circle cx="295" cy="200" r="4" />
                <circle cx="100" cy="190" r="4" /> <circle cx="120" cy="190" r="4" /> <circle cx="140" cy="190" r="4" /> <circle cx="160" cy="190" r="4" /> <circle cx="180" cy="190" r="4" /> <circle cx="200" cy="190" r="4" /> <circle cx="220" cy="190" r="4" /> <circle cx="240" cy="190" r="4" /> <circle cx="260" cy="190" r="4" /> <circle cx="280" cy="190" r="4" />
            </g>

            {/* Top Carriage Section */}
            <path d="M100,150 L80,90 H320 L300,150" />
            <rect x="70" y="70" width="260" height="20" rx="5" />

            {/* Roller */}
            <path d="M60,70 H340" />
            <path d="M50,70 L30,70 C20,70 20,60 30,60 H50" />
            <path d="M350,70 L370,70 C380,70 380,60 370,60 H350" />
            <rect x="50" y="55" width="300" height="15" rx="7.5" />
            
            {/* Type Hammers Area */}
            <g strokeOpacity="0.8">
                <path d="M180,150 C180,130 190,120 200,120 C210,120 220,130 220,150" />
                <path d="M190,145 V125" />
                <path d="M210,145 V125" />
                <path d="M200,148 V122" />
            </g>

            {/* Paper with a subtle, theme-aware background */}
            <rect x="120" y="20" width="160" height="100" strokeWidth="2" fill="currentColor" fillOpacity="0.05" />
        </g>
        
        {/* The brand name, rendered separately for clarity without the glow */}
        <text 
            x="200" 
            y="75" 
            fill="currentColor" 
            stroke="none" 
            style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontWeight: 700,
                fontSize: '28px',
                textAnchor: 'middle',
                dominantBaseline: 'middle',
                letterSpacing: '2px',
            }}
        >
            ARBITRA
        </text>
    </svg>
);

export const DnaIcon: React.FC<SVGProps> = (props) => (
  <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <ellipse cx="14" cy="14" rx="11.5" ry="11.5" stroke="#00f6ff" strokeDasharray="2 5" opacity=".58"/>
    <ellipse cx="14" cy="14" rx="9" ry="9" stroke="#ff7a00" strokeDasharray="1.5 3.3" opacity=".45"/>
    <path d="M8 9c3 1 5.7 4.4 7.7 11" stroke="#00f6ff" strokeWidth="2.2"/>
    <path d="M20 19c-3-1-5.7-4.4-7.7-11" stroke="#ff7a00" strokeWidth="2.2"/>
    <circle cx="14" cy="14" r="1.8" fill="#00fff7" />
  </svg>
);

export const GeneratorIcon: React.FC<SVGProps> = (props) => (
  <svg viewBox="0 0 28 28" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="4" y="4" width="20" height="20" rx="5" stroke="#00f6ff" filter="url(#glow)"/>
    <line x1="14" y1="9" x2="14" y2="19" stroke="#ff7a00" />
    <line x1="9" y1="14" x2="19" y2="14" stroke="#fff" />
    <circle cx="14" cy="14" r="4.5" stroke="#00f6ff" />
  </svg>
);

export const GraffitiIcon: React.FC<SVGProps> = (props) => (
  <svg viewBox="0 0 28 28" width="24" height="24" fill="none" {...props}>
    <ellipse cx="14" cy="16" rx="9" ry="7" fill="#00f6ff33"/>
    <ellipse cx="14" cy="13" rx="11" ry="8" stroke="#00f6ff" strokeDasharray="2 3" />
    <path d="M9 19l6-10" stroke="#ff7a00" strokeWidth="2" />
    <ellipse cx="14" cy="14" rx="3" ry="2" fill="#fff7" />
    <ellipse cx="17.8" cy="18.8" rx="1.7" ry="0.7" fill="#ff7a00aa" />
    <ellipse cx="17.2" cy="10" rx="1" ry="0.6" fill="#00fff788" />
  </svg>
);

export const TreeIcon: React.FC<SVGProps> = (props) => (
  <svg viewBox="0 0 28 28" width="24" height="24" fill="none" {...props}>
    <ellipse cx="14" cy="23" rx="10" ry="3.3" fill="#00f6ff1f"/>
    <path d="M14 18V7" stroke="#00f6ff" strokeWidth="2.2"/>
    <circle cx="14" cy="5" r="2.4" fill="#00f6ff" />
    <circle cx="7.5" cy="14" r="2.2" fill="#ff7a00dd" />
    <circle cx="20.5" cy="14" r="2.2" fill="#ff7a00bb" />
    <circle cx="14" cy="18" r="2" fill="#fff9" />
    <path d="M14 7C12 9.5 10 12.5 7.5 14" stroke="#fff7" />
    <path d="M14 7c2 2.5 4 5.5 6.5 7" stroke="#fff7" />
  </svg>
);

export const AnalyticsIcon: React.FC<SVGProps> = (props) => (
    <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 22V6" stroke="#00f6ff" />
      <path d="M11 22V12" stroke="#00f6ff" />
      <path d="M18 22V2" stroke="#00f6ff" />
      <path d="M25 22V16" stroke="#ff7a00" />
    </svg>
  );

// ——— Utility/Small Icons (Original system + badges, no import) ———

export const WandIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#00f6ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 4V2" /><path d="M15 8V6" /><path d="M12.5 6.5L14 5" /><path d="M12.5 10.5L14 12" /><path d="M10 5L11.5 6.5" /><path d="m3 21 9-9" />
    <path d="M12 22l1.5-1.5" /><path d="M18 16l1.5-1.5" /><path d="M20 14l1.5-1.5" /><path d="M16 12l1.5-1.5" />
  </svg>
);

export const PlayIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="#00f6ff" stroke="#00f6ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

export const ShuffleIcon = (props: SVGProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="16 3 21 3 21 8" />
    <line x1="4" y1="20" x2="21" y2="3" />
    <polyline points="16 21 21 21 21 16" /><line x1="15" y1="15" x2="21" y2="21" /><line x1="4" y1="4" x2="9" y2="9" />
  </svg>
);

export const AlertIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);
export const ExpandIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14 10L20 4" /><path d="M15 4h5v5" /><path d="M4 20L10 14" /><path d="M4 15v5h5" />
  </svg>
);
export const StarIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);
export const BranchIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="6" y1="3" x2="6" y2="15"></line>
    <circle cx="18" cy="6" r="3"></circle>
    <circle cx="6" cy="18" r="3"></circle>
    <path d="M18 9a9 9 0 0 1-9 9"></path>
  </svg>
);
// Badges & Social
export const SOC2Badge: React.FC<SVGProps> = (props) => (
  <div className="flex items-center gap-2 text-brand-gray hover:text-brand-light transition-colors">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      <path d="m9 12 2 2 4-4"></path>
    </svg>
    <span className="font-mono text-sm uppercase">SOC 2 Compliant</span>
  </div>
);
export const ISO27001Badge: React.FC<SVGProps> = (props) => (
  <div className="flex items-center gap-2 text-brand-gray hover:text-brand-light transition-colors">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      <path d="M12 8v4h4"></path>
      <path d="m10.5 15.5 3-3"></path>
    </svg>
    <span className="font-mono text-sm uppercase">ISO 27001 Certified</span>
  </div>
);
export const GDPRBadge: React.FC<SVGProps> = (props) => (
  <div className="flex items-center gap-2 text-brand-gray hover:text-brand-light transition-colors">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      <path d="M9 15a3 3 0 1 0 6 0 3 3 0 1 0-6 0"></path>
      <path d="M12 12v3"></path>
    </svg>
    <span className="font-mono text-sm uppercase">GDPR Ready</span>
  </div>
);

export const XIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const LinkedInIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export const GithubIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.034c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

export const TelegramIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="m9.417 15.181-.397 5.584c.568 0 .814-.244 1.109-.537l2.663-2.545 5.518 4.041c1.012.564 1.725.267 1.998-.931L23.43 3.246c.346-1.659-.49-2.324-1.525-1.866L1.225 10.61c-1.548.575-1.54 1.36.243 1.654l5.411 1.692 12.66-7.957c.595-.374 1.14.043.682.433L9.417 15.181z"/>
  </svg>
);

export const CloseIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export const UploadIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

export const ArrowUpIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="12" y1="19" x2="12" y2="5"></line>
    <polyline points="5 12 12 5 19 12"></polyline>
  </svg>
);

export const PlusIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export const MinusIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export const CopyIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

export const GlobeIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

export const ChevronDownIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

export const AccessibilityIcon: React.FC<SVGProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="6" r="1.5" />
        <path d="M12 9v6" />
        <path d="M9 15h6" />
        <path d="m9 12 3-3 3 3" />
    </svg>
);