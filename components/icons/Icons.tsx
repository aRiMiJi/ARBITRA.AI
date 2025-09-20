import React from 'react';

interface IconProps {
  className?: string;
}

export const LockIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

export const CustomizeIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const MonitorIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2z" />
  </svg>
);

export const ShieldCheckIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a12.02 12.02 0 009 3.045 12.02 12.02 0 009-3.045 12.02 12.02 0 00-1.382-9.984z" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const UploadIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

export const ArrowUpIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m-7 7l7-7 7 7" />
  </svg>
);

export const SOC2Badge: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 120 60" className={className} xmlns="http://www.w3.org/2000/svg" aria-labelledby="soc2-title soc2-desc" role="img">
    <title id="soc2-title">SOC 2 Certified</title>
    <desc id="soc2-desc">A badge indicating SOC 2 Type II certification.</desc>
    <rect x="1" y="1" width="118" height="58" rx="5" stroke="currentColor" strokeWidth="2" fill="none" />
    <text x="60" y="25" dominantBaseline="middle" textAnchor="middle" fill="currentColor" fontSize="18" fontWeight="bold" fontFamily="Inter, sans-serif">{`SOC 2`}</text>
    <text x="60" y="45" dominantBaseline="middle" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="500" letterSpacing="0.05em" style={{ opacity: 0.7 }}>{`TYPE II`}</text>
  </svg>
);

export const ISO27001Badge: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 120 60" className={className} xmlns="http://www.w3.org/2000/svg" aria-labelledby="iso-title iso-desc" role="img">
    <title id="iso-title">ISO 27001 Certified</title>
    <desc id="iso-desc">A badge indicating ISO 27001 certification.</desc>
    <rect x="1" y="1" width="118" height="58" rx="5" stroke="currentColor" strokeWidth="2" fill="none" />
    <text x="60" y="25" dominantBaseline="middle" textAnchor="middle" fill="currentColor" fontSize="18" fontWeight="bold" fontFamily="Inter, sans-serif">{`ISO 27001`}</text>
    <text x="60" y="45" dominantBaseline="middle" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="500" letterSpacing="0.05em" style={{ opacity: 0.7 }}>{`CERTIFIED`}</text>
  </svg>
);

export const GDPRBadge: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 120 60" className={className} xmlns="http://www.w3.org/2000/svg" aria-labelledby="gdpr-title gdpr-desc" role="img">
    <title id="gdpr-title">GDPR Compliant</title>
    <desc id="gdpr-desc">A badge indicating GDPR compliance.</desc>
    <rect x="1" y="1" width="118" height="58" rx="5" stroke="currentColor" strokeWidth="2" fill="none" />
    <text x="60" y="25" dominantBaseline="middle" textAnchor="middle" fill="currentColor" fontSize="18" fontWeight="bold" fontFamily="Inter, sans-serif">{`GDPR`}</text>
    <text x="60" y="45" dominantBaseline="middle" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="500" letterSpacing="0.05em" style={{ opacity: 0.7 }}>{`COMPLIANT`}</text>
  </svg>
);