import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '../entities/Appointment';

// interface CreateAppointmentDTO {
//   provider: string;
//   date: Date;
// }

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  // Will return Appointment or null
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    // const findAppointment = this.appointments.find(appointment =>
    //   isEqual(date, appointment.date),
    // );

    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    // If appointment is found, return appointment. Else, return null.
    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
