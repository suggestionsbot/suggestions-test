const { Client, Interaction } = require('discord.js');

const db = require('../../providers/database');
const { mainEmbed } = require('../../components/suggestionEmbeds');
const { getSuggestion } = require('../../providers/database/helpers');

/**
 * This function is used to edit a suggestion.
 * @param {Client} client The client instance.
 * @param {Interaction|Modal} interaction The interaction.
 */
module.exports = async (client, interaction) => {
  const suggestion = getSuggestion({ thread: interaction.channelId });

  const suggestionTitle = interaction.getField('suggestion-title-input').value;
  const suggestionDescription = interaction.getField(
    'suggestion-description-input',
  ).value;

  const suggestionAuthor = await client.guilds.cache
    .get(interaction.guildId)
    .members.fetch(suggestion.author);

  const embed = mainEmbed({
    author: suggestionAuthor,
    title: suggestionTitle,
    description: suggestionDescription,
    sId: suggestion.id,
  });

  const channel = client.channels.cache.get(suggestion.thread);
  const message = await channel.messages.fetch(suggestion.message);
  await message.edit({ embeds: [embed] });
  await channel.setName(suggestionTitle);

  updateSuggestionInDb(suggestion.thread, {
    title: suggestionTitle,
    description: suggestionDescription,
  });
};

/**
 * Updates a suggestion in the database with the new content.
 * @param {String} thread The suggestion thread channel id.
 * @param {Object?} suggestion The suggestion object.
 * @param {String?} suggestion.title The new suggestion title.
 * @param {String?} suggestion.description The new suggestion description.
 * @return {void}
 */
const updateSuggestionInDb = (thread, suggestion) => {
  return db
    .get('suggestions')
    .find({ thread })
    .assign({ ...suggestion })
    .write();
};
