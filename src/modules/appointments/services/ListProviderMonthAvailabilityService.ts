/* eslint-disable arrow-parens */
import { getDate, getDaysInMonth } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      {
        provider_id,
        year,
        month,
      },
    );

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      // length of array
      { length: numberOfDaysInMonth },
      // function will receive value and index, and initiate it with index+1
      (_, index) => index + 1,
    );

    // serach through array and find all appointments of specific day
    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(
        appointment => getDate(appointment.date) === day,
      );
      return {
        day,
        available: appointmentsInDay.length < 10,
      };
    });
    return availability;
  }
}

export default ListProviderMonthAvailabilityService;
