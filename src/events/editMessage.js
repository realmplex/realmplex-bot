const { Events, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const { ModalBuilder } = require('@discordjs/builders');

let messageId;
let channelId;

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isMessageContextMenuCommand()) {
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

			messageId = interaction.targetId;
			channelId = interaction.channelId;

			const editEmbed = new TextInputBuilder()
				.setCustomId('editjson')
				.setLabel('The JSON for your message.')
				.setStyle(TextInputStyle.Paragraph)
				.setValue(messageJSON);

			const firstInput = new ActionRowBuilder().addComponents(editEmbed);

			editModal.addComponents(firstInput);

			await interaction.showModal(editModal);
		} else if (interaction.isModalSubmit() || interaction.customId == 'editMessageModal') {
			let embedObject;
			let channel;
			let message;

			try {
				channel = await interaction.client.channels.fetch(channelId);
				message = await channel.messages.fetch(messageId);
			} catch (err) {
				console.error(err);
				interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
				return;
			}

			try {
				embedObject = JSON.parse(interaction.fields.components[0].components[0].value);
			} catch (err) {
				console.error(err);
				interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
				return;
			}

			message.edit(embedObject);
			interaction.reply({ content: 'Message edited!', ephemeral: true });
		} else {
			return;
		}
	},
};
