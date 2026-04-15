import React from 'react';
import { usePomodoro, PRESETS, PresetKey } from '@/hooks/usePomodoro';
import { Heatmap } from '@/components/Heatmap';
import { Window } from '@/components/Window';
import { Theme } from '@/themes';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface PomodoroProps {
  initialMinutes?: number;
  theme: Theme;
}

const SESSION_LABELS = ['coding', 'studying', 'reading', 'research', 'writing', 'other'];
const PRESET_KEYS: PresetKey[] = ['pomodoro', 'long', 'short', 'deep'];

export const Pomodoro: React.FC<PomodoroProps> = ({ initialMinutes = 25, theme }) => {
  const {
    sessions, timeLeft, isActive, mode, preset, sessionLabel,
    changePreset, setSessionLabel, toggleTimer, resetTimer, stats,
  } = usePomodoro(initialMinutes);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const totalH = Math.floor(stats.totalMinutes / 60);
  const totalM = stats.totalMinutes % 60;

  const today = new Date().toISOString().split('T')[0];
  const recentSessions = [...sessions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      <div className="space-y-6">
        <Window title="pomodoro.timer" theme={theme}>
          <div className="flex flex-col items-center space-y-8 py-4">

            {/* Preset buttons */}
            <div className="flex space-x-2">
              {PRESET_KEYS.map((p) => (
                <button
                  key={p}
                  onClick={() => changePreset(p)}
                  className={`px-3 py-1 rounded text-[10px] font-mono border transition-colors ${
                    preset === p
                      ? 'bg-green-500/20 text-green-400 border-green-500/50'
                      : 'border-white/10 opacity-50 hover:opacity-100'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Timer circle */}
            <div className="relative flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border-4 border-white/5 flex flex-col items-center justify-center">
                <div className={`text-4xl font-bold font-mono ${mode === 'work' ? 'text-green-400' : 'text-blue-400'}`}>
                  {formatTime(timeLeft)}
                </div>
                <div className="text-[10px] opacity-50 font-mono uppercase tracking-widest mt-1">
                  {mode === 'work' ? sessionLabel : 'break'}
                </div>
                <div className="text-[9px] opacity-30 font-mono mt-1">
                  {PRESETS[preset].work}m / {PRESETS[preset].break}m break
                </div>
              </div>
            </div>

            {/* Start / Reset */}
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
                className="flex items-center space-x-2 px-4 py-2 rounded border border-white/10 hover:bg-white/5 transition-colors font-mono text-xs opacity-50 hover:opacity-100"
              >
                <RotateCcw size={14} />
                <span>reset</span>
              </button>
            </div>

            {/* Session label buttons */}
            <div className="w-full space-y-3 pt-4 border-t border-white/5">
              <span className="text-[10px] opacity-50 font-mono uppercase">session label:</span>
              <div className="flex flex-wrap gap-2">
                {SESSION_LABELS.map((label) => (
                  <button
                    key={label}
                    onClick={() => setSessionLabel(label)}
                    className={`px-3 py-1 rounded text-[10px] font-mono border transition-colors ${
                      sessionLabel === label
                        ? 'bg-green-500/20 text-green-400 border-green-500/50'
                        : 'border-white/10 opacity-50 hover:opacity-100'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Window>

        {/* Stats */}
        <Window title="stats.json" theme={theme}>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col space-y-1">
              <span className="text-[10px] uppercase opacity-50 font-mono">today</span>
              <span className="text-lg font-bold font-mono text-green-400">
                {stats.todaySessions} {stats.todaySessions === 1 ? 'session' : 'sessions'}
              </span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-[10px] uppercase opacity-50 font-mono">total sessions</span>
              <span className="text-lg font-bold font-mono text-blue-400">{stats.totalSessions}</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-[10px] uppercase opacity-50 font-mono">total focus</span>
              <span className="text-lg font-bold font-mono text-yellow-400">{totalH}h {totalM}m</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-[10px] uppercase opacity-50 font-mono">avg/day</span>
              <span className="text-lg font-bold font-mono text-orange-400">{stats.avgPerDay}</span>
            </div>
          </div>
        </Window>
      </div>

      <div className="space-y-6">
        <Window title="focus.heatmap" theme={theme}>
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-mono opacity-50">
                {stats.totalSessions} {stats.totalSessions === 1 ? 'session' : 'sessions'} logged
              </span>
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
          {recentSessions.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-[10px] font-mono opacity-30 italic">
              ▶ 0 entries
            </div>
          ) : (
            <div className="space-y-2 font-mono text-[10px]">
              {recentSessions.map((s) => (
                <div key={s.date} className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="opacity-50">{s.date}</span>
                  <span className="text-green-400">{s.count} session{s.count !== 1 ? 's' : ''}</span>
                  <span className="opacity-30">{s.count * PRESETS[preset].work}m focused</span>
                </div>
              ))}
            </div>
          )}
        </Window>
      </div>
    </div>
  );
};
