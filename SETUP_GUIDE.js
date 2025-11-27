/* ============================================
   SETUP & CONFIGURATION GUIDE
   Entertainment Countdown Timer
   ============================================ */

// ============================================
// STEP 1: GET YOUR OMDB API KEY
// ============================================

/*
FREE OMDB API KEY SETUP:

1. Open in your browser: http://www.omdbapi.com/apikey.aspx
2. Click "FREE !" button
3. Fill in your email address
4. Check your email for the API key link
5. Activate your free key (1,000 requests/day)
6. Copy your API key

PAID PLANS (if you need more requests):
- $9.99/month for 100,000 requests/day
- $19.99/month for unlimited requests
*/

// ============================================
// STEP 2: UPDATE YOUR API KEY
// ============================================

// In app.js, find this section:
/*
const OMDB_CONFIG = {
    apiKey: 'YOUR_OMDB_API_KEY_HERE',
    baseUrl: 'https://www.omdbapi.com/'
};
*/

// Replace with your actual key:
/*
const OMDB_CONFIG = {
    apiKey: 'k1a2b3c4d5e6f7g8h9i0j', // Your actual key
    baseUrl: 'https://www.omdbapi.com/'
};
*/

// ============================================
// STEP 3: CUSTOMIZE RELEASE DATE
// ============================================

// In app.js, find SHOWS_DATABASE and edit:
/*
'stranger-things-s5': {
    title: '🔮 Stranger Things - Season 5 🔮',
    description: 'The final season is coming',
    imdbId: 'tt3749900',
    releaseDate: '2025-02-14', // <-- Change this date
    countries: { ... }
}
*/

// Date format must be: YYYY-MM-DD
// Time will default to 00:00 UTC

// ============================================
// STEP 4: ADD COUNTRIES
// ============================================

// To add or remove countries, edit the 'countries' object:
/*
'countries': {
    'Nigeria': { emoji: '🇳🇬', timezone: 'Africa/Lagos', offset: 1 },
    'USA (East)': { emoji: '🇺🇸', timezone: 'America/New_York', offset: -5 },
    // Add more like this:
    'Mexico': { emoji: '🇲🇽', timezone: 'America/Mexico_City', offset: -6 },
}
*/

// Format for each country:
// 'Country Name': { emoji: '🏳', timezone: 'Timezone/Code', offset: UTC_offset }

// Common timezone offsets:
// UTC+0: UK, Ghana, Portugal
// UTC+1: Nigeria, France, Germany, South Africa
// UTC+2: Egypt, Kenya, South Africa (DST)
// UTC-5: USA East, Canada East
// UTC-8: USA West, Canada West
// UTC+5.5: India
// UTC+8: Singapore, Hong Kong, China, Australia (WA)
// UTC+9: Japan
// UTC+11: Australia (Sydney)

// ============================================
// STEP 5: FIND IMDB IDS
// ============================================

/*
To find IMDB IDs for your shows:

1. Go to www.imdb.com
2. Search for the show/movie title
3. Look at the URL: www.imdb.com/title/tt1234567/
   The ID is: tt1234567

Examples:
- Stranger Things: tt3749900
- Avatar (2009): tt0499549
- Dune (2021): tt10293406
- The Last of Us: tt9253802
- Oppenheimer: tt15398776
*/

// ============================================
// TEMPLATE: ADD A NEW SHOW
// ============================================

/*
QUICK COPY-PASTE TEMPLATE:

In app.js, add this to SHOWS_DATABASE:

'your-show-id': {
    title: '🎬 Your Show Title 🎬',
    description: 'Add a compelling description here',
    imdbId: 'ttXXXXXXX', // Get from IMDB
    releaseDate: '2025-12-25', // Release date
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
*/

// ============================================
// EMOJI SUGGESTIONS FOR SHOWS
// ============================================

/*
Use matching emojis for your show titles:

Sci-Fi Shows:          🔮 Stranger Things 🔮
                       🌌 The Expanse 🌌
                       🤖 Westworld 🤖

Fantasy/Adventure:     ⚔️ Game of Thrones ⚔️
                       🧝 Lord of the Rings 🧝
                       🪐 Avatar 🪐

Action/Thriller:       🔥 Breaking Bad 🔥
                       💣 Killing Eve 💣
                       🕵️ Sherlock 🕵️

Drama:                 💔 The Crown 💔
                       🎪 Fleabag 🎪
                       👑 The Tudors 👑

Comedy:                😂 The Office 😂
                       🍕 Friends 🍕
                       🌮 Brooklyn Nine-Nine 🌮

Horror/Thriller:       👻 The Haunting 👻
                       🧟 The Walking Dead 🧟
                       🕷️ Chilling Adventures 🕷️

Movies:                🎬 Movie Title 🎬
                       🎥 Movie Title 🎥
*/

// ============================================
// OMDB API USAGE EXAMPLES
// ============================================

/*
// Get show details by IMDB ID
async function getShowDetails() {
    const data = await fetchShowDataFromOMDB('tt3749900');
    console.log(data);
    // Returns: Title, Year, Rated, Released, Runtime, Genre, Plot, etc.
}

// Search for a show
async function searchShows() {
    const results = await searchShowOnOMDB('Avatar');
    console.log(results);
    // Returns array of search results with IMDB IDs
}

// Use in your application:
async function initializeShowFromOMDB(imdbId) {
    const data = await fetchShowDataFromOMDB(imdbId);
    if (data) {
        // Use data to populate show information
        console.log(`Found: ${data.Title}`);
        console.log(`Plot: ${data.Plot}`);
        console.log(`Actors: ${data.Actors}`);
        console.log(`Year: ${data.Year}`);
    }
}
*/

