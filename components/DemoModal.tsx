import React from 'react';
import Modal from './common/Modal';

const DemoModal: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="arbitra.ai Platform Walkthrough">
      <div className="relative aspect-video bg-black border-2 border-brand-dark-accent shadow-lg shadow-brand-cyan/20">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/ZTsg-S-t01c?autoplay=${isOpen ? 1 : 0}&rel=0&controls=1&showinfo=0&iv_load_policy=3`}
          title="Product Demo"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <p className="mt-6 text-center text-brand-gray font-mono text-sm">
        This is a walkthrough of the arbitra.ai platform, showcasing key features for enterprise prompt management, security, and analytics.
      </p>
    </Modal>
  );
};

export default DemoModal;
