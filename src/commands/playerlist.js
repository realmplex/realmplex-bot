const { EmbedBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder } = require('discord.js');
const mcping = require('mcping-js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('playerlist')
		.setDescription('Get a list of players on Realmplex.'),
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
					if (res.sample == undefined) {
						names = '*`No players online`*';
						status = res.players
						resolve();
						return;
					}
					status = res.players
						.then(names = status.sample.map(player => player.name));
					names.sort();
					names = names.join('\n');
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
			.setTimestamp(Date.now())
			.setFooter({ text: 'Realmplex', iconURL: 'https://cdn.discordapp.com/avatars/1001311496036429845/82d48625a3789042b13c1e8053e64414.png' });
		await interaction.reply({ embeds: [embed], ephemeral: false });
	},
};