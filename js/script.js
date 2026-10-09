/* ==========================================================================
   PRINCY BIRTHDAY SURPRISE - JAVASCRIPT LOGIC
   ========================================================================== */

/* --------------------------------------------------------------------------
   USER CUSTOMIZATION SECTION - EDIT YOUR DETAILS HERE
   -------------------------------------------------------------------------- */
const CONFIG = {
    // 1. Recipient Birthday Date
    birthdayDate: "10/OCT ✨",

    // 2. Music Selection (3 Songs)
    songs: [
        {
            id: "song1",
            title: "Samjhawan",
            artist: "Arijit Singh",
            src: "assets/songs/Samjhawan - NaaSongsHD.mp3",
            icon: "🎵"
        },
        {
            id: "song2",
            title: "Vhalam",
            artist: "Arijit Singh",
            src: "assets/songs/VHALAM.mp3",
            icon: "🎶"
        }
    ],

    // 3. Special Memory Cards Text (4 Cards)
    memories: [
        "You Are My Best Part Of My Life❤️🫂🌻",  // Memory 1
        "You Are My Soulmate, My Life, My Everything❤️🫠", // Memory 2
        "My Life Is Beautyful When You Are Come My Life🌻🫂",  // Memory 3
        "Tu to Maro Jigarr No Tukdoo Che Beta, Tara Vagar Mane Kyay Nathi Gamtu Je che Ee Tu j Che 🥺❤️🫀"  // Memory 4
    ],

    // 4. Photo Gallery & Photobooth Array (8 Photos)
    photos: [
        {
            src: "assets/photos/WhatsApp Image 2026-10-09 at 19.53.51.jpeg",
            caption: "❤️"
        },
        {
            src: "assets/photos/WhatsApp Image 2026-10-09 at 19.53.56.jpeg",
            caption: "🌻"
        },
        {
            src: "assets/photos/WhatsApp Image 2026-10-09 at 19.53.47.jpeg",
            caption: "🫂"
        },
        {
            src: "assets/photos/WhatsApp Image 2026-10-09 at 19.53.48.jpeg",
            caption: "🫠"
        },
        {
            src: "assets/photos/WhatsApp Image 2026-10-09 at 19.53.50.jpeg",
            caption: "💋😍"
        },
        {
            src: "assets/photos/WhatsApp Image 2026-10-09 at 19.53.52.jpeg",
            caption: "💗"
        },
        {
            src: "assets/photos/WhatsApp Image 2026-10-09 at 19.53.46.jpeg",
            caption: "🫂🫀"
        },
        {
            src: "assets/photos/WhatsApp Image 2026-10-09 at 19.53.53.jpeg",
            caption: "💋"
        }
    ],

    // 5. Heartfelt Birthday Letter Text
    letter: `Happy Birthday, Princy! ❤️🫂

Today is a special day because the world was blessed with someone who brings so much happiness, warmth, and love into the lives of the people around her. I hope your birthday brings you the same happiness that your smile brings to others.

Sometimes, the smallest moments become the most beautiful memories. The little conversations, the random laughter, the silly jokes, the unexpected surprises, and the moments when everything feels right are the things that make life so special. I hope you always have countless reasons to smile and people around you who make you feel loved, valued, and understood.

On your special day, I wish you a life filled with peace, good health, beautiful opportunities, and dreams that slowly turn into reality. May you always have the courage to follow your heart, the strength to overcome difficult days, and the happiness of knowing that you deserve every beautiful thing life has to offer.

Keep smiling, keep being yourself, and never forget how special you are. I hope this new chapter brings you unforgettable memories, countless little adventures, warm hugs, happy tears, and more reasons to celebrate life.

And whenever you look back at your memories, I hope they remind you of the beautiful moments, the people who care about you, and all the happiness still waiting ahead.

Happy Birthday once again, Princy. May your day be as lovely, cute, and unforgettable as you are. Sending you lots of love, hugs, and the warmest birthday wishes. ❤️🫀🌻🫂`
};

