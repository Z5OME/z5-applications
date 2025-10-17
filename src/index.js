require('dotenv').config();
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages
    ],
    partials: [Partials.Channel]
});

client.commands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();

require('./loader/commandLoader')(client);
require('./loader/buttonLoader')(client);
require('./loader/modalLoader')(client);
require('./loader/eventLoader')(client);

client.login(process.env.BOT_TOKEN);


