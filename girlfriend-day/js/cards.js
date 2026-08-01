/* ==========================================================================
   HAPPY GIRLFRIEND DAY - HIDDEN CARDS & COLLECTION CONTROLLER
   
   EDIT YOUR MESSAGES HERE:
   Each card message can be customized below in the `CardMessages` object.
   ========================================================================== */

/**
   CUSTOMIZABLE CARD MESSAGES
   Edit any of the 10 messages below to personalize your Girlfriend Day surprise!
 */
const CardMessages = {
    // Edit your message here: Card 1 (Behind Teddy Bear)
    1: "You make every ordinary day feel like a magical fairy tale ❤️",

    // Edit your message here: Card 2 (Under Pillow on Bed)
    2: "Your warm smile is my favorite place in the whole wide world 💕",

    // Edit your message here: Card 3 (Inside Desk Drawer)
    3: "Every single moment spent with you becomes my most treasured memory 💖",

    // Edit your message here: Card 4 (Behind Flower Vase)
    4: "You bring so much sweetness, beauty, and happiness into my life 🌸",

    // Edit your message here: Card 5 (On Bookshelf)
    5: "In a world full of endless stories, loving you is my absolute favorite 📖",

    // Edit your message here: Card 6 (Near Window Curtain)
    6: "Even when looking at all the stars in the night sky, you shine the brightest ✨",

    // Edit your message here: Card 7 (Behind Floor Gift Box)
    7: "Being loved by you is the greatest gift I could ever ask for 🎁",

    // Edit your message here: Card 8 (Under Desk)
    8: "No matter where life takes us, my heart will always belong to yours 🌷",

    // Edit your message here: Card 9 (Behind Picture Frame)
    9: "Looking at you reminds me how lucky I am every single day 🖼️",

    // Edit your message here: Card 10 (Tucked near Corner Lamp)
    10: "You are my sunshine, my soulmate, and my whole universe 👑"
};

document.addEventListener('DOMContentLoaded', () => {
    initHiddenCards();
    setupModalControls();
});

/**
   Initialize Hidden Cards Event Listeners
 */
function initHiddenCards() {
    const cards = document.querySelectorAll('.hidden-card');

    cards.forEach((card) => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            const cardId = card.getAttribute('data-card-id');
            collectCard(card, cardId);
        });

        // Touch support for mobile devices
        card.addEventListener('touchstart', (e) => {
            e.stopPropagation();
            const cardId = card.getAttribute('data-card-id');
            collectCard(card, cardId);
        }, { passive: false });
    });
}

/**
   Collect Card Handler
   @param {Element} cardElem - SVG Card Element
   @param {string} cardId - Unique Card ID (1-10)
 */
function collectCard(cardElem, cardId) {
    if (AppState.foundCards.has(cardId)) return;

    // 1. Mark as collected in AppState
    AppState.foundCards.add(cardId);
    cardElem.classList.add('collected');

    // 2. Play Chime Sound Effect
    if (window.playSoundEffect) playSoundEffect('card');

    // 3. Get Card Coordinates for Particles & Flying Animation
    const rect = cardElem.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    // 4. Spawn Heart Particle Burst at Card Origin
    if (window.ParticleEngine) {
        window.ParticleEngine.spawnHeartBurst(startX, startY, 16);
    }

    // 5. Card Flying Path Animation towards top HUD counter
    animateCardToHUD(startX, startY, () => {
        // Update HUD Counter & Progress Bar
        updateHUDProgress();

        // Hide SVG card element visually
        cardElem.style.opacity = '0.15';
        cardElem.style.pointerEvents = 'none';

        // Display Revealed Glassmorphism Card Popup Modal
        showCardPopupModal(cardId);
    });
}

/**
   Animate Card Flying towards top HUD counter
 */
function animateCardToHUD(startX, startY, onComplete) {
    const hudCounter = document.querySelector('.hud-counter');
    const targetRect = hudCounter ? hudCounter.getBoundingClientRect() : { left: window.innerWidth - 100, top: 20 };
    const endX = targetRect.left + targetRect.width / 2;
    const endY = targetRect.top + targetRect.height / 2;

    // Create a temporary flying card clone
    const flyer = document.createElement('div');
    flyer.innerHTML = '💌';
    flyer.style.position = 'fixed';
    flyer.style.left = `${startX - 15}px`;
    flyer.style.top = `${startY - 15}px`;
    flyer.style.fontSize = '1.8rem';
    flyer.style.zIndex = '9999';
    flyer.style.pointerEvents = 'none';
    flyer.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
    document.body.appendChild(flyer);

    // Force Reflow
    void flyer.offsetWidth;

    // Fly to HUD
    flyer.style.left = `${endX - 15}px`;
    flyer.style.top = `${endY - 15}px`;
    flyer.style.transform = 'scale(0.5) rotate(360deg)';
    flyer.style.opacity = '0.8';

    setTimeout(() => {
        flyer.remove();
        if (onComplete) onComplete();
    }, 800);
}

/**
   Update HUD Counter & Progress Bar Fill
 */
function updateHUDProgress() {
    const count = AppState.foundCards.size;
    const cardCountElem = document.getElementById('card-count');
    const progressBarFill = document.getElementById('progress-bar-fill');

    if (cardCountElem) cardCountElem.textContent = count;
    if (progressBarFill) {
        const percent = (count / AppState.totalCards) * 100;
        progressBarFill.style.width = `${percent}%`;
    }
}

/**
   Show Revealed Glassmorphism Card Popup Modal
 */
function showCardPopupModal(cardId) {
    const modal = document.getElementById('card-modal');
    const cardNum = document.getElementById('popup-card-num');
    const cardMsg = document.getElementById('popup-card-msg');

    if (cardNum) cardNum.textContent = `Love Card #${cardId}`;
    if (cardMsg) cardMsg.textContent = CardMessages[cardId] || "You are loved so much ❤️";

    if (modal) {
        modal.classList.remove('hidden');
    }
}

/**
   Setup Modal Close & Collect Button Listeners
 */
function setupModalControls() {
    const modal = document.getElementById('card-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    const collectBtn = document.getElementById('modal-collect-btn');

    function closeModal() {
        if (!modal) return;
        modal.classList.add('hidden');
        if (window.playSoundEffect) playSoundEffect('click');

        // Check if ALL 10 CARDS ARE COLLECTED -> Trigger Grand Finale Ending!
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
