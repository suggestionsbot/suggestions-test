const { Client } = require('discord.js');
const { ModalSubmitInteraction } = require('discord-modals');

const editSuggestion = require('../../suggestions/editSuggestion');

/**
 * Event handler for the edit suggestion modal.
 * @param {Client} client The client instance.
 * @param {ModalSubmitInteraction} modal - The modal interaction.
 * @return {Promise<void>}
 */
module.exports = async (client, modal) => {
  if (modal.customId !== 'suggestion-edit-modal') return;

  await editSuggestion(client, modal);

  await modal.update({
    content: 'The suggestion has been edited.',
    components: [],
    ephemeral: true,
  });
};
