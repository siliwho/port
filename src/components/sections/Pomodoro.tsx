import React from 'react';
import { usePomodoro } from '@/hooks/usePomodoro';
import { Heatmap } from '@/components/Heatmap';
import { Window } from '@/components/Window';
import { Theme } from '@/themes';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface PomodoroProps {
  initialMinutes?: number;
  theme: Theme;
}

export const Pomodoro: React.FC<PomodoroProps> = ({ initialMinutes = 25, theme }) => {
  const { sessions, timeLeft, isActive, mode, toggleTimer, resetTimer } = usePomodoro(initialMinutes);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const SessionStat = ({ label, value, color }: { label: string, value: string | number, color?: string }) => (
    <div className="flex flex-col space-y-1">
      <span className="text-[10px] uppercase opacity-50 font-mono">{label}</span>
      <span className={`text-lg font-bold font-mono ${color ? color : ''}`}>{value}</span>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      <div className="space-y-6">
        <Window title="pomodoro.timer" theme={theme}>
          <div className="flex flex-col items-center space-y-8 py-4">
            <div className="flex space-x-2">
              {['pomodoro', 'long', 'short', 'deep'].map((preset) => (
                <button 
                  key={preset}
                  className={`px-3 py-1 rounded text-[10px] font-mono border transition-colors ${preset === 'pomodoro' ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'border-white/10 opacity-50 hover:opacity-100'}`}
                >
                  {preset}
                </button>
              ))}
            </div>

            <div className="relative flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border-4 border-white/5 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold font-mono text-green-400">
                  {formatTime(timeLeft)}
                </div>
                <div className="text-[10px] opacity-50 font-mono uppercase tracking-widest mt-1">
                  {mode === 'work' ? 'coding' : 'resting'}
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={toggleTimer}
                className="flex items-center space-x-2 px-6 py-2 rounded border border-green-500/50 bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors font-mono text-sm"
              >
                {isActive ? <Pause size={16} /> : <Play size={16} />}
                <span>{isActive ? 'pause' : 'start'}</span>
              </button>
              <button
                onClick={resetTimer}
                className="flex items-center space-x-2 px-4 py-2 rounded border border-white/10 hover:bg-white/5 transition-colors font-mono text-xs opacity-50"
              >
                <RotateCcw size={14} />
                <span>reset</span>
              </button>
            </div>

            <div className="w-full space-y-3 pt-4 border-t border-white/5">
              <span className="text-[10px] opacity-50 font-mono uppercase">session label:</span>
              <div className="flex flex-wrap gap-2">
                {['coding', 'studying', 'reading', 'research', 'writing', 'other'].map((label) => (
                  <button 
                    key={label}
                    className={`px-3 py-1 rounded text-[10px] font-mono border border-white/10 transition-colors ${label === 'coding' ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'opacity-50 hover:opacity-100'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Window>

        <Window title="stats.json" theme={theme}>
          <div className="grid grid-cols-2 gap-6">
            <SessionStat label="today" value="0 sessions" color="text-green-400" />
            <SessionStat label="total sessions" value="0" color="text-blue-400" />
            <SessionStat label="total focus" value="0h 0m" color="text-yellow-400" />
            <SessionStat label="avg/day" value="—" color="text-orange-400" />
          </div>
        </Window>
      </div>

      <div className="space-y-6">
        <Window title="focus.heatmap" theme={theme}>
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-mono opacity-50">0 sessions logged</span>
            </div>
            <Heatmap data={sessions} title="" />
            <div className="flex justify-end items-center space-x-2 text-[10px] font-mono opacity-50">
              <span>less</span>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-white/5" />
                <div className="w-2 h-2 bg-[#0e4429]" />
                <div className="w-2 h-2 bg-[#006d32]" />
                <div className="w-2 h-2 bg-[#26a641]" />
                <div className="w-2 h-2 bg-[#39d353]" />
              </div>
              <span>more</span>
            </div>
          </div>
        </Window>

        <Window title="session.log" theme={theme}>
          <div className="flex items-center justify-center h-32 text-[10px] font-mono opacity-30 italic">
            ▶ 0 entries
          </div>
        </Window>
      </div>
    </div>
  );
};
