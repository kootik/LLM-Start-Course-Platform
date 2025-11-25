import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Book, PenTool, Cpu, Layers, FolderOpen, Menu, X, Sun, Moon, GraduationCap, CheckCircle, Award } from 'lucide-react';
import { StatsOverview } from './components/stats';
import { LecturesSection, PracticeSection, AssignmentsSection } from './components/sections';
import { DemosSection } from './components/demos';
import { ResourcesSection } from './components/resources';
import { FileViewer, ViewerFile } from './components/viewer';
import { Lecture1Interactive } from './components/lecture-1';
import { Lecture2Interactive } from './components/lecture-2';
import { LECTURES, PRACTICE } from './constants';

type View = 'home' | 'lectures' | 'practice' | 'assignments' | 'demos' | 'resources' | 'lecture-1' | 'lecture-2';

// Helper for local storage (moved here to share state)
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

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  // Shared State for Progress
  const [completedLectures, setCompletedLectures] = useStickyState([], 'llm-start-lectures-completed');
  const [completedPractice, setCompletedPractice] = useStickyState([], 'llm-start-practice-completed');

  // Streak State
  const [streak, setStreak] = useState(0);

  // Calculate Streak on Mount
  useEffect(() => {
    const checkStreak = () => {
      const today = new Date().toDateString();
      const lastVisit = localStorage.getItem('llm-start-last-visit');
      const currentStreak = parseInt(localStorage.getItem('llm-start-streak') || '0');

      if (lastVisit === today) {
        // Already visited today, just set state
        setStreak(currentStreak);
      } else {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastVisit === yesterday.toDateString()) {
          // Visited yesterday, increment streak
          const newStreak = currentStreak + 1;
          setStreak(newStreak);
          localStorage.setItem('llm-start-streak', newStreak.toString());
        } else {
          // Broken streak or first visit, reset to 1
          setStreak(1);
          localStorage.setItem('llm-start-streak', '1');
        }
        // Update last visit
        localStorage.setItem('llm-start-last-visit', today);
      }
    };

    checkStreak();
  }, []);

  // Calculate Progress
  const totalItems = LECTURES.length + PRACTICE.length;
  const completedCount = completedLectures.length + completedPractice.length;
  const progressPercentage = Math.round((completedCount / totalItems) * 100);
  
  // Viewer State
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewingFile, setViewingFile] = useState<ViewerFile | null>(null);

  const handleViewFile = (file: ViewerFile) => {
    setViewingFile(file);
    setIsViewerOpen(true);
  };

  // Initialize dark mode from local storage or system preference
  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setDarkMode(true);
    }
  };

  const navItems = [
    { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'lectures', label: 'Lectures', icon: Book },
    { id: 'practice', label: 'Practice Labs', icon: PenTool },
    { id: 'assignments', label: 'Assignments', icon: Layers },
    { id: 'demos', label: 'Live Demos', icon: Cpu },
    { id: 'resources', label: 'Resources', icon: FolderOpen },
  ];

  const renderView = () => {
    switch (currentView) {
      case 'home': return (
        <StatsOverview 
            onNavigate={(view) => setCurrentView(view)} 
            completedLectures={completedLectures}
            completedPractice={completedPractice}
            streak={streak}
        />
      );
      case 'lectures': return (
        <LecturesSection 
            onViewFile={handleViewFile} 
            onStartLecture={(id) => setCurrentView(id === 1 ? 'lecture-1' : id === 2 ? 'lecture-2' : 'lectures')} 
            completedLectures={completedLectures}
            setCompletedLectures={setCompletedLectures}
        />
      );
      case 'practice': return (
        <PracticeSection 
            onViewFile={handleViewFile}
            completedPractice={completedPractice}
            setCompletedPractice={setCompletedPractice}
        />
      );
      case 'assignments': return <AssignmentsSection onViewFile={handleViewFile} />;
      case 'demos': return <DemosSection onViewFile={handleViewFile} />;
      case 'resources': return <ResourcesSection onViewFile={handleViewFile} />;
      case 'lecture-1': return <Lecture1Interactive onClose={() => {
          if(!completedLectures.includes(1)) setCompletedLectures([...completedLectures, 1]);
          setCurrentView('lectures');
      }} />;
      case 'lecture-2': return <Lecture2Interactive onClose={() => {
          if(!completedLectures.includes(2)) setCompletedLectures([...completedLectures, 2]);
          setCurrentView('lectures');
      }} />;
      default: return <StatsOverview onNavigate={(view) => setCurrentView(view)} completedLectures={completedLectures} completedPractice={completedPractice} streak={streak} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F5F5] dark:bg-[#121212] text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      
      {/* File Viewer Modal */}
      <FileViewer 
        isOpen={isViewerOpen} 
        onClose={() => setIsViewerOpen(false)} 
        file={viewingFile} 
      />

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white dark:bg-[#1F2121] border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out flex flex-col
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-800 shrink-0">
          <div className="flex items-center gap-2 text-primary font-bold text-xl tracking-tight cursor-pointer" onClick={() => setCurrentView('home')}>
            <GraduationCap size={28} />
            <span>LLM Start</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-500">
            <X size={24} />
          </button>
        </div>

        {/* Dynamic Progress Widget in Sidebar */}
        <div className="p-4 mx-4 mt-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-[#1a1a1a] rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-500 uppercase">Your Progress</span>
                <span className="text-xs font-bold text-primary">{progressPercentage}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-primary transition-all duration-500 ease-out" 
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
            <div className="mt-3 flex justify-between text-[10px] text-gray-400">
                <div className="flex items-center gap-1">
                    <Book size={10} /> {completedLectures.length}/{LECTURES.length}
                </div>
                <div className="flex items-center gap-1">
                    <PenTool size={10} /> {completedPractice.length}/{PRACTICE.length}
                </div>
            </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
             const Icon = item.icon;
             const isActive = currentView === item.id;
             return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id as View);
                  setIsSidebarOpen(false);
                }}
                className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group relative ${
                  isActive 
                    ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Icon 
                  size={20} 
                  className={`mr-3 transition-colors ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'}`} 
                />
                {item.label}
              </button>
             );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1F2121] shrink-0">
           <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-blue-500 flex items-center justify-center overflow-hidden border-2 border-white dark:border-gray-800 shadow-sm text-white font-bold">
                 AD
              </div>
              <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Alex Dev</p>
                  <p className="text-xs text-gray-500">Student</p>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Header (Mobile) */}
        <header className="flex items-center justify-between h-16 px-6 bg-white dark:bg-[#1F2121] border-b border-gray-200 dark:border-gray-800 lg:hidden shrink-0">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Menu size={24} />
          </button>
          <span className="font-semibold text-gray-900 dark:text-white">LLM Start</span>
          <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
        </header>

        {/* Top Bar Desktop (Dark Mode Only) */}
        <div className="hidden lg:flex justify-between items-center h-16 px-8 bg-[#F5F5F5] dark:bg-[#121212] shrink-0">
             <div className="text-sm text-gray-500">
                <span className="hidden xl:inline">Welcome back, Alex. Continue your journey into LLMs.</span>
             </div>
            <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                title="Toggle Dark Mode"
            >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
        </div>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto h-full">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;