const { Client, Interaction, MessageEmbed } = require('discord.js');
const { Modal } = require('discord-modals');

const { devChannelId, guildId, colors } = require('../config.json');
const { suggestionActionRow } = require('../components/suggestionActions');

/**
 *This function is used to create a new suggestion..
 * @param {Client} client - The client..
 * @param {Interaction|Modal} interaction
 */
module.exports = async (client, interaction) => {
  let suggestionName, suggestionDescription;
  if (interaction.type === 'MODAL_SUBMIT') {
    suggestionName = interaction.getTextInputValue('suggestion-name-input');
    suggestionDescription = interaction.getTextInputValue(
      'suggestion-description-input',
    );
  } else {
    suggestionName = interaction.options.getString('name');
    suggestionDescription = interaction.options.getString('description');
  }

  const channel = client.guilds.cache
    .get(guildId)
    .channels.cache.get(devChannelId);

  const thread = await channel.threads.create({
    name: suggestionName,
  });

  await thread.members.add(interaction.user.id);

  const embed = new MessageEmbed()
    .setDescription(
      `
          **Submitter**
          ${interaction.user.toString()}
          
          **Suggestion**
          ${suggestionDescription}
        `,
    )
    .setColor(colors.main)
    .setThumbnail(interaction.member.displayAvatarURL({ dynamic: true }))
    .setFooter({
      text: `User ID: ${interaction.user.id} | sID: abc1234`,
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
