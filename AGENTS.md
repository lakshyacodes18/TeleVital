# TeleVital: rules for the AI agent (learning project)

TeleVital connects rural health centres with city specialists. The owner is learning how a full-stack
project is built, so everything must be easy to read and explain.

0. Folders: ONLY edit files inside Frontend/ unless the prompt names a Backend file. Never delete or rewrite anything in Backend/.
   Never open or print Backend/.env. File paths in prompts are relative to Frontend/ (src/pages/... means Frontend/src/pages/...).
1. Build ONLY the page named in the prompt. Do not create other pages.
2. Create only the files the prompt lists. If you need another file, say why before creating it.
3. Plain code: small components, simple TypeScript types, no clever abstractions, no new dependencies without asking.
4. Add short comments at the lines a beginner would not understand (why, not what).
5. Tailwind classes only. Colours come from the @theme block in src/index.css. Never hard-code hex in components.
6. Folders: src/pages (one file per page), src/components (shared pieces), src/data (fake data later).
7. Accessibility: real <header>, <main>, <footer>, <button> and <a> elements, labels on inputs, visible focus.
8. No invented facts: no statistics, user counts, certifications, government names or real phone numbers.
9. When done, print: (a) files created or changed, one line each, (b) how the page works in 5 bullets,
   (c) three things to click to test it, (d) the React and Tailwind concepts used.

