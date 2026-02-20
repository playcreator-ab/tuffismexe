const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Create an embed message')

        // REQUIRED OPTIONS FIRST
        .addChannelOption(o =>
            o.setName('channel')
             .setDescription('Target channel')
             .setRequired(true)
        )
        .addStringOption(o =>
            o.setName('title')
             .setDescription('Embed title')
             .setRequired(true)
        )
        .addStringOption(o =>
            o.setName('description')
             .setDescription('Embed description')
             .setRequired(true)
        )
        .addStringOption(o =>
            o.setName('sender_type')
             .setDescription('Who is this embed from?')
             .setRequired(true)
             .addChoices(
                 { name: 'Me', value: 'me' },
                 { name: 'Another user', value: 'user' },
                 { name: 'Administration', value: 'admin' },
                 { name: 'Custom name', value: 'custom' }
             )
        )

        // OPTIONAL OPTIONS AFTER
        .addStringOption(o =>
            o.setName('color')
             .setDescription('Embed color (#RRGGBB)')
        )
        .addUserOption(o =>
            o.setName('sender_user')
             .setDescription('User to show as sender (only if "Another user")')
        )
        .addStringOption(o =>
            o.setName('sender_name')
             .setDescription('Custom sender name (only if "Custom name")')
        ),

    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        const title = interaction.options.getString('title');
        const description = interaction.options.getString('description');
        const senderType = interaction.options.getString('sender_type');
        const senderUser = interaction.options.getUser('sender_user');
        const customName = interaction.options.getString('sender_name');

        let color = interaction.options.getString('color') || '#026600';
        if (!/^#([0-9A-F]{6})$/i.test(color)) color = '#026600';

        let footerText;
        let footerIcon;

        switch (senderType) {
            case 'me':
                footerText = `Sent by ${interaction.user.username}`;
                footerIcon = interaction.user.displayAvatarURL();
                break;

            case 'user':
                if (!senderUser)
                    return interaction.reply({ content: '❌ Select a user.', ephemeral: true });
                footerText = `Sent by ${senderUser.username}`;
                footerIcon = senderUser.displayAvatarURL();
                break;

            case 'admin':
                footerText = 'Sent by Administration';
                break;

            case 'custom':
                if (!customName)
                    return interaction.reply({ content: '❌ Provide a custom name.', ephemeral: true });
                footerText = `Sent by ${customName}`;
                break;
        }

        const embed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setColor(color)
            .setFooter(
                footerIcon ? { text: footerText, iconURL: footerIcon } : { text: footerText }
            )
            .setTimestamp();

        await channel.send({ embeds: [embed] });
        await interaction.reply({ content: '✅ Embed sent.', ephemeral: true });
    }
};