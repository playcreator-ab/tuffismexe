const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Create a poll')
        .addStringOption(o => o.setName('question').setDescription('Poll question').setRequired(true)),
    async execute(interaction) {
        const question = interaction.options.getString('question');
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder().setCustomId('poll_yes').setLabel('✅ Yes').setStyle(ButtonStyle.Success),
                new ButtonBuilder().setCustomId('poll_no').setLabel('❌ No').setStyle(ButtonStyle.Danger)
            );
        await interaction.reply({ content: `📊 Poll: **${question}**`, components: [row] });
    }
};
