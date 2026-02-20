const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { getUserData, updateUserData } = require('../../database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Warn a user')
        .addUserOption(o => o.setName('target').setDescription('User').setRequired(true))
        .addStringOption(o => o.setName('reason').setDescription('Reason').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason');

        const data = await getUserData(target.id);
        data.warns.push({ admin: interaction.user.id, reason, date: Date.now() });
        await updateUserData(target.id, data);

        await interaction.reply(`⚠️ ${target.username} has been warned: ${reason}`);
    }
};
