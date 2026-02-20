const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { getUserData, updateUserData } = require('../../database.js');

const shopItems = {
    badge_star: { name: '⭐ Star Badge', cost: 500 },
    nick_perk: { name: '💎 Nickname Perk', cost: 2000 }
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shop')
        .setDescription('Browse the economy shop with interactive buttons'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('🛒 Al Baida Market')
            .setDescription('Click a button below to buy an item!')
            .addFields(
                { name: '⭐ Star Badge', value: '500 Coins', inline: true },
                { name: '💎 Nickname Perk', value: '2000 Coins', inline: true }
            )
            .setColor('#FFD700');

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('buy_badge_star')
                    .setLabel('Buy ⭐ Star Badge')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('buy_nick_perk')
                    .setLabel('Buy 💎 Nickname Perk')
                    .setStyle(ButtonStyle.Success)
            );

        await interaction.reply({ embeds: [embed], components: [row] });
    }
};
