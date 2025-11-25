import React from 'react';
import { Card, Button, Badge } from './ui';
import { LECTURES, PRACTICE } from '../constants';
import { BookOpen, Code, Award, Clock, ArrowRight, Play, CheckCircle, Zap, TrendingUp, Calendar, AlertCircle } from 'lucide-react';

interface DashboardProps {
    onNavigate: (view: any) => void;
    completedLectures: number[];
    completedPractice: number[];
    streak: number;
}

export const StatsOverview: React.FC<DashboardProps> = ({ onNavigate, completedLectures, completedPractice, streak }) => {
    
    // Find next incomplete lecture
    const nextLecture = LECTURES.find(l => !completedLectures.includes(l.id));
    // Find next incomplete practice
    const nextPractice = PRACTICE.find(p => !completedPractice.includes(p.id));
    
    // Determine the primary "Continue" action
    const continueItem = nextLecture || (nextPractice ? { ...nextPractice, type: 'practice' } : null);
    const isCourseComplete = !continueItem;

    const stats = [
        { 
            label: "Lectures Completed", 
            value: `${completedLectures.length}/${LECTURES.length}`, 
            icon: BookOpen, 
            color: "text-blue-500", 
            bg: "bg-blue-50 dark:bg-blue-900/20" 
        },
        { 
            label: "Labs Finished", 
            value: `${completedPractice.length}/${PRACTICE.length}`, 
            icon: Code, 
            color: "text-purple-500", 
            bg: "bg-purple-50 dark:bg-purple-900/20" 
        },
        { 
            label: "Hours Spent", 
            value: "12.5h", 
            icon: Clock, 
            color: "text-orange-500", 
            bg: "bg-orange-50 dark:bg-orange-900/20" 
        },
        { 
            label: "Current Streak", 
            value: `${streak} Days`, 
            icon: Zap, 
            color: "text-yellow-500", 
            bg: "bg-yellow-50 dark:bg-yellow-900/20" 
        },
    ];

    return (
        <div className="space-y-8 animate-fade-in pb-12">
             
             {/* 1. Hero Section: Welcome & Continue Learning */}
             <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 bg-white dark:bg-[#1F2121] rounded-2xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2 text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">
                            <Calendar size={14} /> Today's Focus
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            {isCourseComplete ? "You've mastered the course!" : "Ready to continue learning, Alex?"}
                        </h1>
                        
                        {!isCourseComplete ? (
                            <div className="space-y-4">
                                <p className="text-gray-600 dark:text-gray-300 max-w-lg">
                                    Your next step is <span className="font-bold text-primary">"{continueItem.title}"</span>. 
                                    {continueItem.duration && ` It will take approx. ${continueItem.duration}.`}
                                </p>
                                <Button 
                                    className="gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                                    onClick={() => onNavigate(nextLecture ? (nextLecture.id <= 2 ? `lecture-${nextLecture.id}` : 'lectures') : 'practice')}
                                >
                                    <Play size={18} fill="currentColor" /> Resume Learning
                                </Button>
                            </div>
                        ) : (
                             <div className="space-y-4">
                                <p className="text-gray-600 dark:text-gray-300">
                                    You have completed all modules. Review materials or start a new project.
                                </p>
                                <Button className="gap-2" onClick={() => onNavigate('resources')}>
                                    Browse Resources
                                </Button>
                             </div>
                        )}
                    </div>
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors"></div>
                    <div className="absolute bottom-0 right-20 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl"></div>
                </div>

                {/* Quick Actions Card */}
                <div className="w-full md:w-80 bg-gradient-to-br from-primary to-blue-600 rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between">
                    <div>
                        <h3 className="font-bold text-lg mb-1">Quick Actions</h3>
                        <p className="text-blue-100 text-sm mb-6">Tools you use most often</p>
                    </div>
                    <div className="space-y-3">
                        <button 
                            onClick={() => onNavigate('demos')}
                            className="w-full bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-3 flex items-center gap-3 transition-colors backdrop-blur-sm"
                        >
                            <TrendingUp size={18} /> <span className="text-sm font-medium">View Live Demos</span>
                        </button>
                        <button 
                             onClick={() => onNavigate('resources')}
                             className="w-full bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-3 flex items-center gap-3 transition-colors backdrop-blur-sm"
                        >
                            <Code size={18} /> <span className="text-sm font-medium">Code Snippets</span>
                        </button>
                    </div>
                </div>
             </div>

             {/* 2. Stats Grid */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-[#1F2121] p-5 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between hover:border-primary/50 transition-colors">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${stat.bg} ${stat.color}`}>
                            <stat.icon size={20} />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                            <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">{stat.label}</div>
                        </div>
                    </div>
                ))}
             </div>

             {/* 3. Learning Path / Modules */}
             <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Course Modules</h2>
                    <button onClick={() => onNavigate('lectures')} className="text-sm text-primary hover:underline">View All</button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Module 1 */}
                    <Card 
                        className="group cursor-pointer hover:border-primary transition-all duration-300"
                        onClick={() => onNavigate('lectures')}
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <Badge text="Module 1" type="tag" />
                                {completedLectures.includes(1) && completedLectures.includes(2) ? (
                                    <span className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                                        <CheckCircle size={12}/> Completed
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1 text-xs font-bold text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded-full">
                                        <Clock size={12}/> In Progress
                                    </span>
                                )}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                                Foundations & Architecture
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                                Understand the math behind Transformers, tokens, and embeddings. Setup your n8n environment.
                            </p>
                            
                            {/* Mini Progress for Module */}
                            <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden mb-4">
                                <div 
                                    className="bg-green-500 h-full" 
                                    style={{ width: `${(completedLectures.filter(id => id <= 2).length / 2) * 100}%` }}
                                ></div>
                            </div>

                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>2 Lectures • 1 Lab</span>
                                <span className="flex items-center gap-1 text-primary font-medium group-hover:translate-x-1 transition-transform">
                                    Go to Module <ArrowRight size={12} />
                                </span>
                            </div>
                        </div>
                    </Card>

                    {/* Module 2 */}
                    <Card 
                        className="group cursor-pointer hover:border-primary transition-all duration-300 opacity-90 hover:opacity-100"
                         onClick={() => onNavigate('lectures')}
                    >
                        <div className="p-6">
                             <div className="flex justify-between items-start mb-4">
                                <Badge text="Module 2" type="tag" />
                                <span className="flex items-center gap-1 text-xs font-bold text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                                    Locked
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                                Prompt Engineering & Logic
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                                Master Chain-of-Thought, Zero-shot, and advanced prompt techniques.
                            </p>
                             <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden mb-4">
                                <div className="bg-gray-300 dark:bg-gray-700 h-full w-0"></div>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>2 Lectures • 2 Labs</span>
                                <span className="flex items-center gap-1 group-hover:text-primary font-medium group-hover:translate-x-1 transition-transform">
                                    View Details <ArrowRight size={12} />
                                </span>
                            </div>
                        </div>
                    </Card>
                </div>
             </div>

             {/* 4. Assignment Alert (Bottom) */}
             <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 rounded-xl p-4 flex items-start gap-4">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg text-yellow-600 dark:text-yellow-500">
                    <AlertCircle size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">Upcoming Assignment Deadline</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        "Module 1: ML & n8n Basics" is due in 3 days. Make sure to submit your JSON workflows.
                    </p>
                    <button 
                        onClick={() => onNavigate('assignments')}
                        className="text-xs font-bold text-yellow-700 dark:text-yellow-500 mt-2 hover:underline"
                    >
                        Go to Assignments
                    </button>
                </div>
             </div>

        </div>
    )
}