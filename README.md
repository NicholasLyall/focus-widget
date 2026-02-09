# Focus Overlay (Windows)

A lightweight **Windows desktop focus utility** that visually indicates a focus session by drawing a persistent red border around the screen and tracking time.  
No website blocking. No hard lockdown. Just a clear, system-wide signal that you’re in focus mode.

Built with **JavaScript + Electron**.

---

## Why this exists

Most “productivity” tools rely on aggressive blocking.  
This app takes a different approach:

- Encourage focus through **visual friction**, not enforcement  
- Keep the user in control at all times  
- Be system-wide, not tied to a browser  
- Stay minimal and fast  

If the red border is on, you’re in focus mode.  
If it’s off, you’re not.

---

## Core Features (v1)

- Fullscreen transparent overlay with a red perimeter  
- Global keyboard shortcut to toggle focus mode  
- Configurable focus duration  
- Countdown timer  
- Always-on-top overlay that does **not** block mouse or keyboard input  
- Windows-only (for now)

---

## Tech Stack

- **Electron** (desktop runtime)  
- **JavaScript**  
- **HTML / CSS**  
- **Node.js**  

No backend.  
No database.  
No cloud services.

---

## Project Structure

```text
focus-overlay/
├── package.json
├── main.js            # Electron main process (windows, shortcuts, timers)
├── preload.js         # Safe bridge between main & renderer (if needed)
├── renderer/
│   ├── index.html     # Overlay UI
│   ├── style.css      # Red border + visuals
│   └── renderer.js    # UI logic / countdown display
└── README.md
```

---

## How it works (high level)

1. Electron launches a **transparent, frameless, fullscreen window**
2. The window draws a **red border** using CSS
3. The window is:
   - Always on top  
   - Click-through (does not intercept input)  
4. A **global hotkey** toggles focus mode  
5. A timer tracks session duration  
6. Turning focus mode off removes the overlay

---

## State Model

The app intentionally stays simple.

```text
IDLE
  ↓ (hotkey)
FOCUS_ACTIVE
  ↓ (timer ends OR hotkey)
IDLE
```

State includes:
- `active` (boolean)
- `startTime`
- `duration`

---

## Keyboard Shortcuts (initial)

- **Ctrl + Shift + F** → Toggle focus mode on/off

---

## Development Setup (Windows)

### Prerequisites
- Windows 10 or newer  
- Node.js (LTS recommended)  
- Visual Studio Code  

### Install dependencies
```bash
npm install
```

### Run the app
```bash
npm start
```

---

## Design Principles

- **Soft friction > hard restrictions**
- **Minimal UI**
- **No background services**
- **No network dependency**
- **Fast startup, low mental overhead**

If a feature doesn’t support those principles, it doesn’t belong here.

---

## Non-Goals (important)

This project intentionally does **not**:

- Block websites  
- Disable apps  
- Enforce productivity  
- Track or upload personal data  
- Sync across devices  

Those can be explored later, but they are **out of scope for v1**.

---

## Possible Extensions (future ideas)

- Color fade as time progresses  
- Pomodoro cycles  
- Session history (local only)  
- Tray icon controls  
- Cross-platform support  
- Rewrite using Tauri (JS + Rust)

---

## Learning Goals

This project is primarily about:

- Desktop app architecture  
- Electron main vs renderer processes  
- Global input handling  
- UI overlays  
- Time-based state machines  

The focus is **learning by building**, not copying code.

---

## Status

🚧 In active development  
Built incrementally using **Claude Learning Mode** to encourage hands-on coding.
