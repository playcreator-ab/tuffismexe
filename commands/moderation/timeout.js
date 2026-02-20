const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Temporarily mute a user')
        .addUserOption(o => o.setName('target').setDescription('User to timeout').setRequired(true))
        .addIntegerOption(o => o.setName('minutes').setDescription('Duration in minutes').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    async execute(interaction) {
        const target = await interaction.options.getMember('target');
        const minutes = interaction.options.getInteger('minutes');

        await target.timeout(minutes * 60 * 1000);
        await interaction.reply(`⏱️ ${target.user.tag} muted for ${minutes} minutes.`);
    }
};
