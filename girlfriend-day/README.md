# Happy Girlfriend Day ❤️ - Interactive Cozy Room Quest

A sweet, romantic, interactive mini-game for **Happy Girlfriend Day** built using pure **HTML5, CSS3, and JavaScript (Vanilla)**.

Instead of a standard webpage, this project creates a cozy animated room where your girlfriend can explore, discover 10 hidden objects, enjoy playful interactive objects (curtains opening, bed duvet pullback, teddy wave, lamp glow), and unlock a glowing 3D love letter finale with confetti rain.

---

## 🎵 How to Add Your Own Custom Music

You can easily play your girlfriend's favorite romantic song in the background!

### Method 1: Using a Local MP3 File (Recommended)
1. Create a folder named `audio` inside `girlfriend-day/` (or place the file directly in `girlfriend-day/`).
2. Copy your MP3 song into `girlfriend-day/audio/song.mp3`.
3. Open [`index.html`](file:///e:/New%20folder%20%282%29/girlfriend-day/index.html) and locate line 27:
   ```html
   <audio id="bg-music" loop preload="auto" src="audio/song.mp3"></audio>
   ```

### Method 2: Using an Online Audio Link
Open [`index.html`](file:///e:/New%20folder%20%282%29/girlfriend-day/index.html) and paste any direct MP3 web link into the `src` attribute:
```html
<audio id="bg-music" loop preload="auto" src="https://your-domain.com/path-to-music.mp3"></audio>
```

> **Note**: Users can toggle music on/off at any time using the **🎵 Music** button in the top HUD menu!

---

## 💌 How to Customize Messages & Letter

Every message in the game is marked with clear comment blocks for easy customization!

### 1. Customizing Object Messages (Objects 1 to 10)
Open [`js/objects.js`](file:///e:/New%20folder%20%282%29/girlfriend-day/js/objects.js) and locate the `HiddenObjectData` object:

```javascript
const HiddenObjectData = {
    // Edit your message here: Object 1 (Plush Teddy Bear)
    1: {
        name: "Plush Teddy Bear 🧸",
        icon: "🧸",
        message: "You make every ordinary day feel like a cozy magical fairy tale ❤️"
    },
    // ... Objects 2 through 10
};
```

### 2. Customizing the Final Love Letter Text
Open [`js/ending.js`](file:///e:/New%20folder%20%282%29/girlfriend-day/js/ending.js) and modify the `LoveLetterText` variable:

```javascript
const LoveLetterText = `My Dearest Love,

From the moment you entered my life, everything became warmer, brighter, and infinitely more beautiful...`;
```

---

## 📁 Project Structure

```
girlfriend-day/
├── index.html                  # SVG room, Glassmorphism Sidebar Checklist, popups & audio element
├── css/
│   ├── style.css               # Design tokens, sidebar slide-in physics, glassmorphism overlays
│   ├── animations.css          # Idle animations (fairy lights, stars, teddy wave, heart pulse)
│   └── responsive.css          # Mobile checklist layout, touch target sizing, landscape support
├── js/
│   ├── main.js                 # App state manager, background music player & sound synthesizer
│   ├── room.js                 # SVG room scene, lighting controls, window shooting stars
│   ├── objects.js              # 10 hidden objects data, fly-to-sidebar animation, checklist syncing
│   ├── interactions.js         # Room interactions (Teddy wave, Lamp toggle, Curtain opening, Duvet pullback)
│   ├── ending.js               # 10/10 Grand finale sequence, gift box reveal & typewriter love letter
│   └── animations.js           # 60 FPS Canvas particle engine (hearts, fireflies, confetti)
└── README.md                   # Complete documentation & customization guide
```

---

## 🚀 How to Run Locally

1. Double-click `index.html` or open it in any web browser.
2. Alternatively, serve via VS Code Live Server or run in terminal:
   ```bash
   npx serve ./girlfriend-day
   ```
