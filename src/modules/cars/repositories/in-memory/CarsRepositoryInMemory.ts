import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async udpateAvailable(id: string, available: boolean): Promise<Car> {
    const index = this.cars.findIndex((car) => car.id === id);
    this.cars[index].available = available;
    return this.cars[index];
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, { ...data });

    this.cars.push(car);

    return car;
  }

  async findByLicencePlate(licencePlate: string): Promise<Car> {
    return this.cars.find((car) => car.licence_plate === licencePlate);
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    return this.cars.filter((car) => {
      if (
        car.available === true ||
        (brand && car.brand === brand) ||
        (name && car.name === name) ||
        (category_id && car.category_id === category_id)
      ) {
        return car;
      }
      return null;
    });
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }
}

export { CarsRepositoryInMemory };
