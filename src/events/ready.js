const { Events } = require('discord.js');
const mcping = require('mcping-js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setPresence({ activities: [{ name: 'on Realmplex! realmplex.com' }], status: 'online' });
		function timeout() {
			setTimeout(async () => {
				const server = new mcping.MinecraftServer('mc.realmplex.com', 25565);
				server.ping(10000, 760, (err, res) => {
					if (err) {
						client.channels.fetch('1114356323056889937')
							.then((channel) => channel.edit({ name: 'Server offline!' }));
					} else {
						const status = res;
						client.channels.fetch('1114356323056889937')
							.then((channel) => channel.edit({ name: `Online: ${status.players.online}/${status.players.max}` }));

					}
				});
				timeout();
			}, 600000);
		}

		timeout();
	},
};