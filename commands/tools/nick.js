const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nick')
        .setDescription('Change a member nickname')
        .addUserOption(o=>o.setName('target').setDescription('User').setRequired(true))
        .addStringOption(o=>o.setName('name').setDescription('New Nickname').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames),
    async execute(interaction){
        const targetUser = interaction.options.getUser('target');
        const newName = interaction.options.getString('name');
        const targetMember = await interaction.guild.members.fetch(targetUser.id).catch(()=>null);

        if(!targetMember) return interaction.reply({ content:'❌ User not found', ephemeral:true });
        if(interaction.guild.members.me.roles.highest.position <= targetMember.roles.highest.position)
            return interaction.reply({ content:'❌ Cannot change nickname due to role hierarchy', ephemeral:true });

        await targetMember.setNickname(newName);
        await interaction.reply({ content:`✅ Changed ${targetUser.tag}'s nickname to ${newName}`, ephemeral:true });
    }
};
