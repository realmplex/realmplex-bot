const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isModalSubmit() || interaction.customId !== 'editMessageModal') return;
		let embedObject;
		let channel;
		let message;

		const messageId = interaction.fields.components[0].components[0].value;
		const channelId = interaction.fields.components[1].components[0].value;

		try {
			channel = await interaction.client.channels.fetch(channelId);
			message = await channel.messages.fetch(messageId);
		} catch (err) {
			console.error(err);
			interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			return;
		}

		try {
			embedObject = JSON.parse(interaction.fields.components[2].components[0].value);
		} catch (err) {
			console.error(err);
			interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			return;
		}

		message.edit(embedObject);
		interaction.reply({ content: 'Message edited!', ephemeral: true });
	},
};