const { Client, ButtonInteraction } = require('discord.js');
const { manageSuggestionOptions } = require('../components/suggestionActions');

/**
 *This function is used to handle a suggestion's status.
 * @param {Client} client - The client instance.
 * @param {ButtonInteraction} interaction - The interaction being handled.
 */
module.exports = async (client, interaction) => {
  console.log('Button interaction received!');

  switch (interaction.customId) {
    case 'approve': {
      await interaction.reply({
        content: 'The suggestion has been approved!',
        ephemeral: true,
      });

      return;
    }
    case 'reject': {
      await interaction.reply({
        content: 'The suggestion has been rejected!',
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
    default: {
      await interaction.reply({
        content: `A button interaction was received, but I don't know what to do with it!`,
        ephemeral: true,
      });

      return;
    }
  }
};
