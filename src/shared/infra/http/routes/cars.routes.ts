import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";

import { ensureAuthenticate } from "@shared/infra/http/middlewares/ensureAnthenticate";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { UploadCarImagesController } from "@modules/cars/useCases/UploadCarImages/UploadCarImagesController";

const carsRoutes = Router();

let createCarController = new CreateCarController();
let listAvailableCarsController = new ListAvailableCarsController();
let createCarSpecificationController = new CreateCarSpecificationController();
let uploadCarImagesController = new UploadCarImagesController();

const uploadCar = multer(uploadConfig.upload("./tmp/car"));

carsRoutes.post(
  "/",
  ensureAuthenticate,
  ensureAdmin,
  createCarController.handle
);
carsRoutes.get("/available", listAvailableCarsController.handle);
carsRoutes.post(
  "/specifications/:id",
  ensureAuthenticate,
  ensureAdmin,
  createCarSpecificationController.handle
);
carsRoutes.post(
  "/images/:id",
  ensureAuthenticate,
  ensureAdmin,
  uploadCar.array("images"),
  uploadCarImagesController.handle
);

export { carsRoutes };
