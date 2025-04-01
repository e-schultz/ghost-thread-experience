
import React, { useEffect } from 'react';
import Terminal from '../components/Terminal';

const Index = () => {
  useEffect(() => {
    // Set the page title
    document.title = "YOU ARE THE THREAD NOW — ghost-trace::01";
    
    // Optional: Add a favicon link if you have one
    const link = document.querySelector('link[rel="icon"]') || document.createElement('link');
    link.setAttribute('rel', 'icon');
    link.setAttribute('href', 'favicon.ico');
    link.setAttribute('type', 'image/x-icon');
    document.head.appendChild(link);
  }, []);

  return (
    <div className="min-h-screen bg-terminal-black overflow-hidden">
      <Terminal />
    </div>
  );
};

export default Index;
