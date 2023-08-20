const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isModalSubmit() || interaction.customId !== 'messageModal') return;

		let embedObject;
		const channelId = interaction.fields.components[0].components[0].value;
		const embedString = interaction.fields.components[1].components[0].value;


		try {
			embedObject = JSON.parse(embedString);
		} catch (err) {
			return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}

		try {
			const channel = await interaction.client.channels.fetch(channelId);
			channel.send(embedObject);
		} catch (err) {
			console.log(err);
			return interaction.reply({ content: 'There was an error trying to send your message. Please check that your JSON is correct.', ephemeral: true });
		}

		await interaction.reply({ content: 'Message sent!', ephemeral: true });
	},
};