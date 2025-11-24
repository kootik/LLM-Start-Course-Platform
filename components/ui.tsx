import React from 'react';
import { Difficulty, AssignmentType } from '../types';
import { Loader2 } from 'lucide-react';

export const Badge: React.FC<{ text: string; color?: string; type?: 'level' | 'status' | 'tag' }> = ({ text, color, type }) => {
  let bgClass = 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  
  if (type === 'level') {
    if (text === Difficulty.Intermediate) bgClass = 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400 border border-green-200 dark:border-green-800';
    if (text === Difficulty.Advanced) bgClass = 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-400 border border-orange-200 dark:border-orange-800';
    if (text === Difficulty.Expert) bgClass = 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400 border border-red-200 dark:border-red-800';
  } else if (type === 'status') {
     if (text === 'Completed') bgClass = 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400';
     if (text === 'In Progress') bgClass = 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400';
     if (text === 'Not Started' || text === 'Pending') bgClass = 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
  } else if (type === 'tag') {
     bgClass = 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300';
  }

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${bgClass}`}>
      {text}
    </span>
  );
};

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode; onClick?: () => void }> = ({ children, className = '', onClick, ...props }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div 
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`bg-white dark:bg-[#1F2121] border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ${onClick ? 'cursor-pointer focus:ring-2 focus:ring-primary focus:outline-none' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'ghost' }> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  let variantStyles = "";
  
  if (variant === 'primary') variantStyles = "bg-primary hover:bg-[#2aa2af] text-white focus:ring-primary shadow-sm hover:shadow-primary/25";
  if (variant === 'secondary') variantStyles = "bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-800";
  if (variant === 'outline') variantStyles = "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50";
  if (variant === 'ghost') variantStyles = "text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:bg-primary/5";

  return (
    <button className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center p-8">
        <Loader2 className="animate-spin text-primary" size={32} />
    </div>
);