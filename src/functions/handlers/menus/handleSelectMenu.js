const { Interaction, SelectMenuInteraction, CacheType } = require('discord.js');

const handleSuggestionSelectMenu = require('./handleSuggestionSelectMenu');

/**
 * The handle function for select menus.
 * @param {Client} client The client instance.
 * @param {Interaction<CacheType>|SelectMenuInteraction<CacheType>} interaction The interaction being handled.
 */
module.exports = (client, interaction) => {
  handleSuggestionSelectMenu(client, interaction);
};
