const { EmbedBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder } = require('discord.js');
const mcping = require('mcping-js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('playerlist')
		.setDescription('Get a list of players on the server'),
	async execute(interaction) {
		const ip = 'realmplex.toaster.pw';
		const port = '25569';
		let status;
		let names;
		const server = new mcping.MinecraftServer(ip, port);

		await new Promise((resolve, reject) => {
			server.ping(10000, 760, (err, res) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					status = res.players;
					names = status.sample.map(player => player.name);
					names.sort();
					names = names.join('\n');
					if (status.sample == undefined) {
						status.sample = '*`No players online`*';
					}
					resolve();
				}
			});
		});
		const embed = new EmbedBuilder()
			.setColor(0x4275f5)
			.setTitle('Player List')
			.setDescription(`${status.online}/${status.max}`)
			.addFields(
				{ name: 'Online Players:', value: `${names}` },
			)
			.setTimestamp(Date.now());
		await interaction.reply({ embeds: [embed], ephemeral: false });
	},
};