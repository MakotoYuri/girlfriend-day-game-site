/* ==========================================================================
   HAPPY GIRLFRIEND DAY - HIDDEN OBJECTS & SIDEBAR CHECKLIST CONTROLLER
   
   EDIT YOUR MESSAGES HERE:
   Each object message can be customized below in `HiddenObjectData`.
   ========================================================================== */

/**
   CUSTOMIZABLE HIDDEN OBJECT DATA
   Edit any of the 10 messages or object names below!
 */
const HiddenObjectData = {
    // Edit your message here: Object 1 (Plush Teddy Bear)
    1: {
        name: "Plush Teddy Bear 🧸",
        icon: "🧸",
        message: "You make every ordinary day feel like a cozy magical fairy tale ❤️"
    },

    // Edit your message here: Object 2 (Heart Pillow)
    2: {
        name: "Heart Pillow 💖",
        icon: "💖",
        message: "Your warm hug is my favorite place in the whole wide world 💕"
    },

    // Edit your message here: Object 3 (Secret Love Note)
    3: {
        name: "Secret Love Note 💌",
        icon: "💌",
        message: "Every single moment spent with you becomes my most treasured memory 💖"
    },

    // Edit your message here: Object 4 (Fresh Rose)
    4: {
        name: "Fresh Rose 🌸",
        icon: "🌸",
        message: "You bring so much sweetness, color, and happiness into my life 🌸"
    },

    // Edit your message here: Object 5 (Storybook)
    5: {
        name: "Storybook 📖",
        icon: "📖",
        message: "In a world full of endless stories, loving you is my absolute favorite 📖"
    },

    // Edit your message here: Object 6 (Surprise Gift Box)
    6: {
        name: "Surprise Gift Box 🎁",
        icon: "🎁",
        message: "Being loved by you is the greatest gift I could ever ask for 🎁"
    },

    // Edit your message here: Object 7 (Heart Picture Frame)
    7: {
        name: "Heart Picture Frame 🖼️",
        icon: "🖼️",
        message: "Looking at you reminds me how lucky I am every single day 🖼️"
    },

    // Edit your message here: Object 8 (Sweet Cupcake)
    8: {
        name: "Sweet Cupcake 🧁",
        icon: "🧁",
        message: "You are sweeter than any treat in the entire universe 🧁"
    },

    // Edit your message here: Object 9 (Romantic Key)
    9: {
        name: "Romantic Key 🔑",
        icon: "🔑",
        message: "You hold the secret key to my heart forever and ever 🔑"
    },

    // Edit your message here: Object 10 (Moon Charm)
    10: {
        name: "Moon Charm 🌙",
        icon: "🌙",
        message: "I love you to the moon, all the stars, and back again 🌙"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initSidebarControls();
    initHiddenObjects();
    setupModalControls();
});

/**
   Sidebar Slide-In / Out Toggle Controller
 */
function initSidebarControls() {
    const sidebar = document.getElementById('sidebar-panel');
    const toggleBtn = document.getElementById('sidebar-toggle-btn');
    const closeBtn = document.getElementById('sidebar-close-btn');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (sidebar) sidebar.classList.toggle('open');
            if (window.playSoundEffect) playSoundEffect('click');
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (sidebar) sidebar.classList.remove('open');
            if (window.playSoundEffect) playSoundEffect('click');
        });
    }

    // Auto-open sidebar briefly at start to show checklist
    setTimeout(() => {
        if (sidebar && AppState.foundCards.size === 0) {
            sidebar.classList.add('open');
            setTimeout(() => sidebar.classList.remove('open'), 3000);
        }
    }, 1000);
}

/**
   Initialize Hidden Target Objects
 */
function initHiddenObjects() {
    const targets = document.querySelectorAll('.hidden-target-object');

    targets.forEach((target) => {
        const objId = target.getAttribute('data-object-id');

        // Unified click handler (prevents touch double-triggering)
        target.addEventListener('click', (e) => {
            e.stopPropagation();
            collectHiddenObject(target, objId);
        });
    });
}

/**
   Collect Hidden Object Handler
 */
