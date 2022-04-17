const { Client, ButtonInteraction } = require('discord.js');
const { manageSuggestionOptions } = require('../components/suggestionActions');

/**
 *This function is used to handle a suggestion's status.
 * @param {Client} client - The client instance.
 * @param {ButtonInteraction} interaction - The interaction being handled.
 */
module.exports = async (client, interaction) => {
  switch (interaction.customId) {
    case 'upvote': {
      await interaction.reply({
        content: 'You have upvoted this suggestion!',
        ephemeral: true,
      });

      return;
    }
    case 'downvote': {
      await interaction.reply({
        content: 'You have downvoted this suggestion!',
        ephemeral: true,
      });

      return;
    }
    case 'manage': {
      await interaction.reply({
        content: 'Now managing the suggestion!',
        components: [manageSuggestionOptions],
        ephemeral: true,
      });

      return;
    }
  }
};
