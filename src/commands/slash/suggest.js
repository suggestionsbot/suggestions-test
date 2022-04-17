// const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
// const { devChannelId, guildId, colors } = require('../../config.json');

const createSuggestion = require('../../functions/createSuggestion');

// const suggestionActions = new MessageActionRow().addComponents(
//   new MessageButton()
//     .setCustomId('approve')
//     .setLabel('Approve')
//     .setStyle('PRIMARY')
//     .setEmoji('578409088157876255'),
//   new MessageButton()
//     .setCustomId('reject')
//     .setLabel('Reject')
//     .setStyle('SECONDARY')
//     .setEmoji('578409123876438027'),
//   new MessageButton()
//     .setCustomId('delete')
//     .setLabel('Delete')
//     .setStyle('DANGER')
//     .setEmoji('🗑️'),
// );

module.exports = {
  data: new SlashCommandBuilder()
    .setName('suggest')
    .setDescription('Create a new suggestion!')
    .addStringOption((option) =>
      option
        .setName('name')
        .setDescription('The name of the suggestion.')
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName('description')
        .setDescription('The description of the suggestion.')
        .setRequired(true),
    ),
  async execute(client, interaction) {
    // const suggestionName = interaction.options.getString('name');
    // const suggestionDescription = interaction.options.getString('description');
    //
    // const channel = client.guilds.cache
    //   .get(guildId)
    //   .channels.cache.get(devChannelId);
    //
    // const thread = await channel.threads.create({
    //   name: suggestionName,
    // });
    //
    // await thread.members.add(interaction.user.id);
    //
    // const embed = new MessageEmbed()
    //   .setDescription(
    //     `
    //       **Submitter**
    //       ${interaction.user.toString()}
    //
    //       **Suggestion**
    //       ${suggestionDescription}
    //     `,
    //   )
    //   .setColor(colors.main)
    //   .setThumbnail(interaction.member.displayAvatarURL({ dynamic: true }))
    //   .setFooter({
    //     text: `User ID: ${interaction.user.id} | sID: abc1234`,
    //   });
    //
    // await thread
    //   .send({
    //     embeds: [embed],
    //     components: [suggestionActions],
    //   })
    //   .then((m) => {
    //     if (m.pinnable) m.pin();
    //   });

    await createSuggestion(client, interaction);

    await interaction.reply({
      content: `Your suggestion has been created in ${thread.toString()}!`,
      ephemeral: true,
    });
  },
};