function collectHiddenObject(targetElem, objId) {
    if (AppState.foundCards.has(objId)) return;

    // 1. Mark as collected
    AppState.foundCards.add(objId);
    targetElem.classList.add('found-object');

    // 2. Play Chime Sound
    if (window.playSoundEffect) playSoundEffect('card');

    // 3. Calculate Origin & Target Coordinates
    const rect = targetElem.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    // 4. Spawn Heart Burst Particles
    if (window.ParticleEngine) {
        window.ParticleEngine.spawnHeartBurst(startX, startY, 16);
    }

    // 5. Animate Flying Icon to Sidebar
    animateIconToSidebar(objId, startX, startY, () => {
        // Mark Sidebar item as checked
        markSidebarItemFound(objId);

        // Update Progress Counters
        updateProgressHUD();

        // Display Object Revealed Modal
        showObjectPopupModal(objId);
    });
}

/**
   Animate Flying Icon from room object straight into sidebar item row
 */
function animateIconToSidebar(objId, startX, startY, onComplete) {
    const sidebarItem = document.querySelector(`.checklist-item[data-object-id="${objId}"]`);
    const targetRect = sidebarItem ? sidebarItem.getBoundingClientRect() : { left: 40, top: 100 };
    const endX = targetRect.left + targetRect.width / 2;
    const endY = targetRect.top + targetRect.height / 2;

    const data = HiddenObjectData[objId] || { icon: '✨' };

    const flyer = document.createElement('div');
    flyer.innerHTML = data.icon;
    flyer.style.position = 'fixed';
    flyer.style.left = `${startX - 15}px`;
    flyer.style.top = `${startY - 15}px`;
    flyer.style.fontSize = '2rem';
    flyer.style.zIndex = '9999';
    flyer.style.pointerEvents = 'none';
    flyer.style.transition = 'all 0.85s cubic-bezier(0.34, 1.56, 0.64, 1)';
    document.body.appendChild(flyer);

    void flyer.offsetWidth; // Force Reflow

    flyer.style.left = `${endX - 15}px`;
    flyer.style.top = `${endY - 15}px`;
    flyer.style.transform = 'scale(0.6) rotate(360deg)';
    flyer.style.opacity = '0.9';

    setTimeout(() => {
        flyer.remove();
        if (onComplete) onComplete();
    }, 850);
}

/**
   Mark Sidebar Item as Found
 */
function markSidebarItemFound(objId) {
    const sidebarItem = document.querySelector(`.checklist-item[data-object-id="${objId}"]`);
    if (!sidebarItem) return;

    sidebarItem.classList.add('found');
    const statusElem = sidebarItem.querySelector('.item-status');
    if (statusElem) statusElem.textContent = '✨';
}

/**
   Update Progress Counters & Progress Bar Fill
 */
function updateProgressHUD() {
    const count = AppState.foundCards.size;
    const hudCount = document.getElementById('found-count-hud');
    const sidebarText = document.getElementById('sidebar-counter-text');
    const progressFill = document.getElementById('progress-bar-fill');

    if (hudCount) hudCount.textContent = count;
    if (sidebarText) sidebarText.textContent = `${count} / 10 Found`;
    if (progressFill) {
        const percent = (count / AppState.totalCards) * 100;
        progressFill.style.width = `${percent}%`;
    }
}

/**
   Show Object Revealed Modal Popup
 */
function showObjectPopupModal(objId) {
    const modal = document.getElementById('object-modal');
    const iconBadge = document.getElementById('popup-obj-icon');
    const nameBadge = document.getElementById('popup-obj-name');
    const msgElem = document.getElementById('popup-obj-msg');

    const data = HiddenObjectData[objId] || { name: 'Hidden Object', icon: '💖', message: 'You are loved! ❤️' };

    if (iconBadge) iconBadge.textContent = data.icon;
    if (nameBadge) nameBadge.textContent = data.name;
    if (msgElem) msgElem.textContent = data.message;

    if (modal) modal.classList.remove('hidden');
}

/**
   Setup Modal Close & Collect Controls
 */
function setupModalControls() {
    const modal = document.getElementById('object-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    const collectBtn = document.getElementById('modal-collect-btn');

    function closeModal() {
        if (!modal) return;
        modal.classList.add('hidden');
        if (window.playSoundEffect) playSoundEffect('click');

        // Check if ALL 10 OBJECTS ARE FOUND -> Trigger Grand Finale Cutscene!
        if (AppState.foundCards.size === AppState.totalCards && !AppState.isEndingUnlocked) {
            AppState.isEndingUnlocked = true;
            setTimeout(() => {
                if (window.triggerEndingSequence) window.triggerEndingSequence();
            }, 600);
        }
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (collectBtn) collectBtn.addEventListener('click', closeModal);
}
