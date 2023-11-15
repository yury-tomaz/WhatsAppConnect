import { MessageService } from "../../../application/abstractions/whatsapp.provider";
import { VenomInstance } from "./venom-instance";


export class VenomMessage implements MessageService{
  constructor(private venomInstance: VenomInstance) {}

  async sendBasicText(to: string, message: string): Promise<void> {
    const sock = this.venomInstance.getSock();

    if (!sock) {
      throw new Error('Whatsapp instance not found');
    }

    await sock.sendText(to, message);
  }
}