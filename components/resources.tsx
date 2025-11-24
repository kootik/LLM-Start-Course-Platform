

import React, { useState } from 'react';
import { FileText, Image as ImageIcon, GitBranch, Terminal, Code, Download, Copy, Search, File, FileCode, Eye, Check, Play } from 'lucide-react';
import { AGENTS, RESOURCES_DOCS, WORKFLOWS, DIAGRAMS, CODE_SNIPPETS } from '../constants';
import { Card, Button, Badge } from './ui';
import { ResourceDoc, Diagram, Workflow, CodeSnippet } from '../types';
import { ViewerFile } from './viewer';
import { WorkflowBuilder } from './workflow-builder';

type ResourceTab = 'documents' | 'diagrams' | 'workflows' | 'agents' | 'snippets';

export const ResourcesSection: React.FC<{ onViewFile?: (file: ViewerFile) => void }> = ({ onViewFile }) => {
  const [activeTab, setActiveTab] = useState<ResourceTab>('documents');
  const [search, setSearch] = useState('');
  const [docFilter, setDocFilter] = useState<'All' | 'Lectures' | 'Practice' | 'Assignments' | 'Resources'>('All');
  const [workflowFilter, setWorkflowFilter] = useState<'All' | 'Basic' | 'RAG' | 'Agents' | 'Integration'>('All');
  const [snippetLang, setSnippetLang] = useState<'JavaScript' | 'Python' | 'SQL'>('JavaScript');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  
  // Workflow Builder State
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);

  const handleCopy = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };
  
  const handleDownloadWorkflow = (wf: Workflow) => {
      if (!wf.n8nCode) return;
      const blob = new Blob([wf.n8nCode], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${wf.title.replace(/\s+/g, '_').toLowerCase()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
  };

  const handleViewDoc = async (doc: ResourceDoc) => {
      if (onViewFile) {
          let type: ViewerFile['type'] = 'code';
          let url: string | undefined = undefined;
          let content: string | undefined = undefined;

          if (doc.type === 'MD' || doc.name.endsWith('.md')) {
              type = 'markdown';
              try {
                  const res = await fetch(`/${doc.name}`);
                  if (res.ok) {
                      content = await res.text();
                  } else {
                      content = `# ${doc.name}\n\nFile not found in local environment.\n\nSimulated content for **${doc.category}** would appear here.`;
                  }
              } catch (e) {
                  console.error("Error loading file:", e);
                  content = `Error loading file: ${doc.name}`;
              }
          } else if (doc.type === 'PDF') {
              type = 'pdf';
              url = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
          } else if (doc.name.endsWith('.png') || doc.name.endsWith('.jpg')) {
              type = 'image';
          } 

          onViewFile({
              name: doc.name,
              type: type,
              url: url,
              content: content
          });
      }
  };
  
  const handleViewDiagram = (d: Diagram) => {
      if (onViewFile) {
          onViewFile({
              name: d.title,
              type: 'image',
              // Fix: Ensure path starts with / to be absolute relative to domain root
              url: d.filename.startsWith('http') ? d.filename : `/materials/all_diagrams/${d.filename}` 
          });
      }
  };

  const tabs: {id: ResourceTab, label: string, icon: React.ElementType}[] = [
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'diagrams', label: 'Diagrams', icon: ImageIcon },
    { id: 'workflows', label: 'Workflows', icon: GitBranch },
    { id: 'agents', label: 'Agents', icon: Terminal },
    { id: 'snippets', label: 'Code', icon: Code },
  ];

  const renderContent = () => {
    const NoResults = () => (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <Search size={48} className="mb-4 opacity-20" />
            <p>No results found matching "{search}"</p>
        </div>
    );

    switch(activeTab) {
      case 'agents':
        const filteredAgents = AGENTS.filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.role.toLowerCase().includes(search.toLowerCase()));
        if (filteredAgents.length === 0) return <NoResults />;
        
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAgents.map((agent, i) => (
                    <Card key={i} className="flex flex-col overflow-hidden group hover:border-primary/50 transition-colors">
                        <div className="p-6 pb-4 flex-grow">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                    <Terminal size={24} />
                                </div>
                                <Badge text={agent.role} type="tag" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{agent.name}</h3>
                            <p className="text-sm text-gray-500 mb-4">{agent.goal}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {agent.tools.map(t => (
                                    <span key={t} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">{t}</span>
                                ))}
                            </div>
                        </div>
                        <div className="bg-[#1e1e1e] p-4 border-t border-gray-800">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs text-gray-500 font-mono">definition.py</span>
                                <button 
                                    onClick={() => handleCopy(i, agent.codeSnippet)}
                                    className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                                >
                                    {copiedId === i ? <Check size={12} className="text-green-500"/> : <Copy size={12} />} 
                                    {copiedId === i ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                            <pre className="text-xs font-mono text-green-400 overflow-x-auto whitespace-pre-wrap font-light opacity-90 h-24">
                                {agent.codeSnippet}
                            </pre>
                            <div className="mt-3 flex gap-2">
                                <Button variant="secondary" className="w-full text-xs h-8">Learn More</Button>
                                <Button variant="outline" className="w-full text-xs h-8">Try It</Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        );
      case 'workflows':
        const categories = ['Basic', 'RAG', 'Agents', 'Integration'] as const;
        const visibleCategories = workflowFilter === 'All' ? categories : [workflowFilter];

        return (
            <div className="space-y-8">
                 <div className="flex gap-2 pb-4 border-b border-gray-100 dark:border-gray-800 overflow-x-auto">
                    {(['All', 'Basic', 'RAG', 'Agents', 'Integration'] as const).map(f => (
                        <button 
                            key={f}
                            onClick={() => setWorkflowFilter(f)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${workflowFilter === f ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {visibleCategories.map(cat => {
                    const categoryWorkflows = WORKFLOWS.filter(w => 
                        w.category === cat && 
                        (w.title.toLowerCase().includes(search.toLowerCase()) || w.description.toLowerCase().includes(search.toLowerCase()))
                    );
                    if (categoryWorkflows.length === 0) return null;
                    return (
                        <div key={cat}>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 pl-2 border-l-4 border-primary">{cat} Workflows</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {categoryWorkflows.map((wf) => (
                                    <Card key={wf.id} className="p-5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${cat === 'Agents' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'} dark:bg-gray-800 dark:text-gray-300`}>
                                                    <GitBranch size={16} />
                                                </div>
                                                <h4 className="font-bold text-gray-900 dark:text-white">{wf.title}</h4>
                                            </div>
                                            <Badge text={wf.complexity} type="tag" />
                                        </div>
                                        <p className="text-sm text-gray-500 mb-4 pl-10">{wf.description}</p>
                                        <div className="pl-10 flex items-center gap-4 text-xs text-gray-400 justify-between">
                                            <span>{wf.nodes} Nodes</span>
                                            <div className="flex gap-2">
                                                <Button 
                                                    variant="outline" 
                                                    className="h-8 text-xs gap-1.5 border-gray-300 dark:border-gray-600"
                                                    onClick={() => setSelectedWorkflow(wf)}
                                                >
                                                    <Eye size={12} /> Visualize
                                                </Button>
                                                {wf.n8nCode && (
                                                    <>
                                                        <Button 
                                                            variant="secondary" 
                                                            className="h-8 text-xs gap-1.5"
                                                            onClick={() => handleCopy(wf.id, wf.n8nCode!)}
                                                        >
                                                            {copiedId === wf.id ? <Check size={12} className="text-green-500"/> : <Copy size={12} />}
                                                            {copiedId === wf.id ? 'Copied' : 'JSON'}
                                                        </Button>
                                                        <Button 
                                                            variant="ghost" 
                                                            className="h-8 text-xs gap-1.5 px-2"
                                                            onClick={() => handleDownloadWorkflow(wf)}
                                                        >
                                                            <Download size={12} />
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    );
                })}
                {WORKFLOWS.filter(w => w.title.toLowerCase().includes(search.toLowerCase())).length === 0 && <NoResults />}
            </div>
        );
      case 'diagrams':
        const diagramCats = ['Transformers', 'RAG', 'Agents', 'Production', 'Workflows', 'Prompting', 'n8n', 'Database'];
        const filteredDiagrams = DIAGRAMS.filter(d => d.title.toLowerCase().includes(search.toLowerCase()));
        
        if (filteredDiagrams.length === 0) return <NoResults />;

        return (
             <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                    {diagramCats.map(cat => (
                         <button key={cat} className="px-3 py-1 text-xs rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300">
                             {cat}
                         </button>
                    ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDiagrams.map((d) => (
                        <Card key={d.id} className="group cursor-pointer overflow-hidden border-0 shadow-md flex flex-col" onClick={() => handleViewDiagram(d)}>
                            <div className="aspect-video bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100 dark:bg-gray-900">
                                    <ImageIcon size={48} opacity={0.2} />
                                    <span className="absolute bottom-4 text-xs font-mono uppercase tracking-widest opacity-50">{d.filename}</span>
                                </div>
                                <div className="absolute inset-0 bg-primary/90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-2">
                                    <Button variant="secondary" className="h-8 text-xs">View Full Size</Button>
                                    <Button variant="outline" className="h-8 text-xs border-white text-white hover:bg-white/20">Save Image</Button>
                                </div>
                                <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm">
                                    {d.category}
                                </div>
                                {/* Ensure absolute path with leading slash */}
                                <img 
                                    src={`/materials/all_diagrams/${d.filename}`} 
                                    alt={d.title}
                                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity"
                                    onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                                />
                            </div>
                            <div className="p-4 bg-white dark:bg-[#252727] flex-grow">
                                <h4 className="font-medium text-gray-900 dark:text-white">{d.title}</h4>
                                <p className="text-xs text-gray-500 mt-1">Related to: {d.relatedLecture}</p>
                            </div>
                        </Card>
                    ))}
                </div>
             </div>
        );
      case 'documents':
        // ... (No changes needed for docs logic, already handles MD correctly)
        const filteredDocs = RESOURCES_DOCS.filter(doc => {
            const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase());
            const matchesFilter = docFilter === 'All' || doc.category === docFilter;
            return matchesSearch && matchesFilter;
        });

        if (filteredDocs.length === 0) return <NoResults />;

        return (
            <Card className="overflow-hidden">
                <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex gap-4 overflow-x-auto">
                    {(['All', 'Lectures', 'Practice', 'Assignments', 'Resources'] as const).map(f => (
                        <button 
                            key={f}
                            onClick={() => setDocFilter(f)}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${docFilter === f ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600 dark:text-gray-400">
                        <thead className="bg-gray-50 dark:bg-gray-800 text-xs uppercase font-semibold text-gray-500">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4 hidden sm:table-cell">Type</th>
                                <th className="px-6 py-4 hidden md:table-cell">Size</th>
                                <th className="px-6 py-4 hidden lg:table-cell">Downloads</th>
                                <th className="px-6 py-4 hidden xl:table-cell">Updated</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {filteredDocs.map((doc) => (
                                <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 group-hover:bg-white group-hover:text-primary transition-colors">
                                            {doc.type === 'PDF' ? <FileText size={16}/> : doc.type === 'ZIP' ? <File size={16}/> : <FileCode size={16}/>}
                                        </div>
                                        <div>
                                            <div className="truncate max-w-[200px] sm:max-w-xs">{doc.name}</div>
                                            <div className="sm:hidden text-xs text-gray-400">{doc.category} • {doc.size}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 hidden sm:table-cell">
                                        <Badge text={doc.category} type="tag" />
                                    </td>
                                    <td className="px-6 py-4 hidden md:table-cell font-mono text-xs">{doc.size}</td>
                                    <td className="px-6 py-4 hidden lg:table-cell text-xs">{doc.downloads}</td>
                                    <td className="px-6 py-4 hidden xl:table-cell text-xs">{doc.lastUpdated}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button 
                                                className="text-gray-400 hover:text-primary transition-colors p-1" 
                                                title="View"
                                                onClick={() => handleViewDoc(doc)}
                                            >
                                                <Eye size={18}/>
                                            </button>
                                            <button className="text-primary hover:text-primary/80 bg-primary/10 p-2 rounded-lg transition-colors" title="Download">
                                                <Download size={18}/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        );
      case 'snippets':
          const langs = ['JavaScript', 'SQL', 'Python'] as const;
          const filteredSnippets = CODE_SNIPPETS.filter(s => 
            s.language === snippetLang && 
            (s.title.toLowerCase().includes(search.toLowerCase()) || 
             s.description.toLowerCase().includes(search.toLowerCase()) ||
             s.code.toLowerCase().includes(search.toLowerCase()))
          );
          
          return (
              <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-64 flex-shrink-0 space-y-2">
                      {langs.map(l => (
                          <button
                            key={l}
                            onClick={() => setSnippetLang(l)}
                            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex justify-between items-center ${snippetLang === l ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white dark:bg-[#1F2121] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                          >
                              {l}
                              <Badge text={CODE_SNIPPETS.filter(s => s.language === l).length.toString()} type={snippetLang === l ? 'tag' : 'tag'} />
                          </button>
                      ))}
                  </div>
                  <div className="flex-1 space-y-4">
                      {filteredSnippets.length > 0 ? filteredSnippets.map(snippet => (
                          <Card key={snippet.id} className="overflow-hidden border border-gray-200 dark:border-gray-800">
                              <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                                  <div>
                                      <h4 className="font-bold text-gray-900 dark:text-white">{snippet.title}</h4>
                                      <p className="text-xs text-gray-500">{snippet.description}</p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                      <Badge text={snippet.complexity} type="tag" />
                                      <button 
                                          onClick={() => handleCopy(snippet.id, snippet.code)}
                                          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-500 flex items-center gap-1"
                                      >
                                          {copiedId === snippet.id ? <Check size={16} className="text-green-500"/> : <Copy size={16} />}
                                      </button>
                                  </div>
                              </div>
                              <div className="p-4 bg-[#1e1e1e] overflow-x-auto">
                                  <pre className="font-mono text-sm text-gray-300">
                                      {snippet.code}
                                  </pre>
                              </div>
                              <div className="p-2 bg-gray-50 dark:bg-[#252727] border-t border-gray-200 dark:border-gray-800 flex justify-end gap-2">
                                  <button 
                                    className="text-xs text-primary font-medium hover:underline flex items-center gap-1"
                                    onClick={() => onViewFile && onViewFile({ name: snippet.title, type: 'code', content: snippet.code, language: snippet.language })}
                                  >
                                    <Eye size={12}/> View Full
                                  </button>
                                  <button className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
                                    <Download size={12}/> Download .{snippet.language === 'Python' ? 'py' : snippet.language === 'JavaScript' ? 'js' : 'sql'}
                                  </button>
                              </div>
                          </Card>
                      )) : <NoResults />}
                  </div>
              </div>
          );
      default: return null;
    }
  }

  return (
    <>
      {selectedWorkflow && (
        <WorkflowBuilder 
          workflow={selectedWorkflow} 
          onClose={() => setSelectedWorkflow(null)} 
        />
      )}

      <div className="space-y-6 animate-fade-in pb-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-[#1F2121] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <div>
               <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Resource Library</h2>
               <p className="text-gray-500 dark:text-gray-400 mt-1">Access all course materials, diagrams, and code</p>
          </div>
          <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                  type="text" 
                  placeholder="Search resources..." 
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:outline-none dark:text-white transition-all"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
              />
          </div>
        </div>

        <div className="border-b border-gray-200 dark:border-gray-800">
          <div className="flex gap-8 overflow-x-auto scrollbar-hide px-2">
              {tabs.map((tab) => (
                  <button
                      key={tab.id}
                      onClick={() => { setActiveTab(tab.id); setSearch(''); }}
                      className={`flex items-center gap-2 pb-4 text-sm font-medium transition-colors relative whitespace-nowrap ${
                          activeTab === tab.id 
                          ? 'text-primary' 
                          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                      }`}
                  >
                      <tab.icon size={18} />
                      {tab.label}
                      {activeTab === tab.id && (
                          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full shadow-[0_-2px_6px_rgba(50,184,198,0.5)]" />
                      )}
                  </button>
              ))}
          </div>
        </div>

        <div className="min-h-[400px]">
          {renderContent()}
        </div>
      </div>
    </>
  );
};
