const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getUserData, getNextLevelXP } = require('../../database.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('View your profile or another user\'s profile')
        .addUserOption(option => option
            .setName('target')
            .setDescription('The user to view')
            .setRequired(false)
        ),
    async execute(interaction) {
        const target = interaction.options.getUser('target') || interaction.user;
        const data = await getUserData(target.id);

        const embed = new EmbedBuilder()
            .setAuthor({ name: `Profile: ${target.username}`, iconURL: target.displayAvatarURL() })
            .setColor('#00ffaa')
            .addFields(
                { name: '📊 Stats', value: `Level: **${data.level}**\nXP: **${data.xp}/${getNextLevelXP(data.level)}**`, inline: true },
                { name: '💰 Balance', value: `Coins: **${data.balance}**\nWarns: **${data.warns.length}**`, inline: true },
                { name: '🏅 Badges', value: (data.badges.length > 0 ? data.badges.join(' ') : 'None') }
            );

        return interaction.reply({ embeds: [embed] });
    }
};
