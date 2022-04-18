const { ContextMenuCommandBuilder } = require('@discordjs/builders');
const { ApplicationCommandType } = require('discord-api-types/v9');
const { showModal } = require('discord-modals');

const { suggestionModal } = require('../../components/suggestionModals');

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName('Create Suggestion')
    .setType(ApplicationCommandType.Message),
  async execute(client, interaction) {
    suggestionModal.components[1].components[0].value =
      interaction.options.resolved.messages.first().content;

    await showModal(suggestionModal, { client, interaction });
  },
};
