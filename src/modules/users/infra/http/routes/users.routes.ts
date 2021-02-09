import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UserController from '../controllers/UserController';
import UserAvatarController from '../controllers/UserAvatarController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const userController = new UserController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);
// const appointmentsRepositry = new AppointmentsRepository();

usersRouter.post('/', userController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
