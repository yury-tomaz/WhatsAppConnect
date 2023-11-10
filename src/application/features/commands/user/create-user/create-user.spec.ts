import { CreateUserUseCase } from "./create-user.usecase";
import { UserRepositoryImpl } from "../../../../../infrastructure/persistence/repositories/user.repository.impl";
import { faker } from "@faker-js/faker";
import { CreateTenantUseCase } from "../../tenant/create-tenant.usecase";
import { TenantRepositoryImpl } from "../../../../../infrastructure/persistence/repositories/tenant.repository.impl";

describe('Create User', () => {
  let createUser: CreateUserUseCase;
  let userRepository: UserRepositoryImpl;

  let createTenant: CreateTenantUseCase;
  let tenantRepository: TenantRepositoryImpl;

  beforeAll(() => {
    userRepository = new UserRepositoryImpl();
    createUser = new CreateUserUseCase(userRepository);
    tenantRepository = new TenantRepositoryImpl();
    createTenant = new CreateTenantUseCase(tenantRepository, createUser);
  });

  it('should create a user', async () => {
      const {id} = await  createTenant.execute({
        name: faker.company.name(),
        email: faker.internet.email(),
        user: {
          name: faker.person.firstName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        }
      });

      const input = {
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        tenantId: id,
      }

      const user = await createUser.execute(input);

      expect(user).toHaveProperty('id');
  });
});