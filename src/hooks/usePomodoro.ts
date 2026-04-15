import { useState, useEffect, useCallback } from 'react';

export type PomodoroSession = {
  date: string; // YYYY-MM-DD
  count: number;
};

export type PomodoroMode = 'work' | 'break';

export const usePomodoro = (initialWorkMinutes: number = 25) => {
  const [sessions, setSessions] = useState<PomodoroSession[]>(() => {
    const saved = localStorage.getItem('pomodoro_sessions');
    return saved ? JSON.parse(saved) : [];
  });

  const [mode, setMode] = useState<PomodoroMode>('work');
  const [workDuration, setWorkDuration] = useState(initialWorkMinutes * 60);
  const [breakDuration, setBreakDuration] = useState(5 * 60); // Default 5 min break
  const [timeLeft, setTimeLeft] = useState(initialWorkMinutes * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setTimeLeft(initialWorkMinutes * 60);
    setWorkDuration(initialWorkMinutes * 60);
  }, [initialWorkMinutes]);

  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (mode === 'work') {
        recordSession();
        // Switch to break
        setMode('break');
        setTimeLeft(breakDuration);
      } else {
        // Switch back to work
        setMode('work');
        setTimeLeft(workDuration);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, workDuration, breakDuration]);

  const recordSession = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    setSessions((prev) => {
      const existing = prev.find((s) => s.date === today);
      let newSessions;
      if (existing) {
        newSessions = prev.map((s) =>
          s.date === today ? { ...s, count: s.count + 1 } : s
        );
      } else {
        newSessions = [...prev, { date: today, count: 1 }];
      }
      localStorage.setItem('pomodoro_sessions', JSON.stringify(newSessions));
      return newSessions;
    });
  }, []);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setMode('work');
    setTimeLeft(workDuration);
  };

  return {
    sessions,
    timeLeft,
    isActive,
    mode,
    toggleTimer,
    resetTimer,
  };
};
