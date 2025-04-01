
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, FileText } from 'lucide-react';
import { LogEntry } from '../types';

interface EchoReaderProps {
  logs: LogEntry[];
  onViewOriginal: (id: string) => void;
}

const EchoReader: React.FC<EchoReaderProps> = ({ logs, onViewOriginal }) => {
  const [expandedLogs, setExpandedLogs] = useState<Record<string, boolean>>({});
  
  const toggleExpand = (id: string) => {
    setExpandedLogs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  return (
    <div className="terminal-content overflow-y-auto max-h-[calc(100vh-240px)]">
      <div className="text-lg mb-4 border-b border-terminal-pink pb-2">
        ECHO READER | <span className="text-terminal-darkpink">session: ghost-trace.init</span>
      </div>
      
      <div className="space-y-4">
        {logs.map(log => (
          <div 
            key={log.id}
            className="border border-terminal-pink p-2 hover:bg-black/30 transition-colors duration-200"
          >
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => toggleExpand(log.id)}
            >
              {expandedLogs[log.id] ? (
                <ChevronDown className="w-4 h-4 text-terminal-pink mr-2" />
              ) : (
                <ChevronRight className="w-4 h-4 text-terminal-pink mr-2" />
              )}
              <div className="font-bold">[ID:{log.id}] {log.title}</div>
            </div>
            
            {expandedLogs[log.id] && (
              <div className="mt-2 ml-6 p-2 bg-black/20 border-l border-terminal-pink">
                <div className="mb-2 text-xs text-terminal-darkpink">
                  {log.date} | OCR confidence: {log.ocrConfidence}%
                </div>
                <div className="whitespace-pre-wrap mb-4">{log.content}</div>
                
                {log.tasks && log.tasks.length > 0 && (
                  <div className="mb-2">
                    {log.tasks.map((task, index) => (
                      <div key={index} className="flex items-center">
                        <input 
                          type="checkbox" 
                          checked={task.completed}
                          onChange={() => {}} 
                          className="mr-2 cursor-pointer accent-terminal-pink"
                        />
                        <span className={task.completed ? "line-through text-terminal-darkpink" : ""}>
                          {task.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex justify-end mt-2">
                  <button 
                    className="terminal-button text-xs flex items-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewOriginal(log.id);
                    }}
                  >
                    <FileText className="w-3 h-3 mr-1" />
                    View Original
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EchoReader;
