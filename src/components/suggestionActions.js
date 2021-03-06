const {
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
} = require('discord.js');

const suggestionActionRow = new MessageActionRow().addComponents(
  new MessageButton()
    .setCustomId('upvote')
    .setLabel('Upvote')
    .setStyle('PRIMARY')
    .setEmoji('578409088157876255'),
  new MessageButton()
    .setCustomId('downvote')
    .setLabel('Downvote')
    .setStyle('DANGER')
    .setEmoji('578409123876438027'),
  new MessageButton()
    .setCustomId('manage')
    .setLabel('Manage')
    .setStyle('SECONDARY')
    .setEmoji('⚙️'),
);

const suggestionDeleteRow = new MessageActionRow().addComponents(
  new MessageButton()
    .setCustomId('confirm-delete')
    .setLabel('Confirm')
    .setStyle('DANGER')
    .setEmoji('🗑️'),
  new MessageButton()
    .setCustomId('cancel-delete')
    .setLabel('Cancel')
    .setStyle('SECONDARY')
    .setEmoji('❌'),
);

const suggestionEditRow = new MessageActionRow().addComponents(
  new MessageButton()
    .setCustomId('confirm-edit')
    .setLabel('Confirm')
    .setStyle('DANGER')
    .setEmoji('📝'),
  new MessageButton()
    .setCustomId('cancel-edit')
    .setLabel('Cancel')
    .setStyle('SECONDARY')
    .setEmoji('❌'),
);

const manageSuggestionOptions = new MessageActionRow().addComponents(
  new MessageSelectMenu()
    .setCustomId('manage-suggestion-options')
    .setPlaceholder('Select an option')
    .addOptions([
      {
        label: 'Approve',
        description: 'Approve this suggestion',
        value: 'approve-option',
      },
      {
        label: 'Reject',
        description: 'Reject this suggestion',
        value: 'reject-option',
      },
      {
        label: 'Edit',
        description: 'Edit this suggestion',
        value: 'edit-option',
      },
      {
        label: 'Delete',
        description: 'Delete this suggestion',
        value: 'delete-option',
      },
    ]),
);

module.exports = {
  suggestionActionRow,
  suggestionDeleteRow,
  suggestionEditRow,
  manageSuggestionOptions,
};
