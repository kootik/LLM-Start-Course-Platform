
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { DEMOS } from '../constants';
import { Card, Badge, Button } from './ui';
import { Play, Zap, Info, Star, Activity, Database, Video } from 'lucide-react';
import { ViewerFile } from './viewer';

export const DemosSection: React.FC<{ onViewFile?: (file: ViewerFile) => void }> = ({ onViewFile }) => {
  const [activeDemoIndex, setActiveDemoIndex] = useState(0);
  const activeDemo = DEMOS[activeDemoIndex];

  // Render specific visualization based on Demo data properties
  const renderVisualization = () => {
    // 1. Ranking (List View)
    if (activeDemo.ranking) {
        return (
             <div className="h-full flex flex-col justify-center">
                <h5 className="text-xs font-bold text-gray-400 uppercase mb-3 text-center">Semantic Similarity Search Results</h5>
                <div className="space-y-2 overflow-y-auto custom-scrollbar pr-2">
                    {activeDemo.ranking.map((item) => (
                        <div key={item.rank} className="flex items-center p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 relative overflow-hidden group hover:border-primary/50 transition-colors">
                            <div className="absolute left-0 top-0 bottom-0 bg-primary opacity-5 group-hover:opacity-10 transition-opacity" style={{ width: `${item.score * 100}%`}}></div>
                            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center font-bold text-white mr-3 z-10 border border-gray-600 shrink-0">
                                {item.rank}
                            </div>
                            <div className="flex-1 z-10 min-w-0">
                                <p className="text-sm text-gray-200 font-medium truncate">{item.text}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <Badge text={item.relevance} type="tag" />
                                    <span className="text-[10px] text-gray-500 font-mono">Score: {item.score.toFixed(4)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
        );
    }

    // 2. Steps (Timeline View)
    if (activeDemo.steps) {
        return (
            <div className="h-full flex flex-col">
                <h5 className="text-xs font-bold text-gray-400 uppercase mb-3 text-center">Execution Trace</h5>
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    <div className="relative border-l-2 border-gray-700 ml-4 space-y-6 py-2 my-2">
                        {activeDemo.steps.map((step, idx) => (
                            <div key={idx} className="relative pl-8">
                                <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 bg-[#1F2121] z-10 ${step.status === 'complete' ? 'border-green-500' : 'border-primary animate-pulse'}`}>
                                    <div className={`w-2 h-2 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${step.status === 'complete' ? 'bg-green-500' : 'bg-primary'}`}></div>
                                </div>
                                <div className={`p-3 rounded-lg border transition-colors ${step.status === 'complete' ? 'bg-gray-800/50 border-gray-700' : 'bg-primary/5 border-primary/30'}`}>
                                    <span className={`text-xs font-bold uppercase tracking-wider mb-1 block ${step.status === 'complete' ? 'text-green-400' : 'text-primary'}`}>{step.step}</span>
                                    <p className="text-sm text-gray-300">{step.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // 3. Metrics (Vertical Bar Chart)
    if (activeDemo.metrics) {
        return (
            <div className="h-full flex flex-col">
                <h5 className="text-xs font-bold text-gray-400 uppercase mb-2 text-center">Performance Analysis</h5>
                <div className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={activeDemo.metrics} margin={{ top: 20, right: 10, left: 10, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.3} />
                            <XAxis 
                                dataKey="label" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{fill: '#9CA3AF', fontSize: 11, fontWeight: 500}} 
                                dy={10}
                            />
                            <YAxis 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{fill: '#9CA3AF', fontSize: 11}} 
                            />
                            <Tooltip 
                                cursor={{fill: 'rgba(255,255,255,0.05)'}}
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        const data = payload[0].payload;
                                        return (
                                            <div className="bg-gray-900 border border-gray-700 p-3 rounded-lg shadow-xl">
                                                <p className="text-gray-400 text-xs mb-1">{data.label}</p>
                                                <p className="text-white text-lg font-bold">
                                                    {data.value} <span className="text-sm font-normal text-gray-500">{data.suffix}</span>
                                                </p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Bar 
                                dataKey="value" 
                                radius={[4, 4, 0, 0]} 
                                barSize={48} 
                                animationDuration={1000}
                            >
                                {activeDemo.metrics.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }
    
    return <div className="flex items-center justify-center h-full text-gray-500">Select a demo to view</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in h-full flex flex-col pb-12">
      <div className="bg-white dark:bg-[#1F2121] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Interactive Demos</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Real-time visualizations of course concepts</p>
      </div>

      <div className="flex flex-col gap-6">
        
        {/* Navigation - Horizontal Tabs */}
        <div className="flex overflow-x-auto pb-2 gap-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {DEMOS.map((demo, idx) => (
                <button
                    key={demo.id}
                    onClick={() => setActiveDemoIndex(idx)}
                    className={`flex-shrink-0 w-64 text-left p-4 rounded-xl border transition-all group ${
                        activeDemoIndex === idx 
                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                        : 'bg-white dark:bg-[#1F2121] border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-primary/50'
                    }`}
                >
                    <h4 className={`text-sm font-semibold truncate ${activeDemoIndex === idx ? 'text-white' : ''}`}>
                        {demo.title}
                    </h4>
                    <div className="flex items-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={10} className={i < demo.rating ? (activeDemoIndex === idx ? "fill-white text-white" : "fill-orange-400 text-orange-400") : "text-gray-300 dark:text-gray-600"} />
                        ))}
                    </div>
                </button>
            ))}
        </div>

        {/* Main Content */}
        <div className="space-y-6">
            {/* Top Area: Visualization & Process */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Visualization Card */}
                <Card className="lg:col-span-2 bg-[#1F2121] border-gray-800 text-white overflow-hidden flex flex-col min-h-[400px]">
                    <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-900/50">
                        <div className="flex items-center gap-2">
                            <Activity size={18} className="text-primary"/>
                            <span className="font-mono text-sm font-bold text-gray-300">LIVE_METRICS</span>
                        </div>
                        <Badge text={`ID: ${activeDemo.id}`} type="tag" />
                    </div>
                    <div className="p-6 flex-1 relative">
                         {renderVisualization()}
                    </div>
                </Card>

                {/* Control Panel */}
                <div className="space-y-6">
                    <Card className="p-6 bg-white dark:bg-[#1F2121] flex flex-col h-full">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Zap size={18} className="text-yellow-500 fill-yellow-500"/> Simulation Control
                        </h4>
                        
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4 flex-1">
                            <span className="text-xs font-bold text-gray-400 uppercase block mb-2">Current Input</span>
                            <code className="text-xs font-mono text-primary break-words">{activeDemo.input}</code>
                        </div>

                        <div className="space-y-3">
                            <Button className="w-full gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                                <Play size={18} fill="currentColor" /> Run Simulation
                            </Button>
                            
                            <Button 
                                variant="outline" 
                                className="w-full gap-2"
                                onClick={() => onViewFile && onViewFile({ 
                                    name: `Demo Walkthrough: ${activeDemo.title}`, 
                                    type: 'video', 
                                    url: undefined // Uses default bunny video in viewer
                                })}
                            >
                                <Video size={18} /> Watch Walkthrough
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Bottom Area: Details & Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Database size={20} className="text-primary" />
                        <h3 className="font-bold text-gray-900 dark:text-white">Process Architecture</h3>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-100 dark:border-gray-800">
                        <p className="font-mono text-sm text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                            {activeDemo.process.split('->').map((step, i, arr) => (
                                <span key={i}>
                                    {step.trim()}
                                    {i < arr.length - 1 && <span className="text-gray-400 mx-2">→</span>}
                                </span>
                            ))}
                        </p>
                    </div>
                    <div className="mt-4">
                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-1">Concept</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{activeDemo.concept}</p>
                    </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border-blue-100 dark:border-blue-900/30">
                    <div className="flex items-center gap-2 mb-4">
                        <Info size={20} className="text-blue-600 dark:text-blue-400" />
                        <h3 className="font-bold text-blue-900 dark:text-blue-100">Key Insight</h3>
                    </div>
                    <p className="text-lg italic text-blue-800 dark:text-blue-200 font-medium leading-relaxed">
                        "{activeDemo.insight}"
                    </p>
                    <div className="mt-6 pt-4 border-t border-blue-200 dark:border-blue-800/30">
                         <h4 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase mb-1">Output Summary</h4>
                         <p className="text-sm text-blue-800 dark:text-blue-300">{activeDemo.output}</p>
                    </div>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
};
