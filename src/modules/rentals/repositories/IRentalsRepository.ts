import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  create({
    expected_return_date,
    car_id,
    user_id,
  }: ICreateRentalDTO): Promise<Rental>;
}

export { IRentalsRepository };
