document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('.retro-title');
    if (title) {
        const originalText = title.textContent;
        title.textContent = '';
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                title.textContent += originalText.charAt(i++);
                setTimeout(typeWriter, 100);
            }
        };
        setTimeout(typeWriter, 500);
    }

    let lastFlicker = 0;
    const crtFlicker = (timestamp) => {
        if (timestamp - lastFlicker > 3000) {
            document.body.style.opacity = 0.98 + Math.random() * 0.04;
            lastFlicker = timestamp;
        }
        requestAnimationFrame(crtFlicker);
    };
    requestAnimationFrame(crtFlicker);

    const scanLine = document.createElement('div');
    scanLine.className = 'scan-line';
    document.body.appendChild(scanLine);
    
    let scanPos = -100;
    const animateScanLine = () => {
        scanPos = (scanPos + 1) % (window.innerHeight + 100);
        scanLine.style.transform = `translateY(${scanPos}px)`;
        requestAnimationFrame(animateScanLine);
    };
    setTimeout(animateScanLine, 1500);

    const buttons = document.querySelectorAll('a');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.textShadow = '0 0 8px rgba(128, 222, 234, 0.8)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.textShadow = 'none';
        });
    });

    const animateFadeIn = () => {
        const elements = document.querySelectorAll('body > *');
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });

        let delay = 100;
        elements.forEach(el => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, delay);
            delay += 100;
        });
    };
    setTimeout(animateFadeIn, 300);

    // что такое параплакс
    const subtleParallax = () => {
        const scrollY = window.scrollY;
        document.body.style.backgroundPositionY = `${scrollY * 0.3}px`;
    };
    window.addEventListener('scroll', subtleParallax);

    const createStars = () => {
        const stars = document.createElement('div');
        stars.className = 'stars';
        document.body.appendChild(stars);

        for (let i = 0; i < 30; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 100}vw`;
            star.style.top = `${Math.random() * 100}vh`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            stars.appendChild(star);
        }
    };
    createStars();

    // ее глаза также будут светиться когда увидит меня :3
    const cursorLight = (e) => {
        const cursor = document.querySelector('.cursor-light') || document.createElement('div');
        cursor.className = 'cursor-light';
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        document.body.appendChild(cursor);
    };
    document.addEventListener('mousemove', cursorLight);

    // градиент анимку получил
    const animateTitleGradient = () => {
        const title = document.querySelector('.retro-title');
        if (!title) return;

        let hue = 0;
        setInterval(() => {
            hue = (hue + 0.5) % 360;
            title.style.textShadow = `
                0 0 5px hsl(${hue}, 100%, 70%),
                0 0 15px hsl(${(hue + 60) % 360}, 100%, 50%)
            `;
        }, 100);
    };
    animateTitleGradient();

    // знаете что пульсирует? это нельзя писать
    const breathingFooter = () => {
        const footer = document.querySelector('.retro-footer');
        if (!footer) return;

        let scale = 1;
        let direction = 0.002;
        
        const animate = () => {
            scale += direction;
            if (scale > 1.02 || scale < 0.98) direction *= -1;
            
            footer.style.transform = `scale(${scale})`;
            requestAnimationFrame(animate);
        };
        animate();
    };
    breathingFooter();
});

// хэды эти ваши достали меня
document.head.insertAdjacentHTML('beforeend', `
    <style>
        /* сканлайн вроде */
        .scan-line {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(to bottom, transparent, rgba(128, 222, 234, 0.5), transparent);
            z-index: 9999;
            pointer-events: none;
            transform: translateY(-100%);
        }
        
        /* звезды мерцают (эпилептики не смотрите пж) */
        .stars {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        }
        .star {
            position: absolute;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
            animation: twinkle 3s infinite alternate;
        }
        @keyframes twinkle {
            0% { opacity: 0.2; }
            100% { opacity: 0.8; }
        }
        
        /* курсор светится как...  */
        .cursor-light {
            position: fixed;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, rgba(128, 222, 234, 0.1) 0%, transparent 70%);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 999;
            mix-blend-mode: screen;
        }
    </style>
`);