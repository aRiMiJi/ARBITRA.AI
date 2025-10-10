import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import ProblemSolution from './components/ProblemSolution';
import HowItWorks from './components/HowItWorks';
import About from './components/About';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import TrustedBy from './components/TrustedBy';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import ScrollToTopButton from './components/common/ScrollToTopButton';
import Preloader from './components/common/Preloader';
import AnimatedDivider from './components/common/AnimatedDivider';
import ToolsBar from './components/ToolsBar';
import NewsletterSignup from './components/NewsletterSignup';
import { LanguageProvider } from './contexts/LanguageContext';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import { GenAIProvider } from './contexts/GenAIContext';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import ChatbotWidget from './components/ChatbotWidget';

const AppContent: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1800); // Fast but visible load
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
    <>
      <div className="min-h-screen text-brand-light font-sans antialiased transition-colors duration-300 ease-in relative">
        <Header />
        <main
          id="main"
          className="container mx-auto px-4 sm:px-6 lg:px-8"
        >
          <Hero />
          <Features />
          <AnimatedDivider />
          <ProblemSolution />
          <HowItWorks />
          <AnimatedDivider />
          <Pricing />
          <AnimatedDivider />
          <Testimonials />
          <AnimatedDivider />
          <About />
          <AnimatedDivider />
          <TrustedBy />
          <AnimatedDivider />
          <FAQ />
          <AnimatedDivider />
          <ToolsBar />
          <AnimatedDivider />
          <section id="analytics" className="py-20 sm:py-24">
            <AnalyticsDashboard />
          </section>
          <AnimatedDivider />
          <ContactForm />
          <AnimatedDivider />
          <NewsletterSignup />
        </main>
        <Footer />
      </div>
      <ScrollToTopButton />
      <ChatbotWidget />
    </>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AccessibilityProvider>
        <GenAIProvider>
          <AppContent />
        </GenAIProvider>
      </AccessibilityProvider>
    </LanguageProvider>
  );
};


export default App;