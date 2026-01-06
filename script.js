function init() {
    // Создаем снежинки на фоне
    function createLines() {
        const linesContainer = document.getElementById('lines');
        if (!linesContainer) return;
        const lineCount = 5; // fewer snowflakes per batch

        for (let i = 0; i < lineCount; i++) {
            const line = document.createElement('div');
            line.className = 'line';
            line.style.left = Math.random() * 100 + 'vw';

            const size = Math.floor(Math.random() * 12) + 6; // 6-18px
            line.style.width = size + 'px';
            line.style.height = size + 'px';

            line.style.animationDelay = (Math.random() * 5).toFixed(2) + 's';
            const duration = Math.random() * 6 + 6; // 6-12s
            line.style.animationDuration = duration.toFixed(2) + 's';

            line.style.opacity = (Math.random() * 0.5 + 0.4).toFixed(2);
            if (Math.random() > 0.75) line.style.filter = 'blur(0.6px)';

            linesContainer.appendChild(line);

            setTimeout(() => {
                if (line.parentNode) line.remove();
            }, duration * 1000 + 2000);
        }
    }

    setInterval(createLines, 3500);
    createLines();

    // Языки и переводы
    function detectLanguageAndCountry() {
        const userLang = navigator.language || navigator.userLanguage || 'en';
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
        const cisLanguages = ['ru', 'uk', 'be', 'kk', 'az', 'hy', 'ka', 'ky', 'tg', 'tk', 'uz'];
        const cisTimezones = ['Europe/Moscow', 'Europe/Kiev', 'Europe/Minsk', 'Asia/Almaty', 'Asia/Tashkent', 'Asia/Bishkek', 'Asia/Dushanbe', 'Asia/Yerevan', 'Asia/Tbilisi', 'Europe/Simferopol'];
        const isCISByLang = cisLanguages.some(lang => userLang.startsWith(lang));
        const isCISByTz = cisTimezones.some(tz => timezone.includes(tz));
        return (isCISByLang && isCISByTz) ? 'ru' : 'en';
    }

    const translations = {
        ru: {
            home: '🏠 Главная',
            mods: '🎮 Моды',
            contact: '📞 Связь',
            language: '🌐 Язык',
            cancel: '❌ Отмена',
            welcomeTitle: 'Добро пожаловать',
            welcomeText: 'Добро пожаловать на сайт модов и скриптов от Sanbox. Вам предстоит пролистать вниз и выбрать, что вы хотите скачать — мод или скрипт. Все материалы протестированы и безопасны в использовании.',
            modsTitle: 'Доступные Моды',
            modsSubtitle: 'Выберите нужную модификацию',
            scriptTitle: 'Скрипт',
            scriptDesc: 'Скрипт для разрушения игры',
            hsTitle: 'Hypper Sandbox Mod v1.0',
            hsDesc: 'Мод: Нет рекламы, устранение багов, добавление полезных функций',
            downloadScript: 'Скачать',
            downloadHS: 'Скачать',
            discord: 'DISCORD',
            telegram: 'TELEGRAM',
            contactTitle: 'Связь с нами',
            contactChannel: 'Наш телеграм канал:',
            contactDiscord: 'Дискорд создателя:',
            contactCreator: 'Телеграм создателя:',
            infoText: "Вся инструкция по установке находится в архиве. Распакуйте скачанный ZIP-файл и откройте документ 'INSTALL.txt' для получения подробных указаний.",
            footerText: 'By Sanbox'
        },
        en: {
            home: '🏠 Home',
            mods: '🎮 Mods',
            contact: '📞 Contact',
            language: '🌐 Language',
            cancel: '❌ Cancel',
            welcomeTitle: 'Welcome',
            welcomeText: 'Welcome to Sanbox mods and scripts. Scroll down to choose which mod or script you want to download. All files are tested and safe to use.',
            modsTitle: 'Available Mods',
            modsSubtitle: 'Select a modification',
            scriptTitle: 'Script',
            scriptDesc: 'Script for Destroy the Game',
            hsTitle: 'Hypper Sandbox Mod v1.0',
            hsDesc: 'Mod: No Ads, fixes, added features',
            downloadScript: 'Download',
            downloadHS: 'Download',
            discord: 'DISCORD',
            telegram: 'TELEGRAM',
            contactTitle: 'Contact Us',
            contactChannel: 'Our telegram channel:',
            contactDiscord: "Creator's Discord:",
            contactCreator: "Creator's Telegram:",
            infoText: 'All installation instructions are in the archive. Extract the ZIP and open INSTALL.txt for details.',
            footerText: 'By Sanbox'
        }
    };

    function applyTranslation(lang) {
        const texts = translations[lang] || translations.en;
        const safeSet = (selector, value, isHtml = false) => {
            const el = document.querySelector(selector);
            if (!el) return;
            if (isHtml) el.innerHTML = value; else el.textContent = value;
        };

        safeSet('.welcome-title', texts.welcomeTitle);
        safeSet('#welcomeText', texts.welcomeText);
        safeSet('#discordBtn', texts.discord);
        safeSet('#telegramBtn', texts.telegram);
        safeSet('.section-title', texts.modsTitle);
        safeSet('.section-subtitle', texts.modsSubtitle);
        const modTitles = document.querySelectorAll('.mod-title');
        if (modTitles[0]) modTitles[0].textContent = texts.scriptTitle;
        if (modTitles[1]) modTitles[1].textContent = texts.hsTitle;
        safeSet('#scriptDesc', texts.scriptDesc);
        safeSet('#hsDesc', texts.hsDesc);
        safeSet('#downloadScript', texts.downloadScript);
        safeSet('#downloadHS', texts.downloadHS);
        safeSet('#infoText', texts.infoText);
        safeSet('#footerText', texts.footerText);

        localStorage.setItem('preferredLanguage', lang);
        document.documentElement.lang = lang;
    }

    const preferredLang = localStorage.getItem('preferredLanguage') || detectLanguageAndCountry();
    applyTranslation(preferredLang);

    // VPN detection (best-effort)
    function detectVPN() {
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => {
                const indicators = [data.security && data.security.vpn, data.security && data.security.proxy, data.security && data.security.tor];
                if (indicators.some(Boolean)) showVPNWarning();
            }).catch(()=>{});
    }

    function showVPNWarning(){
        const warning = document.createElement('div');
        warning.className = 'vpn-warning';
        warning.textContent = '⚠️ VPN Detected! For better experience, please disable VPN.';
        document.body.appendChild(warning);
        setTimeout(()=> warning.remove(), 5000);
    }

    setTimeout(detectVPN, 1000);

    // Menu handlers: guarded (menu removed in new UI)
    const menuBtn = document.getElementById('menuBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const languageMenu = document.getElementById('languageMenu');
    const cancelBtn = document.getElementById('cancelBtn');
    const cancelLangBtn = document.getElementById('cancelLangBtn');
    const langBtns = document.querySelectorAll('.lang-btn');
    const menuItems = document.querySelectorAll('.menu-item[data-section]');

    if (menuBtn && dropdownMenu) menuBtn.addEventListener('click', () => dropdownMenu.classList.toggle('hidden'));
    if (cancelBtn && dropdownMenu) cancelBtn.addEventListener('click', () => dropdownMenu.classList.add('hidden'));
    if (cancelLangBtn && languageMenu && dropdownMenu) cancelLangBtn.addEventListener('click', () => { languageMenu.classList.add('hidden'); dropdownMenu.classList.remove('hidden'); });

    if (menuItems && menuItems.length) {
        menuItems.forEach(item => item.addEventListener('click', function(e){
            e.preventDefault();
            const section = this.dataset.section;
            if (!section) return;
            document.querySelectorAll('.section').forEach(s => { s.classList.remove('active'); s.classList.add('hidden'); });
            const target = document.getElementById(section);
            if (target) { target.classList.remove('hidden'); target.classList.add('active'); }
            if (dropdownMenu) dropdownMenu.classList.add('hidden');
        }));
    }

    if (langBtns && langBtns.length) langBtns.forEach(btn => btn.addEventListener('click', function(){ applyTranslation(this.dataset.lang || 'en'); if (languageMenu) languageMenu.classList.add('hidden'); }));

    // Download buttons
    const downloadBtns = document.querySelectorAll('.download-btn');
    downloadBtns.forEach(button => {
        button.addEventListener('click', function(){
            if (this.classList.contains('loading')) return;
            const fileName = this.dataset.file;
            if (!fileName) return; // guard: no attempt to download undefined
            startDownload(this, fileName);
        });
    });

    function startDownload(button, fileName){
        if (!fileName) return; // extra guard
        button.classList.add('loading');
        const btnText = button.querySelector('.btn-text');
        const loadingBars = button.querySelector('.loading-bars');
        const originalText = btnText ? btnText.textContent : '';
        if (btnText) btnText.textContent = 'DOWNLOADING...';
        if (loadingBars) loadingBars.classList.add('active');

        setTimeout(()=>{
            const link = document.createElement('a');
            link.href = encodeURI(fileName);
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setTimeout(()=>{
                button.classList.remove('loading');
                if (btnText) btnText.textContent = originalText;
                if (loadingBars) loadingBars.classList.remove('active');
            }, 800);
        }, 800);
    }

    // Button hover/touch animations (kept simple)
    const buttons = document.querySelectorAll('button, .social-btn, .contact-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(){ this.style.transform = 'translateY(-3px)'; });
        button.addEventListener('mouseleave', function(){ if (!this.classList.contains('loading')) this.style.transform = ''; });
        button.addEventListener('touchstart', function(){ this.style.transform = 'translateY(2px)'; });
        button.addEventListener('touchend', function(){ if (!this.classList.contains('loading')) this.style.transform = ''; });
    });

    // Background subtle movement
    function animateBackground(){
        const bg = document.querySelector('.animated-bg');
        if (!bg) return;
        let position = 0;
        setInterval(()=>{ position = (position + 1) % 10000; bg.style.backgroundPosition = `${position}px ${position}px`; }, 60);
    }
    animateBackground();

    // --- Simple client-side auth (localStorage) ---
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const userArea = document.getElementById('userArea');
    const userDisplay = document.getElementById('userDisplay');

    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const loginCancel = document.getElementById('loginCancel');
    const regCancel = document.getElementById('regCancel');

    const show = el => { if (el) el.classList.remove('hidden'); };
    const hide = el => { if (el) el.classList.add('hidden'); };

    function sha256hex(str){
        const enc = new TextEncoder();
        return crypto.subtle.digest('SHA-256', enc.encode(str)).then(buf => {
            return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('');
        });
    }

    function loadUsers(){
        try { return JSON.parse(localStorage.getItem('users')||'{}'); } catch(e){ return {}; }
    }
    function saveUsers(u){ localStorage.setItem('users', JSON.stringify(u)); }

    async function registerUser(){
        const u = document.getElementById('regUsername').value.trim();
        const p = document.getElementById('regPassword').value;
        const c = document.getElementById('regConfirm').value;
        const err = document.getElementById('regError');
        err.textContent='';
        if (!u) { err.textContent='Введите имя пользователя.'; return; }
        if (p.length < 6) { err.textContent='Пароль минимум 6 символов.'; return; }
        if (p !== c) { err.textContent='Пароли не совпадают.'; return; }
        const users = loadUsers();
        if (users[u]) { err.textContent='Пользователь уже существует.'; return; }
        const hash = await sha256hex(p);
        users[u] = { pass: hash, created: Date.now() };
        saveUsers(users);
        localStorage.setItem('currentUser', u);
        updateAuthUI();
        hide(registerModal);
    }

    async function loginUser(){
        const u = document.getElementById('loginUsername').value.trim();
        const p = document.getElementById('loginPassword').value;
        const err = document.getElementById('loginError');
        err.textContent='';
        if (!u || !p) { err.textContent='Введите логин и пароль.'; return; }
        const users = loadUsers();
        if (!users[u]) { err.textContent='Пользователь не найден.'; return; }
        const hash = await sha256hex(p);
        if (hash !== users[u].pass) { err.textContent='Неверный пароль.'; return; }
        localStorage.setItem('currentUser', u);
        updateAuthUI();
        hide(loginModal);
    }

    function logout(){
        localStorage.removeItem('currentUser');
        updateAuthUI();
    }

    function updateAuthUI(){
        const cur = localStorage.getItem('currentUser');
        if (cur){
            // truncate nickname to max 16 chars and add ellipsis if needed
            const maxLen = 16;
            let display = cur;
            if (display.length > maxLen) display = display.slice(0, maxLen - 3) + '...';
            userDisplay.textContent = display;
            userArea.style.display = 'flex';
            if (loginBtn) loginBtn.style.display = 'none';
            if (registerBtn) registerBtn.style.display = 'none';
        } else {
            userArea.style.display = 'none';
            if (loginBtn) loginBtn.style.display = 'inline-flex';
            if (registerBtn) registerBtn.style.display = 'inline-flex';
        }
    }

    // wire buttons
    if (loginBtn) loginBtn.addEventListener('click', ()=>{ show(loginModal); });
    if (registerBtn) registerBtn.addEventListener('click', ()=>{ show(registerModal); });
    if (loginCancel) loginCancel.addEventListener('click', ()=> hide(loginModal));
    if (regCancel) regCancel.addEventListener('click', ()=> hide(registerModal));
    if (document.getElementById('regSubmit')) document.getElementById('regSubmit').addEventListener('click', registerUser);
    if (document.getElementById('loginSubmit')) document.getElementById('loginSubmit').addEventListener('click', loginUser);
    if (logoutBtn) logoutBtn.addEventListener('click', logout);

    // initialize auth UI
    updateAuthUI();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();