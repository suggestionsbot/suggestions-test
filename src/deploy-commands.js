require('dotenv').config();

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const path = require('path');
const url = require('url');

const { clientId, guildId } = require('./config.json');
const walkDirectory = require('./functions/walkDirectory');

const commands = [];
const commandFiles = walkDirectory(
  `${path.join(path.dirname(require.main.filename), 'commands')}`,
);

for (const file of commandFiles) {
  const command = require(require.resolve(file));
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
