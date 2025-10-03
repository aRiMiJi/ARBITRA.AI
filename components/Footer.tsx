import React from 'react';
import { ArbitraIcon, XIcon, LinkedInIcon, GithubIcon, TelegramIcon } from './icons/Icons';

const Footer: React.FC = () => {
  const socialLinks = [
    { name: 'X', icon: XIcon, href: 'https://x.com/arbitra_ai' },
    { name: 'LinkedIn', icon: LinkedInIcon, href: 'https://linkedin.com/company/arbitra-ai' },
    { name: 'GitHub', icon: GithubIcon, href: 'https://github.com/arbitra-ai' },
    { name: 'Telegram', icon: TelegramIcon, href: 'https://t.me/arbitra_ai' },
  ];

  const footerNav = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-brand-dark-accent border-t-2 border-brand-gray/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          {/* Logo and about */}
          <div className="flex-1">
            <a href="#home" aria-label="Back to top" className="group flex items-center gap-2 transition-colors duration-200">
              <ArbitraIcon className="h-8 w-8 text-brand-light transition-colors group-hover:text-brand-cyan" />
              <span className="font-mono text-xl font-bold text-brand-light transition-colors group-hover:text-brand-cyan">arbitra.ai</span>
            </a>
            <p className="mt-4 text-brand-gray max-w-xs">
              Securing the future of enterprise AI with compliant, licensed, and auditable prompt management.
            </p>
          </div>
          {/* Navigation */}
          <nav className="flex-1 flex justify-center space-x-8" aria-label="Footer navigation">
            {footerNav.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-brand-gray hover:text-brand-cyan transition-colors duration-200 uppercase tracking-wider"
              >
                {item.name}
              </a>
            ))}
          </nav>
          {/* Social links */}
          <div className="flex-1 flex justify-end space-x-6">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-gray hover:text-brand-cyan transition-colors duration-200"
                aria-label={item.name}
              >
                <item.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-brand-gray/20 text-center text-brand-gray text-sm">
          <p>&copy; {new Date().getFullYear()} arbitra.ai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;