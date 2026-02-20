const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Get a random meme'),

    async execute(interaction) {
        try {
            const res = await axios.get('https://meme-api.com/gimme');
            const { title, url } = res.data;

            // Just reply with title and image URL like the old days
            await interaction.reply({
                content: title,
                files: [url]
            });

        } catch (err) {
            console.error(err);
            // If the reply already failed, this might throw; try catch it too
            try {
                await interaction.reply('❌ Could not fetch meme.');
            } catch {}
        }
    }
};
