import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UserRepositories } from "../../repositories/UserRepositories";
import { User } from "../../entities/User";


interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({email, password} : IAuthenticateRequest) {
    const userRepositories = getCustomRepository(UserRepositories);

    await this.validateUserInfo(email, password);
    const user = await this.validateEmail(email, userRepositories);
    await this.validatePassword(password, user);
    
    return this.generateJWT(user);
  }

  async validateUserInfo(email: string, password: string) {
    if (!email) {
      throw new Error("E-mail was not informed");
    }

    if (!password) {
      throw new Error("Password was not informed");
    }
  }

  async validateEmail(email: string, userRepositories: UserRepositories) {
    const user = await userRepositories.findOne({
      email
    });

    if (!user) {
      throw new Error("E-mail/Password incorrect");
    }

    return user;
  }

  async validatePassword(password: string, user: User) {
    const correctPassword = await compare(password, user.password);
    if (!correctPassword) {
      throw new Error("E-mail/Password incorrect");
    }
  }

  async generateJWT(user: User) {
    return sign({
      email: user.email
    }, "208784feb4163b36d766e7cbf8e42206", {
      subject: user.id,
      expiresIn: "1d"
    })
  }
}

export { AuthenticateUserService };