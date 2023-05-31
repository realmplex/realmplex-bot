module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		if (!interaction.isButton()) return;

		const buttonId = interaction.customId;
		if (buttonId === '1') {
			const member = interaction.member;

			if (member.roles.cache.has('1113273262353420368')) {
				member.roles.remove('1113273262353420368');
				return interaction.reply({ content: 'Successfully removed \'Server Announcements\'', ephemeral: true });
			} else {
				member.roles.add('1113273262353420368');
				return interaction.reply({ content: 'Successfully added \'Server Announcements\'', ephemeral: true });
			}
		} else if (buttonId === '2') {
			const member = interaction.member;

			if (member.roles.cache.has('1113273309619032195')) {
				member.roles.remove('1113273309619032195');
				return interaction.reply({ content: 'Successfully removed \'Media Notifications\'', ephemeral: true });
			} else {
				member.roles.add('1113273309619032195');
				return interaction.reply({ content: 'Successfully added \'Media Notifications\'', ephemeral: true });
			}
		} else if (buttonId === '3') {
			const member = interaction.member;

			if (member.roles.cache.has('1113273329948823592')) {
				member.roles.remove('1113273329948823592');
				return interaction.reply({ content: 'Successfully removed \'Server Status Ping\'', ephemeral: true });
			} else {
				member.roles.add('1113273329948823592');
				return interaction.reply({ content: 'Successfully added \'Server Status Ping\'', ephemeral: true });
			}
		} else if (buttonId === 'clear') {
			const allRoles = ['1113273262353420368', '1113273309619032195', '1113273329948823592'];
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