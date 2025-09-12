import {messages} from '../data/messages';

export function getRandomMessage(): string {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}