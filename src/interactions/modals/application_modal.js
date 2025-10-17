const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../../../config/config');

module.exports = {
    customId: 'application_modal',
    async execute(interaction) {
        const parts = interaction.customId.split(':');
        const jobKey = parts[1];
        const job = config.applications.find(j => j.jobKey === jobKey);
        if (!job) return interaction.reply({ content: 'This job is no longer available.', ephemeral: true });

        const data = {};
        for (const field of (job.fields || [])) {
            const val = interaction.fields.getTextInputValue(field.id) || '';
            data[field.id] = val;
        }

        const reviewChannelId = job.reviewChannelId;
        const channel = await interaction.client.channels.fetch(reviewChannelId).catch(() => null);
        if (!channel) {
            return interaction.reply({ content: 'Review channel not found. Please contact staff.', ephemeral: true });
        }

        const colorHex = job.colors?.application || '#805ad5';
        const colorInt = parseInt(colorHex.replace('#', ''), 16);
        const embed = new EmbedBuilder()
            .setTitle(`Application: ${job.title}`)
            .setColor(colorInt)
            .setTimestamp()
            .setFooter({ text: `Applicant: ${interaction.user.tag} (${interaction.user.id})` });

        const e = job.embed?.application || {};
        if (e.url) embed.setURL(e.url);
        if (e.author && (e.author.name || e.author.iconUrl || e.author.url)) {
            embed.setAuthor({ name: e.author.name || undefined, iconURL: e.author.iconUrl || undefined, url: e.author.url || undefined });
        }
        if (e.thumbnailUrl) embed.setThumbnail(e.thumbnailUrl);
        if (e.imageUrl) embed.setImage(e.imageUrl);
        if (e.footer && (e.footer.text || e.footer.iconUrl)) {
            embed.setFooter({ text: e.footer.text || `Applicant: ${interaction.user.tag} (${interaction.user.id})`, iconURL: e.footer.iconUrl || undefined });
        }

        const descriptionLines = [];
        for (const field of (job.fields || [])) {
            const value = data[field.id] || 'N/A';
            descriptionLines.push(`• **${field.label || field.id}:** ${value}`);
        }
        embed.setDescription(descriptionLines.join('\n'));

        const components = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(`review_accept:${jobKey}:${interaction.user.id}`)
                .setLabel('Accept')
                .setStyle(ButtonStyle.Secondary), // Neutral color
            new ButtonBuilder()
                .setCustomId(`review_reject:${jobKey}:${interaction.user.id}`)
                .setLabel('Reject')
                .setStyle(ButtonStyle.Secondary) // Neutral color
        );

        await channel.send({ embeds: [embed], components: [components] });
        await interaction.reply({ content: 'Your application has been submitted successfully.', ephemeral: true });
    }
};


