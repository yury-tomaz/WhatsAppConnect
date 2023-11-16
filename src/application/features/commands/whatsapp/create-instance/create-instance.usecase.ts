import { WhatsappService } from "../../../../abstractions/whatsapp.provider";
import { WhatsappInstanceConfig } from "../../../../../domain/entities/whatsapp-instance-config";
import { WhatsappInstanceRepository } from "../../../../../domain/repositoires/whatsapp-instance.repository";

export interface CreateInstanceUseCaseDTO{
  tenantId: string;
  webhookUrl: string;
  allowWebhook: boolean;
}

export class CreateInstanceUseCase{
  constructor(
    private whatsappService: WhatsappService,
    private repository: WhatsappInstanceRepository<WhatsappService>
  ) {}

  async execute(data: CreateInstanceUseCaseDTO): Promise<void> {
     const config = new WhatsappInstanceConfig({
        tenantId: data.tenantId,
        webhookUrl: data.webhookUrl,
        allowWebhook: data.allowWebhook
     })

     await this.whatsappService.init(config);
     await this.repository.save(this.whatsappService);
  }
}