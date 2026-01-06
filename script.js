function init() {
    // Создаем белые линии на фоне
    function createLines() {
        const linesContainer = document.getElementById('lines');
        const lineCount = 6; // fewer snowflakes per batch
        
        for (let i = 0; i < lineCount; i++) {
            const line = document.createElement('div');
            line.className = 'line';
            // Случайная позиция по горизонтали
            line.style.left = Math.random() * 100 + 'vw';

            // Размер снежинки
            const size = Math.floor(Math.random() * 10) + 6; // 6-15px
            line.style.width = size + 'px';
            line.style.height = size + 'px';

            // Случайная задержка и продолжительность (чтобы падение было естественным)
            line.style.animationDelay = Math.random() * 5 + 's';
            const duration = Math.random() * 6 + 6; // 6-12s
            line.style.animationDuration = duration + 's';

            // Случайная прозрачность и лёгкое размытие
            line.style.opacity = Math.random() * 0.6 + 0.4;
            if (Math.random() > 0.7) line.style.filter = 'blur(0.6px)';

            linesContainer.appendChild(line);

            // Удаляем снежинку после анимации
            setTimeout(() => {
                if (line.parentNode) line.remove();
            }, duration * 1000 + 2000);
        }
    }
    
    // Запускаем создание линий каждые 3 секунды
    setInterval(createLines, 3000);
    createLines(); // Первый запуск
    
    // Определяем язык и страну пользователя
    function detectLanguageAndCountry() {
        const userLang = navigator.language || navigator.userLanguage;
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
        // Языки СНГ
        const cisLanguages = ['ru', 'uk', 'be', 'kk', 'az', 'hy', 'ka', 'ky', 'tg', 'tk', 'uz'];
        
        // Временные зоны СНГ
        const cisTimezones = [
            'Europe/Moscow', 'Europe/Kiev', 'Europe/Minsk', 'Asia/Almaty',
            'Asia/Tashkent', 'Asia/Bishkek', 'Asia/Dushanbe', 'Asia/Yerevan',
            'Asia/Tbilisi', 'Europe/Simferopol'
        ];
        
        // Проверяем по языку и временной зоне
        const isCISByLang = cisLanguages.some(lang => userLang.startsWith(lang));
        const isCISByTz = cisTimezones.some(tz => timezone.includes(tz));
        
        // Если оба показателя указывают на СНГ, ставим русский
        if (isCISByLang && isCISByTz) {
            console.log('User detected from CIS region');
            return 'ru';
        } else {
            console.log('User detected from other region');
            return 'en';
        }
    }
    
    // Тексты для перевода
    const translations = {
        ru: {
            home: '🏠 Главная',
            mods: '🎮 Моды',
            contact: '📞 Связь',
            language: '🌐 Язык',
            cancel: '❌ Отмена',
            welcomeTitle: 'Добро пожаловать в Моды и Скрипты',
            welcomeText: 'Добро пожаловать на сайт модов и скриптов. Вам нужно открыть меню в правом верхнем углу и нажать кнопку "Моды", чтобы просмотреть доступные модификации. Все скрипты и моды протестированы и безопасны в использовании.',
            modsTitle: 'Доступные Моды',
            modsSubtitle: 'Выберите нужную модификацию',
            scriptTitle: 'Скрипт',
            scriptDesc: 'Скрипт для разрушения игры',
            hsTitle: 'Hypper Sandbox Mod v1.0',
            hsDesc: 'Мод: Нет рекламы, Устранение некоторых багов, Удаление половины античита, Добавление смещений для функций',
            downloadScript: 'Скачать',
            downloadHS: 'Скачать',
            discord: 'DISCORD',
            telegram: 'TELEGRAM',
            contactTitle: 'Связь с Нами',
            contactChannel: 'Наш телеграм канал:',
            contactDiscord: 'Дискорд создателя:',
            contactCreator: 'Телеграм создателя:',
            infoText: 'Вся инструкция по установке находится в архиве. Распакуйте скачанный ZIP-файл и откройте документ "INSTALL.txt" для получения подробных указаний.',
            footerText: 'By Sanbox'
        },
        en: {
            home: '🏠 Home',
            mods: '🎮 Mods',
            contact: '📞 Contact Us',
            language: '🌐 Change Language',
            cancel: '❌ Cancel',
            welcomeTitle: 'Welcome to Mods & Scripts',
            welcomeText: 'Welcome to the website of mods and scripts. You need to open the menu in the upper right corner and press the "Mods" button to view available modifications. All scripts and mods are tested and safe to use.',
            modsTitle: 'Available Mods',
            modsSubtitle: 'Select the modification you need',
            scriptTitle: 'Script',
            scriptDesc: 'Script for Destroy the Game',
            hsTitle: 'Hypper Sandbox Mod v1.0',
            hsDesc: 'Mod: No Ads, Remove some Bugs, Remove half Anti-Cheat, Add Offsets for functions',
            downloadScript: 'Download',
            downloadHS: 'Download',
            discord: 'DISCORD',
            telegram: 'TELEGRAM',
            contactTitle: 'Contact Us',
            contactChannel: 'Our telegram channel:',
            contactDiscord: 'Creator\'s Discord:',
            contactCreator: 'Creator\'s Telegram:',
            infoText: 'All installation instructions are in the archive. Extract the downloaded ZIP file and open the "INSTALL.txt" document for detailed instructions.',
            footerText: 'By Sanbox'
        }
    };
    
    // Применяем перевод
    function applyTranslation(lang) {
        const texts = translations[lang];
        
        // Меню
        document.querySelector('[data-section="home"]').textContent = texts.home;
        document.querySelector('[data-section="mods"]').textContent = texts.mods;
        document.querySelector('[data-section="contact"]').textContent = texts.contact;
        document.querySelector('[data-section="language"]').textContent = texts.language;
        document.getElementById('cancelBtn').textContent = texts.cancel;
        document.getElementById('cancelLangBtn').textContent = texts.cancel;
        
        // Главная страница
        document.querySelector('.welcome-title').textContent = texts.welcomeTitle;
        document.getElementById('welcomeText').textContent = texts.welcomeText;
        document.getElementById('discordBtn').textContent = texts.discord;
        document.getElementById('telegramBtn').textContent = texts.telegram;
        
        // Страница модов
        document.querySelectorAll('.section-title')[1].textContent = texts.modsTitle;
        document.querySelector('.section-subtitle').textContent = texts.modsSubtitle;
        document.querySelectorAll('.mod-title')[0].textContent = texts.scriptTitle;
        document.getElementById('scriptDesc').textContent = texts.scriptDesc;
        document.querySelectorAll('.mod-title')[1].textContent = texts.hsTitle;
        document.getElementById('hsDesc').textContent = texts.hsDesc;
        document.getElementById('downloadScript').textContent = texts.downloadScript;
        document.getElementById('downloadHS').textContent = texts.downloadHS;
        
        // Страница контактов
        document.querySelectorAll('.section-title')[2].textContent = texts.contactTitle;
        document.querySelectorAll('.contact-text')[0].textContent = texts.contactChannel;
        document.querySelectorAll('.contact-text')[1].textContent = texts.contactDiscord;
        document.querySelectorAll('.contact-text')[2].textContent = texts.contactCreator;
        
        // Информационный текст
        document.getElementById('infoText').textContent = texts.infoText;
        
        // Футер
        document.getElementById('footerText').textContent = texts.footerText;
        
        // Сохраняем язык в localStorage
        localStorage.setItem('preferredLanguage', lang);
        document.documentElement.lang = lang;
    }
    
    // Определяем язык при загрузке
    const preferredLang = localStorage.getItem('preferredLanguage') || detectLanguageAndCountry();
    applyTranslation(preferredLang);
    
    // VPN детекция
    function detectVPN() {
        // Проверяем разницу между временными зонами браузера и системой
        const browserTime = new Date().getTimezoneOffset();
        
        // Получаем примерное местоположение по IP (через сторонний сервис)
        fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(data => {
                console.log('User location:', data);
                
                // Проверяем признаки VPN
                const vpnIndicators = [
                    data.security && data.security.vpn,
                    data.security && data.security.proxy,
                    data.security && data.security.tor,
                    data.country && data.country !== data.country_code,
                    data.region && data.region.includes('Datacenter')
                ];
                
                // Если есть признаки VPN, показываем предупреждение
                if (vpnIndicators.some(indicator => indicator === true)) {
                    showVPNWarning();
                }
            })
            .catch(error => {
                console.log('Failed to detect VPN:', error);
            });
    }
    
    function showVPNWarning() {
        const warning = document.createElement('div');
        warning.className = 'vpn-warning';
        warning.innerHTML = `
            <p>⚠️ VPN Detected! For better experience, please disable VPN.</p>
        `;
        document.body.appendChild(warning);
        
        // Удаляем предупреждение через 5 секунд
        setTimeout(() => {
            warning.remove();
        }, 5000);
    }
    
    // Запускаем VPN детекцию
    setTimeout(detectVPN, 1000);
    
    // Управление меню
    const menuBtn = document.getElementById('menuBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const languageMenu = document.getElementById('languageMenu');
    const cancelBtn = document.getElementById('cancelBtn');
    const cancelLangBtn = document.getElementById('cancelLangBtn');
    const langBtns = document.querySelectorAll('.lang-btn');
    const menuItems = document.querySelectorAll('.menu-item[data-section]');
    
    menuBtn.addEventListener('click', function() {
        dropdownMenu.classList.toggle('hidden');
        languageMenu.classList.add('hidden');
    });
    
    cancelBtn.addEventListener('click', function() {
        dropdownMenu.classList.add('hidden');
    });
    
    cancelLangBtn.addEventListener('click', function() {
        languageMenu.classList.add('hidden');
        dropdownMenu.classList.remove('hidden');
    });
    
    // Переключение между разделами
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.dataset.section;
            
            if (section === 'language') {
                dropdownMenu.classList.add('hidden');
                languageMenu.classList.remove('hidden');
                return;
            }
            
            // Скрываем все разделы
            document.querySelectorAll('.section').forEach(s => {
                s.classList.remove('active');
                s.classList.add('hidden');
            });
            
            // Показываем выбранный раздел
            document.getElementById(section).classList.remove('hidden');
            document.getElementById(section).classList.add('active');
            
            // Скрываем меню
            dropdownMenu.classList.add('hidden');
        });
    });
    
    // Смена языка
    langBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            applyTranslation(lang);
            languageMenu.classList.add('hidden');
        });
    });

    // Закрывать меню при клике вне его (перенесено сюда чтобы переменные были определены)
    document.addEventListener('click', function(e) {
        const isClickInsideMenu = dropdownMenu.contains(e.target) || menuBtn.contains(e.target) || languageMenu.contains(e.target);
        if (!isClickInsideMenu) {
            dropdownMenu.classList.add('hidden');
            languageMenu.classList.add('hidden');
        }
    });
    
    // Функционал кнопок скачивания
    const downloadBtns = document.querySelectorAll('.download-btn');
    
    downloadBtns.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('loading')) return;
            
            const fileName = this.dataset.file;
            startDownload(this, fileName);
        });
    });
    
    function startDownload(button, fileName) {
        button.classList.add('loading');
        const btnText = button.querySelector('.btn-text');
        const loadingBars = button.querySelector('.loading-bars');
        const originalText = btnText.textContent;
        
        btnText.textContent = 'DOWNLOADING...';
        loadingBars.classList.add('active');
        
        // Имитация загрузки
        setTimeout(() => {
            // Скачиваем файл
            const link = document.createElement('a');
            link.href = fileName;
            link.download = fileName;
            document.body.appendChild(link);
            
            try {
                link.click();
            } catch (error) {
                console.log('File not found:', fileName);
                const currentLang = localStorage.getItem('preferredLanguage') || 'en';
                const errorMsg = currentLang === 'ru' 
                    ? `Файл ${fileName} не найден. Убедитесь, что он находится в той же папке.`
                    : `File ${fileName} not found. Make sure it's in the same folder.`;
                alert(errorMsg);
            }
            
            document.body.removeChild(link);
            
            // Возвращаем исходное состояние кнопки
            setTimeout(() => {
                button.classList.remove('loading');
                btnText.textContent = originalText;
                loadingBars.classList.remove('active');
            }, 1000);
        }, 2000);
    }
    
    // Анимации при наведении
    const buttons = document.querySelectorAll('button, .social-btn, .contact-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('loading')) {
                this.style.transform = '';
            }
        });
        
        button.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(2px)';
        });
        
        button.addEventListener('touchend', function() {
            if (!this.classList.contains('loading')) {
                this.style.transform = '';
            }
        });
    });
    
    // Анимация фона
    function animateBackground() {
        const bg = document.querySelector('.animated-bg');
        let position = 0;
        
        setInterval(() => {
            position += 1;
            bg.style.backgroundPosition = `${position}px ${position}px`;
        }, 50);
    }
    
    animateBackground();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}