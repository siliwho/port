import React from 'react';
import { BookOpen, Calendar } from 'lucide-react';
import { Window } from '@/components/Window';
import { themes, Theme } from '@/themes';

const posts = [
  {
    title: "Mastering Competitive Programming",
    date: "2024-03-15",
    excerpt: "How I reached Candidate Master on Codeforces and the resources I used...",
    link: "https://www.notion.so/Assembly-33b887e6e488808b98b3e1eabcc85274"
  },
  {
    title: "Building a Terminal UI with React",
    date: "2024-02-28",
    excerpt: "The challenges of creating a truly authentic terminal experience in the browser...",
    link: "https://notion.so/siliwho/blog/terminal-ui"
  },
  {
    title: "Why Heatmaps are Addictive",
    date: "2024-01-10",
    excerpt: "Exploring the psychology behind the green squares and how they drive consistency...",
    link: "https://notion.so/siliwho/blog/heatmaps"
  }
];

interface BlogProps {
  theme: Theme;
}

export const Blog: React.FC<BlogProps> = ({ theme }) => {
  return (
    <div className="p-6 space-y-6 max-w-4xl">
      {posts.map((post, i) => (
        <Window key={i} title={`blog.post.0${i+1}`} theme={theme}>
          <a 
            href={post.link} 
            target="_blank" 
            rel="noreferrer"
            className="block group"
          >
            <div className="flex items-center space-x-2 text-[10px] font-mono opacity-50 mb-2">
              <Calendar size={10} />
              <span>{post.date}</span>
            </div>
            <h3 className="text-lg font-bold font-mono mb-2 flex items-center space-x-2 group-hover:text-green-400 transition-colors">
              <BookOpen size={16} className="opacity-50" />
              <span>{post.title}</span>
            </h3>
            <p className="text-xs opacity-70 font-mono leading-relaxed">{post.excerpt}</p>
          </a>
        </Window>
      ))}
      <div className="p-4 bg-white/5 rounded-lg text-center text-[10px] font-mono opacity-30 italic">
        All blogs are synced from my Notion workspace.
      </div>
    </div>
  );
};
