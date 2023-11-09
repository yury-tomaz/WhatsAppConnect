import { v4 as uuid } from 'uuid';

interface ITenant {
  id?: string;
  name: string;
  email: string;
}

export class Tenant {
  public readonly id: string;
  public name: string;
  public email: string;

  constructor(props: ITenant) {
    if( !props.name || !props.email ) {
      throw new Error('Invalid params');
    }

    Object.assign(this, props);
    this.id = this.id || uuid();
  }
}