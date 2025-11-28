import axios from 'axios';
import {getRandomMessage} from './utils/messageUtils';


export class Bot {
    private WEBHOOK_URL: string | undefined;
    private interval: NodeJS.Timeout | null = null;

    private init(): void {
        if (!this.WEBHOOK_URL && process.env.WEBHOOK_URL) {
            this.WEBHOOK_URL = process.env.WEBHOOK_URL;
        }
    }

    // Method to start sending messages every 5 minutes
    public startSendingMessages(): void {
        this.init();
        console.log('Starting scheduled messages...');

        // Clear any existing interval
        if (this.interval) {
            clearInterval(this.interval);
        }

        // Set interval to send a message every (66 * 2) minutes
        this.interval = setInterval(() => {
            void this.sendRandomMessage();
        }, (66 * 2) * 60 * 1000);

        // Send an initial message right away
        void this.sendRandomMessage();
    }

    // Method to stop sending messages
    public stopSendingMessages(): void {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        console.log('Stopped scheduled messages');
    }

    // Helper method to send a random message via webhook
    private async sendRandomMessage(): Promise<void> {
        try {
            if (!this.WEBHOOK_URL) {
                console.error('No webhook URL provided in environment variables');
                return;
            }

            const randomMessage = getRandomMessage();

            // Send POST request to Discord webhook
            await axios.post(this.WEBHOOK_URL, {
                content: randomMessage
            });

            console.log(`Sent message: ${randomMessage}`);
        } catch (error) {
            console.error('Error sending random message:', error);
        }
    }
}