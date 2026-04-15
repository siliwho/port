/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback, useEffect } from 'react';
import { Terminal } from '@/components/terminal/Terminal';
import { useTerminal, CommandOutput } from '@/hooks/useTerminal';
import { themes, Theme } from '@/themes';
import { Stats } from '@/components/sections/Stats';
import { Projects } from '@/components/sections/Projects';
import { Pomodoro } from '@/components/sections/Pomodoro';
import { Blog } from '@/components/sections/Blog';
import { About } from '@/components/sections/About';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Grid } from 'lucide-react';

type Section = 'about' | 'heatmaps' | 'projects' | 'pomodoro' | 'blog';

export default function App() {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [activeSection, setActiveSection] = useState<Section>('about');
  const { history, pushToHistory, clearHistory } = useTerminal();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCommand = useCallback((command: string) => {
    const cmd = command.toLowerCase().trim();
    const args = cmd.split(' ');
    const baseCmd = args[0];

    let output: CommandOutput = { type: 'text', content: '', command };

    switch (baseCmd) {
      case 'help':
        output.content = `Available commands:
  help      - Show this help message
  about     - Learn more about me
  stats     - View my coding heatmaps (GitHub, CF, LC)
  projects  - View my portfolio projects
  pomo      - Open Pomodoro focus timer (usage: pomo [minutes])
  blog      - Read my latest blog posts
  theme     - Change terminal theme (usage: theme [name])
  themes    - List all available themes
  clear     - Clear terminal history`;
        break;

      case 'about':
        setActiveSection('about');
        output.content = 'Navigating to about section...';
        break;

      case 'stats':
      case 'heatmaps':
        setActiveSection('heatmaps');
        output.content = 'Navigating to heatmaps section...';
        break;

      case 'projects':
        setActiveSection('projects');
        output.content = 'Navigating to projects section...';
        break;

      case 'pomo':
      case 'pomodoro':
        setActiveSection('pomodoro');
        output.content = 'Navigating to pomodoro section...';
        break;

      case 'blog':
        setActiveSection('blog');
        output.content = 'Navigating to blog section...';
        break;

      case 'themes':
        output.content = `Available themes:
${themes.map(t => `  - ${t.id} (${t.name})`).join('\n')}`;
        break;

      case 'theme':
        const themeId = args[1];
        const newTheme = themes.find(t => t.id === themeId);
        if (newTheme) {
          setCurrentTheme(newTheme);
          output.content = `Theme changed to ${newTheme.name}`;
        } else {
          output.content = `Theme "${themeId}" not found. Type "themes" to see available options.`;
        }
        break;

      case 'clear':
        clearHistory();
        return;

      default:
        output.content = `Command not found: ${baseCmd}. Type "help" for a list of commands.`;
    }

    pushToHistory(output);
  }, [pushToHistory, clearHistory]);

  const renderSection = () => {
    switch (activeSection) {
      case 'about': return <About theme={currentTheme} />;
      case 'heatmaps': return <Stats theme={currentTheme} />;
      case 'projects': return <Projects theme={currentTheme} />;
      case 'pomodoro': return <Pomodoro theme={currentTheme} />;
      case 'blog': return <Blog theme={currentTheme} />;
      default: return <About theme={currentTheme} />;
    }
  };

  return (
    <TooltipProvider>
      <div 
        className="fixed inset-0 flex flex-col font-mono overflow-hidden"
        style={{ backgroundColor: currentTheme.background, color: currentTheme.foreground }}
      >
        {/* Top Navigation Bar */}
        <div 
          className="h-12 flex items-center justify-between px-6 border-b z-50"
          style={{ borderColor: currentTheme.border, backgroundColor: `${currentTheme.background}CC` }}
        >
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
              </div>
              <span className="text-xs font-bold ml-2">
                <span style={{ color: currentTheme.accent }}>siliwho@portfolio</span>
                <span className="opacity-50"> :~$</span>
              </span>
            </div>

            <nav className="flex items-center space-x-6 text-[11px] uppercase tracking-wider">
              {(['about', 'heatmaps', 'projects', 'pomodoro'] as Section[]).map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`transition-all relative py-4 ${activeSection === section ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                >
                  ~/{section}
                  {activeSection === section && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500" />
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 p-1 rounded bg-white/5 border border-white/10">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setCurrentTheme(t)}
                  className={`px-2 py-0.5 rounded text-[9px] uppercase transition-all ${currentTheme.id === t.id ? 'bg-green-500/20 text-green-400' : 'opacity-40 hover:opacity-70'}`}
                >
                  {t.id}
                </button>
              ))}
            </div>
            <button className="p-1.5 rounded hover:bg-white/5 transition-colors opacity-50">
              <Grid size={14} />
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide relative">
          {renderSection()}
          
          {/* CRT Scanline Effect */}
          <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden opacity-[0.03]">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
          </div>
        </div>

        {/* Bottom Status Bar / Terminal Input */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            const input = (e.target as any).command.value;
            if (input) {
              handleCommand(input);
              (e.target as any).command.value = '';
            }
          }}
          className="h-10 flex items-center justify-between px-6 border-t z-50"
          style={{ borderColor: currentTheme.border, backgroundColor: `${currentTheme.background}CC` }}
        >
          <div className="flex-1 flex items-center space-x-2">
            <span className="text-[10px] opacity-50">siliwho@portfolio:~$</span>
            <input 
              name="command"
              autoComplete="off"
              className="flex-1 bg-transparent border-none outline-none text-[10px] p-0 focus:ring-0"
              placeholder=""
            />
          </div>
          
          <div className="flex items-center space-x-6 text-[9px] opacity-40 uppercase tracking-widest">
            <span>built with next.js + vercel</span>
            <a href="https://github.com/siliwho" target="_blank" rel="noopener noreferrer" className="hover:underline">github.com/siliwho</a>
            <span>v1.0.0</span>
          </div>
        </form>
      </div>
    </TooltipProvider>
  );
}
