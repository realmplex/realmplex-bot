const { EmbedBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder } = require('discord.js');
const mcping = require('mcping-js');

let status;
const ip = 'realmplex.toaster.pw';

function timeout() {
	setTimeout(async () => {
		const server = new mcping.MinecraftServer(ip, '25569');

		server.ping(10000, 760, (err, res) => {
			if (err) {
				console.log(err);
			} else {
				status = res.players;
				if (status.sample == undefined) {
					status.sample = '*`No players online`*';
				}
			}
		});
		timeout();
	}, 10000);
}
timeout();


module.exports = {
	data: new SlashCommandBuilder()
		.setName('playerlist')
		.setDescription('Get a list of players on the server'),
	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setColor(0xdd50b0)
			.setTitle('Player List')
			.setDescription(`${status.sample}`);
		await interaction.reply({ embeds: [embed], ephemeral: false });
	},
};