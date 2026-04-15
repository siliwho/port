import React, { useEffect, useState } from 'react';
import { Heatmap } from '@/components/Heatmap';
import { Window } from '@/components/Window';
import { Theme } from '@/themes';
import { 
  fetchGitHubStats, 
  fetchCodeforcesStats, 
  fetchLeetCodeStats 
} from '@/services/statsService';

interface StatsProps {
  theme: Theme;
}

export const Stats: React.FC<StatsProps> = ({ theme }) => {
  const [githubData, setGithubData] = useState<any[]>([]);
  const [codeforcesData, setCodeforcesData] = useState<any[]>([]);
  const [leetcodeData, setLeetcodeData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [gh, cf, lc] = await Promise.all([
        fetchGitHubStats('siliwho'),
        fetchCodeforcesStats('siliwho'),
        fetchLeetCodeStats('siliwho')
      ]);
      setGithubData(gh.heatmap);
      setCodeforcesData(cf.heatmap);
      setLeetcodeData(lc.heatmap);
      setLoading(false);
    };
    loadData();
  }, []);

  const SummaryCard = ({ title, value, color }: { title: string, value: string | number, color: string }) => (
    <div className="p-4 border rounded-lg bg-white/5 flex flex-col space-y-1" style={{ borderColor: theme.border }}>
      <span className="text-[10px] uppercase opacity-50 font-mono">{title}</span>
      <span className="text-2xl font-bold font-mono" style={{ color }}>{value}</span>
    </div>
  );

  if (loading) return <div className="animate-pulse font-mono p-6">Loading statistics...</div>;

  const githubCommits = githubData.reduce((acc, day) => acc + day.count, 0);
  const leetcodeSolved = leetcodeData.reduce((acc, day) => acc + day.count, 0); // This is actually submissions in the heatmap
  const cfSubmissions = codeforcesData.reduce((acc, day) => acc + day.count, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="font-mono text-xs opacity-50 mb-4">
        $ activity --user siliwho --all-platforms --year 2024-2025
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard title="GitHub Commits" value={githubCommits.toLocaleString()} color="#22c55e" />
        <SummaryCard title="LeetCode Activity" value={leetcodeSolved} color="#0ea5e9" />
        <SummaryCard title="CF Submissions" value={cfSubmissions} color="#f97316" />
        <SummaryCard title="CF Rating" value="1234" color="#eab308" />
      </div>

      <div className="space-y-6">
        <Window title="github.com/siliwho" theme={theme}>
          <div className="space-y-2">
            {githubData.length === 0 && (
              <div className="text-xs font-mono text-red-400 mb-4">
                $ error: GitHub API error<br/>
                <span className="opacity-50">unable to fetch live data</span>
              </div>
            )}
            <Heatmap data={githubData} title="" />
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

        <Window title="leetcode.com/siliwho" theme={theme}>
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-mono opacity-50">{leetcodeSolved} contributions</span>
            </div>
            <Heatmap data={leetcodeData} title="" />
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

        <Window title="codeforces.com/profile/siliwho" theme={theme}>
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-mono opacity-50">{cfSubmissions} contributions</span>
            </div>
            <Heatmap data={codeforcesData} title="" />
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

        <Window title="leetcode --breakdown" theme={theme}>
          <div className="grid grid-cols-3 gap-8 font-mono">
            <div className="space-y-1">
              <span className="text-[10px] opacity-50">Easy</span>
              <p className="text-xl font-bold text-cyan-400">14</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] opacity-50">Medium</span>
              <p className="text-xl font-bold text-yellow-400">21</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] opacity-50">Hard</span>
              <p className="text-xl font-bold text-red-500">0</p>
            </div>
          </div>
        </Window>
      </div>
    </div>
  );
};
