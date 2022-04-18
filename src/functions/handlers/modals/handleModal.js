const { Client } = require('discord.js');
const { ModalSubmitInteraction } = require('discord-modals');

const handleSuggestionCreateModal = require('./handleSuggestionCreateModal');
const handleSuggestionEditModal = require('./handleSuggestionEditModal');

/**
 * The handle function for select menus.
 * @param {Client} client The client instance.
 * @param {ModalSubmitInteraction} interaction The interaction being handled.
 */
module.exports = (client, interaction) => {
  handleSuggestionCreateModal(client, interaction);
  handleSuggestionEditModal(client, interaction);
};
