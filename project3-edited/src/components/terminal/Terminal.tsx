import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { useTerminal, CommandOutput } from '@/hooks/useTerminal';
import { themes, Theme } from '@/themes';

interface TerminalProps {
  currentTheme: Theme;
  onCommand: (command: string) => void;
  history: CommandOutput[];
}

export const Terminal: React.FC<TerminalProps> = ({ currentTheme, onCommand, history }) => {
  const [input, setInput] = React.useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onCommand(input.trim());
      setInput('');
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div 
      className="flex flex-col h-full font-mono overflow-hidden"
      style={{ 
        backgroundColor: currentTheme.background, 
        color: currentTheme.foreground,
        fontFamily: currentTheme.font 
      }}
      onClick={focusInput}
    >
      <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-hide" ref={scrollRef}>
        {history.map((item, i) => (
          <div key={i} className="animate-in fade-in slide-in-from-bottom-1 duration-300">
            {item.command && (
              <div className="flex items-center space-x-2 opacity-50 mb-1">
                <span style={{ color: currentTheme.accent }}>siliwho@yantrio</span>
                <span className="font-bold">:~$</span>
                <span>{item.command}</span>
              </div>
            )}
            <div className="pl-4">
              {item.type === 'text' ? (
                <p className="whitespace-pre-wrap">{item.content}</p>
              ) : (
                item.content
              )}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t" style={{ borderColor: currentTheme.border }}>
        <div className="flex items-center space-x-2">
          <span style={{ color: currentTheme.accent }}>siliwho@yantrio</span>
          <span className="font-bold">:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none border-none p-0 focus:ring-0"
            autoFocus
            spellCheck={false}
          />
        </div>
      </form>

      {/* CRT Scanline Effect */}
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      </div>
    </div>
  );
};
