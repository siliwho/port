import { useState, useEffect, useCallback } from 'react';

export type PomodoroSession = {
  date: string;
  count: number;
};

export type PomodoroMode = 'work' | 'break';
export type PresetKey = 'pomodoro' | 'long' | 'short' | 'deep';

export const PRESETS: Record<PresetKey, { work: number; break: number; label: string }> = {
  pomodoro: { work: 25, break:  5, label: 'coding'    },
  long:     { work: 50, break: 10, label: 'deep work'  },
  short:    { work: 15, break:  3, label: 'quick'      },
  deep:     { work: 90, break: 20, label: 'deep focus' },
};

export const usePomodoro = (_initialWorkMinutes: number = 25) => {
  const [sessions, setSessions] = useState<PomodoroSession[]>(() => {
    try { return JSON.parse(localStorage.getItem('pomodoro_sessions') || '[]'); }
    catch { return []; }
  });

  const [preset, setPreset]             = useState<PresetKey>('pomodoro');
  const [sessionLabel, setSessionLabel] = useState<string>('coding');
  const [mode, setMode]                 = useState<PomodoroMode>('work');
  const [timeLeft, setTimeLeft]         = useState(PRESETS.pomodoro.work * 60);
  const [isActive, setIsActive]         = useState(false);

  const changePreset = useCallback((p: PresetKey) => {
    setPreset(p);
    setIsActive(false);
    setMode('work');
    setTimeLeft(PRESETS[p].work * 60);
  }, []);

  useEffect(() => {
    if (!isActive) return;
    if (timeLeft === 0) {
      setIsActive(false);
      if (mode === 'work') {
        const today = new Date().toISOString().split('T')[0];
        setSessions((prev) => {
          const existing = prev.find((s) => s.date === today);
          const next = existing
            ? prev.map((s) => s.date === today ? { ...s, count: s.count + 1 } : s)
            : [...prev, { date: today, count: 1 }];
          try { localStorage.setItem('pomodoro_sessions', JSON.stringify(next)); } catch {}
          return next;
        });
        setMode('break');
        setTimeLeft(PRESETS[preset].break * 60);
      } else {
        setMode('work');
        setTimeLeft(PRESETS[preset].work * 60);
      }
      return;
    }
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [isActive, timeLeft, mode, preset]);

  const toggleTimer = () => setIsActive((a) => !a);
  const resetTimer  = () => { setIsActive(false); setMode('work'); setTimeLeft(PRESETS[preset].work * 60); };

  const today         = new Date().toISOString().split('T')[0];
  const todaySessions = sessions.find((s) => s.date === today)?.count ?? 0;
  const totalSessions = sessions.reduce((sum, s) => sum + s.count, 0);
  const totalMinutes  = totalSessions * PRESETS[preset].work;
  const uniqueDays    = sessions.length;
  const avgPerDay     = uniqueDays > 0 ? (totalSessions / uniqueDays).toFixed(1) : '—';

  return {
    sessions, timeLeft, isActive, mode, preset, sessionLabel,
    changePreset, setSessionLabel, toggleTimer, resetTimer,
    stats: { todaySessions, totalSessions, totalMinutes, avgPerDay },
  };
};
