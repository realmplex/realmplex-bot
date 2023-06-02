const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ipleak')
		.setDescription('Leak ada\'s ip'),
	async execute(interaction) {
		let ip;
		interaction.deferReply({ ephemeral: false });

		try {
			const res = await fetch('https://api.ipify.org?format=json');
			ip = await res.json();
			await interaction.editReply({ content: `${ip.ip}` });
		} catch (err) {
			console.error(err);
			await interaction.editReply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
};