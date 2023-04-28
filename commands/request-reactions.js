const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add-reactions")
    .setDescription(
      "Adiciona reações a todas as mensagens com 'Request Now Available' no título."
    )
    .addChannelOption((option) =>
      option
        .setName("canal")
        .setDescription("O canal onde as mensagens serão verificadas.")
        .setRequired(true)
    ),
  async execute(interaction) {
    // Obtém o canal escolhido
    const channel = interaction.options.getChannel("canal");

    // Verifica se o usuário é um administrador
    if (!interaction.member.permissions.has("ADMINISTRATOR")) {
      return interaction.reply({
        content: "Você precisa ser um administrador para usar este comando.",
        ephemeral: true,
      });
    }

    // Adiciona reações às mensagens existentes
    const messages = await channel.messages.fetch();
    const filteredMessages = messages.filter(
      (msg) =>
        msg.embeds.length > 0 &&
        msg.embeds[0].author &&
        msg.embeds[0].author.name.includes("Request Now Available")
    );
    filteredMessages.forEach((msg) => {
      msg.react("✅");
      msg.react("👍");
      msg.react("❌");
      msg.react("👎");
    });

    // Retorna uma mensagem de sucesso para o usuário
    return interaction.reply({
      content: `Reações adicionadas às mensagens com 'Request Now Available' no título em ${channel}.`,
      ephemeral: true,
    });
  },
};
