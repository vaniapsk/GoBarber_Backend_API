import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentController from '../controllers/AppointmentController';

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();
// Duties of routes: Receive requisitions; Call another file; give answer back

appointmentsRouter.use(ensureAuthenticated);
appointmentsRouter.post('/', appointmentController.create);

export default appointmentsRouter;
