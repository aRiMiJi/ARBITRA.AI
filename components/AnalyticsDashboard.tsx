import React, { useRef, useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from './common/Card';
import AnimatedText from './common/AnimatedText';

const usageData = [
  { month: 'Jan', promptsGenerated: 400, successRate: 85, apiCalls: 1200 },
  { month: 'Feb', promptsGenerated: 300, successRate: 88, apiCalls: 1100 },
  { month: 'Mar', promptsGenerated: 500, successRate: 91, apiCalls: 1500 },
  { month: 'Apr', promptsGenerated: 450, successRate: 92, apiCalls: 1400 },
  { month: 'May', promptsGenerated: 600, successRate: 95, apiCalls: 1800 },
  { month: 'Jun', promptsGenerated: 800, successRate: 94, apiCalls: 2200 },
];

const AnalyticsDashboard: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
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

  const totalPrompts = usageData.reduce((sum, item) => sum + item.promptsGenerated, 0);
  const avgSuccessRate = usageData.reduce((sum, item) => sum + item.successRate, 0) / usageData.length;
  const totalApiCalls = usageData.reduce((sum, item) => sum + item.apiCalls, 0);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-4 bg-brand-dark-accent border-2 border-brand-gray/50 font-mono text-sm">
          <p className="label text-brand-light">{`${label}`}</p>
          {payload.map((pld: any) => (
            <p key={pld.dataKey} style={{ color: pld.color }}>{`${pld.name}: ${pld.value}${pld.dataKey === 'successRate' ? '%' : ''}`}</p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div ref={sectionRef} className={`flex flex-col h-full text-brand-light p-4 opacity-0 ${isVisible ? 'animate-fade-in' : ''}`}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold font-sans tracking-wider uppercase">AI Usage Analytics</h2>
        <div className="h-8 flex items-center justify-center">
            <AnimatedText
                text="Monitoring prompt performance and API consumption."
                start={isVisible}
                delay={200}
                className="mt-2 text-brand-gray"
            />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <Card>
          <h3 className="text-brand-gray uppercase tracking-widest text-sm">Total Prompts</h3>
          <p className="text-4xl font-bold font-mono text-brand-cyan mt-2">{totalPrompts.toLocaleString()}</p>
        </Card>
        <Card>
          <h3 className="text-brand-gray uppercase tracking-widest text-sm">Avg. Success Rate</h3>
          <p className="text-4xl font-bold font-mono text-brand-orange mt-2">{avgSuccessRate.toFixed(1)}%</p>
        </Card>
        <Card>
          <h3 className="text-brand-gray uppercase tracking-widest text-sm">Total API Calls</h3>
          <p className="text-4xl font-bold font-mono text-brand-light mt-2">{totalApiCalls.toLocaleString()}</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="flex-grow flex flex-col lg:flex-row gap-6 min-h-[300px]">
        <div className="flex-1 flex flex-col">
          <h3 className="font-mono uppercase text-brand-gray tracking-widest text-center mb-4">Prompts Generated / Month</h3>
          <div className="flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usageData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#88888833" />
                <XAxis dataKey="month" stroke="#EAEAEA" tick={{ fill: '#888888', fontFamily: 'monospace' }} />
                <YAxis stroke="#EAEAEA" tick={{ fill: '#888888', fontFamily: 'monospace' }} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#00f6ff1a' }} />
                <Legend wrapperStyle={{ fontFamily: 'monospace' }} />
                <Bar dataKey="promptsGenerated" name="Prompts Generated" fill="#00f6ff" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <h3 className="font-mono uppercase text-brand-gray tracking-widest text-center mb-4">Success Rate (%)</h3>
          <div className="flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={usageData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#88888833" />
                <XAxis dataKey="month" stroke="#EAEAEA" tick={{ fill: '#888888', fontFamily: 'monospace' }} />
                <YAxis domain={[80, 100]} stroke="#EAEAEA" tick={{ fill: '#888888', fontFamily: 'monospace' }} unit="%" />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#ff7a00', strokeWidth: 1, strokeDasharray: '3 3' }} />
                <Legend wrapperStyle={{ fontFamily: 'monospace' }} />
                <Line type="monotone" dataKey="successRate" name="Success Rate" stroke="#ff7a00" strokeWidth={2} dot={{ r: 4, fill: '#ff7a00' }} activeDot={{ r: 8, stroke: '#1A1A1A', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;