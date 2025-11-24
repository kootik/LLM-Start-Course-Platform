
import React, { useState, useEffect, useRef } from 'react';
import { X, Download, Maximize2, Minimize2, FileCode, FileText, Video, Image as ImageIcon, Copy, Check, ExternalLink, Terminal, Loader2 } from 'lucide-react';
import { Button } from './ui';

export interface ViewerFile {
  name: string;
  type: 'pdf' | 'video' | 'code' | 'image' | 'markdown';
  url?: string;
  content?: string;
  language?: string;
}

interface FileViewerProps {
  isOpen: boolean;
  onClose: () => void;
  file: ViewerFile | null;
}

// --- Improved Syntax Highlighter ---
const SimpleSyntaxHighlighter: React.FC<{ code: string; language?: string; showLineNumbers?: boolean }> = ({ code, language, showLineNumbers = true }) => {
  const processLine = (line: string, i: number) => {
    // Basic tokenization for highlighting
    const parts = line.split(/(\/\/.*$|\/\*[\s\S]*?\*\/|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\b(?:const|let|var|function|return|if|else|for|while|import|export|from|async|await|class|interface|type|extends|implements|new|this|try|catch|finally|switch|case|break|continue|default|typeof|instanceof|void|delete|in|of|with|debugger|throw|true|false|null|undefined|NaN|Infinity|SELECT|FROM|WHERE|INSERT|UPDATE|DELETE|JOIN|GROUP|BY|ORDER|HAVING|LIMIT)\b|[(){}[\].,;:])|(\s+)/g).filter(Boolean);
    
    const keywords = /^(const|let|var|function|return|if|else|for|while|import|export|from|async|await|class|interface|type|extends|implements|new|this|try|catch|finally|switch|case|break|continue|default|typeof|instanceof|void|delete|in|of|with|debugger|throw|SELECT|FROM|WHERE|INSERT|UPDATE|DELETE|JOIN|GROUP|BY|ORDER|HAVING|LIMIT)$/;
    const literals = /^(true|false|null|undefined|NaN|Infinity)$/;
    
    return (
      <div key={i} className="table-row hover:bg-white/5 group/line">
        {showLineNumbers && (
            <span className="table-cell text-right pr-4 select-none text-gray-600 w-10 text-xs align-top py-0.5 border-r border-gray-800 bg-[#1e1e1e] group-hover/line:text-gray-400">
                {i + 1}
            </span>
        )}
        <span className={`table-cell font-mono text-sm whitespace-pre text-gray-300 py-0.5 ${showLineNumbers ? 'pl-4' : ''}`}>
          {parts.map((part, idx) => {
            if (part.startsWith('//') || part.startsWith('/*')) return <span key={idx} className="text-gray-500 italic">{part}</span>;
            if (keywords.test(part)) return <span key={idx} className="text-purple-400 font-bold">{part}</span>;
            if (literals.test(part)) return <span key={idx} className="text-orange-400">{part}</span>;
            if (part.startsWith('"') || part.startsWith("'") || part.startsWith('`')) return <span key={idx} className="text-green-400">{part}</span>;
            if (!isNaN(parseFloat(part)) && isFinite(Number(part))) return <span key={idx} className="text-blue-400">{part}</span>;
            if (/^[A-Z][a-zA-Z0-9_]*$/.test(part)) return <span key={idx} className="text-yellow-400">{part}</span>; // Heuristic for types/classes
            return <span key={idx}>{part}</span>;
          })}
        </span>
      </div>
    );
  };

  return (
    <div className="table w-full border-collapse">
      {code.split('\n').map((line, i) => processLine(line, i))}
    </div>
  );
};

