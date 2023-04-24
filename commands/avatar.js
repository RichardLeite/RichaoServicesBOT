const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Mostra a foto de perfil de um usuário.')
        .addUserOption(option => 
            option.setName('user')
            .setDescription('O usuário do qual você quer ver a foto de perfil.')
            .setRequired(true)),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const embed = new EmbedBuilder()
            .setTitle(`Foto de Perfil de ${user.username}`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }))
            .setColor('Random');

        await interaction.reply({ embeds: [embed] });
    },
};
