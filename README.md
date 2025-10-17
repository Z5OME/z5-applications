# Discord Applications Bot 🤖

A comprehensive Discord bot for managing job applications and announcements within Discord servers. This bot allows administrators to create job postings, manage applications through an interactive modal system, and review applications with approval/rejection functionality.

## ✨ Features

- **Job Announcements**: Create and post job announcements with custom embeds
- **Application System**: Interactive modal-based application forms
- **Review System**: Staff can review, accept, or reject applications
- **Role Management**: Automatically assign roles upon application acceptance
- **Configurable**: Fully customizable job types and settings
- **Multi-language Support**: Supports multiple languages with English as default

## 🚀 Quick Start

### Prerequisites

- Node.js (v16.0.0 or higher)
- Discord Bot Token
- Discord Server with appropriate permissions

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/z5-applications.git
   cd z5-applications
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your bot token:

   ```env
   BOT_TOKEN=your_discord_bot_token_here
   GUILD_ID=your_discord_guild_id_here
   ```

4. **Configure bot settings**

   ```bash
   cp config/config.example.js config/config.js
   ```

   Edit `config/config.js` and replace all placeholder values with your actual Discord IDs:

   - Channel IDs for announcements and reviews
   - Role IDs for permissions and assignments
   - Customize embed styling and messages
   - Set up application form fields

   **Important**: Make sure to enable Developer Mode in Discord to copy IDs:
   `Discord Settings > Advanced > Developer Mode`

5. **Start the bot**
   ```bash
   npm start
   ```

## 📋 Commands

### `/announce-job`

Posts a job announcement with an apply button.

- **Parameters:**
  - `job_key` (required): The configured job key from config
  - `message` (optional): Custom announcement message override

**Example:**

```
/announce-job job_key:admin_app message:We are looking for new administrators!
```

## ⚙️ Configuration

The bot is configured through `config/config.js`. Copy from the example file first:

```bash
cp config/config.example.js config/config.js
```

### Getting Discord IDs

1. Enable Developer Mode: `Discord Settings > Advanced > Developer Mode`
2. Right-click on channels/roles/users and select "Copy ID"

### Application Types

```javascript
applications: [
  {
    jobKey: "admin_app",
    title: "Admin Application",
    description: "Application form to join the administration team",
    announcementChannelId: "channel_id_here",
    reviewChannelId: "review_channel_id_here",
    roles: {
      onAcceptRoleId: "role_id_to_assign",
    },
    // ... more configuration options
  },
];
```

### Permissions

```javascript
permissions: {
  reviewersRoleIds: ["role_id_1", "role_id_2"];
}
```

## 🔧 File Structure

```
z5-applications/
├── config/
│   └── config.js              # Main configuration file
├── src/
│   ├── index.js              # Bot entry point
│   ├── events/               # Discord event handlers
│   │   ├── interactionCreate.js
│   │   └── ready.js
│   ├── interactions/         # Button and modal handlers
│   │   ├── buttons/
│   │   │   ├── apply.js
│   │   │   ├── review_accept.js
│   │   │   └── review_reject.js
│   │   └── modals/
│   │       └── application_modal.js
│   ├── loader/               # Dynamic loaders
│   │   ├── buttonLoader.js
│   │   ├── commandLoader.js
│   │   ├── eventLoader.js
│   │   └── modalLoader.js
│   ├── slash/                # Slash commands
│   │   └── announce.js
│   └── utils/
│       └── registerCommands.js
├── package.json
└── README.md
```

## 🎯 Usage Workflow

1. **Setup**: Configure your application types in `config/config.js`
2. **Announce**: Use `/announce-job` to post job announcements
3. **Apply**: Users click the "Apply" button to fill out application forms
4. **Review**: Staff members review applications in the designated review channel
5. **Decision**: Accept or reject applications with automatic role assignment

## 🛡️ Permissions Required

The bot requires the following Discord permissions:

- Send Messages
- Embed Links
- Use Slash Commands
- Manage Roles (for role assignment)
- Read Message History
- View Channels

## 🔗 Bot Intents

Required Discord Intents:

- `Guilds`
- `GuildMembers`
- `GuildMessages`
- `DirectMessages`

## 📝 Dependencies

- **discord.js**: Discord API wrapper
- **dotenv**: Environment variable management
- **nodemon**: Development auto-restart
- **aes-js**: Encryption utilities
- **javascript-obfuscator**: Code protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/z5-applications/issues) section
2. Create a new issue with detailed information
3. Contact the maintainer

## 🙏 Acknowledgments

- Built with [discord.js](https://discord.js.org/)
- Inspired by community feedback and needs
- Special thanks to all contributors

---

**Note**: Remember to keep your bot token secure and never commit it to version control!
