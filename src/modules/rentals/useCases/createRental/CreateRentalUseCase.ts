import { AppError } from "@shared/errors/AppError";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("DateProvider")
    private dateProvider: IDateProvider,
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute({
    car_id,
    expected_return_date,
    user_id,
  }: IRequest): Promise<Rental> {
    const minimumRentalHour = 24;

    const carAvailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carAvailable) throw new AppError("Car is unavailable");

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (rentalOpenToUser)
      throw new AppError("There's a rental in progress for user!");

    let compare = this.dateProvider.compare(expected_return_date);

    if (compare < minimumRentalHour) throw new AppError("Invalid date");

    return await this.rentalsRepository.create({
      car_id,
      expected_return_date,
      user_id,
    });
  }
}

export { CreateRentalUseCase };
