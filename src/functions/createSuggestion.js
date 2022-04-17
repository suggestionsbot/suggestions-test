const { Client, Interaction } = require('discord.js');
const { Modal } = require('discord-modals');
const crypto = require('crypto');

const { devChannelId, guildId } = require('../config.json');
const { suggestionActionRow } = require('../components/suggestionActions');
const { mainEmbed } = require('../components/suggestionEmbeds');

/**
 *This function is used to create a new suggestion..
 * @param {Client} client - The client..
 * @param {Interaction|Modal} interaction
 */
module.exports = async (client, interaction) => {
  const id = crypto.randomBytes(20).toString('hex').slice(33, 40);

  let suggestionTitle, suggestionDescription;
  if (interaction.type === 'MODAL_SUBMIT') {
    suggestionTitle = interaction.getTextInputValue('suggestion-name-input');
    suggestionDescription = interaction.getTextInputValue(
      'suggestion-description-input',
    );
  } else {
    suggestionTitle = interaction.options.getString('name');
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

  await thread
    .send({
      embeds: [embed],
      components: [suggestionActionRow],
    })
    .then((m) => {
      if (m.pinnable) m.pin();
    });

  return { thread };
};
