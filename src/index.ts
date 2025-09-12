import * as dotenv from 'dotenv';
import { Client, GatewayIntentBits } from 'discord.js';
import { Bot } from './bot';

// Load environment variables
dotenv.config();

// Create a new Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ]
});

// Initialize the bot
const bot = new Bot();

// Login to Discord with your token
client.login(process.env.DISCORD_TOKEN);

// When client is ready
client.once('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`);
  bot.startSendingMessages(client);
});