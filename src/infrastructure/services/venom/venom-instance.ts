import { create, Whatsapp } from 'venom-bot';
import { logger } from "../../logger";
import { VenomReadingMessages } from "./venom-reading-messages";
import { WhatsappInstanceConfig } from "../../../domain/entities/whatsapp-instance-config";
import { CreateConfig } from "venom-bot/dist/config/create-config";
import { whatsappInstance } from "../../../application/abstractions/whatsapp.provider";

export class VenomInstance implements whatsappInstance{
  public readonly key: string;
  private _sock: Whatsapp | undefined;
  private _qr: string;
  private _attempts: number = 0;
  private _status: string = 'DISCONNECTED';

  constructor(
    config: WhatsappInstanceConfig,
    private messageHandler: VenomReadingMessages
  ) {
    this.key = config.key;
    this.init(config)
      .then(() => {
        logger.info('Whatsapp instance created');
      })
      .catch((err) => {
        logger.error('Error creating whatsapp instance', err);
        throw new Error('Error creating whatsapp instance');
      });
  }

  public getSock(): Whatsapp | undefined {
    return this._sock;
  }

  async getStatus(): Promise<string> {
    return this._status;
  }

  public getAttempts(): number {
    return this._attempts;
  }

  public getQrCode(): Promise<string> {
    return Promise.resolve(this._qr);
  }


  private init = async (config: WhatsappInstanceConfig) => {
    const socketConfig: Partial<CreateConfig> = {
      folderNameToken: 'tokens',
      devtools: false,
      debug: false,
      logQR: false,
      browserArgs: ['--no-sandbox'],
      disableSpins: true,
      disableWelcome: true,
      updatesLog: false,
      autoClose: 60000,
      createPathFileToken: true,
      waitForLogin: true,
    };

    this._sock = await create(config.key, this.catchQR, this.statusFind, socketConfig)

    if (this._sock) {
      await this.messageHandler.start(this._sock);
    }
  }

  private catchQR = (base64QrImg: string, asciiQR: string, attempts: number | undefined) => {
    this._qr = base64QrImg;
    this._attempts = attempts || 0;

    logger.info('QR code: ', base64QrImg);
    logger.info('QR code ascii: ', asciiQR);
    logger.info('Number of attempts to read the qrcode: ', attempts);
  }

  private statusFind = (statusSession: string, session: string, info?: string) => {
    this._status = statusSession;

    logger.info('Status Session: ', statusSession);
    logger.info('Session name: ', session);
    logger.info('Info: ', info);
    if (statusSession === 'qrReadFail') {
      logger.error('Failed to read QR code');
    }
  }
}