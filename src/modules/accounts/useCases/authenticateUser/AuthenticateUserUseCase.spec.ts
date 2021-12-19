import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in_memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUserCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
 beforeEach(() => {
  usersRepositoryInMemory = new UsersRepositoryInMemory();
  authenticateUserUserCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
  createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
 })
 
  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "000123",
      email: "user@test.com",
      password: "1234",
      name: "User Test"
    };
    
    await createUserUseCase.execute(user);

    const result = await authenticateUserUserCase.execute({
      email: user.email,
      password: user.password
    });

    expect(result).toHaveProperty("token");
  });


  it("should not be able to authenticate an nonexistent user", () => {

    expect(async () => {
      
      await authenticateUserUserCase.execute({
        email: "false@email.com",
        password: "1234"
      });

    }).rejects.toBeInstanceOf(AppError);

  });


  it("should not be able to autheticate with incorrect password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "998946",
        email: "user@user.com",
        password: "1346",
        name: "User Test Error"
      }

      await createUserUseCase.execute(user);

      await authenticateUserUserCase.execute({
        email: "user@user.com",
        password: "3541646"
      })
    }).rejects.toBeInstanceOf(AppError);
  })
});