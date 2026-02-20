const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Get info about a user')
        .addUserOption(o => o.setName('target').setDescription('Target user')),
    async execute(interaction) {
        const user = interaction.options.getUser('target') || interaction.user;
        const member = await interaction.guild.members.fetch(user.id).catch(()=>null);

        const embed = new EmbedBuilder()
            .setTitle(user.username)
            .setThumbnail(user.displayAvatarURL({dynamic:true}))
            .addFields(
                { name: 'ID', value: user.id, inline: true },
                { name: 'Bot?', value: user.bot ? 'Yes' : 'No', inline: true },
                { name: 'Joined Server', value: member ? `<t:${Math.floor(member.joinedTimestamp/1000)}:R>` : 'Unknown', inline: true },
                { name: 'Account Created', value: `<t:${Math.floor(user.createdTimestamp/1000)}:R>`, inline: true }
            )
            .setColor('#00ffaa');

        await interaction.reply({ embeds: [embed] });
    }
};
