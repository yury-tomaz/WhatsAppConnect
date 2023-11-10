import { Tenant } from "../entities/tenant";

export  interface TenantRepository{
  save(tenant: Tenant): Promise<void>;
  findByEmail(email: string): Promise<Tenant | undefined>;
  delete(id: string): Promise<void>;
  update(tenant: Tenant): Promise<void>;
}