const { Modal, TextInputComponent } = require('discord-modals');

const suggestionTextInputs = [
  new TextInputComponent()
    .setCustomId('suggestion-title-input')
    .setLabel('Suggestion Title')
    .setStyle('SHORT')
    .setMinLength(3)
    .setMaxLength(20)
    .setPlaceholder('What is the title of your suggestion?')
    .setRequired(true),
  new TextInputComponent()
    .setCustomId('suggestion-description-input')
    .setLabel('Suggestion Description')
    .setStyle('LONG')
    .setMinLength(3)
    .setMaxLength(200)
    .setPlaceholder('What is the description of your suggestion?')
    .setRequired(true),
];

const suggestionCreateModal = new Modal()
  .setCustomId('suggestion-create-modal')
  .setTitle('New Suggestion')
  .addComponents(...suggestionTextInputs);

const suggestionEditModal = new Modal()
  .setCustomId('suggestion-edit-modal')
  .setTitle('Edit Suggestion')
  .addComponents(...suggestionTextInputs);

module.exports = {
  suggestionCreateModal,
  suggestionEditModal,
};
