const { Modal, TextInputComponent } = require('discord-modals');

module.exports = new Modal()
  .setCustomId('suggestion-modal')
  .setTitle('New Suggestion')
  .addComponents(
    new TextInputComponent()
      .setCustomId('suggestion-name-input')
      .setLabel('Suggestion Name')
      .setStyle('SHORT')
      .setMinLength(5)
      .setMaxLength(20)
      .setPlaceholder('What is the name of your suggestion?')
      .setRequired(true),
    new TextInputComponent()
      .setCustomId('suggestion-description-input')
      .setLabel('Suggestion Description')
      .setStyle('LONG')
      .setMinLength(10)
      .setMaxLength(500)
      .setPlaceholder('What is the description of your suggestion?')
      .setRequired(true),
  );
