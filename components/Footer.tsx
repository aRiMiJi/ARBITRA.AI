import React from 'react';
import { ArbitraLogo, TwitterIcon, LinkedInIcon, GithubIcon } from './icons/Icons';

const Footer: React.FC = () => {
  const socialLinks = [
    { name: 'Twitter', icon: TwitterIcon, href: '#' },
    { name: 'LinkedIn', icon: LinkedInIcon, href: '#' },
    { name: 'GitHub', icon: GithubIcon, href: '#' },
  ];

  const footerNav = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-brand-dark-accent border-t-2 border-brand-gray/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          {/* Logo and about */}
          <div className="flex-1">
            <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')} aria-label="Back to top">
              <ArbitraLogo className="h-8 text-brand-light hover:text-brand-cyan transition-colors duration-200" />
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
                onClick={(e) => handleNavClick(e, item.href.substring(1))}
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
