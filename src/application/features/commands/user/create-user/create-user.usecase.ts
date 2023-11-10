import { UserRepository } from "../../../../../domain/repositoires/user.repository";
import { User } from "../../../../../domain/entities/user";

export interface CreateUserInputDTO {
  name: string,
  email: string,
  password: string,
  tenantId: string,
  role?: "ADMIN" | "USER",
}

export interface CreateUserOutputDTO {
  id: string,
  name: string,
  email: string,
  password: string,
  tenantId: string,
  role: "ADMIN" | "USER",
}

export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
  ) {
  }

  async execute(data: CreateUserInputDTO): Promise<CreateUserOutputDTO> {
    const userAllreadyExists = await this.userRepository.findByEmail(data.email);
    if (userAllreadyExists) {
      throw new Error('User allready exists');
    }

    const user = new User({
      name: data.name,
      email: data.email,
      password: data.password,
      tenantId: data.tenantId,
      role: data.role,
    });
    await this.userRepository.save(user);

    return user;
  }
}