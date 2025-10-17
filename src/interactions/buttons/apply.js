const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js');
const config = require('../../../config/config');

module.exports = {
    customId: 'apply',
    async execute(interaction) {
        const parts = interaction.customId.split(':');
        const jobKey = parts[1];
        const job = config.applications.find(j => j.jobKey === jobKey);
        if (!job) return interaction.reply({ content: 'This job is no longer available.', ephemeral: true });

        const modal = new ModalBuilder()
            .setCustomId(`application_modal:${jobKey}`)
            .setTitle(`Apply: ${job.title}`);

        const fields = (job.fields || []).slice(0, 5);
        if (fields.length === 0) {
            return interaction.reply({ content: 'No fields configured for this job.', ephemeral: true });
        }

        const components = fields.map(field => {
            const input = new TextInputBuilder()
                .setCustomId(field.id)
                .setLabel(field.label?.slice(0, 45) || field.id)
                .setStyle(field.style === 2 ? TextInputStyle.Paragraph : TextInputStyle.Short)
                .setRequired(Boolean(field.required));
            return new ActionRowBuilder().addComponents(input);
        });

        modal.addComponents(...components);
        await interaction.showModal(modal);
    }
};