// ============================================
// TIMEZONE REFERENCE
// ============================================

/*
COMMON TIMEZONES & UTC OFFSETS:

Africa:
- Ghana (Accra): UTC+0, emoji: 🇬🇭
- Nigeria (Lagos): UTC+1, emoji: 🇳🇬
- Egypt (Cairo): UTC+2, emoji: 🇪🇬
- Kenya (Nairobi): UTC+3, emoji: 🇰🇪
- South Africa (Johannesburg): UTC+2, emoji: 🇿🇦

Americas:
- USA (Los Angeles): UTC-8, emoji: 🇺🇸
- USA (Chicago): UTC-6, emoji: 🇺🇸
- USA (New York): UTC-5, emoji: 🇺🇸
- Canada (Toronto): UTC-5, emoji: 🇨🇦
- Brazil (São Paulo): UTC-3, emoji: 🇧🇷
- Mexico (Mexico City): UTC-6, emoji: 🇲🇽

Europe:
- UK (London): UTC+0, emoji: 🇬🇧
- France (Paris): UTC+1, emoji: 🇫🇷
- Germany (Berlin): UTC+1, emoji: 🇩🇪
- Spain (Madrid): UTC+1, emoji: 🇪🇸
- Italy (Rome): UTC+1, emoji: 🇮🇹
- Russia (Moscow): UTC+3, emoji: 🇷🇺

Asia:
- India (New Delhi): UTC+5:30, emoji: 🇮🇳
- Singapore: UTC+8, emoji: 🇸🇬
- Hong Kong: UTC+8, emoji: 🇭🇰
- China (Beijing): UTC+8, emoji: 🇨🇳
- Japan (Tokyo): UTC+9, emoji: 🇯🇵
- South Korea (Seoul): UTC+9, emoji: 🇰🇷

Oceania:
- Australia (Sydney): UTC+11, emoji: 🇦🇺
- Australia (Perth): UTC+8, emoji: 🇦🇺
- New Zealand (Auckland): UTC+13, emoji: 🇳🇿

NOTE: Daylight Saving Time affects some timezones
Use the standard (winter) offset for consistency
*/

// ============================================
// COLOR GRADIENT CUSTOMIZATION
// ============================================

/*
In styles.css, you can customize colors:

:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    --tertiary-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    --dark-gradient: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
    --accent-gradient: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

Popular gradient combinations:

Cyberpunk:
linear-gradient(135deg, #667eea 0%, #764ba2 100%)

Sunset:
linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)

Ocean:
linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)

Forest:
linear-gradient(135deg, #134e5e 0%, #71b280 100%)

Fire:
linear-gradient(135deg, #f83600 0%, #fe8c00 100%)

Rainbow:
linear-gradient(90deg, red, yellow, lime, cyan, blue, magenta)
*/

// ============================================
// TESTING & DEBUGGING
// ============================================

/*
In browser console (F12), you can test:

// Get all shows
console.log(getAllShows());

// Export current state
console.log(exportState());

// Manually update timers
updateAllTimers();

// Add a test show
addNewShow('test-show', {
    title: '🧪 Test Show 🧪',
    description: 'For testing purposes',
    imdbId: 'tt0000000',
    releaseDate: '2025-12-31',
    countries: {
        'Nigeria': { emoji: '🇳🇬', timezone: 'Africa/Lagos', offset: 1 }
    }
});

// Check OMDB config
console.log(OMDB_CONFIG);

// Test timer calculation
console.log(calculateTimeRemaining('2025-12-25'));
*/

// ============================================
// DEPLOYMENT CHECKLIST
// ============================================

/*
Before deploying:

✓ Replace OMDB API key with your actual key
✓ Update all release dates
✓ Test all timers work correctly
✓ Check responsive design on mobile
✓ Verify country list is complete
✓ Test dropdown functionality
✓ Clear console errors (F12)
✓ Optimize images if any added
✓ Test on different browsers
✓ Set up custom domain if needed

Deployment platforms:
- Netlify (drag & drop deployment)
- Vercel (Git-based deployment)
- GitHub Pages (free hosting)
- Heroku (free tier available)
- Firebase Hosting
- AWS S3 + CloudFront
- DigitalOcean App Platform
*/

// ============================================
// PERFORMANCE TIPS
// ============================================

/*
To optimize performance:

1. Minimize CSS animations on slower devices
2. Use requestAnimationFrame for smooth updates
3. Debounce event listeners
4. Cache OMDB API responses
5. Use localStorage for user preferences
6. Lazy load images if adding them
7. Minify CSS/JS for production
8. Use CDN for hosted files

Currently, the app is very lightweight:
- No external dependencies
- ~15KB JavaScript
- ~20KB CSS
- Renders smoothly on all devices
*/

// ============================================
// NEXT STEPS
// ============================================

/*
1. ✓ Read this configuration guide
2. ✓ Get your OMDB API key
3. ✓ Update release dates
4. ✓ Customize colors/emojis
5. ✓ Add more countries if desired
6. ✓ Test locally in browser
7. ✓ Deploy to hosting platform
8. ✓ Add new shows as they're announced

Questions? Check the README.md file for more details!
*/