// --- Advanced Markdown Renderer ---
// Handles Fenced Code Blocks for the Lesson Content
const SimpleMarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const parts = [];
  const lines = content.split('\n');
  let inCodeBlock = false;
  let codeBlockLang = '';
  let codeBuffer: string[] = [];

  // 1. Parse lines into blocks (Text vs Code)
  lines.forEach((line, i) => {
    if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
            // End of block
            parts.push({ type: 'code', language: codeBlockLang, content: codeBuffer.join('\n') });
            codeBuffer = [];
            inCodeBlock = false;
        } else {
            // Start of block
            inCodeBlock = true;
            codeBlockLang = line.trim().replace(/^```/, '').trim();
        }
    } else if (inCodeBlock) {
        codeBuffer.push(line);
    } else {
        parts.push({ type: 'line', content: line });
    }
  });
  // Flush remaining buffer if file ends abruptly
  if (codeBuffer.length > 0) {
      parts.push({ type: 'code', language: codeBlockLang, content: codeBuffer.join('\n') });
  }

  // 2. Render blocks
  return (
    <div className="markdown-body p-8 max-w-4xl mx-auto text-gray-800 dark:text-gray-300 font-sans leading-relaxed">
      {parts.map((part, index) => {
        if (part.type === 'code') {
            return (
                <div key={index} className="my-6 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-[#1e1e1e] shadow-sm">
                    <div className="flex items-center justify-between px-3 py-1.5 bg-[#252526] border-b border-gray-700">
                         <span className="text-xs text-gray-400 font-mono uppercase">{part.language || 'text'}</span>
                         <CopyButton text={part.content as string} variant="icon" />
                    </div>
                    <div className="p-4 overflow-x-auto custom-scrollbar">
                        <SimpleSyntaxHighlighter code={part.content as string} language={part.language} showLineNumbers={false} />
                    </div>
                </div>
            );
        }

        const line = part.content as string;
        if (line.trim() === '') return <div key={index} className="h-4"></div>;
        
        // Media (Images & Video hacks via Markdown image syntax)
        const mediaMatch = line.match(/^!\[(.*?)\]\((.*?)\)/);
        if (mediaMatch) {
            const alt = mediaMatch[1];
            const src = mediaMatch[2];
            
            // Check if it's a video file (basic extension check)
            const isVideo = src.match(/\.(mp4|webm)$/i);
            
            if (isVideo) {
                 return (
                    <div key={index} className="my-8 rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 bg-black">
                        <video 
                            src={src} 
                            controls 
                            className="w-full aspect-video"
                            loop
                            muted
                            playsInline
                        />
                        {alt && <div className="p-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 text-center text-xs text-gray-500 font-medium">{alt}</div>}
                    </div>
                 );
            }
            
            // Standard Image
            return (
                <div key={index} className="my-8 flex flex-col items-center">
                    <img 
                        src={src} 
                        alt={alt} 
                        className="rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 w-full max-w-3xl" 
                    />
                    {alt && <span className="mt-3 text-sm text-gray-500 italic">{alt}</span>}
                </div>
            );
        }

        // Headers
        if (line.startsWith('# ')) return <h1 key={index} className="text-3xl font-bold mb-6 mt-10 text-gray-900 dark:text-white pb-4 border-b border-gray-200 dark:border-gray-800">{line.substring(2)}</h1>;
        if (line.startsWith('## ')) return <h2 key={index} className="text-2xl font-bold mb-4 mt-8 text-gray-900 dark:text-white flex items-center gap-2"><div className="w-2 h-8 bg-primary rounded-full"></div>{line.substring(3)}</h2>;
        if (line.startsWith('### ')) return <h3 key={index} className="text-xl font-semibold mb-3 mt-6 text-gray-800 dark:text-gray-200">{line.substring(4)}</h3>;
        
        // Blockquotes
        if (line.startsWith('> ')) return <blockquote key={index} className="border-l-4 border-primary/50 pl-4 italic text-gray-600 dark:text-gray-400 my-4 bg-gray-50 dark:bg-gray-800/50 py-3 pr-2 rounded-r">{line.substring(2)}</blockquote>;
        
        // Horizontal Rules
        if (line.startsWith('---')) return <hr key={index} className="my-8 border-gray-200 dark:border-gray-700" />;

        // Lists (Basic)
        if (line.trim().match(/^[-*]\s/)) {
            return (
                <div key={index} className="flex items-start gap-3 mb-2 ml-4">
                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                    <span className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{__html: parseInlineStyles(line.replace(/^[-*]\s/, ''))}}></span>
                </div>
            );
        }

        // Default Paragraph
        return <p key={index} className="mb-4 leading-7 text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{__html: parseInlineStyles(line)}}></p>;
      })}
    </div>
  );
};

// Helper for inline styles (bold, links)
const parseInlineStyles = (text: string) => {
    let parsed = text
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900 dark:text-white">$1</strong>')
        .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-purple-500 dark:text-purple-400 border border-gray-200 dark:border-gray-700">$1</code>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline font-medium">$1</a>');
    return parsed;
};

// --- Copy Button Component ---
const CopyButton: React.FC<{ text: string, variant?: 'button' | 'icon' }> = ({ text, variant = 'button' }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (variant === 'icon') {
        return (
            <button 
                onClick={handleCopy}
                className="text-gray-400 hover:text-white transition-colors p-1 rounded"
                title="Copy code"
            >
                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
            </button>
        );
    }

    return (
        <button 
            onClick={handleCopy}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${copied ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20'}`}
        >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy Code'}
        </button>
    );
};

