const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'database.json');

// Ensure database exists
if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, '{}');

// Load DB
function loadDB() {
    return JSON.parse(fs.readFileSync(DB_PATH));
}

// Save DB
function saveDB(db) {
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

// Get or create user data
async function getUserData(userId) {
    const db = loadDB();
    if (!db[userId]) {
        db[userId] = {
            xp: 0,
            level: 1,
            balance: 100,
            badges: [],
            warns: [],
            lastMessage: 0
        };
        saveDB(db);
    }
    return db[userId];
}

// Update user data
async function updateUserData(userId, data) {
    const db = loadDB();
    db[userId] = data;
    saveDB(db);
    return data;
}

// Calculate XP needed for next level
function getNextLevelXP(level) {
    return level * level * 150;
}

// Guild settings helpers
async function getThreadChannel(guildId){
    const db = loadDB();
    if(!db._guildSettings) return null;
    return db._guildSettings[guildId] ? db._guildSettings[guildId].threadChannel : null;
}

async function setThreadChannel(guildId, channelId){
    const db = loadDB();
    if(!db._guildSettings) db._guildSettings = {};
    if(!db._guildSettings[guildId]) db._guildSettings[guildId] = {};
    db._guildSettings[guildId].threadChannel = channelId;
    saveDB(db);
    return db._guildSettings[guildId];
}

module.exports = {
    getUserData,
    updateUserData,
    getNextLevelXP,
    getThreadChannel,
    setThreadChannel
};
