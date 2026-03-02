# Focus Overlay (Windows)

A **Windows desktop focus utility** with a control panel for starting focus sessions.
During a session, a persistent red border fills the screen edge — a system-wide signal that you're locked in.
No website blocking. Commitment enforced by you, not the app.

Built with **JavaScript + Electron**.

---

## Why this exists

Most "productivity" tools either do nothing or lock you out completely.
This takes a middle path:

- Visual friction that's hard to ignore but doesn't block your work
- A commitment mechanic that makes quitting feel intentional, not easy
- Session history so you can see your actual track record
- Stays system-wide, not tied to a browser

---

## How it works

1. App opens with a **control panel** — a small normal window in the center of your screen
2. From the control panel you choose a mode and hit Start
3. The control panel closes, the **red border overlay** appears fullscreen
4. When the session ends (timer or manual), the overlay disappears and the control panel returns
5. The session is logged

---

## Core Features (v1)

### Control Panel
- Set a custom focus duration (minutes)
- Choose **Timed Mode** or **Untimed Mode**
- View session history (local, this session or stored)
- Start / Stop controls

### Overlay
- Fullscreen transparent window with a red perimeter border
- Countdown timer displayed in the corner
- Always-on-top, click-through (does not block mouse or keyboard)

### Quit Gate
- Ending a session early requires typing a commitment phrase to confirm
- e.g. `"I am a loser and I fail my goals"`
- Makes rage-quitting feel intentional

### Session Tracking
- Each session logs: goal duration, actual duration, mode, success/fail
- Stored locally (no cloud, no accounts)

---

## Modes

| Mode | How it ends |
|------|-------------|
| Timed | Timer runs out automatically — session marked success |
| Untimed | You end it manually — always marked as a choice, not a failure |
| Early quit | Requires typing the quit phrase — session marked failed |

---

## State Model

```text
IDLE (control panel open)
  ↓ Start
FOCUS_ACTIVE (overlay on, control panel hidden)
  ↓ Timer ends → SUCCESS → log session → IDLE
  ↓ Quit early → type phrase → FAILED → log session → IDLE
  ↓ Untimed stop → COMPLETE → log session → IDLE
```

State includes:
- `active` (boolean)
- `mode` ('timed' | 'untimed')
- `startTime`
- `duration` (null if untimed)
- `sessions[]` (history log)

---

## Project Structure

```text
focus-overlay/
├── package.json
├── main.js                  # Electron main process (windows, state, timers)
├── preload.js               # IPC bridge between main & renderer
├── control-panel/
│   ├── panel.html           # Control panel UI
│   ├── panel.css            # Control panel styles
│   └── panel.js             # Control panel logic (start, history, mode)
├── renderer/
│   ├── index.html           # Overlay UI
│   ├── style.css            # Red border + visuals
│   └── renderer.js          # Overlay logic (countdown display)
└── README.md
```

---

## Tech Stack

- **Electron** (desktop runtime)
- **JavaScript**
- **HTML / CSS**
- **Node.js**

No backend. No database. No cloud services.
Session history stored in a local JSON file.

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

