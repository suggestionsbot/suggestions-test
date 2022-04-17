const { Client, ButtonInteraction } = require('discord.js');

/**
 *This function is used to handle a suggestion's status.
 * @param {Client} client - The client..
 * @param {ButtonInteraction} interaction
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
    case 'delete': {
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
        content: `A button interaction was received, but I don't know what to do with it!`,
        ephemeral: true,
      });

      return;
    }
  }
};
