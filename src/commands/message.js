const { ModalBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('message')
		.setDescription('Send a message'),
	async execute(interaction) {
		if (interaction.user.id !== '616469681678581781') {
			interaction.reply({ content: 'Only my owner may use this command!', ephemeral: true });
			return;
		}
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
			.setValue('{"content":""}');

		const firstInput = new ActionRowBuilder().addComponents(channelId);
		const secondInput = new ActionRowBuilder().addComponents(embed);

		modal.addComponents(firstInput, secondInput);

		await interaction.showModal(modal);
	},
};