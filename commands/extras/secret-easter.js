const { SlashCommandBuilder } = require('discord.js');
const { getUserData, updateUserData } = require('../../database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('secret-easter')
        .setDescription('Discover a secret Easter egg'),
    async execute(interaction) {
        const user = await getUserData(interaction.user.id);
        user.badges.push(' 🥚');
        await updateUserData(interaction.user.id,user);
        await interaction.reply('🥚 Congratulations! You found the secret Easter egg and earned a badge!');
    }
};
