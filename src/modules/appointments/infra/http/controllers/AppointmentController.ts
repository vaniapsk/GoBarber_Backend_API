import { Request, Response } from 'express';
import { parseISO } from 'date-fns';

import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;

    // parse broken hours to 00:00 type. ex: 17:45:21 = 17:00:00
    const parsedDate = parseISO(date);
    const createAppointment = container.resolve(CreateAppointmentService);
    const appointment = await createAppointment.execute({
      provider_id,
      date: parsedDate,
    });

    return response.json(appointment);
  }
}
