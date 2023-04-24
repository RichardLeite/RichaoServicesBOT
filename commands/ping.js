const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Responde com 'Pong! e informa quantos ms o BOT está demorando pra responder'"),

    async execute(interaction) {
        await interaction.reply({ content: `Pong! 🏓\nRespondendo em cerca de: ${interaction.client.ws.ping}ms.`, ephemeral: true })
    }
}