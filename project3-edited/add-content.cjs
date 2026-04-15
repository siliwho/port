#!/usr/bin/env node
/**
 * add-content.cjs — CLI helper to add Projects and Blog posts
 * Usage:
 *   node add-content.cjs project
 *   node add-content.cjs blog
 */

const fs   = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise(resolve => rl.question(q, resolve));

// ── file paths ────────────────────────────────────────────────────────────────
const PROJECTS_FILE = path.join(__dirname, 'src/components/sections/Projects.tsx');
const BLOG_FILE     = path.join(__dirname, 'src/components/sections/Blog.tsx');

// ── helpers ───────────────────────────────────────────────────────────────────
function readFile(p) {
  return fs.readFileSync(p, 'utf8');
}
function writeFile(p, content) {
  fs.writeFileSync(p, content, 'utf8');
  console.log(`\n✅  Saved → ${path.relative(__dirname, p)}`);
}

// ── add project ───────────────────────────────────────────────────────────────
async function addProject() {
  console.log('\n── Add a new Project ──────────────────────────────\n');
  const title       = await ask('Project title: ');
  const description = await ask('Short description: ');
  const techRaw     = await ask('Tech stack (comma-separated, e.g. React,TypeScript): ');
  const github      = await ask('GitHub URL (or leave blank): ') || '#';
  const link        = await ask('Live demo URL (or leave blank): ') || '#';

  const tech = techRaw.split(',').map(t => t.trim()).filter(Boolean);
  const techJson = JSON.stringify(tech);

  const newEntry = `  {
    title: ${JSON.stringify(title)},
    description: ${JSON.stringify(description)},
    tech: ${techJson},
    github: ${JSON.stringify(github)},
    link: ${JSON.stringify(link)}
  }`;

  let src = readFile(PROJECTS_FILE);

  // Insert before the closing `];` of the `const projects` array
  const marker = '\n];';
  const insertAt = src.indexOf(marker);
  if (insertAt === -1) {
    console.error('❌  Could not find the projects array end `];` in Projects.tsx');
    process.exit(1);
  }

  // Add a trailing comma to whatever was last, then append the new entry
  src = src.slice(0, insertAt) + ',\n' + newEntry + src.slice(insertAt);
  writeFile(PROJECTS_FILE, src);
}

// ── add blog post ─────────────────────────────────────────────────────────────
async function addBlog() {
  console.log('\n── Add a new Blog Post ────────────────────────────\n');
  const title   = await ask('Post title: ');
  const dateRaw = await ask('Date (YYYY-MM-DD, leave blank for today): ');
  const date    = dateRaw.trim() || new Date().toISOString().slice(0, 10);
  const excerpt = await ask('Short excerpt / summary: ');
  const link    = await ask('Link (Notion, Medium, etc.): ') || '#';

  const newEntry = `  {
    title: ${JSON.stringify(title)},
    date: ${JSON.stringify(date)},
    excerpt: ${JSON.stringify(excerpt)},
    link: ${JSON.stringify(link)}
  }`;

  let src = readFile(BLOG_FILE);

  const marker = '\n];';
  const insertAt = src.indexOf(marker);
  if (insertAt === -1) {
    console.error('❌  Could not find the posts array end `];` in Blog.tsx');
    process.exit(1);
  }

  src = src.slice(0, insertAt) + ',\n' + newEntry + src.slice(insertAt);
  writeFile(BLOG_FILE, src);
}

// ── main ──────────────────────────────────────────────────────────────────────
(async () => {
  const arg = process.argv[2];
  if (!arg) {
    console.log('Usage: node add-content.cjs [project|blog]');
    process.exit(0);
  }
  if (arg === 'project') await addProject();
  else if (arg === 'blog') await addBlog();
  else { console.error(`Unknown command: ${arg}`); process.exit(1); }
  rl.close();
})();
