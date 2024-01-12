const axios = require("axios");

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

// Dotenv
const dotenv = require("dotenv");
dotenv.config();
const { EXTERNAL_HOSTNAME } = process.env;

async function getExternalIp() {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    return response.data.ip;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const LinksEmbed = new EmbedBuilder()
  .setColor("Purple")
  .setTitle("Links")
  .setDescription("Abaixo estão os Links para acessar os nossos Serviços");

const JfaGoEmbed = new EmbedBuilder()
  .setColor("Purple")
  .setTitle("Jfa-Go")
  .setDescription(
    "Aqui você pode criar sua conta e acessar os serviços abaixo. Você precisa de uma conta para conseguir entrar (Caso já tenha, desconsidere)."
  )
  .addFields({ name: "Jfa-Go", value: " " })
  .setThumbnail("https://cdn-icons-png.flaticon.com/512/1063/1063809.png")
  .setFooter({
    text: "Caso tenha algum problema fale com o FUNDADOR ou STAFF.",
  });

const JellyfinEmbed = new EmbedBuilder()
  .setColor("Purple")
  .setTitle("Jellyfin")
  .setDescription(
    "Aqui você pode assistir Filmes, Animes, Séries, Cursos, entre outros."
  )
  .addFields({ name: "Jellyfin", value: " " })
  .setThumbnail("https://www.openhab.org/logos/jellyfin.png")
  .setFooter({
    text: "Caso tenha algum problema fale com o FUNDADOR ou STAFF.",
  });

const JellyseerrEmbed = new EmbedBuilder()
  .setColor("Purple")
  .setTitle("Jellyseerr")
  .setDescription(
    "Aqui você pode solicitar algum contéudo (Anime, Série, Filme e etc) a ser adicionado no Jellyfin."
  )
  .addFields({ name: "Jellyseerr", value: " " })
  .setThumbnail(
    "https://static-00.iconduck.com/assets.00/jellyseerr-icon-512x492-iwuo1nft.png"
  )
  .setFooter({
    text: "Caso tenha algum problema fale com o FUNDADOR ou STAFF.",
  });

module.exports = {
  data: new SlashCommandBuilder()
    .setName("links")
    .setDescription("Links para acessar os nossos Serviços"),

  async execute(interaction) {
    // Verifica se tem um hostname definido no .env ou encontra o IP externo da própria rede
    const hostname = EXTERNAL_HOSTNAME || (await getExternalIp());

    JellyfinEmbed.spliceFields(0, 1, {
      name: "Jellyfin",
      value: `[Clique aqui para Acessar o Jellyfin.](http://${hostname}:8096)`,
      inline: true,
    });
    JellyseerrEmbed.spliceFields(0, 1, {
      name: "Jellyseerr",
      value: `[Clique aqui para Acessar o Jellyseerr.](http://${hostname}:5055)`,
      inline: true,
    });
    JfaGoEmbed.spliceFields(0, 1, {
      name: "Jfa-Go",
      value: `[Clique aqui para Criar sua conta no Jfa-Go](http://${hostname}:8056/invite/nzJz2bcJKXDzgLCoTfigp5)`,
      inline: true,
    });
    await interaction.reply({
      embeds: [LinksEmbed, JfaGoEmbed, JellyfinEmbed, JellyseerrEmbed],
    });
  },
};