// --- Main FileViewer Component ---
export const FileViewer: React.FC<FileViewerProps> = ({ isOpen, onClose, file }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Handle Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    setIsLoading(true);
  }, [file]);

  if (!isOpen || !file) return null;

  const handleDownload = () => {
      if (file.url) {
          const link = document.createElement('a');
          link.href = file.url;
          link.download = file.name;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      } else if (file.content) {
          const blob = new Blob([file.content], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = file.name;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
      }
  };

  const getRenderContent = () => {
    // VIDEO
    if (file.type === 'video') {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-black relative group">
             <video 
                controls 
                autoPlay
                className="max-h-full max-w-full w-full aspect-video focus:outline-none shadow-2xl" 
                src={file.url || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
                poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
             >
                Your browser does not support the video tag.
             </video>
        </div>
      );
    }

    // PDF
    if (file.type === 'pdf') {
      const pdfUrl = file.url || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
      return (
        <div className="w-full h-full bg-gray-200 dark:bg-gray-900 flex flex-col relative">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-0">
                    <Loader2 className="animate-spin text-gray-400" size={32} />
                </div>
            )}
            <iframe 
                src={pdfUrl}
                className="w-full h-full border-none z-10" 
                title="PDF Viewer"
                onLoad={() => setIsLoading(false)}
            />
             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white dark:bg-[#1F2121] px-6 py-3 rounded-full shadow-xl border border-gray-200 dark:border-gray-700 flex items-center gap-4 z-20 transition-transform hover:scale-105">
                 <span className="text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">Having trouble?</span>
                 <a 
                    href={pdfUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-2 text-primary hover:underline text-sm font-bold whitespace-nowrap"
                 >
                    <Download size={14} /> Download PDF
                 </a>
             </div>
        </div>
      );
    }

    // IMAGE
    if (file.type === 'image') {
        return (
            <div className="w-full h-full flex items-center justify-center bg-black/95 p-4 relative overflow-auto">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
                <img 
                    src={file.url || `https://placehold.co/800x600/1F2121/FFF?text=${encodeURIComponent(file.name)}`} 
                    alt={file.name} 
                    className="max-w-full max-h-full object-contain shadow-2xl rounded-sm z-10" 
                />
            </div>
        );
    }

    // MARKDOWN
    if (file.type === 'markdown') {
        const mockMd = file.content || `# ${file.name.replace('.md', '')}\n\n> Content loading...\n`;
        return (
             <div className="w-full h-full bg-white dark:bg-[#1F2121] overflow-y-auto custom-scrollbar">
                 <SimpleMarkdownRenderer content={mockMd} />
             </div>
        );
    }

    // CODE
    if (file.type === 'code') {
        const mockCode = file.content || `// Content for ${file.name}\n\nconsole.log("Loading...");`;
        
        return (
            <div className="w-full h-full bg-[#1e1e1e] overflow-hidden flex flex-col">
                <div className="flex items-center justify-between px-6 py-3 bg-[#252526] border-b border-[#3e3e42] flex-shrink-0">
                    <div className="flex items-center gap-3">
                         <div className="px-2 py-1 rounded bg-[#3e3e42] text-xs text-gray-300 font-mono uppercase">
                            {file.language || 'text'}
                         </div>
                         <span className="text-xs text-gray-500">{file.content?.split('\n').length || 0} lines</span>
                    </div>
                    <CopyButton text={mockCode} variant="button" />
                </div>
                <div className="flex-1 overflow-auto custom-scrollbar relative p-0">
                    <SimpleSyntaxHighlighter code={mockCode} language={file.language} />
                </div>
            </div>
        );
    }

    return <div className="flex items-center justify-center h-full text-gray-500">Unsupported file type</div>;
  };

  const getIcon = () => {
    switch(file.type) {
        case 'video': return <Video size={20} className="text-purple-400" />;
        case 'code': return <FileCode size={20} className="text-blue-400" />;
        case 'image': return <ImageIcon size={20} className="text-orange-400" />;
        case 'markdown': return <FileText size={20} className="text-green-400" />;
        default: return <FileText size={20} className="text-primary" />;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
        className={`bg-white dark:bg-[#1F2121] shadow-2xl flex flex-col overflow-hidden transition-all duration-300 border border-gray-200 dark:border-gray-800 ring-1 ring-white/10 ${
            isMaximized 
            ? 'fixed inset-0 rounded-none w-full h-full m-0 z-[110]' 
            : 'w-full max-w-6xl h-[85vh] rounded-xl relative'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1F2121] shrink-0">
            <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm shrink-0">
                    {getIcon()}
                </div>
                <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 dark:text-white truncate text-sm md:text-base">{file.name}</h3>
                </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
                {file.url && (
                    <a 
                        href={file.url} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors hidden sm:flex" 
                        title="Open in new tab"
                    >
                        <ExternalLink size={18} />
                    </a>
                )}
                
                <button 
                    onClick={handleDownload} 
                    className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors hidden sm:flex" 
                    title="Download"
                >
                    <Download size={18} />
                </button>
                
                <button 
                    onClick={() => setIsMaximized(!isMaximized)}
                    className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors hidden sm:block"
                    title={isMaximized ? "Restore" : "Maximize"}
                >
                    {isMaximized ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>
                <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-2 hidden sm:block"></div>
                <button 
                    onClick={onClose}
                    className="p-2 text-gray-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 rounded-lg transition-colors"
                    title="Close (Esc)"
                >
                    <X size={20} />
                </button>
            </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden relative bg-gray-50 dark:bg-[#151717] flex flex-col">
            {getRenderContent()}
        </div>
      </div>
    </div>
  );
};
