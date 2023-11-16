import { Whatsapp } from "venom-bot";
import { WhatsappInstanceConfig } from "../../domain/entities/whatsapp-instance-config";

export type WASocket = Whatsapp;

export interface whatsappInstance{
  key: string;
  getQrCode(): Promise<string>;
  getSock(): WASocket | undefined;
  getStatus(): Promise<string>;
  getAttempts(): number;
}

export interface MessageService{
  sendBasicText(to: string, message: string): void;
}

export interface WhatsappService{
  key: string;
  message: MessageService;
  instance: whatsappInstance;
  init(config: WhatsappInstanceConfig): Promise<void>;
}