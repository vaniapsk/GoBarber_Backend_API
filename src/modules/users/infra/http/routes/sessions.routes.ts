import { Router } from 'express';

import SessionControler from '../controllers/SessionsControler';

const sessionsRouter = Router();
const sessionController = new SessionControler();

sessionsRouter.post('/', sessionController.create);

export default sessionsRouter;
