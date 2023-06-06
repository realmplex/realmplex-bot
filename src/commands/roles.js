const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roles')
		.setDescription('Get roles you need')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
	async execute(interaction) {
		if (interaction.user.id !== '616469681678581781') {
			await interaction.reply({
				content: 'Only my owner can use this command!',
				ephemeral: true,
			});
			return;
		}
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
				new ButtonBuilder()
					.setCustomId('clear')
					.setLabel('Clear')
					.setStyle(ButtonStyle.Danger),
			);
		const embed = new EmbedBuilder()
			.setColor(0x4275f5)
			.setTimestamp(Date.now())
			.setTitle('Get roles here!')
			.setDescription('Click on one of the buttons to receive/remove a role.\nThe clear button will remove all selectable roles.')
			.setFooter({ text: 'Realmplex', iconURL: 'https://cdn.discordapp.com/avatars/1001311496036429845/82d48625a3789042b13c1e8053e64414.png' });
		await interaction.reply({ content: 'Sending embed...', ephemeral: true });
		await interaction.channel.send({ components: [roleButtons], embeds: [embed], ephemeral: false });
	},
};