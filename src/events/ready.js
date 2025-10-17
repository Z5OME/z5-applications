const { Events, ActivityType } = require('discord.js');
const { registerCommands } = require('../utils/registerCommands');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        const botTag = client.user?.tag ?? client.user?.username ?? 'bot';
        console.log(`[READY] Logged in as ${botTag}`);

        try {
            client.user.setPresence({
                activities: [
                    {
                        name: 'ONE REGION | منطقة ون',
                        type: ActivityType.Streaming,
                        url: process.env.STREAM_URL || 'https://kick.com/z5ome'
                    },
                ],
                status: 'dnd',
            });
        } catch (error) {
            console.error('[READY] Failed to set presence:', error);
        }

        try {
            await registerCommands();
        } catch (err) {
            console.error('[READY] Failed to register commands:', err);
        }
    },
};

