const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const mcping = require('mcping-js');

let status;
let buffer;
const ip = 'taylorworld.serverminer.com';

function timeout() {
	setTimeout(async () => {
		const server = new mcping.MinecraftServer(ip, '26542');

		server.ping(10000, 760, (err, res) => {
			if (err) {
				console.log(err);
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
				try {
					if (status.description.text == '') {
						status.description.text = 'The MOTD either does not exist or could not be read';
					} else if (typeof status.description.text === 'undefined') {
						status.description.text = 'The MOTD either does not exist or could not be read';
					}
				} catch {
					console.log(err);
				}
			}
		});
		timeout();
	}, 10000);
}
timeout();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('serverinfo')
		.setDescription('Gives status information about a Minecraft server'),
	async execute(interaction) {

		const attachment = new AttachmentBuilder(buffer, { name: 'icon.png' });
		await interaction.reply({ embeds: [
			new EmbedBuilder()
				.setTitle('Minecraft Server Information')
				.setTimestamp(Date.now())
				.setThumbnail('attachment://icon.png')
				.setDescription(ip)
				.addFields(
					{ name: 'Information', value: `Version: ${status.version.name}\nPlayers: ${status.players.online}/${status.players.max}\nMOTD: ${status.description.text}` },
					{ name: 'Extra', value: `Previews Chat: ${status.previewsChat}\nEnforce Secure Profile: ${status.enforcesSecureChat}` },
				),
		], ephemeral: false, files: [attachment] });
	},
};