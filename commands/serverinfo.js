const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const mcping = require('mcping-js');

let status;
let buffer;

function timeout() {
	setTimeout(function() {
		mcping('taylorworld.serverminer.com', 26542, function(err, res) {
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
		}, 5000);
		timeout();
	}, 10000);
}
timeout();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('serverinfo')
		.setDescription('Gives status information about a Minecraft server'),
	async execute(interaction) {
		// const ip = interaction.options.getString('ipaddress');
		// const port = interaction.options.getInteger('port');
		const attachment = new AttachmentBuilder(buffer, { name: 'icon.png' });

		await interaction.reply({ embeds: [
			new EmbedBuilder()
				.setTitle('Minecraft Server Information')
				.setTimestamp(Date.now())
				.setThumbnail('attachment://icon.png')
				.setDescription('taylorworld.serverminer.com')
				.addFields(
					{ name: 'Information', value: `Version: ${status.version.name}\nPlayers: ${status.players.online}/${status.players.max}\nMOTD: ${status.description.text}` },
					{ name: 'Extra', value: `Previews Chat: ${status.previewsChat}\nEnforce Secure Profile: ${status.enforcesSecureChat}` },
				),
		], ephemeral: false, files: [attachment] });
	},
};