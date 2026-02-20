const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deletedm')
        .setDescription('Delete a DM sent by the bot using its message ID')
        .addStringOption(option => 
            option.setName('id')
                  .setDescription('The ID of the DM message to delete')
                  .setRequired(true)
        ),
    async execute(interaction) {
        const messageId = interaction.options.getString('id');

        try {
            // Fetch the DM channel with the user
            const dmChannel = await interaction.user.createDM();

            // Fetch the message by ID
            const message = await dmChannel.messages.fetch(messageId);

            if (!message) {
                return await interaction.reply({ content: '❌ Message not found.', ephemeral: true });
            }

            // Delete the message
            await message.delete();
            await interaction.reply({ content: '✅ Message deleted successfully.', ephemeral: true });
        } catch (err) {
            console.error(err);
            await interaction.reply({ content: `❌ Could not delete the message. Maybe the ID is wrong or the message is too old.`, ephemeral: true });
        }
    }
};
