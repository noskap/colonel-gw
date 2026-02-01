import { Bot } from './bot';

// Initialize the bot
const bot = new Bot();

// Start sending messages
console.log('Starting webhook messenger...');
bot.startSendingMessages();