import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Repository, getRepository } from "typeorm";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async udpateAvailable(id: string, available: boolean): Promise<Car> {
    const car = await this.repository.findOne(id);
    car.available = available;
    await this.repository.save(car);
    return car;
  }

  async create({
    name,
    description,
    daily_rate,
    licence_plate,
    fine_amount,
    brand,
    specifications,
    category_id,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      licence_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
      id,
    });
    await this.repository.save(car);
    return car;
  }

  async findByLicencePlate(licence_plate: string): Promise<Car> {
    return await this.repository.findOne({ licence_plate });
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder("c")
      .where("c.available = :available", { available: true });

    if (brand) {
      carsQuery.andWhere("c.brand = :brand", { brand });
    }

    if (category_id) {
      carsQuery.andWhere("c.category_id = :category_id", { category_id });
    }

    if (name) {
      carsQuery.andWhere("c.name = :name", { name });
    }

    return await carsQuery.getMany();
  }

  findById(id: string): Promise<Car> {
    const car = this.repository.findOne(id);
    return car;
  }
}

export { CarsRepository };
