const { ContextMenuCommandBuilder } = require('@discordjs/builders');
const { ApplicationCommandType } = require('discord-api-types/v9');
const { showModal, Modal } = require('discord-modals');

const createSuggestion = require('../../functions/createSuggestion');
const suggestionModal = require('../../components/suggestionModal');

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName('Create Suggestion')
    .setType(ApplicationCommandType.Message),
  async execute(client, interaction) {
    const messageContent =
      interaction.options.resolved.messages.first().content;

    suggestionModal.components[1].components[0].value = messageContent;

    await showModal(suggestionModal, { client, interaction });
  },
};
