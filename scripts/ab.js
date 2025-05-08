document.addEventListener('DOMContentLoaded', () => {
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
});

document.head.insertAdjacentHTML('beforeend', `
  <style>
      /* Сканлайн эффект */
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
      
      /* Звезды мерцают */
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
  </style>
`);

document.addEventListener('DOMContentLoaded', () => {
  const createGridOverlay = () => {
      const gridOverlay = document.createElement('div');
      gridOverlay.className = 'grid-overlay';
      document.body.appendChild(gridOverlay);
  };
  createGridOverlay();

  const createGridPattern = () => {
      const gridPattern = document.createElement('div');
      gridPattern.className = 'grid-pattern';
      document.body.appendChild(gridPattern);
  };
  createGridPattern();
});

document.addEventListener('DOMContentLoaded', function() {
    const burgerButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuItems = mobileMenu.querySelectorAll('a');
    let isMenuOpen = false;

    function openMenu() {
        if (isMenuOpen) return;
        
        mobileMenu.classList.remove('hidden');
        mobileMenu.style.display = 'block';
        
        mobileMenu.style.opacity = '0';
        mobileMenu.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            mobileMenu.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            mobileMenu.style.opacity = '1';
            mobileMenu.style.transform = 'translateY(0)';
        }, 10);
        
        isMenuOpen = true;
        document.addEventListener('click', handleClickOutside);
    }

    function closeMenu() {
        if (!isMenuOpen) return;
        
        mobileMenu.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        mobileMenu.style.opacity = '0';
        mobileMenu.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
            isMenuOpen = false;
            document.removeEventListener('click', handleClickOutside);
        }, 200);
    }

    function handleClickOutside(event) {
        if (!mobileMenu.contains(event.target) && !burgerButton.contains(event.target)) {
            closeMenu();
            burgerButton.classList.remove('active');
        }
    }

    burgerButton.addEventListener('click', function(e) {
        e.stopPropagation();
        
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
        
        this.classList.toggle('active');
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768 && isMenuOpen) {
            closeMenu();
            burgerButton.classList.remove('active');
        }
    });

    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                if (window.innerWidth < 768) {
                    closeMenu();
                    burgerButton.classList.remove('active');
                }
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});