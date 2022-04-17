const createSuggestion = require('../../suggestions/createSuggestion');

module.exports = async (client, modal) => {
  const { thread } = await createSuggestion(client, modal);

  await modal.deferReply({ ephemeral: true });
  await modal.followUp({
    content: `Your suggestion has been created in ${thread.toString()}!`,
    ephemeral: true,
  });
};
