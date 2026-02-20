const { SlashCommandBuilder } = require('discord.js');
const RESPONSES = ["✔️ ofc", "🤫 sybau", "⁉️ idc", "❌ No", "🔢 67", "☝️ Ask deptonia temu broddie im a bot", "🎥 MOGGED"];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('temuball')
        .setDescription('Ask the magic TEMU ball a question')
        .addStringOption(o => o.setName('question').setDescription('Your question').setRequired(true)),
    async execute(interaction) {
        const question = interaction.options.getString('question');
        const answer = RESPONSES[Math.floor(Math.random() * RESPONSES.length)];
        await interaction.reply(`🎱 **${question}**\n> **Answer:** ${answer}`);
    }
};