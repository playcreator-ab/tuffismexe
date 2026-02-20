const { SlashCommandBuilder } = require('discord.js');
const { setThreadChannel } = require('../../database.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('thread-setchannel')
        .setDescription('Set channel where messages will auto-start threads')
        .addChannelOption(opt => opt.setName('channel').setDescription('Channel to watch').setRequired(true)),
    async execute(interaction){
        const channel = interaction.options.getChannel('channel');
        if(!interaction.guild) return interaction.reply({ content: 'This command must be used in a guild.', ephemeral: true });
        try{
            await setThreadChannel(interaction.guild.id, channel.id);
            await interaction.reply({ content: `✅ Channel set to ${channel} for auto-threads.`, ephemeral: false });
        }catch(e){
            console.error(e);
            await interaction.reply({ content: '❌ Failed to set channel.', ephemeral: true });
        }
    }
};
