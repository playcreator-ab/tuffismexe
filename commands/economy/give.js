const { SlashCommandBuilder } = require('discord.js');
const { getUserData, updateUserData } = require('../../database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('give')
        .setDescription('Give coins to another user')
        .addUserOption(o=>o.setName('target').setDescription('User').setRequired(true))
        .addIntegerOption(o=>o.setName('amount').setDescription('Amount').setRequired(true)),
    async execute(interaction){
        const target = interaction.options.getUser('target');
        const amount = interaction.options.getInteger('amount');
        if(amount <=0) return interaction.reply({ content:'❌ Amount must be positive', ephemeral:true });

        const giver = await getUserData(interaction.user.id);
        if(giver.balance<amount) return interaction.reply({ content:'❌ Not enough coins', ephemeral:true });

        const receiver = await getUserData(target.id);
        giver.balance-=amount;
        receiver.balance+=(amount||0);
        await updateUserData(interaction.user.id,giver);
        await updateUserData(target.id,receiver);

        await interaction.reply(`✅ Gave ${amount} coins to ${target.tag}`);
    }
};
