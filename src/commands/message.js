const { ModalBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('message')
		.setDescription('Send a message'),
	async execute(interaction) {
		const modal = new ModalBuilder()
			.setCustomId('messageModal')
			.setTitle('Send a message');

		const channelId = new TextInputBuilder()
			.setCustomId('channel')
			.setLabel('The channel ID to send the message to.')
			.setStyle(TextInputStyle.Short)
			.setValue(`${interaction.channel.id}`);
		const embed = new TextInputBuilder()
			.setCustomId('json')
			.setLabel('The JSON for your message.')
			.setStyle(TextInputStyle.Paragraph)
			.setValue('{"content":"", embeds: []}');

		const channelInput = new ActionRowBuilder().addComponents(channelId);
		const jsonInput = new ActionRowBuilder().addComponents(embed);

		if (interaction.user.id === '616469681678581781') {
			modal.addComponents(channelInput, jsonInput);
		} else {
			modal.addComponents(jsonInput);
		}

		await interaction.showModal(modal);
	},
};