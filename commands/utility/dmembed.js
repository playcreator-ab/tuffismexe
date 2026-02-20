const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getUserData, updateUserData } = require('../../database.js'); // use your DB helper

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dmembed')
        .setDescription('Send an embed to a user via DM')
        .addUserOption(o => o.setName('user').setDescription('Target user').setRequired(true))
        .addStringOption(o => o.setName('title').setDescription('Embed title').setRequired(true))
        .addStringOption(o => o.setName('description').setDescription('Embed description').setRequired(true))
        .addStringOption(o => o.setName('color').setDescription('Embed color (#RRGGBB)'))
        .addStringOption(o => o.setName('sender').setDescription('Who is this from? Default: Administration')),

    async execute(interaction) {
        const targetUser = interaction.options.getUser('user');
        const title = interaction.options.getString('title');
        const description = interaction.options.getString('description');
        let color = interaction.options.getString('color') || '#0099ff';
        let senderName = interaction.options.getString('sender') || 'Administration';

        if (!/^#([0-9A-F]{6})$/i.test(color)) color = '#0099ff';

        const embed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setColor(color)
            .setFooter({ text: `Sent by ${senderName}` })
            .setTimestamp();

        try {
            // Send DM
            const dmMessage = await targetUser.send({ embeds: [embed] });

            // Save DM info to database
            const db = await getUserData('dm_log'); // special "dm_log" entry
            if (!db.dms) db.dms = [];
            db.dms.push({
                id: dmMessage.id,
                userId: targetUser.id,
                sender: senderName,
                title,
                description,
                color,
                timestamp: Date.now()
            });
            await updateUserData('dm_log', db);

            // Reply confirmation with message ID
            await interaction.reply({ content: `✅ DM sent to ${targetUser.tag}! Message ID: \`${dmMessage.id}\``, ephemeral: true });

        } catch (err) {
            console.error(err);
            await interaction.reply({ content: '❌ Could not send DM. Maybe the user has DMs closed.', ephemeral: true });
        }
    }
};
