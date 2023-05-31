const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	execute(interaction) {
		if (!interaction.isModalSubmit()) return;
		let embedObject;
		const embedString = interaction.fields.components[0].components[0].value;

		try {
			embedObject = JSON.parse(embedString);
		} catch {
			interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			return;
		}

		interaction.channel.send(embedObject);

		interaction.reply({ content: 'Message sent!', ephemeral: true });
	},
};