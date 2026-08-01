/* ==========================================================================
   HAPPY GIRLFRIEND DAY - ROOM SCENE & LIGHTING CONTROLLER
   
   HOW TO CUSTOMIZE:
   - Ambient Glow Color: Modify 'lampGlowGrad' stops in index.html SVG defs.
   - Shooting Star Speed: Adjust stroke-dashoffset transition in triggerShootingStar().
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initRoomScene();
});

function initRoomScene() {
    const windowGroup = document.getElementById('window-group');
    const moonElement = document.getElementById('moon-element');

    // Click Window -> Trigger Shooting Star & Star Sparkle Cascade
    if (windowGroup) {
        windowGroup.addEventListener('click', (e) => {
            // Prevent double trigger if clicking moon specifically
            if (e.target.closest('#moon-element')) return;
            triggerShootingStar();
            if (window.playSoundEffect) playSoundEffect('sparkle');
        });
    }

    // Click Moon -> Create Shooting Star Cascade
    if (moonElement) {
        moonElement.addEventListener('click', (e) => {
            e.stopPropagation();
            triggerShootingStar();
            if (window.ParticleEngine) {
                const rect = moonElement.getBoundingClientRect();
                window.ParticleEngine.spawnSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2, 18);
            }
            if (window.playSoundEffect) playSoundEffect('sparkle');
        });
    }
}

/**
   Trigger Shooting Star Animation across the night window
 */
function triggerShootingStar() {
    const starLine = document.getElementById('shooting-star-line');
    if (!starLine) return;

    starLine.style.opacity = '1';
    starLine.style.strokeDashoffset = '100';

    // Force reflow
    void starLine.offsetWidth;

    starLine.style.transition = 'stroke-dashoffset 0.8s ease-out, opacity 0.8s ease-out';
    starLine.style.strokeDashoffset = '0';

    setTimeout(() => {
        starLine.style.opacity = '0';
        setTimeout(() => {
            starLine.style.transition = 'none';
            starLine.style.strokeDashoffset = '100';
        }, 800);
    }, 600);
}
