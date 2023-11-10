import { v4 as uuid } from 'uuid';

interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  tenantId: string;
  role: "ADMIN" | "USER" | undefined;
}

export class User{
  public  readonly id: string;
  public  tenantId: string;
  public name: string;
  public email: string;
  public password: string;
  public role: "ADMIN" | "USER" = "USER";

  constructor(props: IUser) {
    if(props.role && props.role !== "ADMIN" && props.role !== "USER" ) {
      throw new Error('Invalid role');
    }

    if( !props.name || !props.email || !props.password ) {
      throw new Error('Invalid params');
    }

    Object.assign(this, props);
    this.id = this.id || uuid();
  }
}