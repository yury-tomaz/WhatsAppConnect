import { UserRepository } from "../../../domain/repositoires/user.repository";

export class UserRepositoryImpl implements UserRepository {
  private _users: any[] = [];

  async save(user: any): Promise<void> {
    this._users.push(user);
  }

  async delete(id: string): Promise<void> {
    this._users = this._users.filter(user => user.id !== id);
  }

  async update(user: any): Promise<void> {
    const index = this._users.findIndex(u => u.id === user.id);

    if (index === -1) {
      throw new Error('User not found');
    }

    this._users[index] = user;
  }

  async findByEmail(email: string): Promise<any | undefined> {
    return this._users.find(user => user.email === email);
  }
}