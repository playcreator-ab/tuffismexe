# Tuffism.EXE Bot 🤖

A multifunctional Discord bot built with Discord.js featuring economy, moderation, fun, and utility commands.

## Features

### 💰 Economy System
- **Balance Management** - Check and manage user balances
- **Daily Rewards** - Earn coins daily
- **Shop System** - Purchase badges and perks with coins
- **Gambling** - Try your luck with gambling commands
- **Leaderboard** - Compete with other users
- **Rob & Give** - Transfer coins between users
- **Admin Modify** - Manage user balances (admin only)
- **Profiles** - User profile stats and achievements

### 🛡️ Moderation
- **Ban** - Ban users from the server
- **Kick** - Remove users from the server
- **Timeout** - Mute users temporarily
- **Warn** - Issue warnings to users
- **Purge** - Delete multiple messages
- **Lock/Unlock** - Lock and unlock channels
- **Nick** - Change user nicknames

### 🎮 Fun Commands
- **Coinflip** - Flip a coin
- **Jokes** - Get random jokes
- **Memes** - Share meme content
- **Nitro** - Discord Nitro giveaway simulator
- **Temuball** - Interactive game
- **Easter Eggs** - Hidden secrets and surprises

### 🔧 Utility
- **User Info** - Get detailed user information
- **Server Info** - Display server statistics
- **Embed Creator** - Create custom embeds
- **DM Management** - List and delete direct messages
- **Polls** - Create interactive polls
- **Thread Management** - Set up thread channels

### ⭐ Extra Features
- **Random Events** - Trigger random events
- **Custom Status** - Dynamic bot status

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- A Discord bot token
- Discord Developer Portal application setup

### Setup Steps

1. **Clone and install dependencies:**
```bash
npm install
```

2. **Create a `.env` file** in the root directory:
```
TOKEN=your_discord_bot_token
CLIENT_ID=your_bot_client_id
```

3. **Configure settings** in `config.js`:
```javascript
module.exports = {
    TOKEN: process.env.TOKEN,
    CLIENT_ID: process.env.CLIENT_ID,
    LOG_CHANNEL_ID: 'YOUR_LOG_CHANNEL_ID',
    ADMIN_ROLE_ID: 'YOUR_ADMIN_ROLE_ID'
};
```

4. **Start the bot:**
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Project Structure

```
albaidabot/
├── .env                     # You need to add this file yourself.
├── index.js                 # Main bot file
├── config.js                # Configuration settings
├── database.js              # Database management (SQLite)
├── database.json            # User data storage
├── package.json             # Dependencies
└── commands/
    ├── economy/             # Economy commands
    ├── moderation/          # Moderation commands
    ├── fun/                 # Fun & entertainment
    ├── tools/               # Utility tools
    ├── utility/             # Utility commands
    └── extras/              # Extra features
```

## Command Categories

### Economy Commands
- `/balance` - Check your coin balance
- `/daily` - Claim your daily reward
- `/shop` - Browse available shop items
- `/buy` - Purchase items from the shop
- `/give` - Give coins to other users
- `/rob` - Attempt to rob another user
- `/gamble` - Gamble your coins
- `/profile` - View user profile
- `/topusers` - Leaderboard
- `/admin-modify` - Modify user balance (admin)

### Moderation Commands
- `/ban` - Ban a user
- `/kick` - Kick a user
- `/warn` - Warn a user
- `/timeout` - Timeout/mute a user
- `/purge` - Delete multiple messages
- `/lock` - Lock a channel
- `/unlock` - Unlock a channel
- `/nick` - Change user nickname

### Fun Commands
- `/coinflip` - Flip a coin
- `/joke` - Get a random joke
- `/meme` - Share a meme
- `/nitro` - Nitro giveaway simulator
- `/temuball` - Interactive game
- `/sybau` - Secret command
- `/commandedefoupsychopathe` - Secret command

### Utility Commands
- `/userinfo` - Get user information
- `/serverinfo` - Get server information
- `/embed` - Create custom embeds
- `/dmembed` - Send embed via DM
- `/send` - Send messages
- `/poll` - Create a poll
- `/listdm` - List DMs
- `/deletedm` - Delete DM

## Database

The bot uses **better-sqlite3** and **quick.db** for data persistence. User data is stored in `database.json` and includes:
- User balances
- Badges and achievements
- Preferences
- Warning counts

## Configuration

Edit `config.js` to customize:
- Bot token
- Client ID
- Admin role ID
- Log channel ID

## Requirements

### Dependencies
- `discord.js` - Discord API wrapper
- `better-sqlite3` - Database management
- `quick.db` - Simple database operations
- `dotenv` - Environment variable management
- `axios` - HTTP requests
- `node-fetch` - Fetch API

### Dev Dependencies
- `nodemon` - Auto-restart on file changes

## Usage

### As a User
1. Invite the bot to your server
2. Use `/` to see available commands
3. Each command has help text with parameters

### As a Developer
1. Modify commands in the `commands/` folder
2. Add new commands following the existing structure
3. Use `npm run dev` for development
4. Use `npm start` for production

## Command Structure

Each command file should export:
```javascript
module.exports = {
    data: new SlashCommandBuilder()
        .setName('command_name')
        .setDescription('Command description'),
    async execute(interaction) {
        // Command logic
    }
};
```

## Bot Version

Current Version: **2.6.1**

## Author

Created by **@fl3x4mc**

## License

MIT License - Feel free to use and modify

## Support

For issues or feature requests, please open an issue or contact the author.

---

**Happy hosting! 🎉**
