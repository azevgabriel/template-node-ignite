import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Repository, getRepository } from "typeorm";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {

  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    description,
    daily_rate,
    licence_plate,
    fine_amount,
    brand,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      licence_plate,
      fine_amount,
      brand,
    });
    await this.repository.save(car);
    return car;
  }
  async findByLicencePlate(licence_plate: string): Promise<Car> {
    return await this.repository.findOne({licence_plate});
  }
}

export { CarsRepository };