import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

interface ICreateSpeficationDTO{
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({name, description}: ICreateSpeficationDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
}

export { ISpecificationsRepository, ICreateSpeficationDTO };