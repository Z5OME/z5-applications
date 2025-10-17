const { PermissionsBitField } = require('discord.js');
const config = require('../../../../config/config');

module.exports = {
    customId: 'review_accept',
    async execute(interaction) {
        const [base, jobKey, applicantId] = interaction.customId.split(':');
        const job = config.applications.find(j => j.jobKey === jobKey);
        if (!job) return interaction.reply({ content: 'Job not found.', ephemeral: true });

        const member = await interaction.guild.members.fetch(interaction.user.id).catch(() => null);
        const allowedRoles = config.permissions.reviewersRoleIds || [];
        const hasPerm = member && (member.permissions.has(PermissionsBitField.Flags.Administrator) || member.roles.cache.some(r => allowedRoles.includes(r.id)));
        if (!hasPerm) return interaction.reply({ content: 'You are not allowed to review applications.', ephemeral: true });

        await interaction.update({ components: [] }).catch(() => { });

        const applicantMember = await interaction.guild.members.fetch(applicantId).catch(() => null);
        const roleId = job.roles?.onAcceptRoleId;
        if (applicantMember && roleId) {
            try {
                await applicantMember.roles.add(roleId);
            } catch (e) {
                console.warn('Failed to add role to accepted member:', e?.message || e);
            }
        }

        if (job.dmOnAccept?.enabled) {
            const message = job.dmOnAccept.message || `Congratulations! You have been accepted for ${job.title}.`;
            const user = await interaction.client.users.fetch(applicantId).catch(() => null);
            if (user) {
                await user.send({ content: message }).catch(() => { });
            }
        }

        await interaction.followUp({ content: `Application accepted by ${interaction.user.tag}.`, ephemeral: true }).catch(() => { });
    }
};


