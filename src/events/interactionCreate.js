const { Events, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const { ModalBuilder } = require('@discordjs/builders');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		let messageId;
		let channelId;

		if (interaction.isChatInputCommand()) {

			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error);
				await interaction.reply({
					content: 'There was an error while executing this command!',
					ephemeral: true,
				});
			}
		} else if (interaction.isMessageContextMenuCommand()) {
			if (interaction.commandName === 'Edit Message' && interaction.user.id === '616469681678581781') {
				const messageData = (interaction.targetMessage.toJSON());

				const message = {
					content: messageData.content,
					embeds: messageData.embeds,
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
			} else if (interaction.commandName === 'Delete Message' && interaction.user.id === '616469681678581781') {
				const channel = await interaction.client.channels.fetch(interaction.channelId);
				const message = await channel.messages.fetch(interaction.targetMessage.id);

				message.delete();
				return interaction.reply({ content: 'Message deleted!', ephemeral: true });
			} else {
				return interaction.reply({ content: 'Only my owner may use this command!', ephemeral: true });
			}
		} else if (interaction.isModalSubmit()) {
			if (interaction.customId === 'editMessageModal') {
				if (interaction.user.id !== '616469681678581781') {
					return interaction.reply({ content: 'Only my owner may use this command!', ephemeral: true });
				}
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

				try {
					message.edit(embedObject);
				} catch {
					return interaction.reply({ content: 'There was an error trying to edit your message. Please check that your JSON is correct.', ephemeral: true });
				}
				return interaction.reply({ content: 'Message edited!', ephemeral: true });
			} else if (interaction.customId === 'messageModal') {
				let embedObject;

				if (interaction.user.id === '616469681678581781') {
					const messageChannel = interaction.fields.components[0].components[0].value;
					const embedString = interaction.fields.components[1].components[0].value;

					try {
						embedObject = JSON.parse(embedString);
					} catch (err) {
						console.error(err);
						return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
					}

					const channel = await interaction.client.channels.fetch(messageChannel);
					await channel.send(embedObject)
						.then(() => interaction.reply({ content: 'Message sent!', ephemeral: true }))
						.catch(() => interaction.reply({ content: 'There was an error trying to send your message. Please check if your JSON is correct.', ephemeral: true }));
				} else {
					const embedString = interaction.fields.components[0].components[0].value;

					try {
						embedObject = JSON.parse(embedString);
					} catch {
						return interaction.reply({ content: 'There was an error trying to parse your message. Please check if your JSON is correct.', ephemeral: true });
					}

					await interaction.reply(embedObject)
						.catch(() => interaction.reply({ content: 'There was an error trying to send your message. Please check if your JSON is correct.', ephemeral: true }));
				}
			}
		} else if (interaction.isButton()) {

			const buttonId = interaction.customId;
			if (buttonId === '1') {
				const member = interaction.member;

				if (member.roles.cache.has('902717103277244426')) {
					try {
						await member.roles.remove('902717103277244426');
						return interaction.reply({ content: 'Successfully removed \'Server Announcements\'', ephemeral: true });
					} catch (err) {
						return interaction.reply({ content: 'Something went wrong! My permissions are incorrect.', ephemeral: true });
					}
				} else {
					try {
						await member.roles.add('902717103277244426');
						return interaction.reply({ content: 'Successfully added \'Server Announcements\'', ephemeral: true });
					} catch (err) {
						return interaction.reply({ content: 'Something went wrong! My permissions are incorrect.', ephemeral: true });
					}
				}
			} else if (buttonId === '2') {
				const member = interaction.member;

				if (member.roles.cache.has('947721012039012402')) {
					try {
						await member.roles.remove('947721012039012402');
						return interaction.reply({ content: 'Successfully removed \'Media Notifications\'', ephemeral: true });
					} catch (err) {
						return interaction.reply({ content: 'Something went wrong! My permissions are incorrect.', ephemeral: true });
					}
				} else {
					try {
						await member.roles.add('947721012039012402');
						return interaction.reply({ content: 'Successfully added \'Media Notifications\'', ephemeral: true });
					} catch (err) {
						return interaction.reply({ content: 'Something went wrong! My permissions are incorrect.', ephemeral: true });
					}
				}
			} else if (buttonId === 'clear') {
				const allRoles = ['902717103277244426', '947721012039012402'];
				try {
					await interaction.member.roles.remove(allRoles);
					return interaction.reply({ content: 'Successfully removed all selectable roles', ephemeral: true });
				} catch (err) {
					return interaction.reply({ content: 'Something went wrong! My permissions are incorrect.', ephemeral: true });
				}
			} else {
				return;
			}
		}
	},
};