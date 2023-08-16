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

		const embed = new TextInputBuilder()
			.setCustomId('json')
			.setLabel('The JSON for your message.')
			.setStyle(TextInputStyle.Paragraph)
			.setValue('{"content":""}');

		const firstInput = new ActionRowBuilder().addComponents(embed);

		modal.addComponents(firstInput);

		await interaction.showModal(modal);
	},
};