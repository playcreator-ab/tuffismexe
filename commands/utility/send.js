const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('send')
        .setDescription('Send a message to a channel')
        .addChannelOption(o => o.setName('channel').setDescription('Target channel').setRequired(true))
        .addStringOption(o => o.setName('message').setDescription('Message content').setRequired(true)),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        const message = interaction.options.getString('message');
        await channel.send(message);
        await interaction.reply({ content: `✅ Message sent to ${channel}.`, ephemeral: true });
    }
};
