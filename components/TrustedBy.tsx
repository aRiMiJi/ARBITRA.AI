import React, { useRef, useState, useEffect } from 'react';

// Self-contained SVG logos for placeholder companies
const LogoPlaceholder: React.FC<{ name: string; children: React.ReactNode }> = ({ name, children }) => (
  <div
    className="group flex items-center justify-center p-4 h-24 w-48 transition-all duration-300 ease-in-out hover:scale-105"
    title={name}
    aria-label={name}
  >
    <div className="text-brand-gray/60 group-hover:text-brand-light transition-colors duration-300 filter grayscale group-hover:grayscale-0 group-hover:brightness-110">
      {children}
    </div>
  </div>
);

const QuantumSystemsLogo = () => (
  <svg viewBox="0 0 120 40" className="w-full h-auto">
    <circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="20" cy="20" r="4" fill="currentColor" />
    <path d="M20 10 V30 M10 20 H30" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
    <text x="38" y="25" fontFamily="IBM Plex Mono, monospace" fontSize="14" fill="currentColor" letterSpacing="1">QUANTUM</text>
  </svg>
);

const AegisFinancialLogo = () => (
    <svg viewBox="0 0 120 40" className="w-full h-auto">
        <path d="M10 10 L 25 5 L 40 10 V 25 C 40 35 25 40 25 40 C 25 40 10 35 10 25 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M18 25 L 25 18 L 32 25" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <text x="50" y="25" fontFamily="IBM Plex Mono, monospace" fontSize="14" fill="currentColor" letterSpacing="1">AEGIS</text>
    </svg>
);

const ApexHealthLogo = () => (
    <svg viewBox="0 0 120 40" className="w-full h-auto">
        <path d="M10 22 H 18 L 22 15 L 28 29 L 32 22 H 40" stroke="currentColor" strokeWidth="2" fill="none" />
        <text x="50" y="25" fontFamily="IBM Plex Mono, monospace" fontSize="14" fill="currentColor" letterSpacing="1">APEX</text>
    </svg>
);

const CygnusCorpLogo = () => (
    <svg viewBox="0 0 120 40" className="w-full h-auto">
        <circle cx="25" cy="20" r="12" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M25 8 V 32 M13 20 H 37" stroke="currentColor" strokeWidth="0.5" />
        <text x="45" y="25" fontFamily="IBM Plex Mono, monospace" fontSize="14" fill="currentColor" letterSpacing="1">CYGNUS</text>
    </svg>
);

const NovaLabsLogo = () => (
    <svg viewBox="0 0 120 40" className="w-full h-auto">
        <path d="M10 20 L 25 10 L 40 20 L 25 30 Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2" />
        <text x="50" y="25" fontFamily="IBM Plex Mono, monospace" fontSize="14" fill="currentColor" letterSpacing="1">NOVA LABS</text>
    </svg>
);

const trustedByData = [
  { name: 'Quantum Systems', logo: <QuantumSystemsLogo /> },
  { name: 'Aegis Financial', logo: <AegisFinancialLogo /> },
  { name: 'Apex Health', logo: <ApexHealthLogo /> },
  { name: 'Cygnus Corp', logo: <CygnusCorpLogo /> },
  { name: 'Nova Labs', logo: <NovaLabsLogo /> },
];

const TrustedBy: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      id="trusted-by"
      ref={sectionRef}
      className={`py-20 sm:py-24 opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
      aria-labelledby="trusted-by-heading"
    >
      <div className="text-center mb-16">
        <div className="glitch-text-container" data-text="Powering Innovation at Scale">
          <h2 id="trusted-by-heading" className="glitch-text text-4xl font-bold font-sans tracking-wider text-brand-light uppercase">
            Powering Innovation at Scale
          </h2>
        </div>
        <p className="mt-4 text-lg text-brand-gray max-w-3xl mx-auto">
          From bleeding-edge startups to Fortune 500s, arbitra.ai is the trusted platform for enterprise AI governance.
        </p>
      </div>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {trustedByData.map((company, index) => (
             <div
              key={company.name}
              className={`opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
                <LogoPlaceholder name={company.name}>
                    {company.logo}
                </LogoPlaceholder>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;