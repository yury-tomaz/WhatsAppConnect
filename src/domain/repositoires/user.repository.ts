import { User } from "../entities/user";

export interface  UserRepository{
  save(user: User): Promise<void>;
  delete(id: string): Promise<void>;
  update(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | undefined>;
}