/* --------------------------------------------------------------------------
   APPLICATION STATE & CORE CONTROLLER
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    // Current active screen index (1..6)
    let currentScreen = 1;

    // Music Player State
    const audioPlayer = document.getElementById("bg-music-player");
    let selectedSongId = null;
    let isSynthPlaying = false;
    let audioContext = null;
    let synthInterval = null;

    // Photobooth Carousel State
    let currentPhotoIndex = 0;
    let autoSlideshowTimer = null;
    let isSlideshowPlaying = false;

    // Gift Box Interaction State
    let giftClickCount = 0;

    /* ----------------------------------------------------------------------
       1. INITIALIZATION & DATA BINDING
       ---------------------------------------------------------------------- */
    initDataBinding();
    initScreenNavigation();
    initMusicSystem();
    initMemoryCards();
    initPhotoboothCarousel();
    initSurpriseScreen();
    initAmbientHearts();

    function initDataBinding() {
        // Birthday Date
        const dateEl = document.getElementById("birthday-date-text");
        if (dateEl) dateEl.textContent = CONFIG.birthdayDate;

        // Memory Cards Text
        CONFIG.memories.forEach((memText, idx) => {
            const el = document.getElementById(`memory-text-${idx + 1}`);
            if (el) el.textContent = memText;
        });

        // Love Letter Content
        const letterContainer = document.getElementById("letter-content-area");
        if (letterContainer) {
            letterContainer.innerHTML = "";
            const paragraphs = CONFIG.letter.split("\n\n");
            paragraphs.forEach(paraText => {
                if (paraText.trim()) {
                    const p = document.createElement("p");
                    p.className = "letter-paragraph";
                    p.textContent = paraText.trim();
                    letterContainer.appendChild(p);
                }
            });
        }
    }

    /* ----------------------------------------------------------------------
       2. SCREEN NAVIGATION SYSTEM
       ---------------------------------------------------------------------- */
    function initScreenNavigation() {
        // Next buttons
        document.getElementById("btn-page-1-next")?.addEventListener("click", () => goToScreen(2));
        document.getElementById("btn-page-2-next")?.addEventListener("click", () => goToScreen(3));
        document.getElementById("btn-page-3-next")?.addEventListener("click", () => goToScreen(4));
        document.getElementById("btn-page-4-next")?.addEventListener("click", () => goToScreen(5));
        document.getElementById("btn-page-5-next")?.addEventListener("click", () => goToScreen(6));

        // Back buttons
        document.querySelectorAll(".nav-back-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const target = parseInt(btn.getAttribute("data-target"), 10);
                if (target) goToScreen(target);
            });
        });

        // Restart buttons on screen 6
        document.getElementById("btn-restart-experience")?.addEventListener("click", () => {
            resetSurpriseState();
            goToScreen(1);
        });

        document.getElementById("btn-replay-surprise")?.addEventListener("click", () => {
            resetSurpriseState();
        });
    }

    function goToScreen(screenNum) {
        if (screenNum < 1 || screenNum > 6) return;

        // Hide current screen
        const currentEl = document.getElementById(`page-${currentScreen}`);
        if (currentEl) {
            currentEl.classList.remove("active-page");
        }

        // Show target screen
        currentScreen = screenNum;
        const targetEl = document.getElementById(`page-${currentScreen}`);
        if (targetEl) {
            targetEl.classList.add("active-page");
            window.scrollTo({ top: 0, behavior: "smooth" });
        }

        // Update progress bar
        updateProgressDots(currentScreen);

        // Screen specific triggers
        if (currentScreen === 6) {
            triggerFloatingEmojis();
        }
    }

    function updateProgressDots(activeStep) {
        document.querySelectorAll(".progress-dots .dot").forEach((dot) => {
            const step = parseInt(dot.getAttribute("data-step"), 10);
            dot.classList.remove("active", "completed");
            if (step === activeStep) {
                dot.classList.add("active");
            } else if (step < activeStep) {
                dot.classList.add("completed");
            }
        });
    }

    /* ----------------------------------------------------------------------
       3. PERSISTENT AUDIO PLAYER & MUSIC SELECTION
       ---------------------------------------------------------------------- */
    function initMusicSystem() {
        const songsContainer = document.getElementById("songs-container");
        const widget = document.getElementById("persistent-music-widget");
        const widgetTitle = document.getElementById("widget-song-title");
        const playPauseBtn = document.getElementById("widget-play-pause-btn");
        const muteBtn = document.getElementById("widget-mute-btn");
        const vinylDisc = document.getElementById("vinyl-disc");
        const errorNotice = document.getElementById("audio-error-msg");
        const page2NextBtn = document.getElementById("btn-page-2-next");

        // Render song cards dynamically
        if (songsContainer) {
            songsContainer.innerHTML = "";
            CONFIG.songs.forEach(song => {
                const card = document.createElement("div");
                card.className = "song-card";
                card.setAttribute("data-id", song.id);
                card.innerHTML = `
                    <div class="song-icon-badge">${song.icon}</div>
                    <div class="song-details">
                        <div class="song-title">${escapeHtml(song.title)}</div>
                        <div class="song-artist">${escapeHtml(song.artist)}</div>
                    </div>
                    <button class="song-select-btn">Select & Play 🎵</button>
                `;

                card.addEventListener("click", () => selectAndPlaySong(song));
                songsContainer.appendChild(card);
            });
        }

        function selectAndPlaySong(song) {
            selectedSongId = song.id;

            // Update song selection UI
            document.querySelectorAll(".song-card").forEach(c => c.classList.remove("selected"));
            const activeCard = document.querySelector(`.song-card[data-id="${song.id}"]`);
            if (activeCard) activeCard.classList.add("selected");

            // Enable Page 2 Next Button
            if (page2NextBtn) {
                page2NextBtn.classList.remove("disabled");
                page2NextBtn.removeAttribute("disabled");
            }

            // Update Persistent Music Widget Display
            if (widget) widget.classList.remove("hidden");
            if (widgetTitle) widgetTitle.textContent = song.title;

            // Attempt Audio Playback
            playAudioTrack(song.src, song.title);
        }

        function playAudioTrack(src, title) {
            if (errorNotice) errorNotice.classList.add("hidden");

            // Stop Web Audio synth if running
            stopSynthMelody();

            audioPlayer.src = src;
            audioPlayer.load();

            const playPromise = audioPlayer.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setPlayingState(true);
                }).catch(err => {
                    console.warn("Audio autoplay blocked or file missing:", err);
                    // Fallback to cute synthetic ambient birthday tone generator so user experiences music regardless!
                    startSynthMelody();
                    setPlayingState(true);
                    if (errorNotice) errorNotice.classList.remove("hidden");
                });
            }
        }

        function setPlayingState(isPlaying) {
            if (isPlaying) {
                if (vinylDisc) vinylDisc.classList.add("spinning");
                if (playPauseBtn) playPauseBtn.querySelector(".icon").textContent = "⏸️";
            } else {
                if (vinylDisc) vinylDisc.classList.remove("spinning");
                if (playPauseBtn) playPauseBtn.querySelector(".icon").textContent = "▶️";
            }
        }

        // Widget Play/Pause Toggle
        if (playPauseBtn) {
            playPauseBtn.addEventListener("click", () => {
                if (isSynthPlaying) {
                    stopSynthMelody();
                    setPlayingState(false);
                } else if (audioPlayer.paused) {
                    if (audioPlayer.src) {
                        audioPlayer.play().then(() => setPlayingState(true)).catch(() => {
                            startSynthMelody();
                            setPlayingState(true);
                        });
                    } else if (CONFIG.songs.length > 0) {
                        selectAndPlaySong(CONFIG.songs[0]);
                    }
                } else {
                    audioPlayer.pause();
                    setPlayingState(false);
                }
            });
        }

        // Widget Mute/Unmute Toggle
        if (muteBtn) {
            muteBtn.addEventListener("click", () => {
                audioPlayer.muted = !audioPlayer.muted;
                muteBtn.querySelector(".icon").textContent = audioPlayer.muted ? "🔇" : "🔊";
            });
        }

        /* Ambient Birthday Synth Generator Fallback */
        function startSynthMelody() {
            if (isSynthPlaying) return;
            try {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (!AudioCtx) return;
                audioContext = new AudioCtx();
                isSynthPlaying = true;

                // Simple romantic music box notes (Happy Birthday melody frequency sequence)
                const notes = [264, 264, 297, 264, 352, 330, 264, 264, 297, 264, 396, 352];
                let noteIdx = 0;

                synthInterval = setInterval(() => {
                    if (!isSynthPlaying || !audioContext) return;
                    const osc = audioContext.createOscillator();
                    const gain = audioContext.createGain();
                    osc.type = "sine";
                    osc.frequency.setValueAtTime(notes[noteIdx], audioContext.currentTime);

                    gain.gain.setValueAtTime(0.08, audioContext.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.4);

                    osc.connect(gain);
                    gain.connect(audioContext.destination);

                    osc.start();
                    osc.stop(audioContext.currentTime + 0.45);

                    noteIdx = (noteIdx + 1) % notes.length;
                }, 500);
            } catch (e) {
                console.log("Synth music fallback notice:", e);
            }
        }

        function stopSynthMelody() {
            isSynthPlaying = false;
            if (synthInterval) clearInterval(synthInterval);
            if (audioContext) {
                try { audioContext.close(); } catch (e) { }
                audioContext = null;
            }
        }
    }

    /* ----------------------------------------------------------------------
       4. 3D FLIP MEMORY CARDS (PAGE 3)
       ---------------------------------------------------------------------- */
    function initMemoryCards() {
        const cards = document.querySelectorAll(".memory-card");
        cards.forEach(card => {
            // Mobile tap / Desktop click flip toggle
            card.addEventListener("click", (e) => {
                card.classList.toggle("flipped");
                const isFlipped = card.classList.contains("flipped");
                card.setAttribute("aria-expanded", isFlipped ? "true" : "false");
                createHeartBurstAt(e.clientX, e.clientY);
            });

            // Accessibility keyboard navigation (Enter or Space)
            card.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    card.classList.toggle("flipped");
                }
            });
        });
    }

    /* ----------------------------------------------------------------------
       5. PHOTOBOOTH POLAROID CAROUSEL (PAGE 4)
       ---------------------------------------------------------------------- */
    function initPhotoboothCarousel() {
        const imgEl = document.getElementById("carousel-img");
        const fallbackEl = document.getElementById("carousel-img-fallback");
        const fallbackNameEl = document.getElementById("fallback-img-name");
        const captionEl = document.getElementById("carousel-caption");
        const counterEl = document.getElementById("carousel-counter");
        const dotsContainer = document.getElementById("carousel-dots-container");

        const prevBtn = document.getElementById("carousel-prev-btn");
        const nextBtn = document.getElementById("carousel-next-btn");
        const autoplayBtn = document.getElementById("carousel-autoplay-btn");
        const frameEl = document.getElementById("polaroid-frame");

        if (!CONFIG.photos || CONFIG.photos.length === 0) return;

        // Render Pagination Dots
        if (dotsContainer) {
            dotsContainer.innerHTML = "";
            CONFIG.photos.forEach((_, idx) => {
                const dot = document.createElement("span");
                dot.className = `c-dot ${idx === 0 ? "active" : ""}`;
                dot.addEventListener("click", () => updateCarousel(idx));
                dotsContainer.appendChild(dot);
            });
        }

        // Show Initial Photo
        updateCarousel(0);

        // Prev & Next Buttons
        if (prevBtn) prevBtn.addEventListener("click", () => updateCarousel(currentPhotoIndex - 1));
        if (nextBtn) nextBtn.addEventListener("click", () => updateCarousel(currentPhotoIndex + 1));

        // Auto Slideshow Toggle
        if (autoplayBtn) {
            autoplayBtn.addEventListener("click", () => {
                isSlideshowPlaying = !isSlideshowPlaying;
                if (isSlideshowPlaying) {
                    autoplayBtn.textContent = "⏸ Pause";
                    autoSlideshowTimer = setInterval(() => {
                        updateCarousel(currentPhotoIndex + 1);
                    }, 3000);
                } else {
                    stopSlideshow();
                }
            });
        }

        function stopSlideshow() {
            isSlideshowPlaying = false;
            if (autoSlideshowTimer) clearInterval(autoSlideshowTimer);
            if (autoplayBtn) autoplayBtn.textContent = "▶ Slideshow";
        }

        function updateCarousel(targetIndex) {
            // Loop boundaries
            if (targetIndex < 0) targetIndex = CONFIG.photos.length - 1;
            if (targetIndex >= CONFIG.photos.length) targetIndex = 0;

            currentPhotoIndex = targetIndex;
            const photoObj = CONFIG.photos[currentPhotoIndex];

            // Animate Polaroid tilt effect
            if (frameEl) {
                frameEl.style.transform = `rotate(${(Math.random() * 4 - 2).toFixed(1)}deg) scale(0.98)`;
                setTimeout(() => {
                    frameEl.style.transform = `rotate(${(Math.random() * 3 - 1.5).toFixed(1)}deg) scale(1)`;
                }, 200);
            }

            // Update Image & Fallback
            if (imgEl && fallbackEl) {
                imgEl.classList.add("hidden");
                fallbackEl.classList.remove("hidden");
                if (fallbackNameEl) fallbackNameEl.textContent = photoObj.src;

                // Try loading user image
                const tempImg = new Image();
                tempImg.onload = () => {
                    imgEl.src = photoObj.src;
                    imgEl.classList.remove("hidden");
                    fallbackEl.classList.add("hidden");
                };
                tempImg.onerror = () => {
                    // Display aesthetic black space placeholder as requested by user
                    imgEl.classList.add("hidden");
                    fallbackEl.classList.remove("hidden");
                };
                tempImg.src = photoObj.src;
            }

            // Update Caption & Meta
            if (captionEl) captionEl.textContent = photoObj.caption;
            if (counterEl) {
                const currentFormatted = String(currentPhotoIndex + 1).padStart(2, '0');
                const totalFormatted = String(CONFIG.photos.length).padStart(2, '0');
                counterEl.textContent = `${currentFormatted} / ${totalFormatted}`;
            }

            // Update Dots
            document.querySelectorAll(".carousel-dots .c-dot").forEach((dot, idx) => {
                dot.classList.toggle("active", idx === currentPhotoIndex);
            });
        }

        // Touch Swipe Support for Mobile
        let touchStartX = 0;
        const polaroidWrapper = document.getElementById("polaroid-frame");
        if (polaroidWrapper) {
            polaroidWrapper.addEventListener("touchstart", (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            polaroidWrapper.addEventListener("touchend", (e) => {
                const touchEndX = e.changedTouches[0].screenX;
                if (touchStartX - touchEndX > 40) {
                    updateCarousel(currentPhotoIndex + 1); // Swipe left
                } else if (touchEndX - touchStartX > 40) {
                    updateCarousel(currentPhotoIndex - 1); // Swipe right
                }
            }, { passive: true });
        }
    }

    /* ----------------------------------------------------------------------
       6. PAGE 6: GRAND BIRTHDAY SURPRISE & 3D GIFT BOX (3 CLICKS)
       ---------------------------------------------------------------------- */
    function initSurpriseScreen() {
        const giftTrigger = document.getElementById("gift-box-trigger");
        const giftBox = document.getElementById("gift-box-element");
        const statusToast = document.getElementById("gift-status-toast");
        const toastText = document.getElementById("toast-text");
        const giftInstruction = document.getElementById("gift-instruction");

        const preRevealArea = document.getElementById("surprise-pre-reveal");
        const postRevealArea = document.getElementById("surprise-post-reveal");

        if (!giftTrigger) return;

        giftTrigger.addEventListener("click", (e) => {
            if (giftClickCount >= 3) return;

            giftClickCount++;
            updateClickDots(giftClickCount);

            if (giftClickCount === 1) {
                // Click 1
                if (giftBox) {
                    giftBox.classList.add("bounce-1");
                    setTimeout(() => giftBox.classList.remove("bounce-1"), 600);
                }
                showStatusToast("Something special is waiting... 💗");
                createHeartBurstAt(e.clientX, e.clientY);
            }
            else if (giftClickCount === 2) {
                // Click 2
                if (giftBox) {
                    giftBox.classList.add("shake-2");
                    setTimeout(() => giftBox.classList.remove("shake-2"), 700);
                }
                showStatusToast("One more time, Princy! 🫀✨");
                createHeartBurstAt(e.clientX, e.clientY);
            }
            else if (giftClickCount === 3) {
                // Click 3: Grand Reveal!
                if (giftBox) giftBox.classList.add("burst-open");
                if (giftInstruction) giftInstruction.textContent = "Surprise Unlocked! 🎉";
                showStatusToast("HAPPY BIRTHDAY PRINCY! ❤️✨");

                createExplosionConfetti();

                setTimeout(() => {
                    if (preRevealArea) preRevealArea.classList.add("hidden");
                    if (postRevealArea) postRevealArea.classList.remove("hidden");
                }, 800);
            }
        });

        function showStatusToast(message) {
            if (!statusToast || !toastText) return;
            toastText.textContent = message;
            statusToast.classList.remove("hidden");
        }

        function updateClickDots(count) {
            for (let i = 1; i <= 3; i++) {
                const dot = document.getElementById(`click-dot-${i}`);
                if (dot) {
                    if (i <= count) dot.classList.add("filled");
                    else dot.classList.remove("filled");
                }
            }
        }
    }

    function resetSurpriseState() {
        giftClickCount = 0;
        const preRevealArea = document.getElementById("surprise-pre-reveal");
        const postRevealArea = document.getElementById("surprise-post-reveal");
        const giftBox = document.getElementById("gift-box-element");
        const statusToast = document.getElementById("gift-status-toast");
        const giftInstruction = document.getElementById("gift-instruction");

        if (giftBox) giftBox.className = "gift-box";
        if (statusToast) statusToast.classList.add("hidden");
        if (giftInstruction) giftInstruction.textContent = "Tap the gift box 3 times to open your surprise ❤️";

        for (let i = 1; i <= 3; i++) {
            const dot = document.getElementById(`click-dot-${i}`);
            if (dot) dot.classList.remove("filled");
        }

        if (preRevealArea) preRevealArea.classList.remove("hidden");
        if (postRevealArea) postRevealArea.classList.add("hidden");
    }

    /* ----------------------------------------------------------------------
       7. ANIMATED FLOATING EMOJIS & CONFETTI ENGINE
       ---------------------------------------------------------------------- */
    function triggerFloatingEmojis() {
        const container = document.getElementById("floating-emojis-layer");
        if (!container) return;
        container.innerHTML = "";

        const emojis = ["❤️", "🫀", "✨", "🌻", "🫂", "💖", "🎀", "🌸"];
        const totalItems = 24;

        for (let i = 0; i < totalItems; i++) {
            const el = document.createElement("div");
            el.className = "floating-emoji-item";
            el.textContent = emojis[Math.floor(Math.random() * emojis.length)];

            const leftPos = Math.random() * 100;
            const delay = Math.random() * 6;
            const duration = 6 + Math.random() * 6;
            const fontSize = 16 + Math.random() * 24;

            el.style.left = `${leftPos}%`;
            el.style.animationDelay = `${delay}s`;
            el.style.animationDuration = `${duration}s`;
            el.style.fontSize = `${fontSize}px`;

            container.appendChild(el);
        }
    }

    function initAmbientHearts() {
        const container = document.getElementById("ambient-hearts-container");
        if (!container) return;

        setInterval(() => {
            const heart = document.createElement("div");
            heart.textContent = Math.random() > 0.5 ? "💖" : "✨";
            heart.style.position = "absolute";
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.bottom = "-20px";
            heart.style.fontSize = `${12 + Math.random() * 16}px`;
            heart.style.opacity = (0.3 + Math.random() * 0.5).toFixed(2);
            heart.style.transition = "all 6s linear";
            heart.style.pointerEvents = "none";

            container.appendChild(heart);

            setTimeout(() => {
                heart.style.transform = `translateY(-105vh) rotate(${Math.random() * 360}deg)`;
            }, 50);

            setTimeout(() => {
                heart.remove();
            }, 6200);
        }, 1800);
    }

    function createHeartBurstAt(x, y) {
        if (!x || !y) return;
        const hearts = ["❤️", "✨", "🌸", "💖"];
        for (let i = 0; i < 6; i++) {
            const p = document.createElement("div");
            p.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            p.style.position = "fixed";
            p.style.left = `${x}px`;
            p.style.top = `${y}px`;
            p.style.fontSize = `${16 + Math.random() * 12}px`;
            p.style.pointerEvents = "none";
            p.style.zIndex = "999";
            p.style.transition = "all 0.8s ease-out";

            document.body.appendChild(p);

            const angle = Math.random() * Math.PI * 2;
            const dist = 40 + Math.random() * 60;
            const tx = Math.cos(angle) * dist;
            const ty = Math.sin(angle) * dist - 30;

            setTimeout(() => {
                p.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
                p.style.opacity = "0";
            }, 20);

            setTimeout(() => p.remove(), 850);
        }
    }

    function createExplosionConfetti() {
        const canvas = document.getElementById("confetti-canvas");
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const colors = ["#ff6584", "#e63956", "#ffd1df", "#ffffff", "#f472b6", "#ffd700"];

        for (let i = 0; i < 140; i++) {
            particles.push({
                x: canvas.width / 2,
                y: canvas.height / 2,
                vx: (Math.random() - 0.5) * 18,
                vy: (Math.random() - 0.7) * 20,
                size: 6 + Math.random() * 8,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rSpeed: (Math.random() - 0.5) * 12,
                opacity: 1
            });
        }

        let animationFrame;
        function renderConfetti() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let activeParticles = 0;

            particles.forEach(p => {
                if (p.opacity <= 0) return;
                activeParticles++;

                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.35; // Gravity
                p.rotation += p.rSpeed;
                p.opacity -= 0.008;

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.globalAlpha = Math.max(0, p.opacity);
                ctx.fillStyle = p.color;

                // Draw small confetti square or heart
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                ctx.restore();
            });

            if (activeParticles > 0) {
                animationFrame = requestAnimationFrame(renderConfetti);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }

        renderConfetti();
    }

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }
});
