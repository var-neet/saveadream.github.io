document.addEventListener('DOMContentLoaded', function() {
    const dreamCountElement = document.getElementById('dream-count');
    const compassNeedle = document.querySelector('.compass-needle');
    const dreamsContainer = document.querySelector('.dreams-container');
    const savedDreamsContainer = document.querySelector('.saved-dreams-container');
    const totalDreamsNeeded = 7;
    let dreamsSaved = 0;
    
    // Glitch effect variables
    let isGlitching = false;
    const glitchEffects = [
        () => { compassNeedle.style.filter = 'drop-shadow(0 0 10px rgba(255, 0, 0, 0.8))'; },
        () => { compassNeedle.style.transform = 'scale(1.1) rotate(5deg)'; },
        () => { compassNeedle.style.opacity = '0.7'; },
        () => { compassNeedle.style.transform = 'rotate(15deg)'; }
    ];
    
    // Start the game
    startDroppingDreams();
    startRandomGlitches();
    
    function startDroppingDreams() {
        dreamInterval = setInterval(createDream, Math.random() * 1500 + 1500);
    }
    
    function createDream() {
        if (dreamsSaved >= totalDreamsNeeded) return;
        
        const dream = document.createElement('img');
        dream.className = 'dream';
        dream.src = 'img/dream.png';
        dream.alt = 'Dream';
        
        const startX = Math.random() * (window.innerWidth - 120) + 80;
        dream.style.left = `${startX}px`;
        dream.style.top = '-100px';
        
        dream.addEventListener('click', function() {
            saveDream(dream);
        });
        
        dreamsContainer.appendChild(dream);
        animateDream(dream);
    }
    
    function animateDream(dream) {
        let position = -100;
        const fallSpeed = Math.random() * 1 + 2;
        const swayAmount = Math.random() * 20;
        const swaySpeed = Math.random() * 0.01 + 0.1;
        let time = 0;
        const startX = parseFloat(dream.style.left);
        
        function fall() {
            position += fallSpeed;
            time += swaySpeed;
            const sway = Math.sin(time) * swayAmount;
            
            dream.style.top = `${position}px`;
            dream.style.left = `${startX + sway}px`;
            
            if (position > window.innerHeight) {
                dreamsContainer.removeChild(dream);
            } else {
                requestAnimationFrame(fall);
            }
        }
        
        requestAnimationFrame(fall);
    }
    
    function saveDream(dream) {
        dreamsContainer.removeChild(dream);
        
        const savedDream = document.createElement('img');
        savedDream.className = 'saved-dream';
        savedDream.src = 'img/d.png';
        savedDream.alt = 'Saved Dream';
        savedDream.style.width = '60px';
        savedDream.style.height = '60px';
        savedDreamsContainer.appendChild(savedDream);
        
        dreamsSaved++;
        dreamCountElement.textContent = dreamsSaved;
        
        if (dreamsSaved >= totalDreamsNeeded) {
            compassNeedle.style.animation = 'none';
            compassNeedle.style.transform = 'rotate(0deg)';
            document.body.classList.add('water-background');
            dreamCountElement.parentElement.textContent = 'You found your way!';
            clearInterval(dreamInterval);
            stopGlitches();
            

        }
    }
    
    // GLITCH EFFECT FUNCTIONS
    function startRandomGlitches() {
        setInterval(() => {
            if (!isGlitching && dreamsSaved < totalDreamsNeeded && Math.random() > 0.09) {
                triggerMegaGlitch();
            }
        }, 3000);
    }
    
    function triggerMegaGlitch() {
        isGlitching = true;
        const originalAnimation = compassNeedle.style.animation;
        compassNeedle.style.animation = 'none';
        
        glitchEffects.forEach((effect, index) => {
            setTimeout(() => {
                effect();
                if (index === glitchEffects.length - 1) {
                    setTimeout(() => {
                        resetNeedleAppearance();
                        compassNeedle.style.animation = originalAnimation;
                        isGlitching = false;
                    }, 300);
                }
            }, index * 100);
        });
    }
    
    function resetNeedleAppearance() {
        compassNeedle.style.transform = '';
        compassNeedle.style.filter = 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.8))';
        compassNeedle.style.opacity = '1';
    }
    
    function stopGlitches() {
        isGlitching = true;
    }
});