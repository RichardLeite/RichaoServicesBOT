const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete')
        .setDescription('Exclui uma quantidade de mensagens do canal.')
        .addIntegerOption(option =>
            option.setName('quantidade')
                .setDescription('Selecione a quantidade das últimas mensagens enviadas no canal a serem excluídas.')
                .setRequired(false))
        .addBooleanOption(option =>
            option.setName('todas')
                .setDescription('Se todas as mensagens do canal devem ser excluídas.')
                .setRequired(false)),

    async execute(interaction) {
        const quantidade = interaction.options.getInteger('quantidade');
        const all = interaction.options.getBoolean('todas') || false;

        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return await interaction.reply({
                content: 'Você não tem permissão para usar este comando.',
            })
        }

        const channel = interaction.channel
        if (all) {
            const fetched = await channel.messages.fetch();
            channel.bulkDelete(fetched, true)
                .then(() => {
                    interaction.reply({
                        content: `Todas as mensagens de ${channel} foram excluídas.`,
                    })
                })
                .catch(err => {
                    console.error(err)
                    interaction.reply({
                        content: 'Ocorreu um erro ao tentar excluir as mensagens do canal.',
                    })
                })
        } else {
            channel.bulkDelete(quantidade, true)
                .then(() => {
                    interaction.reply({
                        content: `Foram excluídas ${quantidade} mensagens de ${channel}.`,
                    })
                })
                .catch(err => {
                    console.error(err)
                    interaction.reply({
                        content: 'Ocorreu um erro ao tentar excluir as mensagens do canal.',
                    })
                })
        }
    },
}
