const { Client, Interaction } = require('discord.js');
const { Modal } = require('discord-modals');
const crypto = require('crypto');

const { devChannelId, guildId } = require('../../config.json');
const { suggestionActionRow } = require('../../components/suggestionActions');
const { mainEmbed } = require('../../components/suggestionEmbeds');
const db = require('../../providers/database');

/**
 *This function is used to create a new suggestion..
 * @param {Client} client - The client instance.
 * @param {Interaction|Modal} interaction The interaction.
 */
module.exports = async (client, interaction) => {
  const id = crypto.randomBytes(20).toString('hex').slice(33, 40);

  let suggestionTitle, suggestionDescription;
  if (interaction.type === 'MODAL_SUBMIT') {
    suggestionTitle = interaction.getTextInputValue('suggestion-title-input');
    suggestionDescription = interaction.getTextInputValue(
      'suggestion-description-input',
    );
  } else {
    suggestionTitle = interaction.options.getString('title');
    suggestionDescription = interaction.options.getString('description');
  }

  const channel = client.guilds.cache
    .get(guildId)
    .channels.cache.get(devChannelId);

  const thread = await channel.threads.create({
    name: suggestionTitle,
  });

  await thread.members.add(interaction.user.id);

  const embed = mainEmbed({
    author: interaction.member,
    title: suggestionTitle,
    description: suggestionDescription,
    sId: id,
  });

  const message = await thread
    .send({
      embeds: [embed],
      components: [suggestionActionRow],
    })
    .then((m) => {
      if (m.pinnable) m.pin();
    });

  writeSuggestionToDb({
    id,
    title: suggestionTitle,
    description: suggestionDescription,
    author: interaction.member.id,
    thread: thread.id,
    message: message.id,
  });

  return { thread };
};

/**
 * This function is used to create a new suggestion in the database.
 * @param {String} suggestion.id The suggestion id.
 * @param {String} suggestion.title The suggestion title.
 * @param {String} suggestion.description The suggestion description.
 * @param {String} suggestion.author The suggestion author represented by their user Id.
 * @param {String} suggestion.thread The suggestion thread's channel id.
 * @return {void}
 */
const writeSuggestionToDb = (suggestion) => {
  const data = {
    ...suggestion,
    status: 'pending',
  };

  return db.get('suggestions').push(data).write();
};
