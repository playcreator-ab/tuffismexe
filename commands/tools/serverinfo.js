const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Get server details'),
    async execute(interaction) {
        const guild = interaction.guild;
        const embed = new EmbedBuilder()
            .setTitle(guild.name)
            .setThumbnail(guild.iconURL())
            .addFields(
                { name: 'Members', value: `${guild.memberCount}`, inline: true },
                { name: 'Owner', value: `<@${guild.ownerId}>`, inline: true },
                { name: 'Boosts', value: `${guild.premiumSubscriptionCount}`, inline: true },
                { name: 'Roles', value: `${guild.roles.cache.size}`, inline: true },
                { name: 'Channels', value: `${guild.channels.cache.size}`, inline: true }
            )
            .setColor('#00ffaa');

        await interaction.reply({ embeds: [embed] });
    }
};
