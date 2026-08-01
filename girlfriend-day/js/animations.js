/* ==========================================================================
   HAPPY GIRLFRIEND DAY - CANVAS PARTICLE ENGINE (HEARTS, SPARKLES, CONFETTI)
   
   PERFORMANCE SETTINGS:
   - Max particles adapt automatically based on screen width for 60 FPS performance.
   - To disable mouse trail, set `enableTrail: false`.
   ========================================================================== */

class ParticleEngineClass {
    constructor() {
        this.fxCanvas = document.getElementById('fx-canvas');
        this.trailCanvas = document.getElementById('trail-canvas');
        this.endingCanvas = document.getElementById('ending-canvas');

        this.fxCtx = this.fxCanvas ? this.fxCanvas.getContext('2d') : null;
        this.trailCtx = this.trailCanvas ? this.trailCanvas.getContext('2d') : null;
        this.endingCtx = this.endingCanvas ? this.endingCanvas.getContext('2d') : null;

        this.particles = [];
        this.trailParticles = [];
        this.endingParticles = [];

        this.enableTrail = true;
        this.isMobile = window.innerWidth < 768;
        this.maxTrail = this.isMobile ? 15 : 35;

        this.initCanvasSize();
        this.setupMouseEvents();
        this.startLoop();

        window.addEventListener('resize', () => this.initCanvasSize());
    }

    initCanvasSize() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        if (this.trailCanvas) {
            this.trailCanvas.width = width;
            this.trailCanvas.height = height;
        }

        if (this.endingCanvas) {
            this.endingCanvas.width = width;
            this.endingCanvas.height = height;
        }

