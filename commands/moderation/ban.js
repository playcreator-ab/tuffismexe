const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a user')
        .addUserOption(o => o.setName('target').setDescription('User to ban').setRequired(true))
        .addStringOption(o => o.setName('reason').setDescription('Reason'))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(interaction) {
        const target = interaction.options.getMember('target');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        if (!target.bannable) return interaction.reply({ content: '❌ Cannot ban this user.', ephemeral: true });

        await target.ban({ reason });
        await interaction.reply(`✅ ${target.user.tag} banned. Reason: ${reason}`);
    }
};
