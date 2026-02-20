const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('commandedefoupsychopathe')
        .setDescription('Test your psychopathy (fun)'),
    async execute(interaction) {
        await interaction.reply('🧠 You have been diagnosed with psychopathy! Just kidding, this is a test command.');
    }
};
