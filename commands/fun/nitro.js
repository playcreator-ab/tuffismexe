const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nitro')
        .setDescription('🎁 Totally real Discord Nitro gift'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('🎁 Discord Nitro Gift')
            .setDescription('Click the button to claim your gift!')
            .setColor('#8a4d9d')
            .setThumbnail('https://i.imgur.com/w9aiD6F.png')
            .setFooter({ text: 'Discord • Nitro Promotion' })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('🎁 Claim Gift')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ') // Rickroll
            );

        await interaction.reply({ embeds: [embed], components: [row] });
    }
};
