import React from 'react';
import { Theme } from '@/themes';

interface WindowProps {
  title: string;
  children: React.ReactNode;
  theme: Theme;
  className?: string;
}

export const Window: React.FC<WindowProps> = ({ title, children, theme, className = "" }) => {
  return (
    <div 
      className={`border rounded-md overflow-hidden flex flex-col ${className}`}
      style={{ borderColor: theme.border, backgroundColor: `${theme.background}80` }}
    >
      <div 
        className="px-3 py-1.5 border-b flex items-center justify-between"
        style={{ borderColor: theme.border, backgroundColor: `${theme.background}CC` }}
      >
        <div className="flex items-center space-x-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          <span className="ml-2 text-[10px] font-mono opacity-50 uppercase tracking-wider">{title}</span>
        </div>
      </div>
      <div className="p-4 flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};
