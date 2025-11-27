# 🎬 Entertainment Countdown Timer - Webapp

A professional, real-time countdown timer webapp for movie and TV show releases with support for multiple countries, complex color gradients, and emoji decorations. Built with vanilla JavaScript, HTML, and CSS.

![Features]
- ✨ Real-time countdown timers
- 🌍 Multi-country timezone support (15+ countries)
- 🎨 Professional gradient backgrounds and animations
- 📱 Fully responsive design
- 🎬 Extensible architecture for adding future shows
- 🔌 Ready for OMDB API integration
- 🇳🇬 Nigeria (WAT) as primary timezone
- 🔮 Beautiful UI with complex emojis and visual effects

## 📋 Current Features

### Main Display
- **Primary Timer**: Shows countdown for Nigeria (WAT timezone)
- **Featured Show Card**: Large display with gradient background
- **Global Timers Grid**: 15+ countries with their local countdown timers

### Supported Countries
- 🇳🇬 Nigeria
- 🇺🇸 USA (East & West)
- 🇬🇧 UK
- 🇮🇳 India
- 🇯🇵 Japan
- 🇦🇺 Australia
- 🇧🇷 Brazil
- 🇨🇦 Canada
- 🇩🇪 Germany
- 🇫🇷 France
- 🇿🇦 South Africa
- 🇪🇬 Egypt
- 🇰🇪 Kenya
- 🇬🇭 Ghana
- 🇸🇬 Singapore
- 🇭🇰 Hong Kong

### Design Highlights
- Animated gradient text and backgrounds
- Smooth fade-in and slide-up animations
- Hover effects on timer cards
- Pulsing background effects
- Professional glassmorphism UI elements
- Mobile-responsive grid layout

## 🚀 Quick Start

1. **Clone/Download the files**:
   - `index.html` - Main webpage
   - `styles.css` - All styling with gradients and animations
   - `app.js` - JavaScript logic and timer calculations

2. **Open in browser**:
   ```bash
   # On Windows, simply double-click index.html or:
   start index.html
   ```

3. **No external dependencies needed!** The app works with pure vanilla JavaScript.

## 🔧 Configuration

### Current Show: Stranger Things Season 5

The release date is set to: **February 14, 2025**

To modify:
1. Open `app.js`
2. Find the `SHOWS_DATABASE` object
3. Change the `releaseDate` field:
   ```javascript
   'stranger-things-s5': {
       // ...
       releaseDate: '2025-02-14', // Change this date
       // ...
   }
   ```

## 📺 Adding New Shows

### Method 1: Direct Addition (Easy)

Open `app.js` and call the `addNewShow()` function:

```javascript
addNewShow('avatar-3', {
    title: '🪐 Avatar 3 🪐',
    description: 'The continuation of the epic space saga',
    imdbId: 'tt1160419', // Get from OMDB website
    releaseDate: '2026-02-26',
    countries: {
        'Nigeria': { emoji: '🇳🇬', timezone: 'Africa/Lagos', offset: 1 },
        'USA (East)': { emoji: '🇺🇸', timezone: 'America/New_York', offset: -5 },
        // Copy the rest from Stranger Things section
    }
});
```

### Method 2: Edit Database (Advanced)

Add directly to `SHOWS_DATABASE` in `app.js`:

```javascript
const SHOWS_DATABASE = {
    'stranger-things-s5': { /* existing */ },
    'your-new-show': {
        title: '🎭 Your Show Title 🎭',
        description: 'Show description here',
        imdbId: 'ttXXXXXXX',
        releaseDate: 'YYYY-MM-DD',
        countries: {
            'Nigeria': { emoji: '🇳🇬', timezone: 'Africa/Lagos', offset: 1 },
            'USA (East)': { emoji: '🇺🇸', timezone: 'America/New_York', offset: -5 },
            // ... add more countries
        }
    }
};
```

## 🔌 OMDB API Integration

### Setting Up OMDB API

1. **Get a Free API Key**:
   - Visit: http://www.omdbapi.com/apikey.aspx
   - Create a free account
   - Receive API key via email

2. **Add to Your Project**:
   - Open `app.js`
   - Find the `OMDB_CONFIG` section
   - Replace `'YOUR_OMDB_API_KEY_HERE'` with your actual key:
   ```javascript
   const OMDB_CONFIG = {
       apiKey: 'your_actual_api_key_here',
       baseUrl: 'https://www.omdbapi.com/'
   };
   ```

