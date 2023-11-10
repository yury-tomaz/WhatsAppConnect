import { Tenant } from "../../../../domain/entities/tenant";
import { CreateUserOutputDTO, CreateUserUseCase } from "../user/create-user/create-user.usecase";
import { TenantRepository } from "../../../../domain/repositoires/tenant.repository";

export interface CreateTenantInputDTO {
  name: string;
  email: string;
  user: {
    name: string;
    email: string;
    password: string;
  };
}

interface CreateTenantOutputDTO {
  id: string;
  name: string;
  email: string;
  user: CreateUserOutputDTO;
}

export class CreateTenantUseCase {
  constructor(
    private tenantRepository: TenantRepository,
    private createUser: CreateUserUseCase,
  ) {
  }

  async execute(data: CreateTenantInputDTO): Promise<CreateTenantOutputDTO> {
    const tenantAllreadyExists = await this.tenantRepository.findByEmail(data.email);

    if (tenantAllreadyExists) {
      throw new Error('Tenant allready exists');
    }

    const tenant = new Tenant({
      name: data.name,
      email: data.email,
    });

    await this.tenantRepository.save(tenant);

    const user = await this.createUser.execute({
      name: data.user.name,
      email: data.user.email,
      password: data.user.password,
      tenantId: tenant.id,
      role: "ADMIN",
    });

    return {
      id: tenant.id,
      name: tenant.name,
      email: tenant.email,
      user
    };
  }
}