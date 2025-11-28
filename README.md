# Discord Webhook Messenger

This project is a simple service that sends random messages to a Discord channel via webhook at scheduled intervals.

## Features

- Sends random messages to a Discord channel via webhook at regular intervals.
- Easy to configure and extend.
- No bot token required - uses Discord webhooks.

## Prerequisites

- Node.js (version 14 or higher)
- A Discord server where you can create webhooks.

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd discord-webhook-messenger
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Create a Discord Webhook:**
   - Go to your Discord server settings
   - Navigate to Integrations > Webhooks
   - Create a new webhook for the desired channel
   - Copy the webhook URL

4. **Configure the service:**
   - Rename `.env.example` to `.env` and fill in your webhook URL.

5. **Run the service:**
   ```
   npm start
   ```

## Usage

Once the service is running, it will automatically send a random message from the predefined list every 5 minutes to the Discord channel via the webhook.

## Contributing

Feel free to submit issues or pull requests for improvements or new features.

## License

This project is licensed under the MIT License.