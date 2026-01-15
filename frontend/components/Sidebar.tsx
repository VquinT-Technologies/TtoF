'use client';

import { useState } from 'react';
import { GitBranch, Network, Brain, Database, Boxes, GitCommitHorizontal } from 'lucide-react';

interface DiagramType {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const diagramTypes: DiagramType[] = [
  { id: 'flowchart', name: 'Flowchart', icon: <GitBranch className="w-5 h-5" /> },
  { id: 'sequence', name: 'Sequence', icon: <Network className="w-5 h-5" /> },
  { id: 'mindmap', name: 'Mindmap', icon: <Brain className="w-5 h-5" /> },
  { id: 'entity-relationship', name: 'ER Diagram', icon: <Database className="w-5 h-5" /> },
  { id: 'class', name: 'Class Diagram', icon: <Boxes className="w-5 h-5" /> },
  { id: 'state', name: 'State Diagram', icon: <GitCommitHorizontal className="w-5 h-5" /> },
];

interface SidebarProps {
  selectedType?: string;
  onTypeChange?: (type: string) => void;
}

export default function Sidebar({ selectedType, onTypeChange }: SidebarProps) {
  const [activeType, setActiveType] = useState(selectedType || 'flowchart');

  const handleTypeClick = (typeId: string) => {
    setActiveType(typeId);
    onTypeChange?.(typeId);
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="p-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Diagram Types
        </h3>
        <div className="space-y-2">
          {diagramTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleTypeClick(type.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                activeType === type.id
                  ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {type.icon}
              <span className="font-medium">{type.name}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
