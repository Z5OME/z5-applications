const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../config/config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('announce-job')
        .setDescription('Post a job announcement with Apply button for a configured job key')
        .addStringOption(o => o.setName('job_key').setDescription('Configured jobKey').setRequired(true))
        .addStringOption(o => o.setName('message').setDescription('Optional announcement message override').setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
    async execute(interaction) {
        const jobKey = interaction.options.getString('job_key');
        const messageOverride = interaction.options.getString('message');

        const job = config.applications.find(j => j.jobKey === jobKey);
        if (!job) {
            return interaction.reply({ content: `Job with key \`${jobKey}\` not found in config.`, ephemeral: true });
        }

        const channelId = job.announcementChannelId || config.announcement.channelId || interaction.channelId;
        const channel = await interaction.client.channels.fetch(channelId).catch(() => null);
        if (!channel) {
            return interaction.reply({ content: 'Announcement channel not found or bot has no access.', ephemeral: true });
        }

        const colorHex = job.colors?.announcement || '#2b6cb0';
        const colorInt = parseInt(colorHex.replace('#', ''), 16);
        const embed = new EmbedBuilder()
            .setTitle(job.title)
            .setDescription(job.description || 'Apply now!')
            .setColor(colorInt)
            .setTimestamp();

        const e = job.embed?.announcement || {};
        if (e.url) embed.setURL(e.url);
        if (e.author && (e.author.name || e.author.iconUrl || e.author.url)) {
            embed.setAuthor({ name: e.author.name || undefined, iconURL: e.author.iconUrl || undefined, url: e.author.url || undefined });
        }
        if (e.thumbnailUrl) embed.setThumbnail(e.thumbnailUrl);
        if (e.imageUrl) embed.setImage(e.imageUrl);
        if (e.footer && (e.footer.text || e.footer.iconUrl)) {
            embed.setFooter({ text: e.footer.text || '', iconURL: e.footer.iconUrl || undefined });
        }

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(`apply:${job.jobKey}`)
                .setLabel('Apply')
                .setStyle(ButtonStyle.Primary)
        );

        const content = messageOverride || job.announcementMessage || null;

        await channel.send({ content, embeds: [embed], components: [row] });

        if (channel.id !== interaction.channelId) {
            return interaction.reply({ content: `Announcement posted in <#${channel.id}>`, ephemeral: true });
        }
        return interaction.reply({ content: 'Announcement posted.', ephemeral: true });
    }
};


