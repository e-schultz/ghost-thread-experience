
import React, { useState } from 'react';
import { X, ChevronRight, ChevronDown } from 'lucide-react';
import { logData } from '../data/logData';

interface BridgeViewerProps {
  logId: string;
  onClose: () => void;
}

const BridgeViewer: React.FC<BridgeViewerProps> = ({ logId, onClose }) => {
  const [expandedThreads, setExpandedThreads] = useState<Record<string, boolean>>({});
  const [expandedSections, setExpandedSections] = useState({
    metadata: true,
    context: true,
    threads: true,
    notable: true,
    summary: true,
  });
  
  const log = logData.find(l => l.id === logId);
  const bridgeData = log?.bridgeData;
  
  if (!log || !bridgeData) {
    return null;
  }
  
  const toggleThread = (name: string) => {
    setExpandedThreads(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };
  
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-4xl h-full max-h-[90vh] bg-terminal-black border-2 border-green-500 overflow-hidden flex flex-col rounded">
        <div className="p-4 border-b border-green-500 flex justify-between items-center bg-black/40">
          <div className="text-lg font-bold text-green-400">
            Bridge: {bridgeData.bridge_id}
          </div>
          <button 
            onClick={onClose}
            className="text-green-400 hover:text-green-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {/* Metadata Section */}
          <div className="mb-6 border border-green-500/50 rounded p-2">
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => toggleSection('metadata')}
            >
              {expandedSections.metadata ? (
                <ChevronDown className="w-4 h-4 mr-2 text-green-400" />
              ) : (
                <ChevronRight className="w-4 h-4 mr-2 text-green-400" />
              )}
              <div className="text-green-400 font-semibold">Metadata</div>
            </div>
            
            {expandedSections.metadata && (
              <div className="mt-2 pl-6 text-sm grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <span className="text-green-300">Conversation ID:</span>{" "}
                  <span className="text-terminal-pink">{bridgeData.metadata.conversation_id}</span>
                </div>
                <div>
                  <span className="text-green-300">Mode:</span>{" "}
                  <span className="text-terminal-pink">{bridgeData.metadata.mode}</span>
                </div>
                <div>
                  <span className="text-green-300">Timestamp:</span>{" "}
                  <span className="text-terminal-pink">
                    {new Date(bridgeData.metadata.timestamp).toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-green-300">Context Markers:</span>{" "}
                  <span className="text-terminal-pink">{bridgeData.metadata.ctx_markers}</span>
                </div>
                <div className="col-span-1 md:col-span-2">
                  <span className="text-green-300">Active Threads:</span>{" "}
                  <span className="text-terminal-pink">{bridgeData.metadata.active_threads}</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Content Summary if available */}
          {bridgeData.content_summary && (
            <div className="mb-6 border border-green-500/50 rounded p-2">
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => toggleSection('summary')}
              >
                {expandedSections.summary ? (
                  <ChevronDown className="w-4 h-4 mr-2 text-green-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 mr-2 text-green-400" />
                )}
                <div className="text-green-400 font-semibold">Content Summary</div>
              </div>
              
              {expandedSections.summary && (
                <div className="mt-2 pl-6 text-sm text-terminal-pink">
                  {bridgeData.content_summary}
                </div>
              )}
            </div>
          )}
          
          {/* Only show these sections if section_data is available */}
          {bridgeData.section_data && (
            <>
              {/* Session Context */}
              <div className="mb-6 border border-green-500/50 rounded p-2">
                <div 
                  className="flex items-center cursor-pointer"
                  onClick={() => toggleSection('context')}
                >
                  {expandedSections.context ? (
                    <ChevronDown className="w-4 h-4 mr-2 text-green-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 mr-2 text-green-400" />
                  )}
                  <div className="text-green-400 font-semibold">Session Context</div>
                </div>
                
                {expandedSections.context && (
                  <div className="mt-2 pl-6">
                    <div className="text-sm">
                      <span className="text-green-300">Date:</span>{" "}
                      <span className="text-terminal-pink">{bridgeData.section_data.session_context.date}</span>
                    </div>
                    <div className="mt-2">
                      <div className="text-green-300 text-sm mb-1">Timestamp Markers:</div>
                      <ul className="list-disc pl-6 text-xs text-terminal-pink">
                        {bridgeData.section_data.session_context.timestamp_markers.map((marker, i) => (
                          <li key={i}>{marker}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Active Threads */}
              <div className="mb-6 border border-green-500/50 rounded p-2">
                <div 
                  className="flex items-center cursor-pointer"
                  onClick={() => toggleSection('threads')}
                >
                  {expandedSections.threads ? (
                    <ChevronDown className="w-4 h-4 mr-2 text-green-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 mr-2 text-green-400" />
                  )}
                  <div className="text-green-400 font-semibold">Active Threads</div>
                </div>
                
                {expandedSections.threads && (
                  <div className="mt-2 pl-6">
                    {bridgeData.section_data.active_threads.map((thread, i) => (
                      <div key={i} className="mb-4">
                        <div 
                          className="flex items-center cursor-pointer"
                          onClick={() => toggleThread(thread.name)}
                        >
                          {expandedThreads[thread.name] ? (
                            <ChevronDown className="w-3 h-3 mr-1 text-green-400" />
                          ) : (
                            <ChevronRight className="w-3 h-3 mr-1 text-green-400" />
                          )}
                          <div className="text-green-300">{thread.name}</div>
                        </div>
                        
                        {expandedThreads[thread.name] && (
                          <ul className="list-disc pl-8 mt-1 text-xs text-terminal-pink">
                            {thread.activities.map((activity, j) => (
                              <li key={j}>{activity}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Notable Context Elements */}
              <div className="mb-6 border border-green-500/50 rounded p-2">
                <div 
                  className="flex items-center cursor-pointer"
                  onClick={() => toggleSection('notable')}
                >
                  {expandedSections.notable ? (
                    <ChevronDown className="w-4 h-4 mr-2 text-green-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 mr-2 text-green-400" />
                  )}
                  <div className="text-green-400 font-semibold">Notable Context Elements</div>
                </div>
                
                {expandedSections.notable && (
                  <div className="mt-2 pl-6">
                    <div className="mb-3">
                      <div className="text-green-300 text-sm">System Mode:</div>
                      <div className="text-terminal-pink text-xs pl-2">
                        {bridgeData.section_data.notable_context_elements.system_mode}
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="text-green-300 text-sm">Key Metaphors:</div>
                      <ul className="list-disc pl-6 text-xs text-terminal-pink">
                        {bridgeData.section_data.notable_context_elements.key_metaphors.map((metaphor, i) => (
                          <li key={i}>{metaphor}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-3">
                      <div className="text-green-300 text-sm">Signal Phrases:</div>
                      <ul className="list-disc pl-6 text-xs text-terminal-pink">
                        {bridgeData.section_data.notable_context_elements.signal_phrases.map((phrase, i) => (
                          <li key={i}>{phrase}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-3">
                      <div className="text-green-300 text-sm">Open Traces:</div>
                      <ul className="list-disc pl-6 text-xs text-terminal-pink">
                        {bridgeData.section_data.notable_context_elements.open_traces.map((trace, i) => (
                          <li key={i}>{trace}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BridgeViewer;
