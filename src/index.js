require('dotenv').config();

const { Client, Intents, Collection } = require('discord.js');
const path = require('path');
const discordModals = require('discord-modals');

const handleStatus = require('./functions/handleStatus');
const walkDirectory = require('./functions/walkDirectory');
const handleSuggestionModal = require('./functions/handleSuggestionModal');

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
  if (interaction.isButton()) return handleStatus(client, interaction);

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
    if (modal.customId === 'suggestion-modal')
      await handleSuggestionModal(client, modal);
  } catch (e) {
    console.error(e);
    await modal.reply({
      content: 'There was an error trying to execute that modal!',
      ephemeral: true,
    });
  }
});

client.login().catch(console.error);