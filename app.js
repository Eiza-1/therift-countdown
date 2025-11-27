/* ============================================
   THERIFT - COUNTDOWN APP
   Stranger Things Season 5 Countdown
   ============================================ */

// Movie/Show Database
const SHOWS_DATABASE = {
    'stranger-things-s5': {
        title: 'Stranger Things - Season 5',
        description: 'The epic final chapter awaits. Prepare yourself for the ultimate battle against the darkness.',
        imdbId: 'tt3749900',
        releaseDate: '2025-02-14',
        rating: '8.7',
        votes: '1.2M',
        countries: {
            'Nigeria': { emoji: '🇳🇬', timezone: 'Africa/Lagos', offset: 1 },
            'USA (East)': { emoji: '🇺🇸', timezone: 'America/New_York', offset: -5 },
            'USA (West)': { emoji: '🇺🇸', timezone: 'America/Los_Angeles', offset: -8 },
            'UK': { emoji: '🇬🇧', timezone: 'Europe/London', offset: 0 },
            'India': { emoji: '🇮🇳', timezone: 'Asia/Kolkata', offset: 5.5 },
            'Japan': { emoji: '🇯🇵', timezone: 'Asia/Tokyo', offset: 9 },
            'Australia': { emoji: '🇦🇺', timezone: 'Australia/Sydney', offset: 11 },
            'Brazil': { emoji: '🇧🇷', timezone: 'America/Sao_Paulo', offset: -3 },
            'Canada': { emoji: '🇨🇦', timezone: 'America/Toronto', offset: -5 },
            'Germany': { emoji: '🇩🇪', timezone: 'Europe/Berlin', offset: 1 },
            'France': { emoji: '🇫🇷', timezone: 'Europe/Paris', offset: 1 },
            'South Africa': { emoji: '🇿🇦', timezone: 'Africa/Johannesburg', offset: 2 },
            'Egypt': { emoji: '🇪🇬', timezone: 'Africa/Cairo', offset: 2 },
            'Kenya': { emoji: '🇰🇪', timezone: 'Africa/Nairobi', offset: 3 },
            'Ghana': { emoji: '🇬🇭', timezone: 'Africa/Accra', offset: 0 },
            'Singapore': { emoji: '🇸🇬', timezone: 'Asia/Singapore', offset: 8 },
            'Hong Kong': { emoji: '🇭🇰', timezone: 'Asia/Hong_Kong', offset: 8 },
        }
    }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

function calculateTimeRemaining(targetDate) {
    const now = new Date();
    const target = new Date(targetDate);
    const diff = target - now;

    if (diff < 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }

    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        expired: false
    };
}

function padNumber(num) {
    return String(num).padStart(2, '0');
}

// ============================================
// DOM MANIPULATION
// ============================================

function createTimerCard(showId, countryName, countryData) {
    const releaseDate = SHOWS_DATABASE[showId].releaseDate;
    const time = calculateTimeRemaining(releaseDate);

    const card = document.createElement('div');
    card.className = 'timer-card';
    card.dataset.country = countryName;
    card.dataset.releaseDate = releaseDate;
    card.dataset.showId = showId;

    card.innerHTML = `
        <div class="card-country">
            <span class="country-emoji">${countryData.emoji}</span>
            <div>
                <div class="country-name">${countryName}</div>
                <div class="country-timezone">${countryData.timezone}</div>
            </div>
        </div>
        <div class="card-timer">
            <div class="card-timer-item">
                <div class="card-timer-number" data-timer="days">${padNumber(time.days)}</div>
                <div class="card-timer-label">Days</div>
            </div>
            <div class="card-timer-item">
                <div class="card-timer-number" data-timer="hours">${padNumber(time.hours)}</div>
                <div class="card-timer-label">Hours</div>
            </div>
            <div class="card-timer-item">
                <div class="card-timer-number" data-timer="minutes">${padNumber(time.minutes)}</div>
                <div class="card-timer-label">Mins</div>
            </div>
            <div class="card-timer-item">
                <div class="card-timer-number" data-timer="seconds">${padNumber(time.seconds)}</div>
                <div class="card-timer-label">Secs</div>
            </div>
        </div>
    `;

    return card;
}

