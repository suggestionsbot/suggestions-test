const { Client } = require('discord.js');
const { ModalSubmitInteraction } = require('discord-modals');

const createSuggestion = require('../../suggestions/createSuggestion');

/**
 * Event handler for the create suggestion modal.
 * @param {Client} client The client instance.
 * @param {ModalSubmitInteraction} modal - The modal interaction.
 * @return {Promise<void>}
 */
module.exports = async (client, modal) => {
  if (modal.customId !== 'suggestion-create-modal') return;

  const { thread } = await createSuggestion(client, modal);

  await modal.deferReply({ ephemeral: true });
  await modal.followUp({
    content: `Your suggestion has been created in ${thread.toString()}!`,
    ephemeral: true,
  });
};
