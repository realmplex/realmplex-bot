const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isModalSubmit() || interaction.customId !== 'messageModal') return;

		let embedObject;
		const embedString = interaction.fields.components[0].components[0].value;

		try {
			embedObject = JSON.parse(embedString);
		} catch (err) {
			console.error(err);
			return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}

		try {
			interaction.channel.send(embedObject);
		} catch (err) {
			return interaction.reply({ content: 'There was an error trying to send your message. Please check that your JSON is correct.', ephemeral: true });
		}

		await interaction.reply({ content: 'Message sent!', ephemeral: true });
	},
};