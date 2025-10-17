const fs = require('fs');
const path = require('path');

module.exports = (client) => {
    const buttonsPath = path.join(__dirname, '..', 'interactions', 'buttons');
    if (!fs.existsSync(buttonsPath)) return;
    const files = fs.readdirSync(buttonsPath).filter(f => f.endsWith('.js'));
    for (const file of files) {
        const btn = require(path.join(buttonsPath, file));
        if (btn && btn.customId && typeof btn.execute === 'function') {
            client.buttons.set(btn.customId, btn);
        }
    }
};


