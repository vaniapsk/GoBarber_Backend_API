import { Router } from 'express';
import { Segments, celebrate, Joi } from 'celebrate';

import SessionControler from '../controllers/SessionsControler';

const sessionsRouter = Router();
const sessionController = new SessionControler();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.create,
);

export default sessionsRouter;
