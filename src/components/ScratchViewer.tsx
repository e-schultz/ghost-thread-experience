
import React, { useState } from 'react';
import { X, Copy, FileText } from 'lucide-react';
import { logData } from '../data/logData';

interface ScratchViewerProps {
  logId: string;
  onClose: () => void;
}

const ScratchViewer: React.FC<ScratchViewerProps> = ({ logId, onClose }) => {
  const [sliderValue, setSliderValue] = useState<number>(50);
  const log = logData.find(log => log.id === logId);
  
  if (!log) {
    return null;
  }
  
  const handleCopy = () => {
    navigator.clipboard.writeText(log.content);
    // In a real app, you might want to show a toast notification here
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="w-full max-w-4xl h-[80vh] bg-terminal-black border border-terminal-pink p-4 rounded overflow-hidden">
        <div className="flex justify-between items-center mb-4 border-b border-terminal-pink pb-2">
          <div className="text-lg font-bold">
            Scratch Viewer | <span className="text-terminal-darkpink">ID:{log.id}</span>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={handleCopy} 
              className="text-terminal-pink hover:text-terminal-darkpink"
              title="Copy text"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button 
              onClick={onClose} 
              className="text-terminal-pink hover:text-terminal-darkpink"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="h-[calc(100%-80px)] flex flex-col md:flex-row gap-4">
          <div className="flex-1 border border-terminal-pink rounded overflow-hidden relative">
            <div className="absolute top-2 left-2 bg-black/70 text-xs py-1 px-2 rounded">
              Original Scratch
            </div>
            <img 
              src={log.imagePath}
              alt={`Original notebook page for ID:${log.id}`} 
              className="w-full h-full object-contain"
              style={{ opacity: sliderValue / 100 }}
            />
          </div>
          
          <div className="flex-1 border border-terminal-pink rounded p-4 overflow-auto relative">
            <div className="absolute top-2 left-2 bg-black/70 text-xs py-1 px-2 rounded">
              Parsed Text
            </div>
            <pre className="whitespace-pre-wrap font-mono"
              style={{ opacity: 2 - (sliderValue / 100) }}
            >
              {log.content}
            </pre>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-center">
          <div className="text-xs mr-2">Original</div>
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={(e) => setSliderValue(parseInt(e.target.value))}
            className="w-64 accent-terminal-pink"
          />
          <div className="text-xs ml-2">Parsed</div>
        </div>
      </div>
    </div>
  );
};

export default ScratchViewer;
