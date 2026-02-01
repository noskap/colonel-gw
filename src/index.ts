import { Bot } from './bot';

// Load environment variables

console.log('initializing config')
console.log('Config init done', !!process.env)
// Initialize the bot
const bot = new Bot();

// Start sending messages
console.log('Starting webhook messenger...');
bot.startSendingMessages();