const { PermissionsBitField } = require('discord.js');
const config = require('../../../config/config');

module.exports = {
    customId: 'review_reject',
    async execute(interaction) {
        const [base, jobKey, applicantId] = interaction.customId.split(':');
        const job = config.applications.find(j => j.jobKey === jobKey);
        if (!job) return interaction.reply({ content: 'Job not found.', ephemeral: true });

        const member = await interaction.guild.members.fetch(interaction.user.id).catch(() => null);
        const allowedRoles = config.permissions.reviewersRoleIds || [];
        const hasPerm = member && (member.permissions.has(PermissionsBitField.Flags.Administrator) || member.roles.cache.some(r => allowedRoles.includes(r.id)));
        if (!hasPerm) return interaction.reply({ content: 'You are not allowed to review applications.', ephemeral: true });

        await interaction.update({ components: [] }).catch(() => { });
        await interaction.followUp({ content: `Application rejected by ${interaction.user.tag}.`, ephemeral: true }).catch(() => { });
    }
};


