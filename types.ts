

export enum Difficulty {
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
  Expert = 'Expert'
}

export enum AssignmentType {
  Code = 'Code',
  Database = 'Database',
  Project = 'Project',
  Experiments = 'Experiments',
  Metrics = 'Metrics',
  Design = 'Design',
  Testing = 'Testing',
  Data = 'Data'
}

export interface Lecture {
  id: number;
  week: number;
  title: string;
  duration: string;
  level: Difficulty;
  topics: string[];
  description: string;
  outcomes: string[];
  resources: string[];
  notes?: string;
}

export interface Practice {
  id: number;
  week: number;
  title: string;
  duration: string;
  projectCount: number;
  workflowCount: number;
  description: string;
  outcomes: string[];
  projects: string[];
  completed: boolean;
  guide?: string;
}

export interface Assignment {
  id: number;
  title: string;
  type: AssignmentType;
  difficulty: Difficulty;
  hours: number;
  status: 'Not Started' | 'In Progress' | 'Completed';
  description: string;
  requirements: string[];
  files: string[];
}

export interface DemoData {
  id: number;
  title: string;
  concept: string;
  input: string;
  process: string;
  output: string;
  insight: string;
  rating: number;
  metrics?: { label: string; value: number; color: string; suffix?: string }[];
  steps?: { step: string; detail: string; status: 'active' | 'complete' }[];
  ranking?: { rank: number; text: string; score: number; relevance: 'High' | 'Medium' | 'Low' }[];
}

export interface AgentProfile {
  name: string;
  role: string;
  goal: string;
  tools: string[];
  codeSnippet: string;
}

export interface ResourceDoc {
  id: number;
  name: string;
  category: 'Lectures' | 'Practice' | 'Assignments' | 'Resources';
  size: string;
  type: 'PDF' | 'MD' | 'ZIP';
  downloads: string;
  lastUpdated: string;
}

export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'logic' | 'chart' | 'webhook' | 'end';
  label: string;
  position: { x: number; y: number };
  data?: any;
  status?: 'idle' | 'running' | 'completed' | 'error';
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
  label?: string;
}

export interface Workflow {
  id: number;
  title: string;
  description: string;
  nodes: number;
  complexity: 'Low' | 'Medium' | 'High';
  category: 'Basic' | 'RAG' | 'Agents' | 'Integration';
  n8nCode?: string;
  structure?: {
    nodes: WorkflowNode[];
    edges: WorkflowEdge[];
  };
}

export interface Diagram {
  id: number;
  title: string;
  category: 'Transformers' | 'RAG' | 'Agents' | 'Production' | 'Workflows' | 'Prompting' | 'n8n' | 'Database';
  relatedLecture: string;
  filename: string;
}

export interface CodeSnippet {
  id: number;
  title: string;
  language: 'JavaScript' | 'Python' | 'SQL';
  description: string;
  complexity: 'Low' | 'Medium' | 'High';
  code: string;
}