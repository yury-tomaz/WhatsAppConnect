import { CreateTenantUseCase } from "./create-tenant.usecase";
import { TenantRepositoryImpl } from "../../../../infrastructure/persistence/repositories/tenant.repository.impl";
import { CreateUserUseCase } from "../user/create-user/create-user.usecase";
import { faker } from "@faker-js/faker";

describe('Create Tenant', () => {
  let createTenant: CreateTenantUseCase;
  let createUser: CreateUserUseCase;
  let tenantRepository: TenantRepositoryImpl;

  beforeAll(() => {
    tenantRepository = new TenantRepositoryImpl();
    createUser = new CreateUserUseCase(tenantRepository);
    createTenant = new CreateTenantUseCase(tenantRepository, createUser);
  });

  it('should create a tenant', async () => {
    const input = {
      name: faker.company.name(),
      email: faker.internet.email(),
      user: {
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      }
    }

    const output = await createTenant.execute(input);
    expect(output).toHaveProperty('id');
  });
});

