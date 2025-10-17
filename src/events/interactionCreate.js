module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(client, interaction) {
        try {

            if (interaction.isChatInputCommand()) {
                const command = client.commands.get(interaction.commandName);
                if (!command) return;
                await command.execute(interaction, client);
                return;
            }

            if (interaction.isButton()) {
                const customId = interaction.customId.split(':')[0];
                const handler = client.buttons.get(customId);
                if (!handler) return;
                await handler.execute(interaction, client);
                return;
            }

            if (interaction.isModalSubmit()) {
                const customId = interaction.customId.split(':')[0];
                const handler = client.modals.get(customId);
                if (!handler) return;
                await handler.execute(interaction, client);
                return;
            }
        } catch (err) {
            console.error('Interaction error:', err);
            if (interaction.isRepliable()) {
                const content = 'An error occurred while executing this interaction.';
                if (interaction.deferred || interaction.replied) {
                    await interaction.followUp({ content, ephemeral: true }).catch(() => { });
                } else {
                    await interaction.reply({ content, ephemeral: true }).catch(() => { });
                }
            }
        }
    }
};


