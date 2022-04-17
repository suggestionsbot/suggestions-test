const { SlashCommandBuilder } = require('@discordjs/builders');

const createSuggestion = require('../../functions/suggestions/createSuggestion');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('suggest')
    .setDescription('Create a new suggestion!')
    .addStringOption((option) =>
      option
        .setName('title')
        .setDescription('The title of the suggestion.')
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName('description')
        .setDescription('The description of the suggestion.')
        .setRequired(true),
    ),
  async execute(client, interaction) {
    const { thread } = await createSuggestion(client, interaction);

    await interaction.reply({
      content: `Your suggestion has been created in ${thread.toString()}!`,
      ephemeral: true,
    });
  },
};
