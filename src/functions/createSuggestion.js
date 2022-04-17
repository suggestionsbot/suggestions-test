const {
  Client,
  Interaction,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
} = require('discord.js');
const { devChannelId, guildId, colors } = require('../config.json');
const { showModal, Modal } = require('discord-modals');

const suggestionModal = require('../components/suggestionModal');

const suggestionActions = new MessageActionRow().addComponents(
  new MessageButton()
    .setCustomId('approve')
    .setLabel('Approve')
    .setStyle('PRIMARY')
    .setEmoji('578409088157876255'),
  new MessageButton()
    .setCustomId('reject')
    .setLabel('Reject')
    .setStyle('SECONDARY')
    .setEmoji('578409123876438027'),
  new MessageButton()
    .setCustomId('delete')
    .setLabel('Delete')
    .setStyle('DANGER')
    .setEmoji('🗑️'),
);

/**
 *This function is used to create a new suggestion..
 * @param {Client} client - The client..
 * @param {Interaction|Modal} interaction
 */
module.exports = async (client, interaction) => {
  // const suggestionName = interaction.options.getString('name') ?? 'john doe';
  // // const suggestionDescription = interaction.options.getString('description');
  // const suggestionDescription = interaction.isContextMenu()
  //   ? interaction.options.resolved.messages.first().content
  //   : interaction.options.getString('description');

  let suggestionName, suggestionDescription;
  if (interaction.type === 'MODAL_SUBMIT') {
    // await showModal(suggestionModal, { client, interaction });
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
      components: [suggestionActions],
    })
    .then((m) => {
      if (m.pinnable) m.pin();
    });

  return { thread };

  // await interaction.reply({
  //   content: `Your suggestion has been created in ${thread.toString()}!`,
  //   ephemeral: true,
  // });
};
