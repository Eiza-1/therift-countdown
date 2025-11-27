/* ============================================
   ENTERTAINMENT COUNTDOWN TIMER - JavaScript
   Real-time countdown with OMDB API integration
   ============================================ */

// ============================================
// CONFIGURATION & DATA
// ============================================

// Movie/Show Database (extensible structure for future additions)
const SHOWS_DATABASE = {
    'stranger-things-s5': {
        title: '🔮 Stranger Things - Season 5 🔮',
        description: 'The final season is coming - the epic conclusion of Hawkins Lab universe',
        imdbId: 'tt3749900', // Stranger Things IMDB ID
        releaseDate: '2025-02-14', // Global base date
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
    // Future shows can be added like this:
    // 'avatar-3': { title: '🌍 Avatar 3 🌍', ... }
};

// OMDB API Configuration
const OMDB_CONFIG = {
    apiKey: 'YOUR_OMDB_API_KEY_HERE', // Get free key from http://www.omdbapi.com/apikey.aspx
    baseUrl: 'https://www.omdbapi.com/'
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Calculate time difference from now to target date
 */
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

/**
 * Pad numbers with leading zero
 */
function padNumber(num) {
    return String(num).padStart(2, '0');
}

/**
 * Format date to display string
 */
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleDateString('en-US', options);
}

/**
 * Get release date for a specific country
 * (In a real scenario, you'd fetch this from OMDB or a database)
 */
function getReleaseDate(showId, country) {
    const show = SHOWS_DATABASE[showId];
    if (!show) return null;

    // For most countries, use the base release date
    // You can customize per-country release dates here
    return show.releaseDate;
}

// ============================================
// OMDB API INTEGRATION
// ============================================

/**
 * Fetch show data from OMDB API
 * Note: You need to get a free API key from http://www.omdbapi.com/
 */
async function fetchShowDataFromOMDB(imdbId) {
    try {
        if (OMDB_CONFIG.apiKey === 'YOUR_OMDB_API_KEY_HERE') {
            console.log('Note: Set your OMDB API key in OMDB_CONFIG to fetch live data');
            return null;
        }

        const url = `${OMDB_CONFIG.baseUrl}?i=${imdbId}&apikey=${OMDB_CONFIG.apiKey}&type=series`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === 'True') {
            return data;
        }
        return null;
    } catch (error) {
        console.error('Error fetching OMDB data:', error);
        return null;
    }
}

/**
 * Search for a show on OMDB
 */
async function searchShowOnOMDB(searchTerm) {
    try {
        if (OMDB_CONFIG.apiKey === 'YOUR_OMDB_API_KEY_HERE') {
            console.log('Note: Set your OMDB API key to enable search');
            return [];
        }

        const url = `${OMDB_CONFIG.baseUrl}?s=${encodeURIComponent(searchTerm)}&apikey=${OMDB_CONFIG.apiKey}&type=series`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === 'True') {
            return data.Search || [];
        }
        return [];
    } catch (error) {
        console.error('Error searching OMDB:', error);
        return [];
    }
}

// ============================================
// DOM MANIPULATION
// ============================================

/**
 * Create a timer card for each country
 */
function createTimerCard(showId, countryName, countryData) {
    const releaseDate = getReleaseDate(showId, countryName);
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

/**
 * Update all timers
 */
function updateAllTimers() {
    const timersGrid = document.getElementById('timers-grid');
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

        // Only update DOM when value actually changes to avoid layout churn
        Object.entries(timers).forEach(([key, el]) => {
            if (!el) return;
            const newVal = padNumber(time[key]);
            if (el.textContent !== newVal) {
                el.textContent = newVal;
                // toggle a lightweight class for CSS animation (no inline styles)
                el.classList.add('tick');
                // remove the class after animation completes
                window.setTimeout(() => el.classList.remove('tick'), 600);
            }
        });
    });

    // Update primary timer (Nigeria)
    updatePrimaryTimer();
    updateLastUpdated();
}

/**
 * Update primary timer (Nigeria/Main region)
 */
