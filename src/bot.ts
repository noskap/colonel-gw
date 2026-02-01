import axios from 'axios';
import { getRandomMessage } from './utils/messageUtils';


export class Bot {
    private WEBHOOK_URL: string | undefined;
    private interval: NodeJS.Timeout | null = null;
    private isTestMode: boolean = false;

    private init(): void {
        // Check for --test flag
        if (process.argv.includes('--test')) {
            this.isTestMode = true;
            console.log('Running in Test Mode (Messages will be logged to console)');
        }

        if (process.env.WEBHOOK_URL) {
            this.WEBHOOK_URL = process.env.WEBHOOK_URL;
        }

        if (!this.WEBHOOK_URL && !this.isTestMode) {
            console.error('No webhook URL provided in environment variables and not in test mode.');
            process.exit(1);
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

        // Determine interval duration
        let intervalDuration = (66 * 2) * 60 * 1000; // Default: ~132 minutes

        if (this.isTestMode) {
            intervalDuration = 5 * 1000; // 5 seconds in test mode
        } else if (process.env.MESSAGE_INTERVAL_MINUTES) {
            const minutes = parseInt(process.env.MESSAGE_INTERVAL_MINUTES, 10);
            if (!isNaN(minutes) && minutes > 0) {
                intervalDuration = minutes * 60 * 1000;
                console.log(`Interval set to ${minutes} minutes via environment variable.`);
            } else {
                console.warn('Invalid MESSAGE_INTERVAL_MINUTES provided, using default.');
            }
        }

        this.interval = setInterval(() => {
            void this.sendRandomMessage();
        }, intervalDuration);

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
            const randomMessage = getRandomMessage();

            if (this.isTestMode) {
                console.log(`[TEST MODE] ${randomMessage}`);
                return;
            }

            if (!this.WEBHOOK_URL) {
                // Should be caught in init, but double check
                console.error('No webhook URL provided in environment variables');
                return;
            }

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