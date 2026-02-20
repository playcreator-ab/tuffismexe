const { SlashCommandBuilder } = require('discord.js');
const { getUserData, updateUserData } = require('../../database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('random-event')
        .setDescription('Trigger a random bonus'),
    async execute(interaction) {
        const user = await getUserData(interaction.user.id);
        const reward = Math.floor(Math.random()*500)+50;
        user.balance += reward;
        await updateUserData(interaction.user.id,user);
        await interaction.reply(`🎉 Random event! You gained **${reward} coins**!`);
    }
};
