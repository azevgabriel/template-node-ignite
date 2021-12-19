import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IUserRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUserRepository {
  
  users: User[] = [];
  
  async create({driver_license, email, password, name}: ICreateUserDTO): Promise<void> {
    const user = new User();
    Object.assign(user, {driver_license, email, password, name});
    this.users.push(user);
  }
  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email);
  }
  async findById(id: string): Promise<User> {
    return this.users.find(user => user.id === id);
  }

}

export { UsersRepositoryInMemory };