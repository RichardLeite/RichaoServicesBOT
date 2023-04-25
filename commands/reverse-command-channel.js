const { Permissions, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("remover-permissoes")
    .setDescription("Remove as permissões do canal de comandos.")
    .addChannelOption((option) =>
      option
        .setName("canal")
        .setDescription("O canal que deseja remover as permissões.")
        .setRequired(true)
    ),
  async execute(interaction) {
    // Verifica se o usuário que executou o comando é administrador
    if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
      return interaction.reply({
        content: "Você não tem permissão para usar este comando.",
        ephemeral: true,
      });
    }

    // Obtém o canal passado como parâmetro pelo usuário
    const channel = interaction.options.getChannel("canal");

    // Remove as permissões do bot para enviar mensagens no canal
    await channel.permissionOverwrites.edit(interaction.client.user, {
      SEND_MESSAGES: false,
    });

    // Permite que todos os membros enviem mensagens no canal
    await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
      SEND_MESSAGES: true,
    });

    return interaction.reply({
      content: `Permissões removidas com sucesso no canal ${channel.name}!`,
      ephemeral: true,
    });
  },
};
