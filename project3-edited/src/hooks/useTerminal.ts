import { useState, useCallback, useEffect } from 'react';

export type CommandOutput = {
  type: 'text' | 'component';
  content: any;
  command?: string;
};

export const useTerminal = () => {
  const [history, setHistory] = useState<CommandOutput[]>([
    { 
      type: 'text', 
      content: `
 _______  ___   ___      ___   _     _  __   __  _______ 
|       ||   | |   |    |   | | | _ | ||  | |  ||       |
|  _____||   | |   |    |   | | || || ||  |_|  ||   _   |
| |_____ |   | |   |    |   | |       ||       ||  | |  |
|_____  ||   | |   |___ |   | |       ||       ||  |_|  |
 _____| ||   | |       ||   | |   _   ||   _   ||       |
|_______||___| |_______||___| |__| |__||__| |__||_______|
                                                  
Welcome to Siliwho Terminal Portfolio v1.0.0
Type "help" to see available commands.
` 
    },
  ]);
  const [input, setInput] = useState('');

  const pushToHistory = useCallback((output: CommandOutput) => {
    setHistory((prev) => [...prev, output]);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return {
    history,
    input,
    setInput,
    pushToHistory,
    clearHistory,
  };
};
