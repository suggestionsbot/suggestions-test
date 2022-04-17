const createSuggestion = require('./createSuggestion');

module.exports = async (client, modal) => {
  const { thread } = await createSuggestion(client, modal);

  await modal.reply({
    content: `Your suggestion has been created in ${thread.toString()}!`,
    ephemeral: true,
  });
};
