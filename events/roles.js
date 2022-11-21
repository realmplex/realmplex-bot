module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		if (!interaction.isButton()) return;

		const buttonId = interaction.customId;
		if (buttonId === '1') {
			const member = interaction.member;

			if (member.roles.cache.has('1036762750271094814')) {
				member.roles.remove('1036762750271094814');
				return interaction.reply({ content: 'Successfully removed \'Announcement Ping\'', ephemeral: true });
			} else {
				member.roles.add('1036762750271094814');
				return interaction.reply({ content: 'Successfully added \'Announcement Ping\'', ephemeral: true });
			}
		} else if (buttonId === '2') {
			const member = interaction.member;

			if (member.roles.cache.has('1036762763785150494')) {
				member.roles.remove('1036762763785150494');
				return interaction.reply({ content: 'Successfully removed \'Server Status Ping\'', ephemeral: true });
			} else {
				member.roles.add('1036762763785150494');
				return interaction.reply({ content: 'Successfully added \'Server Status Ping\'', ephemeral: true });
			}
		} else if (buttonId === 'clear') {
			const allRoles = ['1036762750271094814', '1036762750271094814'];
			try {
				interaction.member.roles.remove(allRoles);
			} catch (error) {
				console.log(error);
			}
			return interaction.reply({ content: 'Successfully cleared all roles', ephemeral: true });
		} else {
			return;
		}
	},
};