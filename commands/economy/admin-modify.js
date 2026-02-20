const { SlashCommandBuilder } = require('discord.js');
const { getUserData, updateUserData } = require('../../database.js');

const BADGES = {
    1: ' ⭐',
    2: ' 🔥',
    3: ' 💎',
    4: ' 👑',
    5: ' 🛡️'
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('admin-modify')
        .setDescription('Modify user data (Admin only)')
        .addUserOption(option => option
            .setName('user')
            .setDescription('Target user')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('action')
            .setDescription('Action to perform')
            .setRequired(true)
            .addChoices(
                { name: 'Add Money', value: 'add_money' },
                { name: 'Remove Money', value: 'remove_money' },
                { name: 'Edit Money', value: 'edit_money' },
                { name: 'Add Badge', value: 'add_badge' },
                { name: 'Remove Badge', value: 'remove_badge' },
                { name: 'Reset User', value: 'reset' }
            )
        )
        .addIntegerOption(option => option
            .setName('val')
            .setDescription('Amount or badge ID (1-5)')
            .setRequired(false)
        ),
    async execute(interaction) {
        const target = interaction.options.getUser('user');
        const action = interaction.options.getString('action');
        const val = interaction.options.getInteger('val') || 0;

        let data = await getUserData(target.id);

        switch (action) {
            case 'add_money': data.balance += val; break;
            case 'remove_money': data.balance = Math.max(0, data.balance - val); break;
            case 'edit_money': data.balance = Math.max(0, val); break;
            case 'add_badge':
                const badge = BADGES[val];
                if (!badge) return interaction.reply({ content: '❌ Invalid badge ID', ephemeral: true });
                if (!data.badges.includes(badge)) data.badges.push(badge);
                break;
            case 'remove_badge':
                const badge2 = BADGES[val];
                if (!badge2) return interaction.reply({ content: '❌ Invalid badge ID', ephemeral: true });
                data.badges = data.badges.filter(b => b !== badge2);
                break;
            case 'reset':
                data = { xp: 0, level: 1, balance: 100, badges: [], warns: [], lastMessage: 0 };
                break;
        }

        await updateUserData(target.id, data);

        return interaction.reply({ content: `✅ Action **${action}** applied to ${target.username}`, ephemeral: true });
    }
};
