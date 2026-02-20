const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { db } = require('../../database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('topusers')
        .setDescription('View top users')
        .addStringOption(o => o.setName('sort').setDescription('Sort by balance or level').addChoices({name:'Balance', value:'balance'}, {name:'Level', value:'level'})),
    async execute(interaction) {
        const sortBy = interaction.options.getString('sort') || 'balance';
        const allUsers = (await db.all()).filter(u => u.id.startsWith('user_')).map(u => ({
            id: u.id.replace('user_', ''),
            balance: u.value.balance || 0,
            level: u.value.level || 1,
            xp: u.value.xp || 0
        }));

        allUsers.sort((a,b) => sortBy === 'level' ? (b.level-b.level || b.xp-a.xp) : b.balance - a.balance);
        const top = allUsers.slice(0,10);

        let text = '';
        for(let i=0;i<top.length;i++){
            const u = top[i];
            text += `**${i+1}. <@${u.id}>** — ${sortBy==='level'?`Level ${u.level} | XP: ${u.xp}`:`${u.balance} Coins`}\n`;
        }

        const embed = new EmbedBuilder()
            .setTitle(`🏆 Top Users (${sortBy})`)
            .setDescription(text || 'No users yet')
            .setColor('#FFD700');

        await interaction.reply({ embeds: [embed] });
    }
};
