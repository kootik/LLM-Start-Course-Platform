

import React, { useState, useEffect } from 'react';
import { Clock, ChevronDown, ChevronUp, FileText, Activity, Video, Download, CheckCircle, Circle, PlayCircle, Folder, ExternalLink, Save, Layout, Database, Eye, Play, PenTool } from 'lucide-react';
import { LECTURES, PRACTICE, ASSIGNMENTS } from '../constants';
import { Badge, Card, Button } from './ui';
import { Difficulty, AssignmentType } from '../types';
import { ViewerFile } from './viewer';

// Helper for local storage
const useStickyState = (defaultValue: any, key: string) => {
  const [value, setValue] = useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

// Helper to determine file type and icon
const getFileAction = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    if (['png', 'jpg', 'jpeg', 'gif'].includes(ext || '')) {
        return { icon: Eye, label: 'View', type: 'image' as const };
    }
    if (['pdf'].includes(ext || '')) {
        return { icon: Eye, label: 'View', type: 'pdf' as const };
    }
    if (['js', 'py', 'sql', 'json', 'ts', 'md'].includes(ext || '')) {
        return { icon: Eye, label: 'View Code', type: 'code' as const };
    }
    if (['mp4', 'webm'].includes(ext || '')) {
        return { icon: PlayCircle, label: 'Watch', type: 'video' as const };
    }
    return { icon: Download, label: 'Download', type: 'download' as const };
};

