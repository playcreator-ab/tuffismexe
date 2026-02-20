const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { db } = require('../../database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('Global leaderboard by coins'),
    async execute(interaction) {
        const users = (await db.all()).filter(u => u.id.startsWith('user_')).map(u => ({ id:u.id.replace('user_',''), balance:u.value.balance||0 }));
        users.sort((a,b)=>b.balance-a.balance);
        const top = users.slice(0,10);

        const desc = top.map((u,i)=>`**${i+1}. <@${u.id}>** — ${u.balance} Coins`).join('\n');
        const embed = new EmbedBuilder().setTitle('🏆 Leaderboard').setDescription(desc || 'No users yet').setColor('#FFD700');

        await interaction.reply({ embeds: [embed] });
    }
};
