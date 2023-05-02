const {
  Client,
  Events,
  GatewayIntentBits,
  Collection,
  REST,
  Routes,
  EmbedBuilder,
} = require("discord.js");

// Dotenv
const dotenv = require("dotenv");
dotenv.config();
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;

// Importação dos comandos
const fs = require("node:fs");
const path = require("node:path");
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

// Deploy de Slash Commands
const commands = [];

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

// instância REST
const rest = new REST({ version: "10" }).setToken(TOKEN);

// deploy
(async () => {
  try {
    console.log(`Resentando ${commands.length} comandos...`);

    // PUT
    const data = await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );
    console.log("Comandos registrados com sucesso!");
  } catch (error) {
    console.error(error);
  }
})();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});
client.commands = new Collection();

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `Esse comando em ${filePath} está com "data" ou "execute ausentes"`
    );
  }
}

// Login do bot
client.once(Events.ClientReady, (c) => {
  console.log(`Pronto! Login realizado como ${c.user.tag}`);
});
client.login(TOKEN);

// Listener de eventos abaixo

// Comentado pois não será utilizado atualmente
/* // Menciona usuário no canal de Pedidos
client.on("messageCreate", async (message) => {
  // Verifica se a mensagem foi enviada no canal desejado
  if (message.channel.id === "1098811511855644732") {
    // Verifica se a mensagem é uma embed e se contém a substring "Request Now Available" no título
    if (
      message.embeds.length > 0 &&
      message.embeds[0].author &&
      message.embeds[0].author.name.includes("Request Now Available")
    ) {
      // Obtém o valor do field "Requested By"
      const requestedByField = message.embeds[0].fields.find(
        (field) => field.name === "Requested By"
      );
      const requestedBy = requestedByField.value;
      if (requestedBy) {
        const requestedByMember = await message.guild.members.fetch({
          query: requestedBy,
          limit: 1,
        });
        if (requestedByMember.size) {
          const member = requestedByMember.first();
          message.reply(`${member.user}, sua solicitação foi concluída!`);
        } else {
          message.reply(`@${requestedBy}, sua solicitação foi concluída!`);
        }
      } else {
        console.log(
          "Não foi possível encontrar o campo 'Requested By' no embed."
        );
      }
    }
  }
}); */

// Adiciona reações ao canal de Pedidos
client.on("messageCreate", async (message) => {
  // Verifica se a mensagem foi enviada no canal especificado
  if (message.channel.id === "1098811511855644732") {
    // Verifica se a mensagem é uma embed e se contém a substring "Request Now Available" no título
    if (
      message.embeds.length > 0 &&
      message.embeds[0].author &&
      message.embeds[0].author.name.includes("Request Now Available")
    ) {
      // Adiciona uma reação à mensagem
      await message.react("👍");
      await message.react("❤️");
      await message.react("👎");
      await message.react("❌");
    }
  }
});

// Evento que envia mensagens de Boas Vindas
client.on("guildMemberAdd", async (member) => {
  // Pega o canal de boas-vindas pelo nome ou ID
  const channel =
    member.guild.channels.cache.find((ch) => ch.name === "『🟣』boas-vindas") ||
    member.guild.channels.cache.get("1098809199984648194");

  // Cria um embed personalizado com a mensagem de boas-vindas
  const welcomeEmbed = new EmbedBuilder()
    .setColor("Purple")
    .setTitle(`Bem-vindo(a) ao servidor, ${member.user.username}!`)
    .setDescription(`Você é o ${member.guild.memberCount}º membro do servidor!`)
    .setThumbnail(member.user.displayAvatarURL());

  // Obtém o cargo 'Membros' pelo nome ou ID
  const role =
    member.guild.roles.cache.find((role) => role.name === "Membros") ||
    member.guild.roles.cache.get("1100044632240431134");

  // Adiciona o cargo incial ao membro
  member.roles.add(role);

  // Envia a mensagem de boas-vindas no canal
  channel.send({ embeds: [welcomeEmbed] });
});

// Listener de interações com o bot
client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isStringSelectMenu()) {
    const selected = interaction.values[0];
    if (selected == "javascript") {
      await interaction.reply(
        "Documentação do Javascript: https://developer.mozilla.org/en-US/docs/Web/JavaScript"
      );
    } else if (selected == "python") {
      await interaction.reply("Documentação do Python: https://www.python.org");
    } else if (selected == "csharp") {
      await interaction.reply(
        "Documentação do C#: https://learn.microsoft.com/en-us/dotnet/csharp/"
      );
    } else if (selected == "discordjs") {
      await interaction.reply(
        "Documentação do Discord.js: https://discordjs.guide/#before-you-begin"
      );
    }
  }
  if (!interaction.isChatInputCommand()) return;
  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) {
    console.error("Comando não encontrado");
    return;
  }
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply("Houve um erro ao executar esse comando!");
  }
});
