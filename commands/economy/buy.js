const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('buy')
        .setDescription('[DEPRECATED] Use /shop to buy items now'),
    async execute(interaction) {
        return interaction.reply({ content: '❌ /buy is deprecated. Use `/shop` to purchase items with buttons!', ephemeral: true });
    }
};
