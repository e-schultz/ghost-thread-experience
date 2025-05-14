
import React from 'react';
import { X, FileText, Link, Activity, Archive, GitBranch, Clock, Tag } from 'lucide-react';
import { logData } from '../data/logData';

interface GhostMetadataPanelProps {
  onClose: () => void;
  selectedId: string | null;
}

const GhostMetadataPanel: React.FC<GhostMetadataPanelProps> = ({ onClose, selectedId }) => {
  const selectedLog = selectedId ? logData.find(log => log.id === selectedId) : null;
  const isBridge = selectedLog?.bridgeData !== undefined;
  
  return (
    <div className={`w-full md:w-64 border-l ${isBridge ? 'border-green-500' : 'border-terminal-pink'} p-4 bg-black/20`}>
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-bold">{isBridge ? 'Bridge Metadata' : 'Ghost Metadata'}</div>
        <button onClick={onClose} className={`${isBridge ? 'text-green-400 hover:text-green-300' : 'text-terminal-pink hover:text-terminal-darkpink'}`}>
          <X className="w-4 h-4" />
        </button>
      </div>
      
      {selectedLog && (
        <div className="space-y-4">
          <div>
            <div className={`${isBridge ? 'text-green-300' : 'text-terminal-darkpink'} text-xs`}>Log ID</div>
            <div className="font-bold">{selectedLog.id}</div>
          </div>
          
          {!isBridge && (
            <>
              <div>
                <div className="text-terminal-darkpink text-xs">OCR Confidence</div>
                <div className="flex items-center">
                  <div className="w-full bg-terminal-gray rounded-full h-2 mr-2">
                    <div 
                      className="bg-terminal-pink h-2 rounded-full" 
                      style={{ width: `${selectedLog.ocrConfidence}%` }}
                    ></div>
                  </div>
                  <span className="text-xs">{selectedLog.ocrConfidence}%</span>
                </div>
                <div className="text-xs mt-1">
                  {selectedLog.ocrConfidence > 90 ? "legible" : 
                  selectedLog.ocrConfidence > 70 ? "mostly legible" : "partially legible"}
                </div>
              </div>
              
              <div>
                <div className="text-terminal-darkpink text-xs">Status</div>
                <div className="flex items-center">
                  <Activity className="w-3 h-3 mr-1 text-green-500" />
                  <span>Live node in ghost-trace channel</span>
                </div>
              </div>
              
              <div>
                <div className="text-terminal-darkpink text-xs">Linked float UIDs</div>
                <div className="space-y-1 mt-1">
                  <div className="flex items-center text-xs">
                    <Link className="w-3 h-3 mr-1" />
                    <span>float://ghost/trace/01/init</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <Link className="w-3 h-3 mr-1" />
                    <span>float://analog/notebook/pink/01</span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="text-terminal-darkpink text-xs">Connected Zines</div>
                <div className="flex items-center mt-1">
                  <Archive className="w-3 h-3 mr-1" />
                  <span>you-are-the-thread-now</span>
                </div>
              </div>
            </>
          )}
          
          {isBridge && selectedLog.bridgeData && (
            <>
              <div>
                <div className="text-green-300 text-xs">Bridge ID</div>
                <div className="font-bold">{selectedLog.bridgeData.bridge_id}</div>
              </div>
              
              <div>
                <div className="text-green-300 text-xs">Mode</div>
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1 text-green-400" />
                  <span>{selectedLog.bridgeData.metadata.mode}</span>
                </div>
              </div>
              
              <div>
                <div className="text-green-300 text-xs">Context Markers</div>
                <div className="flex items-center mt-1 flex-wrap">
                  {selectedLog.bridgeData.metadata.ctx_markers.split(',').map((marker, i) => (
                    <span key={i} className="bg-green-900/30 text-green-300 text-xs px-1 py-0.5 rounded mr-1 mb-1 inline-flex items-center">
                      <Tag className="w-2 h-2 mr-1" />
                      {marker.trim()}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="text-green-300 text-xs">Active Threads</div>
                <div className="space-y-1 mt-1">
                  {selectedLog.bridgeData.metadata.active_threads.split(',').map((thread, i) => (
                    <div key={i} className="flex items-center text-xs">
                      <GitBranch className="w-3 h-3 mr-1 text-green-400" />
                      <span>{thread.trim()}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="text-green-300 text-xs">Date</div>
                <div className="flex items-center text-xs mt-1">
                  <Clock className="w-3 h-3 mr-1 text-green-400" />
                  <span>{new Date(selectedLog.bridgeData.metadata.timestamp).toLocaleString()}</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
      
      {!selectedLog && (
        <div className={`${isBridge ? 'text-green-300' : 'text-terminal-darkpink'}`}>
          No data selected. Click on a log ID or use floatctl parse-id command to select.
        </div>
      )}
    </div>
  );
};

export default GhostMetadataPanel;
