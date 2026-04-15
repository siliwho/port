export type Theme = {
  name: string;
  id: string;
  background: string;
  foreground: string;
  accent: string;
  secondary: string;
  border: string;
  font: string;
};

export const themes: Theme[] = [
  {
    name: "Matrix",
    id: "matrix",
    background: "#000000",
    foreground: "#00ff41",
    accent: "#00ff41",
    secondary: "#003b00",
    border: "#1a1a1a",
    font: "JetBrains Mono, monospace",
  },
  {
    name: "Dracula",
    id: "dracula",
    background: "#282a36",
    foreground: "#f8f8f2",
    accent: "#bd93f9",
    secondary: "#6272a4",
    border: "#44475a",
    font: "JetBrains Mono, monospace",
  },
  {
    name: "Solarized",
    id: "solarized",
    background: "#002b36",
    foreground: "#839496",
    accent: "#268bd2",
    secondary: "#586e75",
    border: "#073642",
    font: "JetBrains Mono, monospace",
  },
  {
    name: "Nord",
    id: "nord",
    background: "#2e3440",
    foreground: "#d8dee9",
    accent: "#88c0d0",
    secondary: "#4c566a",
    border: "#3b4252",
    font: "JetBrains Mono, monospace",
  },
  {
    name: "Cyberpunk",
    id: "cyberpunk",
    background: "#000000",
    foreground: "#fdf500",
    accent: "#ff003c",
    secondary: "#00f0ff",
    border: "#1a1a1a",
    font: "JetBrains Mono, monospace",
  },
  {
    name: "Amber",
    id: "amber",
    background: "#000000",
    foreground: "#ffb000",
    accent: "#ffb000",
    secondary: "#332200",
    border: "#1a1a1a",
    font: "JetBrains Mono, monospace",
  },
];