function updatePrimaryTimer() {
    const currentShow = document.getElementById('show-dropdown').value;
    const show = SHOWS_DATABASE[currentShow];

    if (!show) return;

    const releaseDate = getReleaseDate(currentShow, 'Nigeria');
    const time = calculateTimeRemaining(releaseDate);

    const timerElements = {
        days: document.getElementById('primary-days'),
        hours: document.getElementById('primary-hours'),
        minutes: document.getElementById('primary-minutes'),
        seconds: document.getElementById('primary-seconds')
    };

    // Only update if changed
    if (timerElements.days) {
        const v = padNumber(time.days);
        if (timerElements.days.textContent !== v) { timerElements.days.textContent = v; timerElements.days.classList.add('tick'); setTimeout(() => timerElements.days.classList.remove('tick'), 600); }
    }
    if (timerElements.hours) {
        const v = padNumber(time.hours);
        if (timerElements.hours.textContent !== v) { timerElements.hours.textContent = v; timerElements.hours.classList.add('tick'); setTimeout(() => timerElements.hours.classList.remove('tick'), 600); }
    }
    if (timerElements.minutes) {
        const v = padNumber(time.minutes);
        if (timerElements.minutes.textContent !== v) { timerElements.minutes.textContent = v; timerElements.minutes.classList.add('tick'); setTimeout(() => timerElements.minutes.classList.remove('tick'), 600); }
    }
    if (timerElements.seconds) {
        const v = padNumber(time.seconds);
        if (timerElements.seconds.textContent !== v) { timerElements.seconds.textContent = v; timerElements.seconds.classList.add('tick'); setTimeout(() => timerElements.seconds.classList.remove('tick'), 600); }
    }
}

/**
 * Update last updated timestamp
 */
function updateLastUpdated() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
    });
    document.getElementById('last-updated').textContent = timeString;
}

/**
 * Render show information
 */
function renderShowInfo(showId) {
    const show = SHOWS_DATABASE[showId];
    if (!show) return;

    document.getElementById('featured-title').textContent = 'Season 5 Countdown';
    document.getElementById('featured-description').textContent = show.description;
    document.getElementById('show-info').textContent = show.description;
}

/**
 * Initialize timers grid for a show
 */
function initializeTimersGrid(showId) {
    const show = SHOWS_DATABASE[showId];
    if (!show) return;

    const timersGrid = document.getElementById('timers-grid');
    timersGrid.innerHTML = ''; // Clear existing cards

    Object.entries(show.countries).forEach(([countryName, countryData], index) => {
        const card = createTimerCard(showId, countryName, countryData);
        card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.05}s both`;
        timersGrid.appendChild(card);
    });
}

// ============================================
// EVENT LISTENERS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize with first show
    const firstShowId = Object.keys(SHOWS_DATABASE)[0];
    
    renderShowInfo(firstShowId);
    initializeTimersGrid(firstShowId);
    updateAllTimers();

    // Update timers every second
    setInterval(updateAllTimers, 1000);

    // Handle show dropdown change
    const showDropdown = document.getElementById('show-dropdown');
    showDropdown.addEventListener('change', (e) => {
        const selectedShow = e.target.value;
        renderShowInfo(selectedShow);
        initializeTimersGrid(selectedShow);
        updateAllTimers();
    });
});

// ============================================
// API HELPER FUNCTIONS FOR FUTURE USE
// ============================================

/**
 * Add a new show to the database (call this to add new movies/shows)
 * Usage: addNewShow('avatar-3', { title: '🌍 Avatar 3 🌍', ... })
 */
function addNewShow(showId, showData) {
    SHOWS_DATABASE[showId] = showData;
    
    // Update dropdown
    const dropdown = document.getElementById('show-dropdown');
    const option = document.createElement('option');
    option.value = showId;
    option.textContent = showData.title.replace(/[🌍🔮]/g, '').trim();
    dropdown.appendChild(option);

    console.log(`✅ Added new show: ${showId}`);
}

/**
 * Get all available shows
 */
function getAllShows() {
    return Object.entries(SHOWS_DATABASE).map(([id, data]) => ({
        id,
        title: data.title,
        description: data.description,
        releaseDate: data.releaseDate
    }));
}

/**
 * Export current state (useful for saving preferences)
 */
function exportState() {
    return {
        timestamp: new Date().toISOString(),
        shows: getAllShows(),
        currentShow: document.getElementById('show-dropdown').value
    };
}

// ============================================
// TIPS FOR SETUP
// ============================================

/*
HOW TO GET OMDB API KEY:
1. Visit: http://www.omdbapi.com/apikey.aspx
2. Sign up for a free account
3. Copy your API key
4. Replace 'YOUR_OMDB_API_KEY_HERE' in OMDB_CONFIG with your actual key

HOW TO ADD A NEW SHOW:
Example: addNewShow('dune-3', {
    title: '🪐 Dune - Part 3 🪐',
    description: 'The continuation of the epic space saga',
    imdbId: 'tt1160419',
    releaseDate: '2026-02-26',
    countries: { ... } // Copy the structure from Stranger Things
});

OMDB API ENDPOINTS YOU CAN USE:
- fetchShowDataFromOMDB(imdbId) - Get details by IMDB ID
- searchShowOnOMDB(searchTerm) - Search for shows/movies
*/
