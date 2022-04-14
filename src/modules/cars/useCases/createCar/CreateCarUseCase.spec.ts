import { AppError } from "@shared/errors/AppError";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Fusca",
      description: "Carro de luxo",
      daily_rate: 100,
      licence_plate: "ABC1234",
      fine_amount: 10,
      brand: "VW",
      category_id: "categoryID",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with exists license plate", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Fusca",
        description: "Carro de luxo",
        daily_rate: 100,
        licence_plate: "ABC1234",
        fine_amount: 10,
        brand: "VW",
        category_id: "categoryID",
      });
      await createCarUseCase.execute({
        name: "Fusca",
        description: "Carro de luxo",
        daily_rate: 100,
        licence_plate: "ABC1234",
        fine_amount: 10,
        brand: "VW",
        category_id: "categoryID",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a car with available true by deaflut", async () => {
    const car = await createCarUseCase.execute({
      name: "Fusca",
      description: "Carro de luxo",
      daily_rate: 100,
      licence_plate: "ABC1234",
      fine_amount: 10,
      brand: "VW",
      category_id: "categoryID",
    });

    expect(car.available).toBe(true);
  });
});
