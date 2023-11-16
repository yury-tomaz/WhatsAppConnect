import { v4 as uuid } from 'uuid';

interface InstanceProps {
  key?: string,
  tenantId: string,
  webhookUrl: string,
  allowWebhook: boolean,
}

export class WhatsappInstanceConfig {
  public readonly key: string;
  public webhookUrl: string;
  public allowWebhook: boolean;

  constructor(props: InstanceProps) {
    if(!this.validateUrl(props.webhookUrl) ) throw new Error('Invalid url');
    this.key = `${props.tenantId}-${props.key || uuid()}`
    this.webhookUrl = props.webhookUrl;
    this.allowWebhook = props.allowWebhook;
  }

  private validateUrl = (url: string) => {
    const regex = new RegExp(/^(http|https):\/\/[^ "]+$/);
    return regex.test(url);
  }
}