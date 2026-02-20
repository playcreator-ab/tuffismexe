require('dotenv').config();
const fs = require('fs');
const { getUserData, updateUserData, getThreadChannel } = require('./database.js'); 
const path = require('path');
const { Client, Collection, GatewayIntentBits, REST, Routes, ActivityType } = require('discord.js');
// Shop items for economy
const shopItems = {
    badge_star: { name: '⭐ Star Badge', cost: 500 },
    nick_perk: { name: '💎 Nickname Perk', cost: 2000 }
};


const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

client.commands = new Collection();

// --- LOAD COMMANDS ---
const commandsPath = path.join(__dirname, 'commands');
fs.readdirSync(commandsPath).forEach(folder => {
    const folderPath = path.join(commandsPath, folder);
    if(fs.lstatSync(folderPath).isDirectory()){
        fs.readdirSync(folderPath).filter(f=>f.endsWith('.js')).forEach(file=>{
            const filePath = path.join(folderPath,file);
            const command = require(filePath);
            client.commands.set(command.data.name, command);
        });
    }
});

// --- REGISTER COMMANDS WITH DISCORD ---
const rest = new REST({ version:'10' }).setToken(process.env.TOKEN);
(async () => {
    const allCommands = client.commands.map(c=>c.data.toJSON());
    try{
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: allCommands }
        );
        console.log(`✅ Commands registered.`);
    }catch(e){ console.error(e); }
})();

// --- READY EVENT ---
client.once('clientReady', ()=>{
    console.log(`Informations:\nRunning on Node.js ${process.version}\nDiscord.js v${require('discord.js').version}\nBot ID: ${client.user.id}\nBot Tag: ${client.user.tag}\nBot Version: 2.6.1\n`);
    console.log(`✅ Bot 2.6.1 Online | ${client.user.tag}\n\n`);
    client.user.setActivity("I'm Tuff.", { type: ActivityType.Watching });
    console.log(`✅ Rich Presence Set`);

});

// --- INTERACTION HANDLER ---
client.on('interactionCreate', async interaction=>{
    if(!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if(!command) return;

    try{
        await command.execute(interaction);
    }catch(e){
        console.error(e);
        await interaction.reply({ content:'❌ Error executing command.', ephemeral:true });
    }
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    const user = interaction.user;
    const data = await getUserData(user.id);

    if (interaction.customId === 'buy_badge_star') {
        const item = shopItems['badge_star'];
        if (data.balance < item.cost)
            return interaction.reply({ content: `❌ Not enough coins for **${item.name}**`, ephemeral: true });

        data.balance -= item.cost;
        data.badges.push(' ⭐');
        await updateUserData(user.id, data);
        return interaction.reply({ content: `✅ Bought **${item.name}** for **${item.cost} Coins**!`, ephemeral: true });
    }

    if (interaction.customId === 'buy_nick_perk') {
        const item = shopItems['nick_perk'];
        if (data.balance < item.cost)
            return interaction.reply({ content: `❌ Not enough coins for **${item.name}**`, ephemeral: true });

        data.balance -= item.cost;
        data.nickPerk = true;
        await updateUserData(user.id, data);
        return interaction.reply({ content: `✅ Bought **${item.name}** for **${item.cost} Coins**!`, ephemeral: true });
    }
});

// --- MESSAGE CREATE: auto-start thread for messages in configured channel ---
client.on('messageCreate', async message => {
    try{
        if(!message.guild) return;
        if(message.author?.bot) return;
        const threadChannelId = await getThreadChannel(message.guild.id);
        if(!threadChannelId) return;
        if(message.channel.id !== threadChannelId) return;

        // Create a thread for this message
        // Use message.startThread (works for text channels)
        const threadName = `Thread - ${message.author.username}`;
        // If message already part of a thread, skip
        if(message.hasThread) return;
        await message.startThread({ name: threadName, autoArchiveDuration: 60, reason: 'Auto thread creation' });
    }catch(e){
        console.error('Error creating auto-thread:', e);
    }
});

});

client.login(process.env.TOKEN);
