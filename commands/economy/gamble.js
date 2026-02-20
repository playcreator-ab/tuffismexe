const { SlashCommandBuilder } = require('discord.js');
const { getUserData, updateUserData } = require('../../database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gamble')
        .setDescription('Gamble your coins')
        .addIntegerOption(o=>o.setName('amount').setDescription('Amount to gamble').setRequired(true)),
    async execute(interaction){
        const amount = interaction.options.getInteger('amount');
        if(amount<=0) return interaction.reply({ content:'❌ Amount must be positive', ephemeral:true });

        const user = await getUserData(interaction.user.id);
        if(user.balance<amount) return interaction.reply({ content:'❌ Not enough coins', ephemeral:true });

        const multiplier = Math.random() < 0.5 ? 0 : (Math.floor(Math.random()*3)+1); // 0=lose, 1-3x win
        const won = amount*multiplier;

        user.balance = user.balance - amount + won;
        await updateUserData(interaction.user.id, user);

        if(multiplier===0) return interaction.reply(`💸 You lost ${amount} coins!`);
        return interaction.reply(`🎉 You won ${won} coins!`);
    }
};
