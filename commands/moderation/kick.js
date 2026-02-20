const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a user from the server')
        .addUserOption(o => o.setName('target').setDescription('User to kick').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    async execute(interaction) {
        const target = await interaction.options.getMember('target');
        if (!target.kickable) return interaction.reply({ content: '❌ Cannot kick this user.', ephemeral: true });

        await target.kick();
        await interaction.reply(`👢 ${target.user.tag} has been kicked.`);
    }
};
