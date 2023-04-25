const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Cria um embed personalizado.')
        .addStringOption(option =>
            option.setName('title')
                .setDescription('Título do embed.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('description')
                .setDescription('Descrição do embed.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('color')
                .setDescription('Cor em hexadecimal ou Escrita do embed.')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('image')
                .setDescription('URL da imagem a ser adicionada.')
                .setRequired(false)),
    async execute(interaction) {
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply({ content: 'Você precisa ser um administrador para usar este comando.', ephemeral: true });
        }

        const title = interaction.options.getString('title');
        const description = interaction.options.getString('description');
        const color = interaction.options.getString('color') || 'Purple';
        const imageTag = interaction.options.getString('image');

        const embed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setColor(color);

            if (imageTag) {
                embed.setImage(imageTag);
            }

        await interaction.reply({ embeds: [embed] });
    },
};
