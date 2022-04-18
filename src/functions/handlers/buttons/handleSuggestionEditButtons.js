const { Client, ButtonInteraction, CacheType } = require('discord.js');

const { suggestionEditModal } = require('../../../components/suggestionModals');
const { showModal } = require('discord-modals');
const { getSuggestion } = require('../../../providers/database/helpers');

/**
 * This function handles the actions of editing a suggestion.
 * @param {Client} client - The client instance.
 * @param {ButtonInteraction<CacheType>} interaction - The interaction being handled.
 * @return {Promise<void>}
 */
module.exports = async (client, interaction) => {
  switch (interaction.customId) {
    case 'confirm-edit': {
      const suggestion = getSuggestion({ thread: interaction.channelId });
      if (!suggestion)
        return interaction.update({
          content: 'This suggestion does not exist!',
          components: [],
          ephemeral: true,
        });

      suggestionEditModal.components[0].components[0].value = suggestion.title;
      suggestionEditModal.components[1].components[0].value =
        suggestion.description;

      await showModal(suggestionEditModal, { client, interaction });

      return;
    }
    case 'cancel-edit': {
      await interaction.update({
        content: 'Cancelled the edit of this suggestion.',
        components: [],
        ephemeral: true,
      });

      return;
    }
  }
};
