/* ==========================================================================
   HAPPY GIRLFRIEND DAY - ROOM OBJECT INTERACTIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initObjectInteractions();
});

function initObjectInteractions() {
    setupTeddyInteraction();
    setupLampInteraction();
    setupFlowerInteraction();
    setupBooksInteraction();
    setupDrawerInteraction();
    setupCurtainInteraction();
    setupBedDuvetInteraction();
}

/**
   1. Teddy Bear Interaction: Waves arm & throws floating hearts!
 */
function setupTeddyInteraction() {
    const teddy = document.getElementById('teddy-bear');
    const teddyArm = document.getElementById('teddy-arm-left');

    if (!teddy) return;

    teddy.addEventListener('click', (e) => {
        e.stopPropagation();

        if (teddyArm) {
            teddyArm.classList.add('teddy-active-wave');
            setTimeout(() => teddyArm.classList.remove('teddy-active-wave'), 2400);
        }

        if (window.playSoundEffect) playSoundEffect('click');

        const rect = teddy.getBoundingClientRect();
        if (window.ParticleEngine) {
            window.ParticleEngine.spawnHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 3, 14);
        }
    });
}

/**
   2. Desk Lamp Interaction: Toggles cozy ambient lighting on & off!
 */
function setupLampInteraction() {
    const deskLamp = document.getElementById('desk-lamp');
    const lampGlow = document.getElementById('lamp-glow-cone');
    const ambientLighting = document.getElementById('ambient-lighting');

    let isLampOn = true;

    if (!deskLamp) return;

    deskLamp.addEventListener('click', (e) => {
        e.stopPropagation();
        isLampOn = !isLampOn;

        if (window.playSoundEffect) playSoundEffect('click');

        if (lampGlow) {
            lampGlow.style.opacity = isLampOn ? '0.85' : '0';
        }

        if (ambientLighting) {
            ambientLighting.style.opacity = isLampOn ? '1' : '0.2';
        }
    });
}

/**
   3. Flowers Interaction: Floating petals drift across the room!
 */
function setupFlowerInteraction() {
    const flowerVase = document.getElementById('flower-vase');
    if (!flowerVase) return;

    flowerVase.addEventListener('click', (e) => {
        e.stopPropagation();

        if (window.playSoundEffect) playSoundEffect('sparkle');

        const rect = flowerVase.getBoundingClientRect();
        if (window.ParticleEngine) {
            window.ParticleEngine.spawnPetals(rect.left + rect.width / 2, rect.top, 18);
        }
    });
}

/**
   4. Bookshelf Interaction
 */
function setupBooksInteraction() {
    const books = document.getElementById('shelf-books');
    if (!books) return;

    books.addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.playSoundEffect) playSoundEffect('click');
        const rect = books.getBoundingClientRect();
        if (window.ParticleEngine) {
            window.ParticleEngine.spawnSparkles(rect.left + rect.width / 2, rect.top, 10);
        }
    });
}

/**
   5. Desk Drawer Interaction: Opens drawer to reveal Object 3 (Secret Love Note)
 */
function setupDrawerInteraction() {
    const drawer = document.getElementById('desk-drawer');
    const drawerFront = document.getElementById('drawer-front');
    const secretNote = document.querySelector('.object-inside-drawer');

    let isDrawerOpen = false;

    if (!drawer) return;

    drawer.addEventListener('click', (e) => {
        e.stopPropagation();
        isDrawerOpen = !isDrawerOpen;

        if (window.playSoundEffect) playSoundEffect('click');

        if (drawerFront) {
            drawerFront.style.transform = isDrawerOpen ? 'translateY(15px)' : 'none';
        }

        if (secretNote) {
            secretNote.style.opacity = '1';
            secretNote.style.pointerEvents = 'auto';
        }
    });
}

/**
   6. Curtains Opening / Closing Interaction
 */
function setupCurtainInteraction() {
    const curtains = document.getElementById('curtains-interactive');

    if (!curtains) return;

    curtains.addEventListener('click', (e) => {
        e.stopPropagation();
        curtains.classList.toggle('curtains-opened');

        if (window.playSoundEffect) playSoundEffect('sparkle');

        const rect = curtains.getBoundingClientRect();
        if (window.ParticleEngine) {
            window.ParticleEngine.spawnSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2, 16);
        }
    });
}

/**
   7. Bed Duvet Pullback / Blanket Fluff Interaction
 */
function setupBedDuvetInteraction() {
    const bedDuvet = document.getElementById('bed-duvet');

    if (!bedDuvet) return;

    bedDuvet.addEventListener('click', (e) => {
        e.stopPropagation();
        bedDuvet.classList.toggle('duvet-pulled');

        if (window.playSoundEffect) playSoundEffect('click');

        const rect = bedDuvet.getBoundingClientRect();
        if (window.ParticleEngine) {
            window.ParticleEngine.spawnHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 14);
        }
    });
}
