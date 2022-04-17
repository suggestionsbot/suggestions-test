const { Client, SelectMenuInteraction } = require('discord.js');

/**
 * This function handles the selection of various suggestion management action.
 * @param {Client} client - The client instance.
 * @param {SelectMenuInteraction} interaction - The interaction being handled.
 */
module.exports = async (client, interaction) => {
  if (interaction.customId !== 'manage-suggestion-options') return;

  switch (interaction.values[0]) {
    case 'approve-option': {
      await interaction.reply({
        content: 'You have approved this suggestion!',
        ephemeral: true,
      });

      return;
    }
    case 'reject-option': {
      await interaction.reply({
        content: 'You have rejected this suggestion!',
        ephemeral: true,
      });

      return;
    }
    case 'delete-option': {
      setTimeout(async () => {
        await client.channels.cache.get(interaction.channelId).delete();
      }, 5000);

      await interaction.reply(
        "The suggestion and it's thread will be deleted in **5 seconds**!",
      );

      return;
    }
    default: {
      await interaction.reply({
        content: `A select menu interaction was received, but I don't know what to do with it!`,
        ephemeral: true,
      });
    }
  }
};
