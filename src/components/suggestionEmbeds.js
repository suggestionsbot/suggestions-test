const { MessageEmbed, GuildMember } = require('discord.js');
const { APIInteractionGuildMember } = require('discord-api-types/v9');

const { colors } = require('../config.json');

/**
 * The main suggestion embed function.
 * @param {GuildMember|APIInteractionGuildMember} author
 * @param {String} title The title/name of the suggestion.
 * @param {String} description The description of the suggestion.
 * @param {String} sId The suggestion Id.
 * @return {MessageEmbed} The suggestion embed.
 */
const mainEmbed = ({ author, title, description, sId }) =>
  new MessageEmbed()
    .setDescription(
      `
      **Submitter**
      ${author.toString()}
      
      **Title**
      ${title}
      
      **Description**
      ${description}
    `,
    )
    .setColor(colors.main)
    .setThumbnail(author.displayAvatarURL({ dynamic: true }))
    .setFooter({
      text: `User ID ${author.id} | sId: ${sId}`,
    });

module.exports = {
  mainEmbed,
};
