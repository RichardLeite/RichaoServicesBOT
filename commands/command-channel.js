const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("set-command-channel")
    .setDescription("Define o canal de comandos.")
    .addChannelOption((option) =>
      option
        .setName("canal")
        .setDescription("O canal de comandos")
        .setRequired(true)
    ),
  async execute(interaction) {
    // Verifica se o usuário é um administrador
    if (!interaction.member.permissions.has("ADMINISTRATOR")) {
      return interaction.reply({
        content: "Você precisa ser um administrador para usar este comando.",
        ephemeral: true,
      });
    }

    // Obtém o canal escolhido
    const commandChannel = interaction.options.getChannel("canal");
    // Anota o cargo de Membros
    const membersRole = "Membros";

    // Permite que o bot envie mensagens no canal de comandos
    await commandChannel.permissionOverwrites.edit(interaction.client.user, {
      ViewChannel: true,
      SendMessages: true,
    });

    // Impede que outros usuários enviem mensagens no canal de comandos
    await commandChannel.permissionOverwrites.edit(membersRole, {
      ViewChannel: true,
      SendMessages: false,
    });

    // Permite que todos os membros possam usar comandos no canal de comandos
    await commandChannel.permissionOverwrites.edit(membersRole, {
      ViewChannel: true,
      UseApplicationCommands: true,
    });

    // Retorna uma mensagem de sucesso para o usuário
    return interaction.reply({
      content: `Canal de comandos definido como ${commandChannel}.`,
      ephemeral: true,
    });
  },
};
