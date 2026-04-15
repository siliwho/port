import React from "react";
import { ExternalLink, Github } from "lucide-react";
import { Window } from "@/components/Window";
import { themes, Theme } from "@/themes";

const projects = [
  {
    title: "miniRTOS",
    description:
      "a simple Real Time Operating System with a preemtive schedular",
    tech: ["C", "Asembly", "STM32"],
    github: "https://github.com/siliwho/miniRTOS",
    link: "#",
  },
];

interface ProjectsProps {
  theme: Theme;
}

export const Projects: React.FC<ProjectsProps> = ({ theme }) => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project, i) => (
        <Window key={i} title={`project.v${i + 1}.0`} theme={theme}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold font-mono text-green-400">
                {project.title}
              </h3>
              <div className="flex space-x-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="opacity-50 hover:opacity-100 transition-opacity"
                >
                  <Github size={16} />
                </a>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="opacity-50 hover:opacity-100 transition-opacity"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
            <p className="text-xs opacity-70 font-mono leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tech.map((t, j) => (
                <span
                  key={j}
                  className="text-[9px] px-2 py-0.5 rounded border border-white/10 font-mono opacity-50"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Window>
      ))}
    </div>
  );
};
