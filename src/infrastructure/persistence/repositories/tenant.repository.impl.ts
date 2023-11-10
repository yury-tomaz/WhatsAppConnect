import { TenantRepository } from "../../../domain/repositoires/tenant.repository";

export class TenantRepositoryImpl implements TenantRepository {
  private _tenants: any[] = [];

  async save(tenant: any): Promise<void> {
    this._tenants.push(tenant);
  }

  async delete(id: string): Promise<void> {
    this._tenants = this._tenants.filter(tenant => tenant.id !== id);
  }

  async update(tenant: any): Promise<void> {
    const index = this._tenants.findIndex(t => t.id === tenant.id);

    if (index === -1) {
      throw new Error('Tenant not found');
    }

    this._tenants[index] = tenant;
  }

  async findByEmail(email: string): Promise<any | undefined> {
    return this._tenants.find(tenant => tenant.email === email);
  }
}