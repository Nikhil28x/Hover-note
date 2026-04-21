# Hover Note

A lightweight, always-on-top floating notepad for macOS and Windows.

Hover Note stays visible above every other application window as a semi-transparent, draggable scratch-pad. Type URLs, code snippets, measurements — whatever you need in front of you. Content is session-only; nothing is ever written to disk.

---

## Features

- **Always on top** — floats above all applications, including fullscreen apps
- **Semi-transparent** — adjustable opacity (30–95%) so you can see through it
- **Draggable & resizable** — place it wherever on screen
- **Hidden from Dock / taskbar** — zero visual clutter in your workflow
- **Global shortcut** — `Cmd+Shift+N` (macOS) / `Ctrl+Shift+N` (Windows/Linux) to show/hide
- **No persistence** — nothing ever written to disk

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Desktop shell | [Electron](https://www.electronjs.org/) |
| Frontend | Plain HTML + CSS + JS |
| Build/package | electron-builder |

---

## Prerequisites

- [Node.js](https://nodejs.org/) 18+

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run the app
npm start

# 3. Build a distributable binary
npm run build
```

Packaged output goes to `dist/`.

---

## Usage

| Action | How |
|--------|-----|
| Move window | Drag the header bar |
| Resize | Drag the bottom-right grip |
| Adjust opacity | Drag the slider in the header |
| Copy note | Click **COPY** |
| Show / hide | `Cmd+Shift+N` (macOS) · `Ctrl+Shift+N` (Win/Linux) |
| Close | Click **✕** |

---

## Project Structure

```
├── main.js        # Electron main process (window, global shortcut, IPC)
├── preload.js     # Context bridge — exposes safe IPC to renderer
├── renderer.js    # Renderer-side UI wiring
├── index.html     # UI markup + styles
└── package.json
```

---

## License

MIT
