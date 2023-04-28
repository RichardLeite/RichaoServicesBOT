const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Cria um embed personalizado.")
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("Título do embed.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("Descrição do embed.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("fieldname")
        .setDescription("Nome do campo.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("fieldvalue")
        .setDescription("Valor do campo.")
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("fieldinline")
        .setDescription("Se o field é ou não inline.")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("color")
        .setDescription("Cor em hexadecimal ou Escrita do embed.")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("image")
        .setDescription("URL da imagem a ser adicionada.")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("author")
        .setDescription("Nome do autor do embed.")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("author_url")
        .setDescription("URL do autor do embed.")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("author_icon_url")
        .setDescription("URL do ícone do autor do embed.")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option.setName("url").setDescription("URL do embed.").setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("thumbnail")
        .setDescription("URL da miniatura a ser adicionada.")
        .setRequired(false)
    ),

  async execute(interaction) {
    if (!interaction.member.permissions.has("ADMINISTRATOR")) {
      return interaction.reply({
        content: "Você precisa ser um administrador para usar este comando.",
        ephemeral: true,
      });
    }

    const title = interaction.options.getString("title");
    const description = interaction.options.getString("description");
    const color = interaction.options.getString("color") || "Purple";
    const imageTag = interaction.options.getString("image");
    const authorName = interaction.options.getString("author");
    const authorUrl = interaction.options.getString("author_url");
    const authorIconUrl = interaction.options.getString("author_icon_url");
    const url = interaction.options.getString("url");
    const thumbnailTag = interaction.options.getString("thumbnail");
    const fieldname = interaction.options.getString("fieldname");
    const fieldvalue = interaction.options.getString("fieldvalue");
    const fieldinline = interaction.options.getString("fieldinline");

    const embed = new EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setColor(color);

    if (imageTag) {
      embed.setImage(imageTag);
    }

    if (authorName) {
      embed.setAuthor({
        name: authorName,
        iconURL: authorIconUrl,
        url: authorUrl,
      });
    }

    if (url) {
      embed.setURL(url);
    }

    if (thumbnailTag) {
      embed.setThumbnail(thumbnailTag);
    }

    if (fieldname && fieldvalue) {
      embed.setFields({
        name: fieldname,
        value: fieldvalue,
        inline: false,
      });
    }

    await interaction.reply({ embeds: [embed] });
  },
};