function updateAllTimers() {
    const timersGrid = document.getElementById('timers-grid');
    if (!timersGrid) return;
    
    const cards = timersGrid.querySelectorAll('.timer-card');

    cards.forEach(card => {
        const releaseDate = card.dataset.releaseDate;
        const time = calculateTimeRemaining(releaseDate);

        const timers = {
            days: card.querySelector('[data-timer="days"]'),
            hours: card.querySelector('[data-timer="hours"]'),
            minutes: card.querySelector('[data-timer="minutes"]'),
            seconds: card.querySelector('[data-timer="seconds"]')
        };

        Object.entries(timers).forEach(([key, el]) => {
            if (!el) return;
            const newVal = padNumber(time[key]);
            if (el.textContent !== newVal) {
                el.textContent = newVal;
                el.classList.add('tick');
                window.setTimeout(() => el.classList.remove('tick'), 450);
            }
        });
    });

    updatePrimaryTimer();
    updateLastUpdated();
}

function updatePrimaryTimer() {
    const show = SHOWS_DATABASE['stranger-things-s5'];
    const releaseDate = show.releaseDate;
    const time = calculateTimeRemaining(releaseDate);

    const timerElements = {
        days: document.getElementById('primary-days'),
        hours: document.getElementById('primary-hours'),
        minutes: document.getElementById('primary-minutes'),
        seconds: document.getElementById('primary-seconds')
    };

    Object.entries(timerElements).forEach(([key, el]) => {
        if (!el) return;
        const v = padNumber(time[key]);
        if (el.textContent !== v) {
            el.textContent = v;
            el.classList.add('tick');
            window.setTimeout(() => el.classList.remove('tick'), 450);
        }
    });
}

function updateLastUpdated() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
    });
    const el = document.getElementById('last-updated');
    if (el) el.textContent = timeString;
}

function renderShowInfo(showId) {
    const show = SHOWS_DATABASE[showId];
    if (!show) return;

    const titleEl = document.getElementById('featured-title');
    const descEl = document.getElementById('featured-description');
    const infoEl = document.getElementById('show-info');
    const ratingEl = document.getElementById('imdb-rating');
    const votesEl = document.getElementById('rating-votes');
    const premiereDateEl = document.getElementById('premiere-info');
    const releaseDateEl = document.getElementById('release-date');

    if (titleEl) titleEl.textContent = show.title;
    if (descEl) descEl.textContent = show.description;
    if (infoEl) infoEl.textContent = show.description;
    if (ratingEl) ratingEl.textContent = show.rating + '/10';
    if (votesEl) votesEl.textContent = show.votes;
    if (premiereDateEl) premiereDateEl.textContent = new Date(show.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    if (releaseDateEl) releaseDateEl.textContent = new Date(show.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function initializeTimersGrid(showId) {
    const show = SHOWS_DATABASE[showId];
    if (!show) return;

    const timersGrid = document.getElementById('timers-grid');
    if (!timersGrid) return;

    timersGrid.innerHTML = '';

    Object.entries(show.countries).forEach(([countryName, countryData], index) => {
        const card = createTimerCard(showId, countryName, countryData);
        card.style.animationDelay = `${index * 0.05}s`;
        timersGrid.appendChild(card);
    });
}

// ============================================
// SECTION NAVIGATION
// ============================================

function initializeNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetSection = btn.getAttribute('data-section') + '-section';

            navBtns.forEach(b => b.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            btn.classList.add('active');
            const section = document.getElementById(targetSection);
            if (section) section.classList.add('active');
        });
    });
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const firstShowId = 'stranger-things-s5';
    
    renderShowInfo(firstShowId);
    initializeTimersGrid(firstShowId);
    updateAllTimers();
    initializeNavigation();

    // Update timers every second
    setInterval(updateAllTimers, 1000);
});
