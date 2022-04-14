import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";
import dayjs from "dayjs";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let tomorrow: Date;

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      dayjsDateProvider,
      rentalsRepositoryInMemory
    );
    tomorrow = dayjs().add(1, "day").toDate();
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "123456",
      car_id: "123456",
      expected_return_date: tomorrow,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open to same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123456",
        car_id: "123456",
        expected_return_date: tomorrow,
      });

      await createRentalUseCase.execute({
        user_id: "123456",
        car_id: "1234567",
        expected_return_date: tomorrow,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there is another open to same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "19823456",
        car_id: "123456",
        expected_return_date: tomorrow,
      });

      await createRentalUseCase.execute({
        user_id: "123456",
        car_id: "123456",
        expected_return_date: tomorrow,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "w4w64w",
        car_id: "d4d46d4",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
