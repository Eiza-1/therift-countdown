/* ============================================
   CHAT FORUM - JAVASCRIPT
   Real-time messaging with localStorage
   ============================================ */

// ============================================
// CHAT STATE MANAGEMENT
// ============================================

let currentUsername = null;
const STORAGE_KEY = 'strangerThingsForum_messages';
const USERNAME_KEY = 'strangerThingsForum_username';
// store last rendered messages JSON to prevent unnecessary re-renders
let _lastMessagesJSON = null;

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeChatSystem();
    initializeTabNavigation();
});

/**
 * Initialize chat system
 */
function initializeChatSystem() {
    // Check if user has saved username
    const savedUsername = localStorage.getItem(USERNAME_KEY);
    
    if (savedUsername) {
        currentUsername = savedUsername;
        showChatArea();
    }

    // Event listeners
    document.getElementById('joinChatBtn').addEventListener('click', joinChat);
    document.getElementById('usernameInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') joinChat();
    });

    document.getElementById('sendBtn').addEventListener('click', sendMessage);
    document.getElementById('messageInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    document.getElementById('logoutBtn').addEventListener('click', logout);

    // Load existing messages
    loadMessages();

    // Auto-refresh messages every 1000ms for lower CPU impact
    setInterval(loadMessages, 1000);
}

/**
 * Initialize tab navigation
 */
function initializeTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(tabName + '-tab').classList.add('active');
        });
    });
}

// ============================================
// CHAT FUNCTIONS
// ============================================

/**
 * Join chat - set username
 */
function joinChat() {
    const usernameInput = document.getElementById('usernameInput');
    const username = usernameInput.value.trim();

    if (!username) {
        alert('Please enter a username!');
        return;
    }

    if (username.length < 2) {
        alert('Username must be at least 2 characters!');
        return;
    }

    if (username.length > 20) {
        alert('Username must be 20 characters or less!');
        return;
    }

    // Save username to localStorage
    localStorage.setItem(USERNAME_KEY, username);
    currentUsername = username;

    showChatArea();
    loadMessages();
}

/**
 * Show chat area and hide signup
 */
function showChatArea() {
    document.getElementById('chatSignup').style.display = 'none';
    document.getElementById('chatArea').style.display = 'flex';
    document.getElementById('currentUsername').textContent = currentUsername;
    document.getElementById('messageInput').focus();
}

/**
 * Send message
 */
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();

    if (!messageText) return;
    if (!currentUsername) {
        alert('Please join chat first!');
        return;
    }

    // Create message object
    const message = {
        username: currentUsername,
        text: messageText,
        timestamp: new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
        }),
        id: Date.now()
    };

    // Get existing messages
    let messages = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    // Add new message
    messages.push(message);

    // Keep only last 100 messages
    if (messages.length > 100) {
        messages = messages.slice(-100);
    }

    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));

    // Clear input
    messageInput.value = '';

    // Load messages to display
    loadMessages();

    // Focus back on input
    messageInput.focus();
}

/**
 * Load and display messages
 */
function loadMessages() {
    const messagesContainer = document.getElementById('messagesContainer');

    // If discuss tab not active, skip updating to save work
    const discussTab = document.getElementById('discuss-tab');
    if (discussTab && !discussTab.classList.contains('active')) {
        return;
    }

    // Get messages from localStorage
    let messages = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    const currentJSON = JSON.stringify(messages);
    // If nothing changed since last render, skip DOM update
    if (_lastMessagesJSON === currentJSON) return;
    _lastMessagesJSON = currentJSON;

    if (messages.length === 0) {
        messagesContainer.innerHTML = '<div class="empty-messages">No messages yet. Be the first to discuss!</div>';
        return;
    }

    // Build messages HTML
    let messagesHTML = '';

    messages.forEach(message => {
        const isOwnMessage = message.username === currentUsername;
        const messageClass = isOwnMessage ? 'own' : '';

        messagesHTML += `
            <div class="message ${messageClass}">
                <div class="message-header">
                    <span class="message-username">👤 ${escapeHTML(message.username)}</span>
                    <span class="message-time">${message.timestamp}</span>
                </div>
                <div class="message-text">${escapeHTML(message.text)}</div>
            </div>
        `;
    });

    messagesContainer.innerHTML = messagesHTML;

    // Auto-scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

/**
 * Logout
 */
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem(USERNAME_KEY);
        currentUsername = null;

        // Hide chat area and show signup
        document.getElementById('chatArea').style.display = 'none';
        document.getElementById('chatSignup').style.display = 'flex';
        document.getElementById('usernameInput').value = '';
        document.getElementById('usernameInput').focus();
    }
}

/**
 * Escape HTML special characters
 */
function escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Clear all chat messages (for testing)
 */
function clearAllMessages() {
    if (confirm('This will delete all messages. Are you sure?')) {
        localStorage.removeItem(STORAGE_KEY);
        loadMessages();
    }
}

/**
 * Export chat history
 */
function exportChatHistory() {
    const messages = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const dataStr = JSON.stringify(messages, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'chat-history.json';
    link.click();
    URL.revokeObjectURL(url);
}

/**
 * Get chat statistics
 */
function getChatStats() {
    const messages = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const users = new Set(messages.map(m => m.username));
    
    return {
        totalMessages: messages.length,
        uniqueUsers: users.size,
        users: Array.from(users),
        messagesPerUser: Array.from(users).map(user => ({
            user,
            count: messages.filter(m => m.username === user).length
        }))
    };
}

// ============================================
// CONSOLE COMMANDS (For debugging)
// ============================================

/*
In browser console, you can use:

// Clear all messages
clearAllMessages();

// Export chat history
exportChatHistory();

// Get chat statistics
console.log(getChatStats());

// Get all messages
console.log(JSON.parse(localStorage.getItem('strangerThingsForum_messages')));

// Set debug mode
window.debugChat = true;
*/
