import React, { useState, useEffect, useRef } from 'react';
import TerminalHeader from './TerminalHeader';
import EchoReader from './EchoReader';
import TerminalInput from './TerminalInput';
import GhostMetadataPanel from './GhostMetadataPanel';
import ScratchViewer from './ScratchViewer';
import ThemeToggle from './ThemeToggle';
import { logData } from '../data/logData';

const Terminal: React.FC = () => {
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [commandOutput, setCommandOutput] = useState<string>('');
  const [showMetadataPanel, setShowMetadataPanel] = useState<boolean>(false);
  const [showScratchViewer, setShowScratchViewer] = useState<boolean>(false);
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + G to toggle Ghost Metadata Panel
      if (e.ctrlKey && e.key === 'g') {
        e.preventDefault();
        setShowMetadataPanel(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  const handleCommand = (command: string) => {
    setInputHistory(prev => [...prev, command]);
    
    // Process command
    let output = '';
    
    if (command.trim().toLowerCase() === 'cat ghost-trace-01') {
      output = "Loading ghost-trace-01 content...\n\n" + logData.map(log => 
        `ID:${log.id}\n${log.content}\n---`
      ).join('\n\n');
    } else if (command.trim().toLowerCase() === 'whisper.sh') {
      output = "Activating whisper mode... Listen closely to the ghost echoes...";
      // In a real app, you might trigger audio here
      document.body.classList.add('crt-flicker');
      setTimeout(() => {
        document.body.classList.remove('crt-flicker');
      }, 3000);
    } else if (command.trim().toLowerCase().startsWith('floatctl parse-id')) {
      const idMatch = command.match(/parse-id\s+(\d+)/);
      const id = idMatch ? idMatch[1] : null;
      if (id) {
        output = `[output] FLOAT tracking ID:${id} as active analog echo`;
        setSelectedLogId(id);
      } else {
        output = '[error] Invalid ID format. Usage: floatctl parse-id <number>';
      }
    } else if (command.trim() === 'help') {
      output = `
Available commands:
- cat ghost-trace-01: View full ghost trace content
- whisper.sh: Activate whisper echo mode
- floatctl parse-id <number>: Track specific analog echo
- help: Show this help message
      `;
    } else if (command.trim()) {
      output = `Command not recognized: ${command}`;
    }
    
    setCommandOutput(output);
  };
  
  const handleOpenScratchViewer = (id: string) => {
    setSelectedLogId(id);
    setShowScratchViewer(true);
  };
  
  return (
    <div className="relative min-h-screen bg-terminal-black text-terminal-pink overflow-hidden p-4">
      <div className="scan-line"></div>
      <div className="crt-effect"></div>
      <ThemeToggle />
      
      <div className="terminal-window max-w-6xl mx-auto" ref={terminalRef}>
        <TerminalHeader />
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <EchoReader logs={logData} onViewOriginal={handleOpenScratchViewer} />
            
            {commandOutput && (
              <div className="mt-4 p-2 border border-terminal-pink rounded bg-black/50 terminal-content">
                <pre className="whitespace-pre-wrap">{commandOutput}</pre>
              </div>
            )}
            
            <TerminalInput onSubmit={handleCommand} history={inputHistory} />
          </div>
          
          {showMetadataPanel && (
            <GhostMetadataPanel 
              onClose={() => setShowMetadataPanel(false)} 
              selectedId={selectedLogId} 
            />
          )}
        </div>
      </div>
      
      {showScratchViewer && selectedLogId && (
        <ScratchViewer
          logId={selectedLogId}
          onClose={() => setShowScratchViewer(false)}
        />
      )}
    </div>
  );
};

export default Terminal;
