
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-slate-500">
        <p>&copy; {new Date().getFullYear()} arbitra.ai. All rights reserved.</p>
        <p className="text-sm mt-2">Built for the future of enterprise AI.</p>
      </div>
    </footer>
  );
};

export default Footer;
