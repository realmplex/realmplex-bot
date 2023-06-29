const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./config.json');
const mcping = require('mcping-js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(token);

function timeout() {
	setTimeout(async () => {
		const server = new mcping.MinecraftServer('realmplex.toaster.pw', 25569);
		server.ping(10000, 760, (err, res) => {
			if (err) {
				const channel = client.channels.fetch('1114356323056889937')
					.then((channel) => channel.edit({ name: 'Server offline!' }));
			} else {
				const status = res;
				const channel = client.channels.fetch('1114356323056889937')
					.then((channel) => channel.edit({ name: `Online: ${status.players.online}/${status.players.max}` }));

			}
		});
		timeout();
	}, 600000);
}

timeout();