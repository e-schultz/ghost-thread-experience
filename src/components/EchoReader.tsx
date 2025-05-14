
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, FileText, ArrowRight } from 'lucide-react';
import { LogEntry } from '../types';

interface EchoReaderProps {
  logs: LogEntry[];
  onViewOriginal: (id: string) => void;
  onViewBridge: (id: string) => void;
}

const EchoReader: React.FC<EchoReaderProps> = ({ logs, onViewOriginal, onViewBridge }) => {
  const [expandedLogs, setExpandedLogs] = useState<Record<string, boolean>>({});
  
  const toggleExpand = (id: string) => {
    setExpandedLogs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const isBridgeLog = (log: LogEntry) => !!log.bridgeData;
  
  return (
    <div className="terminal-content overflow-y-auto max-h-[calc(100vh-240px)]">
      <div className="text-lg mb-4 border-b border-terminal-pink pb-2">
        ECHO READER | <span className="text-terminal-darkpink">session: ghost-trace.init</span>
      </div>
      
      <div className="space-y-4">
        {logs.map(log => (
          <div 
            key={log.id}
            className={`border p-2 hover:bg-black/30 transition-colors duration-200 ${
              isBridgeLog(log) ? 'border-green-500' : 'border-terminal-pink'
            }`}
          >
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => toggleExpand(log.id)}
            >
              {expandedLogs[log.id] ? (
                <ChevronDown className={`w-4 h-4 mr-2 ${isBridgeLog(log) ? 'text-green-500' : 'text-terminal-pink'}`} />
              ) : (
                <ChevronRight className={`w-4 h-4 mr-2 ${isBridgeLog(log) ? 'text-green-500' : 'text-terminal-pink'}`} />
              )}
              <div className={`font-bold ${isBridgeLog(log) ? 'text-green-400' : ''}`}>
                {isBridgeLog(log) ? '🔄 ' : ''}[ID:{log.id}] {log.title}
              </div>
            </div>
            
            {expandedLogs[log.id] && (
              <div className={`mt-2 ml-6 p-2 bg-black/20 border-l ${
                isBridgeLog(log) ? 'border-green-500' : 'border-terminal-pink'
              }`}>
                <div className="mb-2 text-xs text-terminal-darkpink">
                  {log.date} {!isBridgeLog(log) && `| OCR confidence: ${log.ocrConfidence}%`}
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
                
                {log.bridgeData && (
                  <div className="mb-2">
                    <div className="text-xs text-green-400 mb-1">Active threads:</div>
                    <div className="text-xs pl-2">
                      {log.bridgeData.metadata.active_threads.split(',').map((thread, i) => (
                        <div key={i} className="flex items-center">
                          <ArrowRight className="w-3 h-3 mr-1 text-green-400" />
                          <span>{thread.trim()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end mt-2">
                  {isBridgeLog(log) ? (
                    <button 
                      className="terminal-button text-xs flex items-center bg-green-900/30 border border-green-500 hover:bg-green-900/50"
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewBridge(log.id);
                      }}
                    >
                      <FileText className="w-3 h-3 mr-1" />
                      View Bridge
                    </button>
                  ) : (
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
                  )}
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
