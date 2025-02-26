import { Client, Intents } from 'discord.js';
import { getRandomMessage } from './utils/messageUtils';
import { CHANNEL_ID, BOT_TOKEN } from './config';

export class Bot {
    private client: Client;

    constructor() {
        this.client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
        this.client.once('ready', () => {
            console.log(`Logged in as ${this.client.user?.tag}`);
            this.startMessageLoop();
        });
    }

    public start() {
        this.client.login(BOT_TOKEN);
    }

    private startMessageLoop() {
        const channel = this.client.channels.cache.get(CHANNEL_ID);
        if (channel && channel.isText()) {
            setInterval(() => {
                const message = getRandomMessage();
                channel.send(message);
            }, 300000); // 5 minutes in milliseconds
        }
    }
}