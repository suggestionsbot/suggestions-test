const { Client, ButtonInteraction, CacheType } = require('discord.js');

const deleteSuggestion = require('../../suggestions/deleteSuggestion');

/**
 * This function handles the actions of deleting a suggestion..
 * @param {Client} client - The client instance.
 * @param {ButtonInteraction<CacheType>} interaction - The interaction being handled.
 */
module.exports = async (client, interaction) => {
  switch (interaction.customId) {
    case 'confirm-delete': {
      setTimeout(async () => {
        await deleteSuggestion(client, interaction);
      }, 5000);

      await interaction.reply(
        "The suggestion and it's thread will be deleted in **5 seconds**!",
      );

      return;
    }
    case 'cancel-delete': {
      await interaction.update({
        content: 'Cancelled deletion of suggestion.',
        components: [],
        ephemeral: true,
      });

      return;
    }
  }
};
