
import React, { useState, useEffect, useRef } from 'react';
import { Workflow, WorkflowNode, WorkflowEdge } from '../types';
import { X, Play, Zap, Activity, Box, Filter, BarChart2, Globe, Database, GitBranch, Loader2, Terminal, MousePointer2, CheckCircle, Split, ArrowRightLeft, AlertCircle, ZoomIn, ZoomOut, Maximize, Settings, Code, FileJson, Move } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from './ui';

interface WorkflowBuilderProps {
  workflow: Workflow;
  onClose: () => void;
}

// Dimensions
const NODE_WIDTH = 240;
const NODE_HEIGHT = 100;
const POSITION_SCALE = 1.5; 
const GRID_SIZE = 24;

// Extend internal node type
interface BuilderNode extends WorkflowNode {
    outputData?: any;
}

export const WorkflowBuilder: React.FC<WorkflowBuilderProps> = ({ workflow, onClose }) => {
  const [nodes, setNodes] = useState<BuilderNode[]>([]);
  const [edges, setEdges] = useState<WorkflowEdge[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [executionLog, setExecutionLog] = useState<string[]>([]);
  
  // Viewport State
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  
  // Selection & Dragging
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isDraggingNode, setIsDraggingNode] = useState(false);
  const [justDropped, setJustDropped] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'console' | 'config'>('console');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ 
      startX: number; 
      startY: number; 
      type: 'node' | 'pan';
      id?: string;
      initialX: number;
      initialY: number;
  } | null>(null);

  // Initialization
  useEffect(() => {
    if (workflow.n8nCode) {
        try {
            const n8n = JSON.parse(workflow.n8nCode);
            const parsedNodes: BuilderNode[] = n8n.nodes.map((n: any) => ({
                id: n.name,
                label: n.name,
                type: mapN8nType(n.type),
                position: { 
                    x: (n.position[0] * POSITION_SCALE),
                    y: (n.position[1] * POSITION_SCALE)
                },
                status: 'idle',
                data: n.parameters,
                outputData: null
            }));

            const parsedEdges: WorkflowEdge[] = [];
            if (n8n.connections) {
                Object.keys(n8n.connections).forEach(sourceName => {
                    const outputs = n8n.connections[sourceName];
                    if (outputs.main) {
                        outputs.main.forEach((connections: any[], mainIndex: number) => {
                             connections.forEach(conn => {
                                parsedEdges.push({
                                    id: `${sourceName}-${conn.node}-${mainIndex}`,
                                    source: sourceName,
                                    target: conn.node,
                                    label: outputs.main.length > 1 ? (mainIndex === 0 ? 'True/1' : 'False/2') : undefined
                                });
                            });
                        });
                    }
                });
            }
            setNodes(parsedNodes);
            setEdges(parsedEdges);
            
            // Auto-center after parsing
            setTimeout(() => fitView(parsedNodes), 100);
        } catch (e) {
            console.error("Failed to parse n8n code", e);
            fallbackToStructure();
        }
    } else {
        fallbackToStructure();
    }
  }, [workflow]);

  const fallbackToStructure = () => {
       if (workflow.structure) {
           const initialNodes = workflow.structure.nodes.map(n => ({...n, status: 'idle', outputData: null} as BuilderNode));
           setNodes(initialNodes);
           setEdges(workflow.structure.edges);
           setTimeout(() => fitView(initialNodes), 100);
       }
  };

  const fitView = (currentNodes: BuilderNode[] = nodes) => {
      if (currentNodes.length === 0 || !containerRef.current) return;
      
      const xs = currentNodes.map(n => n.position.x);
      const ys = currentNodes.map(n => n.position.y);
      const minX = Math.min(...xs);
      const maxX = Math.max(...xs);
      const minY = Math.min(...ys);
      const maxY = Math.max(...ys);

      const graphWidth = maxX - minX + NODE_WIDTH;
      const graphHeight = maxY - minY + NODE_HEIGHT;
      
      const { clientWidth, clientHeight } = containerRef.current;
      
      const padding = 100;
      const availableWidth = clientWidth - padding * 2;
      const availableHeight = clientHeight - padding * 2;
      
      const newScale = Math.min(
          Math.min(availableWidth / graphWidth, availableHeight / graphHeight), 
          1
      ); // Don't zoom in too much by default

      // Center
      const targetX = (clientWidth - graphWidth * newScale) / 2 - minX * newScale;
      const targetY = (clientHeight - graphHeight * newScale) / 2 - minY * newScale;

      setPan({ x: targetX, y: targetY });
      setScale(newScale);
  };

  const mapN8nType = (n8nType: string): WorkflowNode['type'] => {
      const t = n8nType.toLowerCase();
      if (t.includes('trigger')) return 'trigger';
      if (t.includes('if') || t.includes('switch') || t.includes('filter') || t.includes('sort') || t.includes('merge') || t.includes('split')) return 'logic';
      if (t.includes('httprequest') || t.includes('code') || t.includes('openai')) return 'action';
      if (t.includes('set') || t.includes('limit')) return 'end';
      if (t.includes('chart')) return 'chart';
      return 'action';
  };

  const generateMockOutput = (node: BuilderNode) => {
      if (node.type === 'trigger') return { timestamp: new Date().toISOString(), trigger: "manual", event_id: "evt_" + Math.floor(Math.random() * 10000) };
      if (node.type === 'action') {
          if (node.label.toLowerCase().includes('http')) return { status: 200, data: { id: Math.floor(Math.random() * 100), title: "Mock Response", items: [1,2,3] } };
          if (node.label.toLowerCase().includes('chat')) return { response: "This is a simulated AI response generated by the workflow engine.", tokens: 42, model: "gpt-4" };
      }
      if (node.type === 'logic') return { result: Math.random() > 0.5, condition: "passed", matched: true };
      if (node.type === 'end') return { processed: true, count: Math.floor(Math.random() * 10) + 1, final_status: "success" };
      return { success: true, data: "Passed" };
  };

  const runSimulation = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveTab('console');
    setExecutionLog([]);
    
    setNodes(prev => prev.map(n => ({ ...n, status: 'idle', outputData: null })));

    const startNodes = nodes.filter(n => !edges.some(e => e.target === n.id));
    const queue = startNodes.length > 0 ? [...startNodes] : [nodes[0]];
    const processed = new Set<string>();

    setExecutionLog(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting workflow execution...`]);

    while (queue.length > 0) {
        const currentNode = queue.shift();
        if (!currentNode || processed.has(currentNode.id)) continue;

        processed.add(currentNode.id);
        // Auto-select currently running node to show progress
        setSelectedNodeId(currentNode.id);

        setNodes(prev => prev.map(n => n.id === currentNode.id ? { ...n, status: 'running' } : n));
        setExecutionLog(prev => [...prev, `[${new Date().toLocaleTimeString()}] Executing node: ${currentNode.label}`]);

        await new Promise(resolve => setTimeout(resolve, 800)); 

        const mockOutput = generateMockOutput(currentNode);

        setNodes(prev => prev.map(n => n.id === currentNode.id ? { ...n, status: 'completed', outputData: mockOutput } : n));

        const nextEdges = edges.filter(e => e.source === currentNode.id);
        nextEdges.forEach(edge => {
            const targetNode = nodes.find(n => n.id === edge.target);
            if (targetNode) queue.push(targetNode);
        });
    }

    setIsRunning(false);
    setExecutionLog(prev => [...prev, `[${new Date().toLocaleTimeString()}] Workflow execution finished.`]);
  };

  // --- Interactions ---

  const handleMouseDown = (e: React.MouseEvent) => {
      if (e.button === 0) {
          setIsPanning(true);
          // Deselect if clicking background
          if (e.target === containerRef.current || (e.target as HTMLElement).classList.contains('canvas-bg')) {
              setSelectedNodeId(null);
          }
          dragRef.current = {
              startX: e.clientX,
              startY: e.clientY,
              type: 'pan',
              initialX: pan.x,
              initialY: pan.y
          };
      }
  };

  const handleNodeMouseDown = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation(); // Prevent canvas pan
    setSelectedNodeId(nodeId);
    setActiveTab('config');
    setIsDraggingNode(true);
    
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
        dragRef.current = {
            startX: e.clientX,
            startY: e.clientY,
            type: 'node',
            id: nodeId,
            initialX: node.position.x,
            initialY: node.position.y
        };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragRef.current) return;

    if (dragRef.current.type === 'node' && isDraggingNode) {
        const { startX, startY, initialX, initialY, id } = dragRef.current;
        // Calculate delta in graph coordinates (divide by scale)
        const dx = (e.clientX - startX) / scale;
        const dy = (e.clientY - startY) / scale;

        const rawX = initialX + dx;
        const rawY = initialY + dy;

        // Snap to Grid
        const snappedX = Math.round(rawX / GRID_SIZE) * GRID_SIZE;
        const snappedY = Math.round(rawY / GRID_SIZE) * GRID_SIZE;

        setNodes(prev => prev.map(n => n.id === id ? { ...n, position: { x: snappedX, y: snappedY } } : n));
    } else if (dragRef.current.type === 'pan' && isPanning) {
        const dx = e.clientX - dragRef.current.startX;
        const dy = e.clientY - dragRef.current.startY;
        setPan({
            x: dragRef.current.initialX + dx,
            y: dragRef.current.initialY + dy
        });
    }
  };

  const handleMouseUp = () => {
    if (isDraggingNode && dragRef.current?.type === 'node') {
        setJustDropped(dragRef.current.id || null);
        setTimeout(() => setJustDropped(null), 500);
    }
    setIsDraggingNode(false);
    setIsPanning(false);
    dragRef.current = null;
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const zoomSensitivity = 0.001;
        const delta = -e.deltaY * zoomSensitivity;
        const newScale = Math.min(Math.max(scale + delta, 0.1), 5);
        
        // Zoom center logic could be improved here, for now simple center zoom
        setScale(newScale);
    }
  };

  // --- Helpers ---

  const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 3));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.2));
  const resetView = () => fitView();

  const getNodeIcon = (type: string) => {
      switch (type) {
          case 'trigger': return <Zap size={18} />;
          case 'action': return <Activity size={18} />;
          case 'logic': return <Filter size={18} />;
          case 'chart': return <BarChart2 size={18} />;
          case 'webhook': return <Globe size={18} />;
          case 'end': return <Database size={18} />;
          default: return <Box size={18} />;
      }
  };

  const getNodeColor = (type: string) => {
      switch (type) {
          case 'trigger': return 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400';
          case 'action': return 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
          case 'logic': return 'border-orange-500 bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400';
          case 'chart': return 'border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400';
          case 'end': return 'border-gray-500 bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
          default: return 'border-gray-500 bg-gray-50 text-gray-700';
      }
  };

  const renderEdges = () => {
    return edges.map((edge) => {
      const sourceNode = nodes.find(n => n.id === edge.source);
      const targetNode = nodes.find(n => n.id === edge.target);
      
      if (!sourceNode || !targetNode) return null;

      const sx = sourceNode.position.x + NODE_WIDTH;
      const sy = sourceNode.position.y + NODE_HEIGHT / 2;
      const tx = targetNode.position.x;
      const ty = targetNode.position.y + NODE_HEIGHT / 2;

      const dist = Math.abs(tx - sx) / 2;
      const cx1 = sx + dist;
      const cy1 = sy;
      const cx2 = tx - dist;
      const cy2 = ty;

      const path = `M ${sx} ${sy} C ${cx1} ${cy1} ${cx2} ${cy2} ${tx} ${ty}`;
      
      const isFlowing = isRunning && sourceNode.status === 'completed' && (targetNode.status === 'running' || targetNode.status === 'idle');
      const isDone = sourceNode.status === 'completed' && targetNode.status === 'completed';

      return (
        <g key={edge.id}>
          <path d={path} stroke="#e5e7eb" strokeWidth="4" fill="none" className="dark:stroke-gray-800" />
          <path 
            d={path} 
            stroke={isDone ? "#22C55E" : "#9CA3AF"} 
            strokeWidth="2" 
            fill="none" 
            className="transition-colors duration-500"
          />
          {isFlowing && (
             <circle r="4" fill="#32B8C6">
                <animateMotion dur="1s" repeatCount="indefinite" path={path} />
             </circle>
          )}
          {edge.label && (
            <foreignObject x={(sx + tx) / 2 - 40} y={(sy + ty) / 2 - 12} width="80" height="24">
              <div className="flex items-center justify-center w-full h-full">
                  <span className="text-[10px] font-bold bg-white dark:bg-[#1F2121] px-2 py-0.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 shadow-sm whitespace-nowrap">
                    {edge.label}
                  </span>
              </div>
            </foreignObject>
          )}
        </g>
      );
    });
  };

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  return (
    <div className="fixed inset-0 z-50 bg-gray-100 dark:bg-[#000] flex flex-col animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1F2121] px-6 flex items-center justify-between shadow-sm z-20 relative">
         <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-primary to-blue-600 p-2 rounded-lg text-white shadow-lg shadow-primary/20">
                <GitBranch size={20} />
            </div>
            <div>
                <h2 className="font-bold text-gray-900 dark:text-white text-lg">{workflow.title}</h2>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><GitBranch size={12}/> {nodes.length} Nodes</span>
                    <span>•</span>
                    <span className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-gray-600 dark:text-gray-400">{workflow.category}</span>
                </div>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 mr-4">
                <div className="flex items-center gap-1 text-xs text-gray-500"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Trigger</div>
                <div className="flex items-center gap-1 text-xs text-gray-500"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Action</div>
                <div className="flex items-center gap-1 text-xs text-gray-500"><div className="w-2 h-2 rounded-full bg-orange-500"></div> Logic</div>
            </div>
            
            <Button 
                onClick={runSimulation}
                disabled={isRunning}
                className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all ${isRunning ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed border border-gray-200 dark:border-gray-700' : 'bg-green-600 text-white hover:bg-green-500 shadow-lg shadow-green-500/20 hover:scale-105'}`}
            >
                {isRunning ? <Loader2 className="animate-spin" size={18}/> : <Play size={18} fill="currentColor" />}
                {isRunning ? 'Running...' : 'Execute Workflow'}
            </Button>
            
            <div className="h-8 w-px bg-gray-200 dark:bg-gray-700"></div>
            
            <button onClick={onClose} className="p-2 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 rounded-full text-gray-500 transition-colors">
                <X size={24} />
            </button>
         </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex relative overflow-hidden">
         
         {/* Canvas Area */}
         <div 
            ref={containerRef}
            className="flex-1 relative bg-[#F8FAFC] dark:bg-[#0B0C0C] overflow-hidden cursor-grab active:cursor-grabbing canvas-bg" 
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
         >
             {/* Grid Background (Fixed to pan) */}
             <div 
                className="absolute inset-0 pointer-events-none dark:opacity-20 opacity-100" 
                style={{
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
                    transformOrigin: '0 0',
                    backgroundImage: `radial-gradient(#CBD5E1 1px, transparent 1px)`, 
                    backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`
                }}
             />

            {/* UI Controls */}
            <div className="absolute bottom-6 left-6 flex flex-col gap-2 z-30 bg-white dark:bg-[#1F2121] rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 p-1">
                <button onClick={zoomIn} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-600 dark:text-gray-300" title="Zoom In"><ZoomIn size={18}/></button>
                <button onClick={resetView} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-600 dark:text-gray-300" title="Fit View"><Maximize size={18}/></button>
                <button onClick={zoomOut} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-600 dark:text-gray-300" title="Zoom Out"><ZoomOut size={18}/></button>
            </div>

            {/* Content Layer */}
            <div 
                className="absolute top-0 left-0 w-full h-full transition-transform duration-75 ease-out origin-top-left"
                style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})` }}
            >
                <svg className="absolute overflow-visible top-0 left-0 w-full h-full pointer-events-none z-0">
                    {renderEdges()}
                </svg>

                {nodes.map(node => (
                    <div 
                        key={node.id}
                        onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                        style={{ left: node.position.x, top: node.position.y, width: NODE_WIDTH }}
                        className={`absolute z-10 transition-shadow duration-200`}
                    >
                        <div className={`
                            bg-white dark:bg-[#1F2121] rounded-xl shadow-md border-2 hover:shadow-xl group
                            flex flex-col relative overflow-hidden
                            ${node.status === 'running' ? 'ring-4 ring-primary/30 border-primary' : ''}
                            ${node.status === 'completed' ? 'border-green-500' : ''}
                            ${node.status === 'error' ? 'border-red-500' : ''}
                            ${selectedNodeId === node.id ? 'border-primary shadow-lg shadow-primary/10 ring-2 ring-primary/20 z-30' : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'}
                            ${justDropped === node.id ? 'scale-105 duration-100' : ''}
                        `}>
                            
                            {/* Header Bar */}
                            <div className={`h-1.5 w-full ${getNodeColor(node.type).split(' ')[0].replace('border-', 'bg-')}`}></div>

                            {/* Node Body */}
                            <div className="p-3">
                                <div className="flex items-center justify-between mb-2">
                                    <div className={`p-1.5 rounded-lg ${getNodeColor(node.type)}`}>
                                        {getNodeIcon(node.type)}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {node.status === 'completed' && <CheckCircle size={14} className="text-green-500 animate-in zoom-in" />}
                                        {node.status === 'running' && <Loader2 size={14} className="text-primary animate-spin" />}
                                        {node.status === 'error' && <AlertCircle size={14} className="text-red-500 animate-in zoom-in" />}
                                    </div>
                                </div>

                                <div className="mb-1">
                                    <h4 className="font-bold text-xs text-gray-900 dark:text-white truncate leading-tight" title={node.label}>{node.label}</h4>
                                    <p className="text-[10px] text-gray-500 mt-0.5">{node.type} node</p>
                                </div>
                            </div>
                            
                            {/* Output Preview Footer */}
                            {node.outputData && node.status === 'completed' && (
                                <div className="border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-black/30 p-2">
                                    <div className="flex items-center gap-1 text-[9px] text-gray-400 font-bold uppercase mb-1">
                                        <FileJson size={10}/> Output
                                    </div>
                                    <pre className="text-[10px] font-mono text-gray-600 dark:text-gray-300 overflow-hidden text-ellipsis leading-tight max-h-12 opacity-80">
                                        {JSON.stringify(node.outputData, null, 2).split('\n').slice(1, 4).join('\n')}
                                        {JSON.stringify(node.outputData).length > 50 ? '...' : ''}
                                    </pre>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
         </div>

         {/* Right Sidebar: Config & Log */}
         <div className="w-80 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1F2121] flex flex-col shadow-xl z-20">
            <div className="flex border-b border-gray-200 dark:border-gray-800">
                <button 
                    onClick={() => setActiveTab('console')}
                    className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${activeTab === 'console' ? 'border-b-2 border-primary text-primary bg-primary/5' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                    <Terminal size={14} /> Console
                </button>
                <button 
                    onClick={() => setActiveTab('config')}
                    className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${activeTab === 'config' ? 'border-b-2 border-primary text-primary bg-primary/5' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                    <Settings size={14} /> Config
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto bg-[#111] custom-scrollbar">
                {activeTab === 'console' ? (
                    <div className="p-4 font-mono text-xs space-y-3 text-gray-300">
                        {executionLog.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-40 text-gray-600 gap-2">
                                <MousePointer2 size={24} className="opacity-20" />
                                <span className="italic">Ready to execute...</span>
                            </div>
                        ) : (
                            executionLog.map((log, i) => (
                                <div key={i} className="flex gap-2 animate-fade-in border-b border-gray-800 pb-2 last:border-0">
                                    <span className="text-green-500 flex-shrink-0">➜</span>
                                    <span className="break-words">{log}</span>
                                </div>
                            ))
                        )}
                        {isRunning && (
                            <div className="flex gap-2 items-center text-primary animate-pulse">
                                <span className="w-2 h-4 bg-primary block"></span>
                                Processing...
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="p-4">
                        {selectedNode ? (
                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center gap-2 text-white font-bold mb-1">
                                        <div className={`w-3 h-3 rounded-full ${getNodeColor(selectedNode.type).split(' ')[1]}`}></div>
                                        {selectedNode.label}
                                    </div>
                                    <span className="text-xs text-gray-500 font-mono">{selectedNode.id}</span>
                                </div>

                                <div>
                                    <h5 className="text-xs font-bold text-gray-500 uppercase mb-2">Parameters</h5>
                                    <div className="bg-[#1a1a1a] rounded-lg p-3 border border-gray-800">
                                        <pre className="font-mono text-xs text-green-400 whitespace-pre-wrap break-words">
                                            {JSON.stringify(selectedNode.data || {}, null, 2)}
                                        </pre>
                                    </div>
                                </div>

                                <div>
                                    <h5 className="text-xs font-bold text-gray-500 uppercase mb-2">Output Data</h5>
                                    {selectedNode.outputData ? (
                                        <div className="bg-[#1a1a1a] rounded-lg p-3 border border-gray-800">
                                            <pre className="font-mono text-xs text-blue-400 whitespace-pre-wrap break-words">
                                                {JSON.stringify(selectedNode.outputData, null, 2)}
                                            </pre>
                                        </div>
                                    ) : (
                                        <p className="text-xs text-gray-600 italic">Run workflow to see output.</p>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-64 text-gray-600 gap-3">
                                <Box size={32} className="opacity-20" />
                                <p className="text-center text-sm px-8">Select a node on the canvas to view its configuration.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Status</span>
                    <span className={`font-bold px-2 py-0.5 rounded-full ${isRunning ? 'bg-primary/20 text-primary' : 'bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}>
                        {isRunning ? 'RUNNING' : 'IDLE'}
                    </span>
                </div>
            </div>
         </div>

      </div>
    </div>
  );
};
