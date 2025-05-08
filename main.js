document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    const content = document.getElementById('content');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    content.style.opacity = 1;
    
    loadPage(window.location.pathname, false);
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageUrl = this.getAttribute('href');
            loadPage(pageUrl, true);
        });
    });

    window.addEventListener('popstate', function(e) {
        loadPage(window.location.pathname, false);
    });
}

async function loadPage(url, addToHistory = true) {
    const content = document.getElementById('content');
    
    const oldContent = content.innerHTML;
    
    const tempDiv = document.createElement('div');
    tempDiv.style.opacity = '0';
    tempDiv.style.position = 'absolute';
    tempDiv.style.top = '0';
    tempDiv.style.left = '0';
    tempDiv.style.width = '100%';
    
    tempDiv.innerHTML = '<div class="loader">Загрузка...</div>';
    content.parentNode.appendChild(tempDiv);
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Страница не найдена');
        
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        const newContent = doc.querySelector('main')?.innerHTML || doc.body.innerHTML;
        
        tempDiv.innerHTML = newContent;
        
        tempDiv.style.transition = 'opacity 300ms ease-in-out';
        tempDiv.style.opacity = '1';

        setTimeout(() => {
            content.innerHTML = newContent;
            content.parentNode.removeChild(tempDiv);
            
            updateActiveNav(url);
            
            if (addToHistory) {
                history.pushState({ url }, '', url);
            }
            
            window.scrollTo(0, 0);
        }, 300);
        
    } catch (error) {
        console.error('Ошибка загрузки:', error);
        tempDiv.innerHTML = `
            <div class="error">
                <h2>Ошибка загрузки</h2>
                <p>${error.message}</p>
                <a href="/">Вернуться на главную</a>
            </div>
        `;
        tempDiv.style.opacity = '1';
        content.parentNode.removeChild(tempDiv);
        content.innerHTML = tempDiv.innerHTML;
    }
}

function updateActiveNav(currentUrl) {
    document.querySelectorAll('.main-nav a').forEach(link => {
        const linkUrl = new URL(link.href).pathname;
        if (linkUrl === currentUrl || 
           (currentUrl === '/' && linkUrl === '/index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}