const fs = require('fs');
const path = require('path');

module.exports = (client) => {
    const commandsPath = path.join(__dirname, '..', 'slash');
    if (!fs.existsSync(commandsPath)) return;
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(path.join(commandsPath, file));
        if (command && command.data && command.execute) {
            client.commands.set(command.data.name, command);
        }
    }
};


