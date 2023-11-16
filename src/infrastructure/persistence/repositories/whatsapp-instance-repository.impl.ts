import { WhatsappInstanceRepository } from "../../../domain/repositoires/whatsapp-instance.repository";
import {  WhatsappService } from "../../../application/abstractions/whatsapp.provider";


export class WhatsappInstanceRepositoryImpl implements WhatsappInstanceRepository<WhatsappService> {

  private static _instance: WhatsappInstanceRepositoryImpl;
  private _whatsappInstance: WhatsappService[] = [];

  private constructor() {
  }

  public static getInstance(): WhatsappInstanceRepositoryImpl {
    if (!this._instance) {
      this._instance = new WhatsappInstanceRepositoryImpl();
    }
    return this._instance;
  }

  async save(instance: any): Promise<void> {
    this._whatsappInstance.push(instance);
  }

  async delete(key: string): Promise<void> {
    this._whatsappInstance = this._whatsappInstance.filter(instance => instance.key !== key);
  }

  async update(instance: any): Promise<void> {
    const index = this._whatsappInstance.findIndex(i => i.key === instance.key);

    if (index === -1) {
      throw new Error('Instance not found');
    }

    this._whatsappInstance[index] = instance;
  }

  async findByKey(key: string): Promise<any | undefined> {
    return this._whatsappInstance.find(instance => instance.key === key);
  }

}