/* ==========================================================================
   HAPPY GIRLFRIEND DAY - MAIN APP CONTROLLER & AUDIO SYNTHESIZER
   ========================================================================== */

const AppState = {
    totalCards: 10,
    foundCards: new Set(),
    soundEnabled: true,
    isEndingUnlocked: false,
    audioCtx: null,
    userDismissedOrientation: false
};

document.addEventListener('DOMContentLoaded', () => {
    console.log('💖 Happy Girlfriend Day Mini-Game Initializing...');
    
    initAudioSystem();
    setupHUDControls();
    initOrientationEngine();
    initAutoScaler();
});

/**
   Initialize Web Audio API Synthesizer (for chimes & sound effects)
 */
function initAudioSystem() {
    const soundBtn = document.getElementById('sound-btn');
    const soundIcon = document.getElementById('sound-icon');

    function unlockAudioContext() {
        if (!AppState.audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                AppState.audioCtx = new AudioContext();
            }
        }
        if (AppState.audioCtx && AppState.audioCtx.state === 'suspended') {
            AppState.audioCtx.resume();
        }
    }

    window.addEventListener('click', unlockAudioContext, { once: true });
    window.addEventListener('touchstart', unlockAudioContext, { once: true });

    if (soundBtn) {
        soundBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            AppState.soundEnabled = !AppState.soundEnabled;
            soundIcon.textContent = AppState.soundEnabled ? '🔊' : '🔇';
            if (AppState.soundEnabled) playSoundEffect('click');
        });
    }
}

/**
   Play Web Audio Synthesized Sound Effects
 */
function playSoundEffect(type) {
    if (!AppState.soundEnabled) return;
    
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AppState.audioCtx) {
            AppState.audioCtx = new AudioContext();
        }
        const ctx = AppState.audioCtx;
        if (ctx.state === 'suspended') ctx.resume();

        const now = ctx.currentTime;

        if (type === 'card') {
            const notes = [523.25, 659.25, 783.99, 1046.50];
            notes.forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now + idx * 0.08);
                
                gain.gain.setValueAtTime(0.15, now + idx * 0.08);
                gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.3);

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start(now + idx * 0.08);
                osc.stop(now + idx * 0.08 + 0.35);
            });
        } else if (type === 'click') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.exponentialRampToValueAtTime(200, now + 0.08);

            gain.gain.setValueAtTime(0.2, now);
            gain.gain.linearRampToValueAtTime(0.01, now + 0.08);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.09);
        } else if (type === 'sparkle') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(880, now);
            osc.frequency.linearRampToValueAtTime(1760, now + 0.25);

            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.26);
        } else if (type === 'magic') {
            [523.25, 659.25, 783.99, 987.77].forEach((freq) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now);

                gain.gain.setValueAtTime(0.1, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 1.3);
            });
        }
    } catch (err) {
        console.warn('Audio playback not available:', err);
    }
}

/**
   Setup HUD Controls & Hint System
 */
function setupHUDControls() {
    const hintBtn = document.getElementById('hint-btn');
    if (hintBtn) {
        hintBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            playSoundEffect('sparkle');
            triggerCardHint();
        });
    }
}

/**
   Reworked Magical Hint System
 */
function triggerCardHint() {
    const uncollected = document.querySelectorAll('.hidden-target-object:not(.found-object)');
    if (uncollected.length === 0) return;

    const targetObj = uncollected[Math.floor(Math.random() * uncollected.length)];
    const objId = targetObj.getAttribute('data-object-id');

    if (objId === '3') {
        const drawerFront = document.getElementById('drawer-front');
        const secretNote = document.querySelector('.object-inside-drawer');
        if (drawerFront) drawerFront.style.transform = 'translateY(15px)';
        if (secretNote) {
            secretNote.style.opacity = '1';
            secretNote.style.pointerEvents = 'auto';
        }
    }

    const rect = targetObj.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const beacon = document.createElement('div');
    beacon.className = 'hint-beacon-ring';
    beacon.style.left = `${centerX}px`;
    beacon.style.top = `${centerY}px`;
    document.body.appendChild(beacon);

    const pointer = document.createElement('div');
    pointer.className = 'hint-pointer-badge';
    pointer.innerHTML = '👇 HERE! ✨';
    pointer.style.left = `${centerX}px`;
    pointer.style.top = `${rect.top - 10}px`;
    document.body.appendChild(pointer);

    const interval = setInterval(() => {
        if (window.ParticleEngine) {
            window.ParticleEngine.spawnHeartBurst(centerX, centerY, 8);
            window.ParticleEngine.spawnSparkles(centerX, centerY, 8);
        }
    }, 400);

    if (window.playSoundEffect) playSoundEffect('magic');

    setTimeout(() => {
        clearInterval(interval);
        beacon.remove();
        pointer.remove();
    }, 3500);
}

/**
   Mobile Orientation Check & Prompt Overlay Controller
 */
function initOrientationEngine() {
    const overlay = document.getElementById('orientation-overlay');
    const dismissBtn = document.getElementById('dismiss-orientation-btn');

    if (dismissBtn) {
        dismissBtn.addEventListener('click', () => {
            AppState.userDismissedOrientation = true;
            if (overlay) overlay.classList.add('hidden');
        });
    }

    function checkOrientation() {
        if (!overlay) return;
        const isMobile = window.innerWidth < 768;
        const isPortrait = window.innerHeight > window.innerWidth;

        if (isMobile && isPortrait && !AppState.userDismissedOrientation) {
            overlay.classList.remove('hidden');
        } else {
            overlay.classList.add('hidden');
        }
    }

    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    checkOrientation();
}

/**
   Auto-Scaler System: Keeps canvas and room scaling perfectly synchronized
 */
function initAutoScaler() {
    function autoScaleRoom() {
        if (window.ParticleEngine) {
            window.ParticleEngine.initCanvasSize();
        }
    }

    window.addEventListener('resize', autoScaleRoom);
    window.addEventListener('orientationchange', autoScaleRoom);
    autoScaleRoom();
}
