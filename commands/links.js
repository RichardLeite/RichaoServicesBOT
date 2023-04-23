const axios = require('axios');

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

async function getExternalIp() {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    return response.data.ip;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const exampleEmbed = new EmbedBuilder()
	.setColor("Purple")
	.setTitle("Links")
	.setDescription("Links para acessar os nossos Serviços")
	.addFields(
    { name: '\u200B', value: '\u200B' },
    { name: 'Jellyfin', value: `Jellyfin`, inline: true },
    { name: '\u200B', value: '\u200B' },
    { name: 'Jellyseerr', value: `Jellyseerr`, inline: true },
    { name: '\u200B', value: '\u200B' },
    { name: 'Jfa-Go', value: `Jfa-Go`, inline: true },
    { name: '\u200B', value: '\u200B' }
  )
  .setFooter({ text: 'Caso tenha algum problema fale com o FUNDADOR ou STAFF.' });

module.exports = {
  data: new SlashCommandBuilder()
    .setName("links")
    .setDescription("Links para acessar os nossos Serviços"),

  async execute(interaction) {
    const ip = await getExternalIp();
    exampleEmbed.spliceFields(1, 1, { name: 'Jellyfin', value: `[Clique aqui para assistir Filmes, Animes, Séries, Cursos, entre outros.](${ip}:8096)`, inline: true });
    exampleEmbed.spliceFields(3, 1, { name: 'Jellyseerr', value: `[Clique aqui para solicitar algum contéudo a ser adicionado no Jellyfin.](${ip}:5055)`, inline: true });
    exampleEmbed.spliceFields(5, 1, { name: 'Jfa-Go', value: `[Clique aqui para criar sua conta e acessar os serviços anteriormente mencionados.](${ip}:8056)`, inline: true });
    await interaction.reply({ embeds: [exampleEmbed] })
  }
}
