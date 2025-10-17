require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { REST, Routes } = require('discord.js');

async function registerCommands() {
    const commands = [];
    const commandsPath = path.join(__dirname, '..', 'slash');
    if (!fs.existsSync(commandsPath)) return;
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(path.join(commandsPath, file));
        if (command?.data) commands.push(command.data.toJSON());
    }

    const token = process.env.BOT_TOKEN;
    const clientId = process.env.CLIENT_ID;
    const guildId = process.env.GUILD_ID;
    const guildIdsEnv = process.env.GUILD_IDS;
    const registerMode = (process.env.REGISTER_MODE || 'auto').toLowerCase();
    const guildIds = (guildIdsEnv ? guildIdsEnv.split(',') : [])
        .map(s => s.trim())
        .filter(Boolean);
    if (!guildIds.length && guildId) guildIds.push(guildId);
    if (!token || !clientId) {
        console.warn('[READY] Skipping command registration (missing env: BOT_TOKEN/CLIENT_ID)');
        return;
    }

    const rest = new REST({ version: '10' }).setToken(token);
    const registerGlobal = async () => {
        await rest.put(Routes.applicationCommands(clientId), { body: commands });
    };

    const registerToGuild = async (id) => {
        await rest.put(Routes.applicationGuildCommands(clientId, id), { body: commands });
    };

    const tryGuilds = async () => {
        if (!guildIds.length) return { anySuccess: false, attempted: false };
        let anySuccess = false;
        for (const id of guildIds) {
            try {
                await registerToGuild(id);
                anySuccess = true;
            } catch (err) {
                const missingAccess = (err?.code === 50001 || err?.status === 403);
                const msg = missingAccess ? 'Missing Access' : (err?.message || 'Unknown error');
                console.warn(`[READY] Guild ${id} registration failed (${msg}).`);
            }
        }
        return { anySuccess, attempted: true };
    };

    try {
        if (registerMode === 'global') {
            await registerGlobal();
            return;
        }

        if (registerMode === 'guild') {
            const { anySuccess, attempted } = await tryGuilds();
            if (!attempted) console.warn('[READY] REGISTER_MODE=guild but no GUILD_ID(S) provided.');
            return;
        }

        if (registerMode === 'both') {
            await tryGuilds();
            await registerGlobal();
            return;
        }

        const { anySuccess } = await tryGuilds();
        if (!anySuccess) {
            console.warn('[READY] Guild registration failed or not configured. Falling back to global.');
            await registerGlobal();
        }
    } catch (err) {
        console.error('[READY] Command registration failed:', err);
    }
}

module.exports = { registerCommands };


