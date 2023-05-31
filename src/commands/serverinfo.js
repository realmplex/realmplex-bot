const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const mcping = require('mcping-js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('serverinfo')
		.setDescription('Gives status information about Realmplex'),
	async execute(interaction) {
		let status;
		let buffer;
		const ip = 'realmplex.toaster.pw';
		const port = '25569';
		const server = new mcping.MinecraftServer(ip, port);

		await new Promise((resolve, reject) => {
			server.ping(10000, 760, (err, res) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					status = res;
					const image = status.favicon.replace('data:image/png;base64,', '');
					buffer = Buffer.from(image, 'base64');
					if (status.previewsChat == undefined) {
						status.previewsChat = 'false';
					}
					if (status.enforcesSecureChat == undefined) {
						status.enforcesSecureChat = 'false';
					}
					resolve();
				}
			});
		});

		const attachment = new AttachmentBuilder(buffer, { name: 'icon.png' });
		await interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setTitle('Minecraft Server Information')
					.setTimestamp(Date.now())
					.setThumbnail('attachment://icon.png')
					.setDescription(`IP: ${ip}\nPort: ${port}`)
					.addFields(
						{ name: 'Information', value: `Version: ${status.version.name}\nPlayers: ${status.players.online}/${status.players.max}\nMOTD: Celebrating 2 Years!` },
						{ name: 'Extra', value: `Previews Chat: ${status.previewsChat}\nEnforce Secure Profile: ${status.enforcesSecureChat}` },
					),
			],
			ephemeral: false,
			files: [attachment],
		});
	},
};