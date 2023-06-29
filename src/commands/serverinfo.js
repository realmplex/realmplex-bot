const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const mcping = require('mcping-js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('serverinfo')
		.setDescription('Gives status information about a Minecraft server')
		.addStringOption(option =>
			option.setName('ip')
				.setDescription('The IP of the server')
				.setRequired(false))
		.addNumberOption(option =>
			option.setName('port')
				.setDescription('The port of the server')
				.setMaxValue(65535)
				.setRequired(false))
		.addStringOption(option =>
			option.setName('version')
				.setDescription('The version of the server')
				.addChoices(
					{ name: '1.7.10', value: '1.7.10' },
					{ name: '1.8.9', value: '1.8.9' },
					{ name: '1.9.3/4', value: '1.9.4' },
					{ name: '1.10.2', value: '1.10.2' },
					{ name: '1.11.1/2', value: '1.11.2' },
					{ name: '1.12.2', value: '1.12.2' },
					{ name: '1.13.2', value: '1.13.2' },
					{ name: '1.14.4', value: '1.14.4' },
					{ name: '1.15.2', value: '1.15.2' },
					{ name: '1.16.4/5', value: '1.16.4/5' },
					{ name: '1.17.1', value: '1.17.2' },
					{ name: '1.18.1', value: '1.18.1' },
					{ name: '1.18.2', value: '1.18.2' },
					{ name: '1.19', value: '1.19' },
					{ name: '1.19.1/2', value: '1.19.1/2' },
					{ name: '1.19.3', value: '1.19.3' },
					{ name: '1.19.4', value: '1.19.4' },
					{ name: '1.20/1', value: '1.20' },
				)
				.setRequired(false)),
	async execute(interaction) {
		let status;
		let buffer;
		let motd;

		const ip = interaction.options.getString('ip') ?? 'realmplex.toaster.pw';
		const port = interaction.options.getNumber('port') ?? 25569;
		const version = interaction.options.getString('version') ?? '1.19.1/2';
		const server = new mcping.MinecraftServer(ip, port);
		const protocol = {
			'1.7.10': 5,
			'1.8.9': 47,
			'1.9.3/4': 110,
			'1.10.2': 210,
			'1.11.1/2': 316,
			'1.12.2': 340,
			'1.13.2': 404,
			'1.14.4': 498,
			'1.15.2': 578,
			'1.16.4/5': 754,
			'1.17.1': 756,
			'1.18.2': 758,
			'1.19': 759,
			'1.19.1/2': 760,
			'1.19.3': 761,
			'1.19.4': 762,
			'1.20': 763,
		};

		await interaction.deferReply({ ephemeral: false });

		try {
			await new Promise((resolve, reject) => {
				server.ping(10000, Number(protocol[version]), (err, res) => {
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
						if (typeof status.description === 'undefined') {
							status.description = 'The MOTD could not be retrieved.';
						} else {
							motd = status.description.text || status.description;
							if (motd.extra) {
								motd = motd.extra.map(({ text }) => text).join('');
							}
							motd = motd.replace(/§[0-9a-fklmnor]/g, '');
						}
						resolve();
					}
				});
			});
		} catch (err) {
			interaction.editReply({ embeds: [
				new EmbedBuilder()
					.setColor(0xf54242)
					.setTitle('Minecraft Server Information')
					.setDescription('An error occurred while trying to ping the server. Please check that the server address is correct and that the server is online and running.')
					.setFooter({ text: 'Realmplex', iconURL: 'https://cdn.discordapp.com/avatars/1001311496036429845/82d48625a3789042b13c1e8053e64414.png' })
					.setTimestamp(Date.now()),
			],
			});
			return;
		}

		const attachment = new AttachmentBuilder(buffer, { name: 'icon.png' });
		await interaction.editReply({
			embeds: [
				new EmbedBuilder()
					.setColor(0xf59042)
					.setTitle('Minecraft Server Information')
					.setTimestamp(Date.now())
					.setThumbnail('attachment://icon.png')
					.setDescription(`**IP**: ${ip}\n**Port**: ${port}\n**Version**: ${version}`)
					.addFields(
						{ name: 'Information', value: `**Players**: ${status.players.online}/${status.players.max}\n**MOTD**: \n${motd}` },
						{ name: 'Extra', value: `Previews Chat: ${status.previewsChat}\nEnforce Secure Profile: ${status.enforcesSecureChat}` },
					)
					.setFooter({ text: 'Realmplex', iconURL: 'https://cdn.discordapp.com/avatars/1001311496036429845/82d48625a3789042b13c1e8053e64414.png' }),
			],
			files: [attachment],
		});
	},
};