### Using OMDB Functions

The app includes helper functions for OMDB:

```javascript
// Get show details by IMDB ID
const showData = await fetchShowDataFromOMDB('tt3749900');

// Search for a show
const results = await searchShowOnOMDB('Avatar');
```

### OMDB API Limits
- **Free Plan**: 1,000 requests/day
- **Paid Plans**: Available for higher limits
- API response includes: Title, Year, Rated, Released, Runtime, Genre, Plot, Actors, etc.

## 🎨 Customization

### Change Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    --tertiary-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    --dark-gradient: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
}
```

### Change Emojis

Edit in `app.js` under country definitions:

```javascript
'Nigeria': { emoji: '🇳🇬', timezone: 'Africa/Lagos', offset: 1 },
```

Or in featured title in `index.html`:

```html
<h2 id="featured-title">🔮 Stranger Things - Season 5 🔮</h2>
```

### Modify Layout

Edit CSS grid settings in `styles.css`:

```css
.timers-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}
```

## 📱 Responsive Design

The app is fully responsive with breakpoints:
- **Desktop**: Full 4-column grid layout
- **Tablet (768px)**: 2-column layout
- **Mobile (480px)**: Single column layout

## 🌐 Deployment Options

### Option 1: GitHub Pages (Free)
1. Create a GitHub repository
2. Upload the three files
3. Go to Settings → Pages
4. Select main branch as source
5. Your site will be live at: `https://username.github.io/repo-name`

### Option 2: Netlify (Free)
1. Go to netlify.com
2. Drag and drop your folder
3. Site will be live immediately

### Option 3: Vercel (Free)
1. Go to vercel.com
2. Import your repository
3. Deploy with one click

### Option 4: Local Server
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (with http-server)
npx http-server
```

Then visit: `http://localhost:8000`

## 📊 Project Structure

```
TheRift/
├── index.html          # Main webpage
├── styles.css          # All styling (gradients, animations, responsive)
├── app.js              # JavaScript logic & OMDB integration
└── README.md           # This file
```

## 🔑 Key Functions Reference

### JavaScript Functions

| Function | Purpose |
|----------|---------|
| `calculateTimeRemaining(targetDate)` | Calculate days/hours/mins/secs remaining |
| `addNewShow(showId, showData)` | Add new movie/show to database |
| `getAllShows()` | Get list of all shows |
| `fetchShowDataFromOMDB(imdbId)` | Fetch data from OMDB API |
| `searchShowOnOMDB(searchTerm)` | Search OMDB for shows |
| `updateAllTimers()` | Update all timer displays |
| `exportState()` | Export current app state |

## 🐛 Troubleshooting

### Timers not updating?
- Check browser console (F12) for errors
- Ensure JavaScript is enabled
- Try refreshing the page

### OMDB API not working?
- Verify API key is correct
- Check internet connection
- API limit might be reached (wait 24 hours or upgrade plan)
- Use browser console to debug: `console.log(OMDB_CONFIG)`

### Styling issues?
- Clear browser cache (Ctrl+Shift+Del)
- Check if CSS file is in same directory
- Verify file paths are correct

### Release date not showing correct time?
- Ensure date format is YYYY-MM-DD
- Date should be in UTC/GMT
- Adjust timezone offset if needed

## 💡 Future Enhancement Ideas

1. **Database Backend**: Store shows in a server database
2. **User Preferences**: Save favorite shows locally
3. **Notifications**: Alert users when show is about to release
4. **Social Sharing**: Share countdown links with friends
5. **Dark/Light Mode**: Toggle theme
6. **Multiple Languages**: Support different languages
7. **Analytics**: Track most-watched countdowns
8. **Trailer Integration**: Embed YouTube trailers

## 📝 License

This project is open source and free to use for personal and commercial projects.

## 🤝 Contributing

Feel free to fork, modify, and improve this project!

## 📧 Support

For issues or suggestions, you can:
- Check the troubleshooting section
- Review the code comments
- Modify the configuration as needed

---

**Made with ❤️ for Entertainment Lovers**

Version: 1.0 | Last Updated: November 2025
