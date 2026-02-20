const { SlashCommandBuilder } = require('discord.js');
const { getUserData } = require('../../database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Check your coin balance'),
    async execute(interaction) {
        const user = await getUserData(interaction.user.id);
        await interaction.reply(`💰 ${interaction.user.username}, you have **${user.balance} coins**.`);
    }
};
