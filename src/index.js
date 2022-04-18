require('dotenv').config();

const { Client, Intents, Collection } = require('discord.js');
const path = require('path');
const discordModals = require('discord-modals');

const walkDirectory = require('./functions/walkDirectory');
const handleModal = require('./functions/handlers/modals/handleModal');
const handleSelectMenu = require('./functions/handlers/menus/handleSelectMenu');
const handleButton = require('./functions/handlers/buttons/handleButton');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
discordModals(client);

client.commands = new Collection();
const commandFiles = walkDirectory(
  `${path.join(path.dirname(require.main.filename), 'commands')}`,
);

for (const file of commandFiles) {
  const command = require(require.resolve(file));
  client.commands.set(command.data.name, command);
}

client.once('ready', () => {
  console.log('Ready!');
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isButton()) return handleButton(client, interaction);
  if (interaction.isSelectMenu()) return handleSelectMenu(client, interaction);

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(client, interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'There was an error trying to execute that command!',
      ephemeral: true,
    });
  }
});

client.on('modalSubmit', async (modal) => {
  try {
    await handleModal(client, modal);
  } catch (e) {
    console.error(e);
    await modal.reply({
      content: 'There was an error trying to execute that modal!',
      ephemeral: true,
    });
  }
});

client.login().catch(console.error);
