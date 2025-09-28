import React, { useRef, useState, useEffect } from 'react';
import Card from './common/Card';
import { LinkedInIcon, XIcon, GithubIcon } from './icons/Icons';

const values = [
  {
    title: "Unyielding Security",
    description: "Security is not a feature; it's our foundation. We build with a zero-trust mindset to protect your most critical AI assets.",
  },
  {
    title: "Radical Integrity",
    description: "We believe in transparent, auditable, and honest systems. Our commitment is to provide tools that foster trust in AI.",
  },
  {
    title: "Pioneering Innovation",
    description: "We are relentlessly driven to solve the next generation of AI challenges, ensuring our clients stay ahead of the curve.",
  },
];

const teamMembers = [
  {
    name: "Ari Miyanji",
    title: "Founder & CEO",
    bio: "An AI enthusiast with a deep passion for prompt engineering, Ari founded arbitra.ai to bridge the gap between AI potential and enterprise reality.",
    avatar: "https://placehold.co/300x300/101010/00f6ff?text=AM",
    socials: { linkedin: '#', x: '#', github: '#' },
  },
  {
    name: "Lead Engineer",
    title: "Chief Technology Officer",
    bio: "A master architect of scalable systems, our CTO leads the engineering team, ensuring our platform is robust, reliable, and ready for future challenges.",
    avatar: "https://placehold.co/300x300/101010/ff7a00?text=LE",
    socials: { linkedin: '#', x: '#', github: '#' },
  },
  {
    name: "Product Strategist",
    title: "Head of Product",
    bio: "Our Head of Product lives at the intersection of user needs and technological possibility, dedicated to building intuitive solutions for real-world problems.",
    avatar: "https://placehold.co/300x300/101010/EAEAEA?text=PS",
    socials: { linkedin: '#', x: '#', github: '#' },
  },
];

const About: React.FC = () => {
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
      id="about"
      ref={sectionRef}
      className={`py-20 sm:py-24 opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
      aria-labelledby="about-heading"
    >
      <div className="text-center mb-16">
        <div className="glitch-text-container" data-text="About arbitra.ai">
          <h2 id="about-heading" className="glitch-text text-4xl font-bold font-sans tracking-wider text-brand-light uppercase">
            About arbitra.ai
          </h2>
        </div>
        <p className="mt-4 text-lg text-brand-gray max-w-3xl mx-auto">
          We are a team of security experts, AI researchers, and enterprise software veterans committed to building the foundational infrastructure for secure and compliant artificial intelligence.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div className={`opacity-0 ${isVisible ? 'animate-fade-in-left' : ''}`} style={{ animationDelay: '0.2s' }}>
          <Card>
            <h3 className="text-2xl font-bold font-sans text-brand-cyan uppercase mb-4">Our Mission</h3>
            <p className="text-brand-gray">To empower enterprises to innovate with AI confidently by providing the essential tools for security, governance, and auditability. We turn AI prompts from an unmanaged risk into a strategic, protected asset.</p>
          </Card>
        </div>
        <div className={`opacity-0 ${isVisible ? 'animate-fade-in-right' : ''}`} style={{ animationDelay: '0.4s' }}>
          <Card>
            <h3 className="text-2xl font-bold font-sans text-brand-orange uppercase mb-4">Our Vision</h3>
            <p className="text-brand-gray">To create a future where AI is seamlessly and securely integrated into every enterprise workflow, driven by a universal standard of trust, transparency, and control that arbitra.ai provides.</p>
          </Card>
        </div>
      </div>

      {/* Core Values */}
      <div className="mb-24">
        <h3 className="text-3xl font-bold font-sans text-center text-brand-light uppercase mb-12">Core Values</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className={`opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
              style={{ animationDelay: `${0.5 + index * 0.15}s` }}
            >
              <Card>
                <h4 className="text-xl font-bold font-sans text-brand-light uppercase mb-4">{value.title}</h4>
                <p className="text-brand-gray">{value.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Meet the Team */}
      <div>
        <h3 className="text-3xl font-bold font-sans text-center text-brand-light uppercase mb-12">The Core Architects</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className={`opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}
              style={{ animationDelay: `${0.8 + index * 0.15}s` }}
            >
              <Card className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-2 border-brand-dark-accent">
                  <img
                    src={member.avatar}
                    alt={`Headshot of ${member.name}`}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-105"
                  />
                </div>
                <h4 className="text-xl font-bold font-sans text-brand-light uppercase">{member.name}</h4>
                <p className="text-brand-cyan font-mono uppercase text-sm tracking-wider">{member.title}</p>
                <p className="text-brand-gray mt-4 text-sm">{member.bio}</p>
                <div className="mt-6 flex justify-center space-x-4">
                  <a href={member.socials.linkedin} aria-label={`${member.name}'s LinkedIn`} className="text-brand-gray hover:text-brand-cyan transition-colors"><LinkedInIcon className="h-6 w-6" /></a>
                  <a href={member.socials.x} aria-label={`${member.name}'s X profile`} className="text-brand-gray hover:text-brand-cyan transition-colors"><XIcon className="h-6 w-6" /></a>
                  <a href={member.socials.github} aria-label={`${member.name}'s GitHub`} className="text-brand-gray hover:text-brand-cyan transition-colors"><GithubIcon className="h-6 w-6" /></a>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;