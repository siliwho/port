export const fetchGitHubStats = async (username: string) => {
  try {
    // Using a public proxy for GitHub contributions
    const response = await fetch(`https://github-contributions-api.deno.dev/${username}.json`);
    const data = await response.json();
    
    const heatmap = data.contributions.flat().map((day: any) => ({
      date: day.date,
      count: day.contributionCount
    }));

    return { heatmap };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return { heatmap: [] };
  }
};

export const fetchCodeforcesStats = async (username: string) => {
  try {
    const response = await fetch(`https://codeforces.com/api/user.status?handle=${username}`);
    const data = await response.json();
    
    if (data.status === 'OK') {
      const submissions = data.result;
      const heatmapMap: Record<string, number> = {};
      
      submissions.forEach((sub: any) => {
        const date = new Date(sub.creationTimeSeconds * 1000).toISOString().split('T')[0];
        heatmapMap[date] = (heatmapMap[date] || 0) + 1;
      });
      
      const heatmap = Object.entries(heatmapMap).map(([date, count]) => ({ date, count }));
      return { submissions, heatmap };
    }
    return { submissions: [], heatmap: [] };
  } catch (error) {
    console.error("Error fetching Codeforces stats:", error);
    return { submissions: [], heatmap: [] };
  }
};

export const fetchLeetCodeStats = async (username: string) => {
  try {
    // Using an alternative LeetCode stats API that might be more reliable
    const response = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/calendar`);
    
    if (response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (data && data.submissionCalendar) {
          const calendar = typeof data.submissionCalendar === 'string' 
            ? JSON.parse(data.submissionCalendar) 
            : data.submissionCalendar;
          const heatmap = Object.entries(calendar).map(([timestamp, count]) => {
            const date = new Date(parseInt(timestamp) * 1000).toISOString().split('T')[0];
            return { date, count: count as number };
          });
          return { heatmap };
        }
      }
    }
    
    // Fallback to another API if the first one fails or returns unexpected format
    const altResponse = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${username}`);
    if (altResponse.ok) {
      const contentType = altResponse.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const altData = await altResponse.json();
        if (altData && altData.submissionCalendar) {
          const heatmap = Object.entries(altData.submissionCalendar).map(([timestamp, count]) => {
            const date = new Date(parseInt(timestamp) * 1000).toISOString().split('T')[0];
            return { date, count: count as number };
          });
          return { heatmap };
        }
      }
    }

    // If both fail (likely due to rate limiting), return empty or mock data to avoid error
    console.warn("LeetCode APIs are currently rate limited or unavailable.");
    return { heatmap: [] };
  } catch (error) {
    console.error("Error fetching LeetCode stats:", error);
    return { heatmap: [] };
  }
};
