import { Client, GatewayIntentBits } from 'discord.js';
import { Bot } from './bot';
import { BOT_TOKEN } from './config';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
    console.log(`Logged in as ${client.user?.tag}`);
    const bot = new Bot(client);
    bot.startSendingMessages();
});

client.login(BOT_TOKEN);