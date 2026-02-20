const { SlashCommandBuilder } = require('discord.js');
const { getUserData, updateUserData } = require('../../database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('Claim your daily coins'),
    async execute(interaction) {
        const user = await getUserData(interaction.user.id);
        const now = Date.now();
        if (user.lastDaily && now - user.lastDaily < 24*60*60*1000) {
            return interaction.reply({ content: '❌ Daily already claimed.', ephemeral: true });
        }

        const reward = Math.floor(Math.random() * 100) + 1;
        user.balance += reward;
        user.lastDaily = now;
        await updateUserData(interaction.user.id, user);

        await interaction.reply({ content: `✅ You claimed ${reward} daily coins!`, ephemeral: true });
    }
};
