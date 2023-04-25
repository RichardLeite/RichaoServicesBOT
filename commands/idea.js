const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ideias")
    .setDescription("Envie uma ideia ou feedback.")
    .addStringOption((option) =>
      option
        .setName("titulo")
        .setDescription("Título da ideia/feedback.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("descricao")
        .setDescription("Descrição da ideia/feedback.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("url-imagem")
        .setDescription("URL/Link de Imagem para adicionar à ideia/feedback.")
        .setRequired(false)
    ),
  async execute(interaction) {
    // Verifica se o usuário tem permissão para usar o comando
    if (!interaction.member.permissions.has("SEND_MESSAGES")) {
      return interaction.reply({
        content: "Você não tem permissão para enviar mensagens neste servidor.",
        ephemeral: true,
      });
    }

    // Pega o canal o canal de ideias
    const channelToSend = interaction.guild.channels.cache.find(
      (channel) =>
        channel.name === "『💡』ideias-e-feedback" ||
        channel.id === "1098810887147626539"
    );

    // Verifica se o canal existe
    if (!channelToSend) {
      return interaction.reply({
        content: "Não foi possível encontrar o canal especificado.",
        ephemeral: true,
      });
    }

    // Obtém as informações da ideia/feedback a ser enviada
    const titulo = interaction.options.getString("titulo");
    const descricao = interaction.options.getString("descricao");
    const imagem = interaction.options.getString("url-imagem");

    // Cria o embed com as informações da ideia/feedback
    const ideiaEmbed = new EmbedBuilder()
      .setColor("Random")
      .setTitle(titulo)
      .setDescription(descricao)
      .setTimestamp()
      .setAuthor({
        name: `Enviado por ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    if (imagem) {
      ideiaEmbed.setImage(imagem);
    }

    // Envia o embed no canal especificado
    const sentMessage = await channelToSend.send({ embeds: [ideiaEmbed] });

    // Adiciona as reações no embed
    await sentMessage.react("👍");
    await sentMessage.react("❌");

    // Envia a mensagem de confirmação para o usuário que enviou a ideia/feedback
    await interaction.reply({
      content: `${interaction.user}, a sua ideia/feedback foi enviada com sucesso!`,
      ephemeral: true,
    });
  },
};
