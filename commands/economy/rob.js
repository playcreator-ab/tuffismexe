const { SlashCommandBuilder } = require('discord.js');
const { getUserData, updateUserData } = require('../../database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rob')
        .setDescription('Try to rob another user')
        .addUserOption(o=>o.setName('target').setDescription('User').setRequired(true)),
    async execute(interaction){
        const target = interaction.options.getUser('target');
        if(target.id===interaction.user.id) return interaction.reply({ content:"❌ You cannot rob yourself!", ephemeral:true });

        const robber = await getUserData(interaction.user.id);
        const victim = await getUserData(target.id);

        const chance = Math.random();
        if(chance<0.5){
            const stolen = Math.min(victim.balance, Math.floor(Math.random()*100)+50);
            victim.balance -= stolen;
            robber.balance += stolen;
            await updateUserData(interaction.user.id, robber);
            await updateUserData(target.id, victim);
            return interaction.reply(`💰 You successfully robbed **${stolen} Coins** from ${target.tag}!`);
        } else {
            const lost = Math.min(robber.balance, Math.floor(Math.random()*50)+25);
            robber.balance -= lost;
            victim.balance += lost;
            await updateUserData(interaction.user.id, robber);
            await updateUserData(target.id, victim);
            return interaction.reply(`❌ Rob failed! You lost **${lost} Coins** to ${target.tag}.`);
        }
    }
};
