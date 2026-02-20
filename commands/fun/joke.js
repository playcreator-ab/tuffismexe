const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('Get a random joke'),
    async execute(interaction) {
        try {
            const res = await axios.get('https://official-joke-api.appspot.com/random_joke');
            await interaction.reply(`😂 **${res.data.setup}**\n${res.data.punchline}`);
        } catch {
            await interaction.reply('❌ Failed to fetch a joke.');
        }
    }
};
