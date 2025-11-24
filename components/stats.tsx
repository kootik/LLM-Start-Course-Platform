
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, Button, Badge } from './ui';
import { COURSE_STATS } from '../constants';
import { BookOpen, Code, Award, Clock, ArrowRight, Zap, Play, Search, Database, CheckCircle, Package, FileText, GitBranch, Terminal, Rocket, ExternalLink } from 'lucide-react';

export const StatsOverview: React.FC<{ onNavigate: (view: any) => void }> = ({ onNavigate }) => {
    const data = [
        { name: 'Video', value: 12, color: '#32B8C6' }, // Teal
        { name: 'Practice', value: 21, color: '#22C55E' }, // Green
        { name: 'Homework', value: 75, color: '#F59E0B' }, // Orange
    ];

    const contentBreakdown = [
        { label: "Lectures", value: "8 (320 min)", icon: BookOpen },
        { label: "Practice", value: "7 (420 min)", icon: Code },
        { label: "Assignments", value: "9 (75+ hours)", icon: Award },
        { label: "Documents", value: "57 files", icon: FileText },
        { label: "Diagrams", value: "27 images", icon: Package },
        { label: "Workflows", value: "25+ JSON", icon: GitBranch },
        { label: "Agents", value: "6 CrewAI", icon: Terminal },
    ];

    const skills = [
        "Transformers & LLM Architecture",
        "Prompting Techniques & Optimization",
        "Data Processing & JavaScript",
        "Databases, SQL & Vector Storage",
        "RAG Systems & Semantic Search",
        "Agent Systems & ReAct Paradigm",
        "Production Deployment & Docker",
        "Monitoring, Metrics & Optimization"
    ];

    const featuredTopics = [
        { icon: Zap, title: "Transformers", desc: "Architecture Deep Dive", link: "lecture-1" },
        { icon: Database, title: "Vector DBs", desc: "Semantic Search", link: "lectures" },
        { icon: Terminal, title: "Agents", desc: "ReAct Paradigm", link: "practice" },
        { icon: Rocket, title: "Production", desc: "Deployment Strategies", link: "lectures" }
    ];

    return (
        <div className="space-y-6 animate-fade-in pb-12">
             {/* Main Responsive Grid Layout */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 
                 {/* 1. Header Section - Full Width */}
                 <div className="col-span-1 md:col-span-2 lg:col-span-4">
                     <div className="relative overflow-hidden rounded-2xl bg-[#1F2121] border border-gray-800 shadow-2xl">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none"></div>

                        <div className="relative z-10 p-8 md:p-12">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="max-w-2xl">
                                    <h1 className="text-3xl md:text-5xl font-bold mb-4 font-sans text-white leading-tight">
                                        Course Progress Dashboard
                                    </h1>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="flex-1 min-w-[200px] h-4 bg-gray-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-primary w-full shadow-[0_0_10px_rgba(50,184,198,0.5)]"></div>
                                        </div>
                                        <span className="text-primary font-bold text-xl">100%</span>
                                    </div>
                                    <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                                        Congratulations! You have access to the complete 8-week curriculum. All modules, workflows, and agents are production-ready.
                                    </p>
                                </div>
                                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl flex flex-col items-center min-w-[160px]">
                                    <span className="text-4xl font-bold text-green-400">Ready</span>
                                    <span className="text-xs text-gray-400 uppercase tracking-widest mt-1">Status</span>
                                    <Button className="mt-4 w-full h-8 text-xs" onClick={() => onNavigate('lectures')}>
                                        Go to Curriculum
                                    </Button>
                                </div>
                            </div>
                        </div>
                     </div>
                 </div>

                 {/* 2. Quick Start - 2 Cols */}
                 <div className="col-span-1 md:col-span-2 lg:col-span-2">
                     <Card className="p-6 h-full bg-gradient-to-br from-white to-gray-50 dark:from-[#1F2121] dark:to-gray-900">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Rocket size={20} className="text-primary"/> Quick Start Recommendations
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div 
                                className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-colors cursor-pointer group"
                                onClick={() => onNavigate('lecture-1')}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">1</div>
                                    <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-primary">Start First Lecture</h4>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Master Transformer Basics (40 min)</p>
                            </div>
                            <div 
                                className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-colors cursor-pointer group"
                                onClick={() => onNavigate('practice')}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center">2</div>
                                    <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-primary">Setup Environment</h4>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Configure n8n & Vector DB (60 min)</p>
                            </div>
                        </div>
                     </Card>
                 </div>

                 {/* 3. Course Overview - 1 Col */}
                 <div className="col-span-1 md:col-span-1 lg:col-span-1">
                     <Card className="p-6 h-full">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Award size={20} className="text-orange-500"/> Course Overview
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
                                <span className="text-gray-500 text-sm">Duration</span>
                                <span className="font-medium text-gray-900 dark:text-white">8 Weeks</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
                                 <span className="text-gray-500 text-sm">Level</span>
                                <Badge text="Intermediate to Expert" type="level" />
                            </div>
                            <div className="flex justify-between items-center pb-1">
                                 <span className="text-gray-500 text-sm">Completion</span>
                                 <span className="font-bold text-green-500">100%</span>
                            </div>
                             <Button variant="outline" className="w-full text-xs mt-2" onClick={() => onNavigate('resources')}>
                                View Syllabus
                            </Button>
                        </div>
                     </Card>
                 </div>

                 {/* 4. Content Stats - 1 Col */}
                 <div className="col-span-1 md:col-span-1 lg:col-span-1">
                    <Card className="p-6 h-full">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                            <Package size={20} className="text-primary"/> Content Overview
                        </h3>
                        <div className="grid grid-cols-1 gap-3">
                            {contentBreakdown.slice(0, 4).map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800/50" title={`Total ${item.label} available`}>
                                    <div className="flex items-center gap-3">
                                        <div className="text-gray-400"><item.icon size={16}/></div>
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
                                    </div>
                                    <Badge text={item.value} type="tag" />
                                </div>
                            ))}
                        </div>
                    </Card>
                 </div>

                 {/* 5. Skills Checklist - 2 Cols */}
                 <div className="col-span-1 md:col-span-1 lg:col-span-2">
                    <Card className="p-6 h-full">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                            <Award size={20} className="text-yellow-500"/> Skills Covered
                        </h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {skills.map((skill, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm text-gray-600 dark:text-gray-300 leading-tight">{skill}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                 </div>

                 {/* 6. Time Chart - 2 Cols */}
                 <div className="col-span-1 md:col-span-1 lg:col-span-2">
                    <Card className="p-6 h-full flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                             <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Clock size={20} className="text-blue-500"/> Learning Hours
                            </h3>
                            <span className="text-xs text-gray-500">100+ hrs total</span>
                        </div>
                        <div className="flex-grow flex items-center">
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie 
                                        data={data} 
                                        innerRadius={60} 
                                        outerRadius={80} 
                                        paddingAngle={5} 
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#1F2121', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                             <div className="space-y-2 ml-4">
                                {data.map(d => (
                                    <div key={d.name} className="flex items-center gap-3 text-xs">
                                        <span className="w-3 h-3 rounded-full" style={{backgroundColor: d.color}}></span>
                                        <span className="text-gray-600 dark:text-gray-300 min-w-[60px]">{d.name}</span>
                                        <span className="font-mono text-gray-500 font-bold">{d.value}h</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                 </div>

                 {/* 7. Topics - Full Width Grid */}
                 <div className="col-span-1 md:col-span-2 lg:col-span-4">
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {featuredTopics.map((topic, i) => (
                            <Card 
                                key={i} 
                                className="p-4 flex flex-col items-center text-center hover:border-primary transition-colors cursor-pointer group hover:-translate-y-1 duration-300"
                                onClick={() => onNavigate(topic.link)}
                            >
                                <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <topic.icon size={24} />
                                </div>
                                <h4 className="font-bold text-gray-900 dark:text-white text-sm">{topic.title}</h4>
                                <p className="text-xs text-gray-500 mb-3">{topic.desc}</p>
                                <span className="text-primary text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                    Learn More <ArrowRight size={12} />
                                </span>
                            </Card>
                        ))}
                     </div>
                 </div>

                 {/* 8. Footer Resources - Full Width */}
                 <div className="col-span-1 md:col-span-2 lg:col-span-4">
                     <Card className="p-6 bg-[#1F2121] text-white border-gray-800">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div>
                                <h3 className="text-xl font-bold mb-2">Featured Resources</h3>
                                <p className="text-gray-400 text-sm">Quick access to the most essential materials for your journey.</p>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <Button variant="secondary" className="gap-2" onClick={() => onNavigate('resources')}>
                                    <FileText size={16}/> Main Docs
                                </Button>
                                <Button variant="secondary" className="gap-2" onClick={() => onNavigate('resources')}>
                                    <Package size={16}/> Key Diagrams
                                </Button>
                                <Button variant="primary" className="gap-2" onClick={() => onNavigate('resources')}>
                                    <Code size={16}/> Starter Code
                                </Button>
                            </div>
                        </div>
                     </Card>
                 </div>
             </div>
        </div>
    )
}
