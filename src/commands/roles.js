const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roles')
		.setDescription('Get roles you need')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
	async execute(interaction) {
		const roleButtons = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('1')
					.setLabel('Server Announcements')
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId('2')
					.setLabel('Media Notifications')
					.setStyle(ButtonStyle.Primary),
				/* new ButtonBuilder()
					.setCustomId('3')
					.setLabel('Server Status Ping')
					.setStyle(ButtonStyle.Primary), */
				new ButtonBuilder()
					.setCustomId('clear')
					.setLabel('Clear')
					.setStyle(ButtonStyle.Danger),
			);
		const embed = new EmbedBuilder()
			.setColor(0x4275f5)
			.setTimestamp(Date.now())
			.setTitle('Get roles here!');
		await interaction.reply({ content: 'Sending embed...', ephemeral: true });
		await interaction.channel.send({ components: [roleButtons], embeds: [embed], ephemeral: false });
	},
};