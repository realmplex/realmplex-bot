const { Events, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const { ModalBuilder } = require('@discordjs/builders');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isMessageContextMenuCommand()) return;
		if (interaction.user.id !== '616469681678581781') {
			interaction.reply({ content: 'Only my owner may use this command!', ephemeral: true });
			return;
		}

		const messageData = (interaction.targetMessage.toJSON());

		const messageContent = JSON.stringify(messageData.content);
		const messageEmbeds = JSON.stringify(messageData.embeds);

		const message = {
			content: JSON.parse(messageContent),
			embeds: JSON.parse(messageEmbeds),
		};

		const messageJSON = JSON.stringify(message);

		const editModal = new ModalBuilder()
			.setCustomId('editMessageModal')
			.setTitle('Edit a message');

		const messageId = new TextInputBuilder()
			.setCustomId('messageId')
			.setLabel('The Id of the message you want to edit.')
			.setStyle(TextInputStyle.Short)
			.setValue(interaction.targetId);

		const channelId = new TextInputBuilder()
			.setCustomId('channelId')
			.setLabel('The Id of the channel the message is in.')
			.setStyle(TextInputStyle.Short)
			.setValue(interaction.channelId);

		const editEmbed = new TextInputBuilder()
			.setCustomId('editjson')
			.setLabel('The JSON for your message.')
			.setStyle(TextInputStyle.Paragraph)
			.setValue(messageJSON);

		const firstInput = new ActionRowBuilder().addComponents(messageId);
		const secondInput = new ActionRowBuilder().addComponents(channelId);
		const thirdInput = new ActionRowBuilder().addComponents(editEmbed);

		editModal.addComponents(firstInput, secondInput, thirdInput);

		await interaction.showModal(editModal);
	},
};