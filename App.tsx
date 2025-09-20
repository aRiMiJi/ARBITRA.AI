import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
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

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate loading time

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="bg-brand-dark text-brand-light font-sans antialiased">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <AnimatedDivider />
        <Features />
        <AnimatedDivider />
        <ProblemSolution />
        <HowItWorks />
        <AnimatedDivider />
        <Pricing />
        <Testimonials />
        <AnimatedDivider />
        <FAQ />
        <AnimatedDivider />
        <ContactForm />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default App;