        const roomWrapper = document.querySelector('.room-wrapper');
        if (this.fxCanvas && roomWrapper) {
            const rect = roomWrapper.getBoundingClientRect();
            this.fxCanvas.width = rect.width;
            this.fxCanvas.height = rect.height;
        }
    }

    setupMouseEvents() {
        const handleMove = (x, y) => {
            if (!this.enableTrail) return;
            if (this.trailParticles.length < this.maxTrail) {
                this.trailParticles.push({
                    x, y,
                    size: Math.random() * 8 + 6,
                    speedX: (Math.random() - 0.5) * 1.5,
                    speedY: -Math.random() * 2 - 0.5,
                    life: 1.0,
                    decay: Math.random() * 0.03 + 0.02,
                    symbol: Math.random() > 0.5 ? '💖' : '✨'
                });
            }
        };

        window.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY));
        window.addEventListener('touchmove', (e) => {
            if (e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY);
        }, { passive: true });
    }

    /**
       Spawn Floating Hearts Burst at specified coordinates
     */
    spawnHeartBurst(x, y, count = 12) {
        if (!this.fxCtx) return;
        const actualCount = this.isMobile ? Math.floor(count * 0.6) : count;

        for (let i = 0; i < actualCount; i++) {
            const angle = (Math.PI * 2 * i) / actualCount + (Math.random() - 0.5);
            const speed = Math.random() * 4 + 2;

            this.particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 1.5,
                size: Math.random() * 14 + 10,
                alpha: 1,
                decay: Math.random() * 0.02 + 0.015,
                symbol: Math.random() > 0.3 ? '❤️' : '🌸'
            });
        }
    }

    /**
       Spawn Sparkle Particles at specified coordinates
     */
    spawnSparkles(x, y, count = 10) {
        if (!this.fxCtx) return;
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x, y,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                size: Math.random() * 12 + 8,
                alpha: 1,
                decay: Math.random() * 0.03 + 0.02,
                symbol: '✨'
            });
        }
    }

    /**
       Spawn Petal Rain (drifting rose petals)
     */
    spawnPetals(x, y, count = 15) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: x + (Math.random() - 0.5) * 40,
                y: y + (Math.random() - 0.5) * 20,
                vx: (Math.random() - 0.5) * 2,
                vy: Math.random() * 2 + 1,
                size: Math.random() * 14 + 10,
                rotation: Math.random() * Math.PI * 2,
                vRot: (Math.random() - 0.5) * 0.05,
                alpha: 1,
                decay: Math.random() * 0.015 + 0.01,
                symbol: '🌸'
            });
        }
    }

    /**
       Spawn Fireflies & Glowing Particles for Ending Sequence
     */
    spawnEndingFireflies(count = 40) {
        if (!this.endingCtx) return;
        const width = window.innerWidth;
        const height = window.innerHeight;

        for (let i = 0; i < count; i++) {
            this.endingParticles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 1.2,
                vy: -Math.random() * 1.5 - 0.3,
                radius: Math.random() * 4 + 2,
                alpha: Math.random() * 0.8 + 0.2,
                pulse: Math.random() * 0.04 + 0.02,
                color: Math.random() > 0.5 ? '#FFD700' : '#FF80AB',
                type: 'firefly'
            });
        }
    }

    /**
       Spawn Confetti & Heart Rain Explosion
     */
    spawnConfettiRain(count = 70) {
        if (!this.endingCtx) return;
        const width = window.innerWidth;
        const colors = ['#FF4081', '#FFD700', '#AB47BC', '#00E676', '#448AFF', '#FF6D00'];

        for (let i = 0; i < count; i++) {
            this.endingParticles.push({
                x: Math.random() * width,
                y: -Math.random() * 100,
                vx: (Math.random() - 0.5) * 3,
                vy: Math.random() * 4 + 2,
                size: Math.random() * 10 + 6,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * Math.PI * 2,
                vRot: (Math.random() - 0.5) * 0.1,
                type: 'confetti',
                alpha: 1
            });
        }
    }

    /**
       Main Animation Loop (60 FPS)
     */
    startLoop() {
        const render = () => {
            // 1. Render Room FX Canvas
            if (this.fxCtx && this.fxCanvas) {
                this.fxCtx.clearRect(0, 0, this.fxCanvas.width, this.fxCanvas.height);
                
                for (let i = this.particles.length - 1; i >= 0; i--) {
                    const p = this.particles[i];
                    p.x += p.vx || 0;
                    p.y += p.vy || 0;
                    if (p.rotation !== undefined) p.rotation += p.vRot || 0;
                    p.alpha -= p.decay;

                    if (p.alpha <= 0) {
                        this.particles.splice(i, 1);
                        continue;
                    }

                    this.fxCtx.save();
                    this.fxCtx.globalAlpha = Math.max(0, p.alpha);
                    this.fxCtx.font = `${p.size}px sans-serif`;
                    this.fxCtx.fillText(p.symbol, p.x, p.y);
                    this.fxCtx.restore();
                }
            }

            // 2. Render Mouse / Touch Trail Canvas
            if (this.trailCtx && this.trailCanvas) {
                this.trailCtx.clearRect(0, 0, this.trailCanvas.width, this.trailCanvas.height);

                for (let i = this.trailParticles.length - 1; i >= 0; i--) {
                    const p = this.trailParticles[i];
                    p.x += p.speedX;
                    p.y += p.speedY;
                    p.life -= p.decay;

                    if (p.life <= 0) {
                        this.trailParticles.splice(i, 1);
                        continue;
                    }

                    this.trailCtx.save();
                    this.trailCtx.globalAlpha = Math.max(0, p.life);
                    this.trailCtx.font = `${p.size}px sans-serif`;
                    this.trailCtx.fillText(p.symbol, p.x, p.y);
                    this.trailCtx.restore();
                }
            }

            // 3. Render Ending Canvas (Fireflies & Confetti)
            if (this.endingCtx && this.endingCanvas) {
                this.endingCtx.clearRect(0, 0, this.endingCanvas.width, this.endingCanvas.height);

                for (let i = this.endingParticles.length - 1; i >= 0; i--) {
                    const p = this.endingParticles[i];

                    if (p.type === 'firefly') {
                        p.x += p.vx;
                        p.y += p.vy;
                        p.alpha += Math.sin(Date.now() * 0.005) * p.pulse;

                        if (p.y < -10) p.y = window.innerHeight + 10;
                        if (p.x < 0) p.x = window.innerWidth;
                        if (p.x > window.innerWidth) p.x = 0;

                        this.endingCtx.save();
                        this.endingCtx.beginPath();
                        this.endingCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                        this.endingCtx.fillStyle = p.color;
                        this.endingCtx.globalAlpha = Math.min(1, Math.max(0.1, p.alpha));
                        this.endingCtx.shadowBlur = 12;
                        this.endingCtx.shadowColor = p.color;
                        this.endingCtx.fill();
                        this.endingCtx.restore();
                    } else if (p.type === 'confetti') {
                        p.x += p.vx;
                        p.y += p.vy;
                        p.rotation += p.vRot;

                        if (p.y > window.innerHeight) {
                            p.y = -10;
                            p.x = Math.random() * window.innerWidth;
                        }

                        this.endingCtx.save();
                        this.endingCtx.translate(p.x, p.y);
                        this.endingCtx.rotate(p.rotation);
                        this.endingCtx.fillStyle = p.color;
                        this.endingCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
                        this.endingCtx.restore();
                    }
                }
            }

            requestAnimationFrame(render);
        };

        requestAnimationFrame(render);
    }
}

// Global Instance
window.ParticleEngine = new ParticleEngineClass();
