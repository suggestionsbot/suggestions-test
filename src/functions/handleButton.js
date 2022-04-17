const { ButtonInteraction, CacheType } = require('discord.js');

const handleSuggestionDeleteButtons = require('./handleSuggestionDeleteButtons');
const handleStatus = require('./handleStatus');

/**
 * The handle function for select menus.
 * @param {Client} client The client instance.
 * @param {ButtonInteraction<CacheType>} interaction The interaction being handled.
 */
module.exports = (client, interaction) => {
  handleSuggestionDeleteButtons(client, interaction);
  handleStatus(client, interaction);
};
