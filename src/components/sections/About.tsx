import React from 'react';
import { Window } from '@/components/Window';
import { Theme } from '@/themes';
import { Github, Code, ExternalLink } from 'lucide-react';

interface AboutProps {
  theme: Theme;
}

export const About: React.FC<AboutProps> = ({ theme }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      <div className="space-y-6">
        <Window title="whoami.sh" theme={theme}>
          <div className="space-y-4 font-mono">
            <h1 className="text-4xl font-bold" style={{ color: theme.accent }}>siliwho</h1>
            <p className="text-sm opacity-80" style={{ color: theme.secondary }}>
              competitive programmer & full-stack developer_
            </p>
            
            <div className="space-y-2 mt-6">
              <p className="text-xs opacity-50"># profile</p>
              <div className="grid grid-cols-[80px_1fr] gap-2 text-sm">
                <span style={{ color: theme.accent }}>name</span>
                <span>= "siliwho"</span>
                
                <span style={{ color: theme.accent }}>focus</span>
                <span>= "competitive programming"</span>
                
                <span style={{ color: theme.accent }}>status</span>
                <span className="text-green-400">"open to opportunities"</span>
                
                <span style={{ color: theme.accent }}>location</span>
                <span>= "India 🇮🇳"</span>
              </div>
            </div>

            <div className="flex space-x-3 mt-8">
              <a href="https://github.com/siliwho" target="_blank" rel="noopener noreferrer" 
                 className="flex items-center space-x-2 px-3 py-1.5 rounded border text-xs hover:bg-white/5 transition-colors"
                 style={{ borderColor: theme.border }}>
                <Github size={14} />
                <span>github</span>
              </a>
              <a href="https://codeforces.com/profile/siliwho" target="_blank" rel="noopener noreferrer"
                 className="flex items-center space-x-2 px-3 py-1.5 rounded border text-xs hover:bg-white/5 transition-colors"
                 style={{ borderColor: theme.border }}>
                <Code size={14} />
                <span>codeforces</span>
              </a>
              <a href="https://leetcode.com/siliwho" target="_blank" rel="noopener noreferrer"
                 className="flex items-center space-x-2 px-3 py-1.5 rounded border text-xs hover:bg-white/5 transition-colors"
                 style={{ borderColor: theme.border }}>
                <ExternalLink size={14} />
                <span>leetcode</span>
              </a>
            </div>
          </div>
        </Window>

        <Window title="neofetch" theme={theme}>
          <div className="flex items-start space-x-8 font-mono">
            <div className="text-[10px] leading-none whitespace-pre" style={{ color: theme.accent }}>
{`
 ██████  ██ ██      ██
██       ██ ██      ██
 █████   ██ ██      ██
     ██  ██ ██      ██
██████   ██ ███████ ██
`}
            </div>
            <div className="space-y-1 text-xs">
              <p><span style={{ color: theme.accent }}>OS</span> ····· Developer Edition GNU/Linux</p>
              <p><span style={{ color: theme.accent }}>Shell</span> ··· zsh 5.9</p>
              <p><span style={{ color: theme.accent }}>Editor</span> ·· nvim + VS Code</p>
              <p><span style={{ color: theme.accent }}>Languages</span> · C++, Python, JS/TS</p>
              <p><span style={{ color: theme.accent }}>Interests</span> · CP, Systems, Web</p>
              <p><span style={{ color: theme.accent }}>Coffee</span> ·· ☕ yes, always</p>
              <div className="flex space-x-1 mt-2">
                <div className="w-3 h-3 bg-black" />
                <div className="w-3 h-3 bg-red-500" />
                <div className="w-3 h-3 bg-green-500" />
                <div className="w-3 h-3 bg-yellow-500" />
                <div className="w-3 h-3 bg-blue-500" />
                <div className="w-3 h-3 bg-magenta-500" />
                <div className="w-3 h-3 bg-cyan-500" />
                <div className="w-3 h-3 bg-white" />
              </div>
            </div>
          </div>
        </Window>
      </div>

      <Window title="skills --verbose" theme={theme}>
        <div className="space-y-6 font-mono">
          <p className="text-xs opacity-50">$ cat skills.json | jq .</p>
          
          {[
            { name: "C++", level: 85, color: "#22c55e" },
            { name: "Python", level: 80, color: "#3b82f6" },
            { name: "JavaScript", level: 75, color: "#eab308" },
            { name: "React/Next.js", level: 70, color: "#f97316" },
            { name: "Data Structures & Algo", level: 88, color: "#22c55e" },
            { name: "SQL", level: 65, color: "#0ea5e9" },
          ].map((skill) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>{skill.name}</span>
                <span className="opacity-50">{skill.level}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${skill.level}%`, backgroundColor: skill.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </Window>
    </div>
  );
};
