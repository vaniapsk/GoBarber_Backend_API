/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable arrow-parens */
import { getRepository, Repository, Raw } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import IFindAllInMonthInProviderDTO from '@modules/appointments/dtos/IFindAllInMonthInProviderDTO copy';
import IFindAllInDayInProviderDTO from '@modules/appointments/dtos/IFindAllInDayInProviderDTO';
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

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthInProviderDTO): Promise<Appointment[]> {
    // this will make months like 1, 2, 3.. become  01, 02, 03..
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }

  public async findAllInDayFromProvider({
    provider_id,
    month,
    year,
    day,
  }: IFindAllInDayInProviderDTO): Promise<Appointment[]> {
    // this will make months like 1, 2, 3.. become  01, 02, 03..
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      provider_id,
      date,
      user_id,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
