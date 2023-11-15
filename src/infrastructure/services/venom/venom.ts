import { MessageService, WhatsappService } from "../../../application/abstractions/whatsapp.provider";
import { VenomMessage } from "./venom-message";
import { WhatsappInstanceConfig } from "../../../domain/entities/whatsapp-instance-config";
import { VenomInstance } from "./venom-instance";
import { VenomReadingMessages } from "./venom-reading-messages";

export class Venom implements WhatsappService{
  key: string;
  instance: VenomInstance;
  message: MessageService;
  private _readingMessages: VenomReadingMessages;

  async init(config: WhatsappInstanceConfig): Promise<void> {
    this.key = config.key;
    this._readingMessages = new VenomReadingMessages();
    this.instance = new VenomInstance(config, this._readingMessages);
    this.message = new VenomMessage(this.instance);
  }
}