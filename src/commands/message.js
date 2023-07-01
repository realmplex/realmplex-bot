const { ModalBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, Events } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('message')
		.setDescription('Send a message')
		.addChannelOption(option => 
			option.setName = ('channel')
				.setDescription('The channel to send the message in.')
				.setRequired(true)),
	async execute(interaction) {
		if (interaction.user.id !== '616469681678581781') {
			interaction.reply({ content: 'Only my owner may use this command!', ephemeral: true });
			return;
		}
		const modal = new ModalBuilder()
			.setCustomId('messageModal')
			.setTitle('Send a message');

		const embed = new TextInputBuilder()
			.setCustomId('json')
			.setLabel('The JSON for your message.')
			.setStyle(TextInputStyle.Paragraph);

		const firstInput = new ActionRowBuilder().addComponents(embed);

		modal.addComponents(firstInput);

		await interaction.showModal(modal);
	},
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isModalSubmit() && interaction.customId !== 'messageModal') return;

		let embedObject;
		const embedString = interaction.fields.components[0].components[0].value;

		try {
			embedObject = JSON.parse(embedString);
		} catch (err) {
			console.error(err);
			interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			return;
		}

		interaction.channel.send(embedObject);

		await interaction.reply({ content: 'Message sent!', ephemeral: true });
	},
};