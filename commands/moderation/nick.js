const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nick')
        .setDescription('Change nickname of a user')
        .addUserOption(o => o.setName('target').setDescription('User').setRequired(true))
        .addStringOption(o => o.setName('name').setDescription('New nickname').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames),
    async execute(interaction) {
        const userTarget = interaction.options.getUser('target');
        const name = interaction.options.getString('name');
        const target = await interaction.guild.members.fetch(userTarget.id).catch(() => null);

        if (!target) return interaction.reply({ content: '❌ User not found.', ephemeral: true });
        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ManageNicknames)) 
            return interaction.reply({ content: '❌ I lack Manage Nicknames permission.', ephemeral: true });
        if (target.roles.highest.position >= interaction.guild.members.me.roles.highest.position)
            return interaction.reply({ content: '❌ Cannot change nickname due to role hierarchy.', ephemeral: true });

        await target.setNickname(name);
        await interaction.reply(`✅ Nickname changed to ${name} for ${userTarget.tag}.`);
    }
};
