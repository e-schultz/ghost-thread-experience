
import React, { useState, useRef, useEffect } from 'react';

interface TerminalInputProps {
  onSubmit: (command: string) => void;
  history: string[];
}

const TerminalInput: React.FC<TerminalInputProps> = ({ onSubmit, history }) => {
  const [input, setInput] = useState<string>('');
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // Reset history index when history changes
    setHistoryIndex(-1);
  }, [history]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input);
      setInput('');
      setHistoryIndex(-1);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Up arrow for previous command
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0 && historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      }
    }
    // Down arrow for next command
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };
  
  // Focus input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  return (
    <div className="terminal-input-container">
      <span className="terminal-input-prefix">$</span>
      <form onSubmit={handleSubmit} className="flex-1">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="terminal-input"
          autoComplete="off"
          autoFocus
        />
      </form>
      <span className="animate-cursor-blink">█</span>
    </div>
  );
};

export default TerminalInput;
