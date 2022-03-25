import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";
import { AppError } from "@shared/errors/AppError";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {
  carsRepositoryInMemory = new CarsRepositoryInMemory();
  specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
  createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
    carsRepositoryInMemory,
    specificationsRepositoryInMemory
  );

  it("should not be able to add a new specification to a now-existent car", () => {
    expect(async () => {
      const car_id = "1234";
      const specifications_id = ["123", "1235"];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car description",
      daily_rate: 100,
      licence_plate: "ABD1572",
      fine_amount: 20,
      brand: "Car_brand",
      category_id: "category_id",
    });

    const specification = await specificationsRepositoryInMemory.create({
      description: "Car specification",
      name: "Car specification",
    });

    const specifications_id = [specification.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });
});
