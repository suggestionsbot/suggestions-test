const { ContextMenuCommandBuilder } = require('@discordjs/builders');
const { ApplicationCommandType } = require('discord-api-types/v9');
const { showModal } = require('discord-modals');

const { suggestionCreateModal } = require('../../components/suggestionModals');

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName('Create Suggestion')
    .setType(ApplicationCommandType.Message),
  async execute(client, interaction) {
    suggestionCreateModal.components[1].components[0].value =
      interaction.options.resolved.messages.first().content;

    await showModal(suggestionCreateModal, { client, interaction });
  },
};
