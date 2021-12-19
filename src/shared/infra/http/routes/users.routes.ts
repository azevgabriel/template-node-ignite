import { Router } from 'express';
import multer from 'multer';
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUsarAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import uploadConfig from '@config/upload';
import { ensureAuthenticate } from '@shared/infra/http/middlewares/ensureAnthenticate';

const usersRouter = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"))

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUsarAvatarController();

usersRouter.post("/", createUserController.handle);
usersRouter.patch("/avatar", ensureAuthenticate, uploadAvatar.single("avatar"), updateUserAvatarController.handle)

export { usersRouter };