import { Client, TextChannel } from 'discord.js';
import { messages } from './data/messages';
import { getRandomMessage } from './utils/messageUtils';

export class Bot {
  private interval: NodeJS.Timeout | null = null;
  
  // Method to start sending messages every 5 minutes
  public startSendingMessages(client: Client): void {
    console.log('Starting scheduled messages...');
    
    // Clear any existing interval
    if (this.interval) {
      clearInterval(this.interval);
    }
    
    // Set interval to send a message every 5 minutes (300000 ms)
    this.interval = setInterval(() => {
      this.sendRandomMessage(client);
    }, 5 * 60 * 1000);
    
    // Send an initial message right away
    this.sendRandomMessage(client);
  }
  
  // Method to stop sending messages
  public stopSendingMessages(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    console.log('Stopped scheduled messages');
  }
  
  // Helper method to send a random message to the channel
  private async sendRandomMessage(client: Client): Promise<void> {
    try {
      const channelId = process.env.DISCORD_CHANNEL_ID;
      if (!channelId) {
        console.error('No channel ID provided in environment variables');
        return;
      }
      
      const channel = await client.channels.fetch(channelId);
      if (!channel || !(channel instanceof TextChannel)) {
        console.error('Channel not found or is not a text channel');
        return;
      }
      
      const randomMessage = getRandomMessage();
      await channel.send(randomMessage);
      console.log(`Sent message: ${randomMessage}`);
    } catch (error) {
      console.error('Error sending random message:', error);
    }
  }
}