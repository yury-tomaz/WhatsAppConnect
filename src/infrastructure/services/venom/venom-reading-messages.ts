import { Whatsapp } from "venom-bot";

export class VenomReadingMessages {
  async start( client: Whatsapp ) {
    await client.onMessage(async (message) => {
      if (message.body === 'Hi') {
        await client.sendText(message.from, 'Welcome Venom 🕷');
      }
    });
  }
}