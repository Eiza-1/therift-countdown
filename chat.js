/* ============================================
   CHAT FORUM - JAVASCRIPT (FIXED)
   Real-time messaging with localStorage
   Edit & Delete Features
   ============================================ */

// ============================================
// CHAT STATE MANAGEMENT
// ============================================

let currentUsername = null;
const STORAGE_KEY = 'strangerThingsForum_messages';
const USERNAME_KEY = 'strangerThingsForum_username';
let editingMessageId = null;

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeChatSystem();
    initializeNavigation();
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

    // Event listeners for signup
    const joinBtn = document.getElementById('joinChatBtn');
    const usernameInput = document.getElementById('usernameInput');
    if (joinBtn) joinBtn.addEventListener('click', joinChat);
    if (usernameInput) usernameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') joinChat();
    });

    // Event listeners for chat
    const sendBtn = document.getElementById('sendBtn');
    const messageInput = document.getElementById('messageInput');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (sendBtn) sendBtn.addEventListener('click', sendMessage);
    if (messageInput) messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    if (logoutBtn) logoutBtn.addEventListener('click', logout);

    // Initial load
    loadMessages();

    // Auto-refresh messages every 1000ms
    setInterval(loadMessages, 1000);
}

/**
 * Initialize tab navigation
 */
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

            // Refresh messages when discuss tab is opened
            if (targetSection === 'discuss-section') {
                loadMessages();
            }
        });
    });
}

// ============================================
// CHAT CORE FUNCTIONS
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
    const chatSignup = document.getElementById('chatSignup');
    const chatArea = document.getElementById('chatArea');
    const currentUsername_el = document.getElementById('currentUsername');
    
    if (chatSignup) chatSignup.style.display = 'none';
    if (chatArea) chatArea.style.display = 'flex';
    if (currentUsername_el) currentUsername_el.textContent = currentUsername;
    
    const msgInput = document.getElementById('messageInput');
    if (msgInput) msgInput.focus();
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

    // Get existing messages
    let messages = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    if (editingMessageId !== null) {
        // Edit existing message
        const msgIndex = messages.findIndex(m => m.id === editingMessageId);
        if (msgIndex !== -1) {
            messages[msgIndex].text = messageText;
            messages[msgIndex].edited = true;
            messages[msgIndex].editedTime = new Date().toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit'
            });
        }
        editingMessageId = null;
        
        const sendBtn = document.getElementById('sendBtn');
        if (sendBtn) sendBtn.textContent = 'Send';
    } else {
        // Create new message
        const message = {
            username: currentUsername,
            text: messageText,
            timestamp: new Date().toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit'
            }),
            id: Date.now(),
            edited: false
        };
        messages.push(message);
    }

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
    if (!messagesContainer) return;

    // Get messages from localStorage
    let messages = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    if (messages.length === 0) {
        messagesContainer.innerHTML = '<div class="empty-messages">No messages yet. Be the first to discuss!</div>';
        return;
    }

    // Build messages HTML
    let messagesHTML = '';

    messages.forEach(message => {
        const isOwnMessage = message.username === currentUsername;
        const messageClass = isOwnMessage ? 'own' : '';
        const editedLabel = message.edited ? '<span class="message-edited">(edited)</span>' : '';

        messagesHTML += `
            <div class="message ${messageClass}" data-message-id="${message.id}">
                <div class="message-header">
                    <div class="message-info">
                        <span class="message-username">👤 ${escapeHTML(message.username)}</span>
                        <span class="message-time">${message.timestamp}</span>
                        ${editedLabel}
                    </div>
                    ${isOwnMessage ? `
                        <div class="message-actions">
                            <button class="msg-edit-btn" onclick="editMessage(${message.id}, '${escapeHTML(message.text).replace(/'/g, "&apos;")}')">✏️ Edit</button>
                            <button class="msg-delete-btn" onclick="deleteMessage(${message.id})">🗑️ Delete</button>
                        </div>
                    ` : ''}
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
 * Edit message
 */
function editMessage(messageId, messageText) {
    editingMessageId = messageId;
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    
    if (messageInput) {
        messageInput.value = messageText;
        messageInput.focus();
    }
    
    if (sendBtn) {
        sendBtn.textContent = 'Update Message';
    }
}

/**
 * Delete message
 */
function deleteMessage(messageId) {
    if (!confirm('Delete this message?')) return;

    let messages = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    messages = messages.filter(m => m.id !== messageId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    
    loadMessages();
}

/**
 * Logout
 */
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem(USERNAME_KEY);
        currentUsername = null;
        editingMessageId = null;

        const chatArea = document.getElementById('chatArea');
        const chatSignup = document.getElementById('chatSignup');
        const usernameInput = document.getElementById('usernameInput');
        const messageInput = document.getElementById('messageInput');
        const sendBtn = document.getElementById('sendBtn');
        
        if (chatArea) chatArea.style.display = 'none';
        if (chatSignup) chatSignup.style.display = 'flex';
        if (usernameInput) usernameInput.value = '';
        if (messageInput) messageInput.value = '';
        if (sendBtn) sendBtn.textContent = 'Send';
        if (usernameInput) usernameInput.focus();
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
// UTILITY FUNCTIONS (For testing/debugging)
// ============================================

/**
 * Clear all chat messages
 */
function clearAllMessages() {
    if (confirm('This will delete all messages. Are you sure?')) {
        localStorage.removeItem(STORAGE_KEY);
        loadMessages();
    }
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
