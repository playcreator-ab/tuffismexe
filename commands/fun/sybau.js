const { SlashCommandBuilder } = require('discord.js');
const RESPONSES = [
    "🤫 Sybau lil bro",
    "🤫 Sybau broddie",
    "🤫 Sybau ur not tuff mate",
    "🤫 Sybau go brrr",
];
module.exports = {
    data: new SlashCommandBuilder()
        .setName('sybau')
        .setDescription('Reply to a specific message with Sybau')
        .addStringOption(option =>
            option.setName('messageid')
                .setDescription('The ID of the message to reply to')
                .setRequired(true)
        ),

    async execute(interaction) {
        const messageId = interaction.options.getString('messageid');

        try {
            // Fetch the message in the same channel
            const targetMessage = await interaction.channel.messages.fetch(messageId);

            // Reply to that specific message
            const answer = RESPONSES[Math.floor(Math.random() * RESPONSES.length)];
            await targetMessage.reply(answer);

            // Confirm success to the user (ephemeral so only they see it)
            await interaction.reply({ content: '✅ Replied successfully!', ephemeral: true });

        } catch (error) {
            console.error('Failed to reply to the message:', error);
            await interaction.reply({ content: '❌ Could not find that message or reply failed.', ephemeral: true });
        }
    }
};
