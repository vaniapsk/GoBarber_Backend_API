/* eslint-disable arrow-parens */
/* eslint-disable prettier/prettier */
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import {
  getMonth, getYear, getDate, isEqual,
} from 'date-fns';

import { uuid } from 'uuidv4';
import IFindAllInMonthInProviderDTO from '@modules/appointments/dtos/IFindAllInMonthInProviderDTO copy';
import IFindAllInDayInProviderDTO from '@modules/appointments/dtos/IFindAllInDayInProviderDTO';
import Appointment from '../../infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date, provider_id: string): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      // eslint-disable-next-line arrow-parens
      appointment => isEqual(appointment.date, date)
      && appointment.provider_id === provider_id,
    );

    return findAppointment;
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthInProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment => appointment.provider_id === provider_id
        && getMonth(appointment.date) + 1 === month
        && getYear(appointment.date) === year,
    );

    return appointments;
  }

  public async findAllInDayFromProvider({
    provider_id,
    month,
    year,
    day,
  }: IFindAllInDayInProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment => appointment.provider_id === provider_id
        && getDate(appointment.date) === day
        && getMonth(appointment.date) + 1 === month
        && getYear(appointment.date) === year,
    );

    return appointments;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, {
      id: uuid(), date, provider_id, user_id,
    });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
