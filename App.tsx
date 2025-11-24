
import React, { useState, useEffect } from 'react';
import { Home, Book, PenTool, Cpu, Layers, BarChart2, Menu, X, Sun, Moon, GraduationCap, Video } from 'lucide-react';
import { StatsOverview } from './components/stats';
import { LecturesSection, PracticeSection, AssignmentsSection } from './components/sections';
import { DemosSection } from './components/demos';
import { ResourcesSection } from './components/resources';
import { FileViewer, ViewerFile } from './components/viewer';
import { Lecture1Interactive } from './components/lecture-1';
import { Lecture2Interactive } from './components/lecture-2';
import { VideoStudio } from './components/video-studio';

type View = 'home' | 'lectures' | 'practice' | 'assignments' | 'demos' | 'resources' | 'lecture-1' | 'lecture-2' | 'video-studio';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
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
    { id: 'home', label: 'Dashboard', icon: GraduationCap },
    { id: 'lectures', label: 'Lectures', icon: Book },
    { id: 'practice', label: 'Practice Labs', icon: PenTool },
    { id: 'assignments', label: 'Assignments', icon: Layers },
    { id: 'demos', label: 'Live Demos', icon: Cpu },
    { id: 'video-studio', label: 'Video Studio', icon: Video },
    { id: 'resources', label: 'Resources', icon: BarChart2 },
  ];

  const renderView = () => {
    switch (currentView) {
      case 'home': return <StatsOverview onNavigate={(view) => setCurrentView(view)} />;
      case 'lectures': return <LecturesSection onViewFile={handleViewFile} onStartLecture={(id) => setCurrentView(id === 1 ? 'lecture-1' : id === 2 ? 'lecture-2' : 'lectures')} />;
      case 'practice': return <PracticeSection onViewFile={handleViewFile} />;
      case 'assignments': return <AssignmentsSection onViewFile={handleViewFile} />;
      case 'demos': return <DemosSection onViewFile={handleViewFile} />;
      case 'video-studio': return <VideoStudio />;
      case 'resources': return <ResourcesSection onViewFile={handleViewFile} />;
      case 'lecture-1': return <Lecture1Interactive onClose={() => setCurrentView('lectures')} />;
      case 'lecture-2': return <Lecture2Interactive onClose={() => setCurrentView('lectures')} />;
      default: return <StatsOverview onNavigate={(view) => setCurrentView(view)} />;
    }
  };

  // Special full-screen render for Lecture 1 & 2 to bypass layout
  if (currentView === 'lecture-1') {
      return <Lecture1Interactive onClose={() => setCurrentView('lectures')} />;
  }
  if (currentView === 'lecture-2') {
      return <Lecture2Interactive onClose={() => setCurrentView('lectures')} />;
  }

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
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white dark:bg-[#1F2121] border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 text-primary font-bold text-xl tracking-tight cursor-pointer" onClick={() => setCurrentView('home')}>
            <GraduationCap size={28} />
            <span>LLM Start</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-500">
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-1.5">
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
                className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group ${
                  isActive 
                    ? 'bg-primary/10 text-primary font-bold' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Icon 
                  size={20} 
                  className={`mr-3 transition-colors ${isActive ? 'text-primary' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'}`} 
                />
                {item.label}
              </button>
             );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1F2121]">
           <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-blue-500 flex items-center justify-center overflow-hidden border-2 border-white dark:border-gray-800 shadow-sm text-white font-bold">
                 AD
              </div>
              <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Alex Dev</p>
                  <p className="text-xs text-gray-500">Pro Student</p>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Header (Mobile) */}
        <header className="flex items-center justify-between h-16 px-6 bg-white dark:bg-[#1F2121] border-b border-gray-200 dark:border-gray-800 lg:hidden">
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
        <div className="hidden lg:flex justify-between items-center h-16 px-8 bg-[#F5F5F5] dark:bg-[#121212]">
             <div className="text-sm text-gray-500">
                <span className="hidden xl:inline">Welcome back to your comprehensive LLM journey.</span>
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
