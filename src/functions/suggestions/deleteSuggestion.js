const { Client, Interaction } = require('discord.js');

const db = require('../../providers/database');

/**
 * This function is used to delete a suggestion.
 * @param {Client} client The client instance.
 * @param {Interaction} interaction The interaction.
 */
module.exports = async (client, interaction) => {
  await Promise.all([
    client.channels.cache.get(interaction.channelId).delete(),
    deleteSuggestionFromDb(interaction.channelId),
  ]);
};

/**
 * This function is used to delete a suggestion from the database.
 * @param {String} id The suggestion thread's channel id.
 * @return {void}
 */
const deleteSuggestionFromDb = (id) => {
  return db.get('suggestions').remove({ thread: id }).write();
};
