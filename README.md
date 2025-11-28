# Discord Webhook Messenger

This project is a simple service that sends random messages to a Discord channel via webhook at scheduled intervals.

## Features

- Sends random messages to a Discord channel via webhook at regular intervals (every ~2 hours).
- Easy to configure and extend.
- No bot token required - uses Discord webhooks.
- Built with TypeScript for better development experience.
- Production-ready with PM2 process management.

## Prerequisites

- Node.js (version 20 or higher recommended)
- npm (comes with Node.js)
- A Discord server where you can create webhooks.
- For production deployment: PM2 (process manager)

## Development Setup

### Installing Node.js and npm

We recommend using [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager) to install Node.js:

```bash
# Install nvm (Linux/Mac)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install Node.js 20
nvm install 20
nvm use 20

# Verify installation
node --version
npm --version
```

### Project Setup

1. **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd discord-webhook-messenger
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Create a Discord Webhook:**
    - Go to your Discord server settings
    - Navigate to Integrations > Webhooks
    - Create a new webhook for the desired channel
    - Copy the webhook URL

4. **Environment Configuration:**
    - Copy `.env.example` to `.env`
    - Edit `.env` and replace `your_discord_webhook_url_here` with your actual webhook URL:
      ```
      WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN
      ```

### Running the Application

#### Development Mode
```bash
# Run with hot-reload (development)
npm run dev

# Or run directly with ts-node
npm start
```

#### Production Build
```bash
# Build the TypeScript code
npm run build

# Run the compiled production build
npm run prod
```

The service sends a random message every ~2 hours (132 minutes) to the configured Discord webhook.

## Production Deployment with PM2

For production environments (like AWS EC2), use PM2 to manage the application process:

### Installing PM2

```bash
# Install PM2 globally
npm install -g pm2
```

### Using PM2

```bash
# Start the application with PM2
pm2 start ecosystem.config.js

# Check status
pm2 status

# View logs
pm2 logs discord-webhook-messenger

# Restart the application
pm2 restart discord-webhook-messenger

# Stop the application
pm2 stop discord-webhook-messenger

# Save current processes for persistence
pm2 save

# Set up auto-start on server boot
pm2 startup
# Follow the provided instructions (usually requires sudo)
```

### PM2 Configuration

The `ecosystem.config.js` file contains the PM2 configuration:
- Runs `npm run prod` (builds and starts the app)
- Single instance with auto-restart
- Memory limit of 1GB
- Production environment variables

## Available Scripts

- `npm start` - Run with ts-node (development)
- `npm run dev` - Run with ts-node-dev (hot-reload)
- `npm run build` - Compile TypeScript to JavaScript
- `npm run prod` - Build and run production version

## Usage

Once the service is running, it will automatically send a random message from the predefined list every ~2 hours to the Discord channel via the webhook.

## Project Structure

```
discord-webhook-messenger/
├── src/
│   ├── index.ts          # Application entry point
│   ├── bot.ts            # Main bot logic
│   ├── config.ts         # Configuration (environment variables)
│   ├── data/
│   │   └── messages.ts   # Message data
│   └── utils/
│       └── messageUtils.ts # Utility functions
├── dist/                 # Compiled JavaScript (generated)
├── ecosystem.config.js   # PM2 configuration
├── package.json
├── tsconfig.json
├── .env.example          # Environment template
└── README.md
```

## Environment Variables

The application uses the following environment variables:

- `WEBHOOK_URL` - Your Discord webhook URL (required)

Create a `.env` file based on `.env.example` and fill in your webhook URL.

## Contributing

Feel free to submit issues or pull requests for improvements or new features.

## License

This project is licensed under the MIT License.