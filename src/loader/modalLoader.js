const fs = require('fs');
const path = require('path');

module.exports = (client) => {
    const modalsPath = path.join(__dirname, '..', 'interactions', 'modals');
    if (!fs.existsSync(modalsPath)) return;
    const files = fs.readdirSync(modalsPath).filter(f => f.endsWith('.js'));
    for (const file of files) {
        const modal = require(path.join(modalsPath, file));
        if (modal && modal.customId && typeof modal.execute === 'function') {
            client.modals.set(modal.customId, modal);
        }
    }
};


