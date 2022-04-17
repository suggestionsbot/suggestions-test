const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = new MessageActionRow().addComponents(
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
