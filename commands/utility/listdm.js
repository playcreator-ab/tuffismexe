const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getUserData } = require('../../database.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('listdm')
        .setDescription('List all stored DMs')
        .addUserOption(o => o.setName('user').setDescription('Filter by user'))
        .addStringOption(o => o.setName('sender').setDescription('Filter by sender name')),

    async execute(interaction) {
        const filterUser = interaction.options.getUser('user');
        const filterSender = interaction.options.getString('sender');

        const db = await getUserData('dm_log');
        const dms = db.dms || [];

        // Apply filters
        let filtered = dms;
        if (filterUser) filtered = filtered.filter(dm => dm.userId === filterUser.id);
        if (filterSender) filtered = filtered.filter(dm => dm.sender.toLowerCase() === filterSender.toLowerCase());

        if (!filtered.length) {
            return interaction.reply({ content: '❌ No DMs found with these filters.', ephemeral: true });
        }

        // Build embed
        const embed = new EmbedBuilder()
            .setTitle('📩 Stored DMs')
            .setColor('#00ff99')
            .setTimestamp();

        // Add fields for each DM (max 25 per embed field limit)
        filtered.slice(0, 25).forEach(dm => {
            embed.addFields({
                name: `Message ID: ${dm.id}`,
                value: `User: <@${dm.userId}>\nSender: ${dm.sender}\nTitle: ${dm.title}\nDescription: ${dm.description}\nSent: <t:${Math.floor(dm.timestamp / 1000)}:f>`
            });
        });

        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
};