// --- LECTURES ---
export const LecturesSection: React.FC<{ onViewFile?: (file: ViewerFile) => void; onStartLecture?: (id: number) => void }> = ({ onViewFile, onStartLecture }) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'All'>('All');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [completedLectures, setCompletedLectures] = useStickyState([], 'llm-start-lectures-completed');
  const [lectureNotes, setLectureNotes] = useStickyState({}, 'llm-start-lecture-notes');
  const [savedNoteId, setSavedNoteId] = useState<number | null>(null);

  // Extract unique topics for filter
  const allTopics = Array.from(new Set(LECTURES.flatMap(l => l.topics))).sort();

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic) 
        : [...prev, topic]
    );
  };

  const filtered = LECTURES.filter(l => {
    const matchesDifficulty = difficultyFilter === 'All' || l.level === difficultyFilter;
    const matchesTopics = selectedTopics.length === 0 || l.topics.some(t => selectedTopics.includes(t));
    return matchesDifficulty && matchesTopics;
  });

  const toggleComplete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (completedLectures.includes(id)) {
        setCompletedLectures(completedLectures.filter((i: number) => i !== id));
    } else {
        setCompletedLectures([...completedLectures, id]);
    }
  };

  const handleNoteChange = (id: number, note: string) => {
    setLectureNotes(prev => ({ ...prev, [id]: note }));
    // Simple debounce visual feedback
    if (savedNoteId !== id) {
        setSavedNoteId(id);
        setTimeout(() => setSavedNoteId(null), 2000);
    }
  };

  const handleFileClick = async (e: React.MouseEvent, filename: string) => {
      e.preventDefault();
      if (!onViewFile) return;
      
      const { type } = getFileAction(filename);
      // Map type to ViewerFile type or fallback
      let viewerType: ViewerFile['type'] = type === 'download' ? 'code' : type; 
      let content: string | undefined = undefined;
      let url: string | undefined = undefined;

      // Handle Markdown Files Dynamically
      if (filename.endsWith('.md')) {
          viewerType = 'markdown';
          try {
              const response = await fetch(`/${filename}`);
              if (response.ok) {
                  content = await response.text();
              } else {
                  content = `# ${filename}\n\nFile not found.`;
              }
          } catch (error) {
              console.error("Failed to load content", error);
              content = `# Error\n\nFailed to load ${filename}`;
          }
      } else if (viewerType === 'image') {
          // For local diagram images in resources
          // Ensure path is absolute
          url = `/materials/all_diagrams/${filename}`;
      }
      
      onViewFile({
          name: filename,
          type: viewerType,
          content: content,
          url: url
      });
  };

  const handleWatchLecture = (lectureId: number) => {
      if ((lectureId === 1 || lectureId === 2) && onStartLecture) {
          onStartLecture(lectureId);
      } else if (onViewFile) {
          onViewFile({ name: `Lecture ${lectureId} Recording`, type: 'video' });
      }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="bg-white dark:bg-[#1F2121] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Lectures</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Foundational concepts and theory (8 Modules)</p>
            </div>
            <div className="flex flex-wrap gap-2">
                {(['All', Difficulty.Intermediate, Difficulty.Advanced, Difficulty.Expert] as const).map(lvl => (
                    <button
                        key={lvl}
                        onClick={() => setDifficultyFilter(lvl)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${difficultyFilter === lvl ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                    >
                        {lvl}
                    </button>
                ))}
            </div>
        </div>
        
        {/* Topic Filters */}
        <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
            <span className="text-xs font-bold text-gray-400 uppercase mr-2">Filter by Topic:</span>
            <div className="inline-flex flex-wrap gap-2 mt-2">
                {allTopics.map(topic => (
                    <button
                        key={topic}
                        onClick={() => toggleTopic(topic)}
                        className={`px-2 py-1 text-[10px] uppercase font-semibold rounded border transition-colors ${
                            selectedTopics.includes(topic)
                                ? 'bg-primary/10 border-primary text-primary'
                                : 'bg-transparent border-gray-200 dark:border-gray-700 text-gray-500 hover:border-gray-400'
                        }`}
                    >
                        {topic}
                    </button>
                ))}
                {selectedTopics.length > 0 && (
                     <button onClick={() => setSelectedTopics([])} className="text-xs text-gray-400 hover:text-primary underline px-2">
                         Clear
                     </button>
                )}
            </div>
        </div>
      </div>

      <div className="grid gap-4">
        {filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No lectures found matching your criteria.</div>
        ) : filtered.map((lecture) => {
            const isCompleted = completedLectures.includes(lecture.id);
            return (
          <Card key={lecture.id} className={`overflow-hidden group ${isCompleted ? 'border-l-4 border-l-green-500' : ''}`}>
            <div 
                className="p-6 flex flex-col md:flex-row md:items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                onClick={() => setExpandedId(expandedId === lecture.id ? null : lecture.id)}
                role="button"
                tabIndex={0}
                aria-expanded={expandedId === lecture.id}
            >
              <div className="flex items-start gap-4">
                 <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex flex-col items-center justify-center border transition-colors ${isCompleted ? 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800' : 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border-gray-200 dark:border-gray-700'}`}>
                    {isCompleted ? (
                         <CheckCircle size={24} className="text-green-600 dark:text-green-400" />
                    ) : (
                        <>
                            <span className="text-[10px] uppercase font-bold text-gray-400">Week</span>
                            <span className="text-lg font-bold text-gray-900 dark:text-white leading-none">{lecture.week}</span>
                        </>
                    )}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-primary transition-colors">{lecture.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-2">
                    <span className="flex items-center gap-1.5"><Clock size={14} className="text-primary"/> {lecture.duration}</span>
                    <Badge text={lecture.level} type="level" />
                    <span className="hidden md:inline text-gray-300 dark:text-gray-700">|</span>
                    <span className="text-xs text-gray-400">Lecture #{lecture.id}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
                   <div className="hidden md:flex -space-x-2">
                      {/* Avatar placeholders for students */}
                      {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-[#1F2121] bg-gray-300"></div>)}
                   </div>
                   <Button 
                        variant={isCompleted ? "outline" : "primary"} 
                        onClick={(e) => toggleComplete(e, lecture.id)}
                        className="text-xs h-8"
                   >
                       {isCompleted ? "Completed" : "Mark Complete"}
                   </Button>
                   <div className={`p-2 rounded-full transition-transform duration-300 ${expandedId === lecture.id ? 'bg-primary/10 rotate-180' : 'bg-gray-100 dark:bg-gray-800'}`}>
                        <ChevronDown className={`w-5 h-5 ${expandedId === lecture.id ? 'text-primary' : 'text-gray-500'}`} />
                   </div>
              </div>
            </div>
            
            {expandedId === lecture.id && (
              <div className="px-6 pb-6 pt-2 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-black/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        <div>
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2">Description</h4>
                            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{lecture.description}</p>
                            
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2">Learning Outcomes</h4>
                            <ul className="space-y-2 mb-6">
                                {lecture.outcomes.map(o => (
                                    <li key={o} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <CheckCircle size={16} className="text-green-500" /> {o}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-wrap gap-2">
                                {lecture.topics.map(t => (
                                    <span key={t} className="text-xs font-medium px-2.5 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-gray-600 dark:text-gray-300">#{t}</span>
                                ))}
                            </div>
                        </div>
                        
                        {/* Personal Notes Section */}
                        <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800/30 rounded-xl p-4 transition-colors">
                            <h4 className="text-sm font-bold text-yellow-800 dark:text-yellow-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                                <PenTool size={14} /> My Notes
                            </h4>
                            <textarea
                                value={lectureNotes[lecture.id] || ''}
                                onChange={(e) => handleNoteChange(lecture.id, e.target.value)}
                                placeholder="Add your personal notes, key takeaways, or questions here..."
                                className="w-full h-24 bg-white dark:bg-gray-900 border border-yellow-200 dark:border-yellow-800/30 rounded-lg p-3 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none text-gray-700 dark:text-gray-300 transition-shadow"
                            />
                            <div className="flex justify-end mt-2 min-h-[16px]">
                                {savedNoteId === lecture.id && (
                                    <span className="text-[10px] text-green-600 dark:text-green-400 flex items-center gap-1 animate-fade-in">
                                        <CheckCircle size={10} /> Saved to Local Storage
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                             <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Related Resources</h4>
                             <div className="space-y-2">
                                {lecture.resources.map(r => {
                                    const { icon: ActionIcon, label } = getFileAction(r);
                                    return (
                                    <button 
                                        key={r} 
                                        onClick={(e) => handleFileClick(e, r)}
                                        className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 text-left transition-colors group/btn"
                                    >
                                        <div className="flex items-center gap-2 overflow-hidden">
                                            {r.endsWith('.png') ? <Layout size={16} className="text-orange-500 flex-shrink-0"/> : <FileText size={16} className="text-primary flex-shrink-0" />}
                                            <span className="text-sm text-gray-700 dark:text-gray-200 truncate" title={r}>{r}</span>
                                        </div>
                                        <div title={label} className="text-gray-400 opacity-0 group-hover/btn:opacity-100 transition-opacity text-primary">
                                            <ActionIcon size={14} />
                                        </div>
                                    </button>
                                )})}
                             </div>
                        </div>
                        <Button className="w-full gap-2" onClick={() => handleWatchLecture(lecture.id)}>
                            {lecture.id === 1 || lecture.id === 2 ? <Play size={16} fill="currentColor" /> : <Video size={16} />} 
                            {lecture.id === 1 || lecture.id === 2 ? "Start Interactive Lecture" : "Watch Lecture"}
                        </Button>
                        <Button variant="outline" className="w-full gap-2" onClick={() => onViewFile && onViewFile({ name: `Lecture_${lecture.id}_Slides.pdf`, type: 'pdf' })}>
                            <Activity size={16} /> View Slides
                        </Button>
                    </div>
                </div>
              </div>
            )}
          </Card>
        )})}
      </div>
    </div>
  );
};

// --- PRACTICE ---
export const PracticeSection: React.FC<{ onViewFile?: (file: ViewerFile) => void }> = ({ onViewFile }) => {
    // ... (Rest of file unchanged)
    const [completedPractice, setCompletedPractice] = useStickyState([1, 2, 3], 'llm-start-practice-completed');

    const toggleComplete = (id: number) => {
        if (completedPractice.includes(id)) {
            setCompletedPractice(completedPractice.filter((i: number) => i !== id));
        } else {
            setCompletedPractice([...completedPractice, id]);
        }
    };

    const handleViewGuide = async (filename: string) => {
        if (!onViewFile) return;

        let content: string | undefined = undefined;
        try {
            const response = await fetch(`/${filename}`);
            if (response.ok) {
                content = await response.text();
            } else {
                content = `# ${filename}\n\nFile not found.`;
            }
        } catch (error) {
            console.error("Failed to load guide", error);
            content = `# Error\n\nFailed to load ${filename}`;
        }

        onViewFile({
            name: filename,
            type: 'markdown',
            content: content
        });
    };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="bg-white dark:bg-[#1F2121] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Practical Labs</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Hands-on workflows with n8n, Python, and Vector DBs</p>
      </div>

      <div className="relative ml-4 md:ml-8 space-y-8">
        {/* Vertical Line */}
        <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-gray-200 dark:bg-gray-800"></div>

        {PRACTICE.map((item, idx) => {
            const isCompleted = completedPractice.includes(item.id);
            return (
            <div key={item.id} className="relative pl-12 md:pl-16">
                {/* Timeline Dot */}
                <div className={`absolute left-0 top-6 w-8 h-8 rounded-full border-4 border-white dark:border-[#121212] flex items-center justify-center z-10 transition-colors ${isCompleted ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'}`}>
                    {isCompleted ? <CheckCircle size={16} className="text-white" /> : <Circle size={16} className="text-white" />}
                </div>

                <div className={`bg-white dark:bg-[#1F2121] rounded-xl p-6 shadow-sm border transition-all group ${isCompleted ? 'border-green-200 dark:border-green-900/30' : 'border-gray-200 dark:border-gray-800 hover:border-primary/50'}`}>
                    <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                                <span className="font-mono text-primary font-bold">WEEK {item.week}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1"><Clock size={14}/> {item.duration}</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">{item.description}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                                    <span className="text-xs font-bold text-gray-400 uppercase">Projects ({item.projectCount})</span>
                                    <ul className="mt-2 space-y-1">
                                        {item.projects.map(p => (
                                            <li key={p} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                                                <span className="mt-1.5 w-1 h-1 rounded-full bg-primary flex-shrink-0"></span>
                                                {p}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                                    <span className="text-xs font-bold text-gray-400 uppercase">Outcomes</span>
                                    <ul className="mt-2 space-y-1">
                                        {item.outcomes.map(o => (
                                            <li key={o} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                                                <span className="mt-1.5 w-1 h-1 rounded-full bg-green-500 flex-shrink-0"></span>
                                                {o}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 min-w-[160px]">
                            <Button 
                                onClick={() => toggleComplete(item.id)}
                                variant={isCompleted ? "outline" : "primary"} 
                                className="w-full justify-between transition-all"
                            >
                                {isCompleted ? "Completed" : "Mark Complete"}
                                {isCompleted ? <CheckCircle size={18} /> : <PlayCircle size={18} />}
                            </Button>
                            {item.guide && (
                                <Button 
                                    onClick={() => handleViewGuide(item.guide!)}
                                    variant="secondary"
                                    className="w-full justify-between"
                                >
                                    View Guide
                                    <FileText size={18} />
                                </Button>
                            )}
                            <Button variant="ghost" className="w-full justify-between text-xs">
                                {item.workflowCount} Workflows
                                <Folder size={14} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )})}
      </div>
    </div>
  );
};

// --- ASSIGNMENTS ---
export const AssignmentsSection: React.FC<{ onViewFile?: (file: ViewerFile) => void }> = ({ onViewFile }) => {
    // ... (Rest of file unchanged)
    const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | 'All'>('All');
    const [filterType, setFilterType] = useState<AssignmentType | 'All'>('All');
    const [assignmentStates, setAssignmentStates] = useStickyState({}, 'llm-start-assignments-status');

    const handleStatusChange = (id: number, status: string) => {
        setAssignmentStates({
            ...assignmentStates,
            [id]: status
        });
    };

    const filtered = ASSIGNMENTS.filter(a => {
        const matchDiff = filterDifficulty === 'All' || a.difficulty === filterDifficulty;
        const matchType = filterType === 'All' || a.type === filterType;
        return matchDiff && matchType;
    });

    const handleFileClick = async (e: React.MouseEvent, filename: string) => {
        e.preventDefault();
        if (!onViewFile) return;
        
        const { type } = getFileAction(filename);
        let viewerType: ViewerFile['type'] = type === 'download' ? 'code' : type; 
        let content: string | undefined = undefined;

        // Handle Markdown Files Dynamically
        if (filename.endsWith('.md')) {
            viewerType = 'markdown';
            try {
                const response = await fetch(`/${filename}`);
                if (response.ok) {
                    content = await response.text();
                } else {
                    content = `# ${filename}\n\nFile not found.`;
                }
            } catch (error) {
                console.error("Failed to load content", error);
                content = `# Error\n\nFailed to load ${filename}`;
            }
        }

        onViewFile({
            name: filename,
            type: viewerType,
            content: content
        });
    };

    return (
        <div className="space-y-6 animate-fade-in pb-12">
            <div className="bg-white dark:bg-[#1F2121] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Assignments</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Real-world challenges to test your skills</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                    <select 
                        className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5"
                        value={filterDifficulty}
                        onChange={(e) => setFilterDifficulty(e.target.value as any)}
                    >
                        <option value="All">All Difficulties</option>
                        {Object.values(Difficulty).map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                     <select 
                        className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value as any)}
                    >
                        <option value="All">All Types</option>
                        {Object.values(AssignmentType).map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(assignment => {
                    const currentStatus = assignmentStates[assignment.id] || assignment.status;
                    return (
                    <Card key={assignment.id} className="flex flex-col h-full group hover:-translate-y-1 transition-transform duration-300" role="article">
                        <div className="p-6 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-4">
                                <Badge text={assignment.type} type="tag" />
                                <div className="relative">
                                    <select 
                                        value={currentStatus}
                                        onChange={(e) => handleStatusChange(assignment.id, e.target.value)}
                                        className={`text-xs font-bold py-1 pl-2 pr-6 rounded-full appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                                            currentStatus === 'Completed' ? 'bg-green-100 text-green-800' : 
                                            currentStatus === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                                            'bg-gray-100 text-gray-600'
                                        }`}
                                    >
                                        <option value="Not Started">Not Started</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                    <ChevronDown size={12} className="absolute right-2 top-1.5 pointer-events-none opacity-50" />
                                </div>
                            </div>
                            
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{assignment.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-grow">{assignment.description}</p>
                            
                            <div className="space-y-4">
                                {/* Files Section */}
                                {assignment.files && assignment.files.length > 0 && (
                                    <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                                        <span className="text-xs font-bold text-gray-400 uppercase block mb-2">Files & Resources</span>
                                        <div className="space-y-1">
                                            {assignment.files.map((file, i) => {
                                                const { icon: Icon, label } = getFileAction(file);
                                                return (
                                                <button 
                                                    key={i} 
                                                    onClick={(e) => handleFileClick(e, file)}
                                                    className="flex items-center gap-2 text-xs text-primary hover:underline text-left"
                                                >
                                                    <Icon size={12} /> {label} {file}
                                                </button>
                                            )})}
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400 uppercase font-bold">Difficulty</span>
                                        <div className="mt-1"><Badge text={assignment.difficulty} type="level" /></div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-xs text-gray-400 uppercase font-bold">Est. Time</span>
                                        <span className="text-sm font-medium text-gray-900 dark:text-white mt-1">{assignment.hours} hours</span>
                                    </div>
                                </div>
                                <Button variant={currentStatus === 'Completed' ? 'outline' : 'primary'} className="w-full">
                                    {currentStatus === 'Completed' ? 'View Submission' : 'Start Assignment'}
                                </Button>
                            </div>
                        </div>
                    </Card>
                )})}
            </div>
        </div>
    );
};
