import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../../repositories/UserRepositories";

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
}

class CreateUserService {
  async execute({name, email, admin} : IUserRequest) {
    const userRepositories = getCustomRepository(UserRepositories);

    await this.validateInfo(name, email, userRepositories);

    const user = userRepositories.create({
      name, 
      email, 
      admin
    })

    await userRepositories.save(user);

    return user;
  }

  async validateInfo(name: string, email: string, userRepositories: UserRepositories) {
    if (!email) {
      throw new Error("Email was not informed");
    }

    if (!name) {
      throw new Error("Name was not informed");
    }

    const userAlreadyExists = await userRepositories.findOne({
      email
    })

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }
  }
}

export { CreateUserService };