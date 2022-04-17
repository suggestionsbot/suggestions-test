const { Client, SelectMenuInteraction, CacheType } = require('discord.js');

const { suggestionDeleteRow } = require('../components/suggestionActions');

/**
 * This function handles the selection of various suggestion management action.
 * @param {Client} client - The client instance.
 * @param {SelectMenuInteraction<CacheType>} interaction - The interaction being handled.
 */
module.exports = async (client, interaction) => {
  if (interaction.customId !== 'manage-suggestion-options') return;

  switch (interaction.values[0]) {
    case 'approve-option': {
      await interaction.update({
        content: 'You have approved this suggestion!',
        components: [],
        ephemeral: true,
      });

      return;
    }
    case 'reject-option': {
      await interaction.update({
        content: 'You have rejected this suggestion!',
        components: [],
        ephemeral: true,
      });

      return;
    }
    case 'delete-option': {
      await interaction.update({
        content: 'Please confirm that you want to delete this suggestion.',
        components: [suggestionDeleteRow],
        ephemeral: true,
      });

      return;
    }
    default: {
      await interaction.update({
        content: `A select menu interaction was received, but I don't know what to do with it!`,
        ephemeral: true,
      });
    }
  }
};
