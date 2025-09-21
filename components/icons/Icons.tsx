import React from 'react';
type SVGProps = React.SVGProps<SVGSVGElement>;

// ——— Brand/Cyber Icons ———
export const ArbitraLogo: React.FC<SVGProps> = (props) => (
  <svg viewBox="0 0 170 36" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <filter id="glow" x="-30%" y="-70%" width="160%" height="280%">
        <feGaussianBlur stdDeviation="3" result="glow" />
        <feMerge>
          <feMergeNode in="glow"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <text
      x="0" y="28"
      fontFamily="monospace"
      fontSize="30"
      fontWeight="bold"
      fill="currentColor"
      letterSpacing="0.03em"
      filter="url(#glow)"
      style={{ textShadow: '0 0 18px #00f6ff, 0 0 8px #fff3' }}>
      ARBITRA.AI
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

export const TwitterIcon: React.FC<SVGProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.22-1.95-.55v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21c7.35 0 11.37-6.08 11.37-11.37 0-.17 0-.34-.01-.51.78-.57 1.45-1.28 1.98-2.08z" />
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
