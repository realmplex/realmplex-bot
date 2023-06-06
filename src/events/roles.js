const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isButton()) return;

		const buttonId = interaction.customId;
		if (buttonId === '1') {
			const member = interaction.member;

			if (member.roles.cache.has('902717103277244426')) {
				member.roles.remove('902717103277244426');
				return interaction.reply({ content: 'Successfully removed \'Server Announcements\'', ephemeral: true });
			} else {
				member.roles.add('902717103277244426');
				return interaction.reply({ content: 'Successfully added \'Server Announcements\'', ephemeral: true });
			}
		} else if (buttonId === '2') {
			const member = interaction.member;

			if (member.roles.cache.has('947721012039012402')) {
				member.roles.remove('947721012039012402');
				return interaction.reply({ content: 'Successfully removed \'Media Notifications\'', ephemeral: true });
			} else {
				member.roles.add('947721012039012402');
				return interaction.reply({ content: 'Successfully added \'Media Notifications\'', ephemeral: true });
			}
		} else if (buttonId === 'clear') {
			const allRoles = ['902717103277244426', '947721012039012402'];
			try {
				interaction.member.roles.remove(allRoles);
			} catch (error) {
				console.log(error);
			}
			return interaction.reply({ content: 'Successfully removed all selectable roles', ephemeral: true });
		} else {
			return;
		}
	},
};