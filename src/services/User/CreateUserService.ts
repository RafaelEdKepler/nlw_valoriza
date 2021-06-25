import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../../repositories/UserRepositories";
import { hash } from "bcryptjs";

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}

class CreateUserService {
  async execute({name, email, admin = false, password} : IUserRequest) {
    const userRepositories = getCustomRepository(UserRepositories);

    await this.validateInfo(name, email, password, userRepositories);

    const passwordHash = await this.encryptPassword(password);

    const user = userRepositories.create({
      name, 
      email, 
      password: passwordHash,
      admin
    })

    await userRepositories.save(user);

    return user;
  }

  async validateInfo(name: string, email: string, password: string, userRepositories: UserRepositories) {
    if (!email) {
      throw new Error("Email was not informed");
    }

    if (!name) {
      throw new Error("Name was not informed");
    }

    if (!password) {
      throw new Error("Password was not informed");
    }

    const userAlreadyExists = await userRepositories.findOne({
      email
    })

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }
  }

  async encryptPassword(password: string) {
    return await hash(password, 8);
  }
}

export { CreateUserService };