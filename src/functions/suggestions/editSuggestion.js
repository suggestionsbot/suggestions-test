const { Client, Interaction } = require('discord.js');
const { showModal, Modal } = require('discord-modals');

const db = require('../../providers/db');
// const { suggestionActionRow } = require('../../components/suggestionActions');
const { mainEmbed } = require('../../components/suggestionEmbeds');

/**
 * This function is used to edit a suggestion.
 * @param {Client} client The client instance.
 * @param {Interaction|Modal} interaction The interaction.
 */
module.exports = async (client, interaction) => {};

/**
 * Updates a suggestion in the database with the new content.
 * @param {String} thread The suggestion thread channel id.
 * @param {String} description The new suggestion description.
 * @return {void}
 */
const updateSuggestionInDb = (thread, description) => {
  return db.get('suggestions').find({ thread }).assign({ description }).write();
};
