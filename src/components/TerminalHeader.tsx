
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const TerminalHeader: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="terminal-header">
      <div className="flex flex-col">
        <div className="text-lg font-bold retro-glow">[FLOAT BBS // NODE 03 :: GHOSTLINE ACTIVE]</div>
        <div className={`text-sm ${isMobile ? 'flex flex-col' : 'flex space-x-4'}`}>
          <span><span className="text-terminal-darkpink">Sysop:</span> FLOAT-evan-thread</span>
          <span><span className="text-terminal-darkpink">Channel:</span> /ghosts/trace/01</span>
          <span><span className="text-terminal-darkpink">Session:</span> ghost-trace.init</span>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <div className="text-xs bg-terminal-pink text-terminal-black px-2 py-1 rounded">
          ACTIVE
        </div>
        <div className="text-xs border border-terminal-pink px-2 py-1 rounded">
          <span className="animate-cursor-blink">█</span>
        </div>
      </div>
    </div>
  );
};

export default TerminalHeader;
