
import React, { useState, useEffect } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Zap, Sunset, Skull } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export type Theme = 'glitch' | 'dusk' | 'bones';

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>('glitch');
  const { toast } = useToast();
  
  // Initialize theme from localStorage if available
  useEffect(() => {
    const savedTheme = localStorage.getItem('terminalTheme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);
  
  const applyTheme = (newTheme: Theme) => {
    const rootElement = document.documentElement;
    
    // Remove any existing theme classes
    rootElement.classList.remove('theme-glitch', 'theme-dusk', 'theme-bones');
    
    // Apply the new theme class
    rootElement.classList.add(`theme-${newTheme}`);
  };
  
  const handleThemeChange = (value: string) => {
    if (!value) return;
    
    const newTheme = value as Theme;
    setTheme(newTheme);
    localStorage.setItem('terminalTheme', newTheme);
    applyTheme(newTheme);
    
    // Show toast notification
    const themeNames = {
      'glitch': 'GLITCH (Hot Pink Max)',
      'dusk': 'DUSK (Softer Magenta + Charcoal)',
      'bones': 'BONES (Grayscale ANSI)'
    };
    
    toast({
      title: `MODE: ${newTheme.toUpperCase()}`,
      description: themeNames[newTheme]
    });
  };
  
  return (
    <div className="fixed top-4 right-4 z-50 bg-terminal-black/50 p-1 border border-terminal-pink rounded">
      <ToggleGroup type="single" value={theme} onValueChange={handleThemeChange}>
        <ToggleGroupItem value="glitch" aria-label="GLITCH Theme" className="terminal-button">
          <Zap className="w-4 h-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="dusk" aria-label="DUSK Theme" className="terminal-button">
          <Sunset className="w-4 h-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="bones" aria-label="BONES Theme" className="terminal-button">
          <Skull className="w-4 h-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default ThemeToggle;
