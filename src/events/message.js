const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	execute(interaction) {
		if (!interaction.isModalSubmit()) return;
		const embedString = interaction.fields.components[0].components[0].value;
		const embedObject = JSON.parse(embedString);
		interaction.channel.send(embedObject);
		interaction.reply({ content: 'Message sent!', ephemeral: true });
	},
};