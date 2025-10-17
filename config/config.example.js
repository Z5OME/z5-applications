// Configuration file for Discord Applications Bot
// Replace all placeholder values with your actual Discord IDs

module.exports = {
    // Main announcement channel configuration
    announcement: {
        channelId: "YOUR_ANNOUNCEMENT_CHANNEL_ID" // Default channel for announcements
    },
    
    // Permission settings
    permissions: {
        reviewersRoleIds: ["REVIEWER_ROLE_ID_1", "REVIEWER_ROLE_ID_2"] // Role IDs that can review applications
    },
    
    // Application types configuration
    applications: [
        {
            jobKey: "admin_app", // Unique identifier for this application type
            title: "Admin Application", // Application title
            description: "Application form to join the administration team.", // Description
            announcementMessage: "||@everyone||", // Message to send with announcement
            announcementChannelId: "YOUR_ANNOUNCEMENT_CHANNEL_ID", // Specific channel for this job announcement
            reviewChannelId: "YOUR_REVIEW_CHANNEL_ID", // Channel where applications will be reviewed
            
            // Color settings for embeds
            colors: {
                announcement: "#0066cc", // Color for announcement embed
                application: "#0066cc"   // Color for application embed
            },
            
            // Role management
            roles: {
                onAcceptRoleId: "ROLE_ID_TO_ASSIGN_ON_ACCEPT" // Role to assign when application is accepted
            },
            
            // Embed customization
            embed: {
                announcement: {
                    url: "https://example.com", // Link when embed title is clicked
                    thumbnailUrl: "https://example.com/thumbnail.png", // Small image in top right
                    imageUrl: "https://example.com/image.png", // Large image at bottom
                    author: { 
                        name: "Server Name", // Server name
                        iconUrl: "https://example.com/icon.png", 
                        url: "https://example.com" 
                    },
                    footer: { 
                        text: "Server Name © 2025", // Footer text
                        iconUrl: "https://example.com/footer-icon.png" 
                    }
                },
                application: {
                    url: "https://example.com",
                    thumbnailUrl: "https://example.com/thumbnail.png",
                    imageUrl: "https://example.com/image.png",
                    author: { 
                        name: "Administration Application Form", // Application form title
                        iconUrl: "https://example.com/icon.png", 
                        url: "https://example.com" 
                    },
                    footer: { 
                        text: "Server Name © 2025", 
                        iconUrl: "https://example.com/footer-icon.png" 
                    }
                }
            },
            
            // Form fields configuration
            fields: [
                { 
                    id: "full_name", 
                    label: "Your Full Name", // Your full name
                    style: 1, // 1 = Short text input, 2 = Paragraph
                    required: true 
                },
                { 
                    id: "age", 
                    label: "Your Age", // Your age
                    style: 1, 
                    required: true 
                },
                { 
                    id: "reason", 
                    label: "Why do you want to join the administration?", // Why do you want to join the administration?
                    style: 2, 
                    required: true 
                },
                { 
                    id: "previous_exp", 
                    label: "Do you have previous admin experience? (Provide details)", // Do you have previous admin experience?
                    style: 2, 
                    required: false 
                }
            ],
            
            // Direct message settings
            dmOnAccept: {
                enabled: true,
                message: "Congratulations! Your application to join the administration has been accepted." // Congratulations! Your application has been accepted.
            }
        }
        
        // Add more application types here if needed
        // {
        //     jobKey: "moderator_app",
        //     title: "Moderator Application",
        //     ...
        // }
    ]
};

/* 
How to get Discord IDs:
1. Enable Developer Mode in Discord Settings > Advanced > Developer Mode
2. Right-click on channels/roles/users and select "Copy ID"

Required IDs to configure:
- YOUR_ANNOUNCEMENT_CHANNEL_ID: Channel where job announcements will be posted
- YOUR_REVIEW_CHANNEL_ID: Channel where applications will be sent for review
- REVIEWER_ROLE_ID_X: Role IDs of users who can review applications
- ROLE_ID_TO_ASSIGN_ON_ACCEPT: Role to assign to users when their application is accepted

Optional customizations:
- Colors: Use hex color codes (e.g., #ff0000 for red)
- URLs: Replace with your server's website, rules page, etc.
- Images: Replace with your server's logo, banners, etc.
- Text: Customize all Arabic text to match your server's language/style
*/