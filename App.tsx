import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Features from './components/Features';
import ProblemSolution from './components/ProblemSolution';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import ScrollToTopButton from './components/common/ScrollToTopButton';
import Preloader from './components/common/Preloader';
import AnimatedDivider from './components/common/AnimatedDivider';
import ToolsBar from './components/ToolsBar';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800); // Fast but visible load
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-brand-dark text-brand-cyan">
        <Preloader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark text-brand-light font-sans antialiased transition-colors duration-300 ease-in relative">
      <Header />
      <main
        id="main"
        className="container mx-auto px-4 sm:px-6 lg:px-8 scroll-smooth"
      >
        {/* Optional: Place for global theme toggle, if adding later */}
        {/* <ThemeToggle /> */}

        <Features />
        {/* Brutalist animated divider under hero */}
        <AnimatedDivider />
        <ProblemSolution />
        <HowItWorks />
        <AnimatedDivider />
        <Pricing />
        <Testimonials />
        <AnimatedDivider />
        <FAQ />
        <AnimatedDivider />
        <ToolsBar />
        <AnimatedDivider />
        <ContactForm />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default App;
