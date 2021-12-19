import { inject, injectable } from "tsyringe";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import { IUserRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUserRepository
  ){}

  async execute ({email, password}: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if(!user){
      throw new AppError("Email or Password incorrect!")
    }

    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch){
      throw new AppError("Email or Password incorrect!")
    }

    const token = sign({}, "c60e331dcc3123890d44aa7138c38a71", {
      subject: user.id,
      expiresIn: "1d"
    })

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      }
    }

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase }