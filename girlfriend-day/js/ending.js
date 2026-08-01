/* ==========================================================================
   HAPPY GIRLFRIEND DAY - GRAND FINALE CUTSCENE & LOVE LETTER
   
   EDIT YOUR LOVE LETTER HERE:
   Customize the final love letter text below in `LoveLetterText`.
   ========================================================================== */

/**
   CUSTOMIZABLE FINAL LOVE LETTER TEXT
   Edit your heartfelt love letter text below!
 */
const LoveLetterText = `My Dearest Love,

From the moment you entered my life, everything became warmer, brighter, and infinitely more beautiful. You have a way of turning the simplest everyday moments into unforgettable memories.

Thank you for your gentle smile, your sweet laughter, and for being my happiest place in the world. Finding all 10 hidden treasures in our cozy room was just a small glimpse of how much you mean to me.

Happy Girlfriend Day ❤️

I love you more and more every single day 💕`;


document.addEventListener('DOMContentLoaded', () => {
    window.triggerEndingSequence = triggerEndingSequence;
    setupEndingControls();
});

/**
   Trigger Grand Finale Cutscene (called when 10/10 objects are found!)
 */
function triggerEndingSequence() {
    console.log('✨ All 10 Hidden Objects Found! Unlocking Grand Finale...');

    const endingOverlay = document.getElementById('ending-overlay');
    const roomWrapper = document.querySelector('.room-wrapper');
    const endingBanner = document.getElementById('ending-banner');
    const grandGiftWrapper = document.getElementById('grand-gift-wrapper');

    // 1. Play Magic Fanfare Audio
    if (window.playSoundEffect) playSoundEffect('magic');

    // 2. Dim Room Lighting & Zoom Camera into Room
    if (roomWrapper) {
        roomWrapper.style.transform = 'scale(1.08) translateY(-10px)';
        roomWrapper.style.filter = 'brightness(0.7) contrast(1.1)';
    }

    // 3. Display Ending Overlay
    if (endingOverlay) {
        endingOverlay.classList.remove('hidden');
    }

    // 4. Spawn Glowing Fireflies
    if (window.ParticleEngine) {
        window.ParticleEngine.spawnEndingFireflies(50);
    }

    // 5. Sequence Animations (Banner -> Gift Box)
    setTimeout(() => {
        if (endingBanner) endingBanner.classList.remove('hidden');
    }, 1200);

    setTimeout(() => {
        if (grandGiftWrapper) grandGiftWrapper.classList.remove('hidden');
    }, 2400);
}

/**
   Setup Interactive Gift Box, Envelope, and Love Letter Controls
 */
function setupEndingControls() {
    const grandGiftWrapper = document.getElementById('grand-gift-wrapper');
    const envelopeWrapper = document.getElementById('envelope-wrapper');
    const loveEnvelope = document.getElementById('love-envelope');
    const letterModal = document.getElementById('letter-modal');
    const replayBtn = document.getElementById('replay-btn');

    // 1. Click Center Gift Box -> Lid Opens & Envelope Emerges
    if (grandGiftWrapper) {
        grandGiftWrapper.addEventListener('click', () => {
            if (window.playSoundEffect) playSoundEffect('sparkle');

            const lid = document.querySelector('.gift-box-lid');
            if (lid) lid.classList.add('lid-opened');

            const rect = grandGiftWrapper.getBoundingClientRect();
            if (window.ParticleEngine) {
                window.ParticleEngine.spawnSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2, 20);
            }

            setTimeout(() => {
                grandGiftWrapper.style.display = 'none';
                if (envelopeWrapper) envelopeWrapper.classList.remove('hidden');
            }, 800);
        });
    }

    // 2. Click Envelope -> Unfold Letter Paper & Start Typewriter Effect
    if (envelopeWrapper) {
        envelopeWrapper.addEventListener('click', () => {
            if (window.playSoundEffect) playSoundEffect('magic');

            const rect = loveEnvelope.getBoundingClientRect();
            if (window.ParticleEngine) {
                window.ParticleEngine.spawnHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 25);
            }

            setTimeout(() => {
                envelopeWrapper.style.display = 'none';
                const banner = document.getElementById('ending-banner');
                if (banner) banner.style.display = 'none';

                if (letterModal) {
                    letterModal.classList.remove('hidden');
                    startTypewriterAnimation();
                }
            }, 600);
        });
    }

    // 3. Replay Experience Button
    if (replayBtn) {
        replayBtn.addEventListener('click', () => {
            window.location.reload();
        });
    }
}

/**
   Start Typewriter Effect for Love Letter Text
 */
function startTypewriterAnimation() {
    const typewriterElem = document.getElementById('typewriter-text');
    const signatureElem = document.getElementById('letter-signature');
    const replayBtn = document.getElementById('replay-btn');

    if (!typewriterElem) return;

    typewriterElem.textContent = '';
    let index = 0;
    const speed = 35;

    function typeNextChar() {
        if (index < LoveLetterText.length) {
            typewriterElem.textContent += LoveLetterText.charAt(index);
            index++;
            setTimeout(typeNextChar, speed);
        } else {
            // Typewriting complete -> Reveal Signature & Confetti Explosion!
            if (signatureElem) signatureElem.classList.remove('hidden');
            if (replayBtn) replayBtn.classList.remove('hidden');

            if (window.playSoundEffect) playSoundEffect('magic');
            if (window.ParticleEngine) {
                window.ParticleEngine.spawnConfettiRain(90);
            }
        }
    }

    typeNextChar();
}
