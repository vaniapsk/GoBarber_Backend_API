import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentRepository,
    );
  });
  it('should be able to list day availability from provider', async () => {
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      user_id: '123123',
      date: new Date(2021, 2, 28, 14, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      user_id: '123123',
      date: new Date(2021, 2, 28, 15, 0, 0),
    });

    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2021, 2, 28, 11).getTime());

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      year: 2021,
      month: 3,
      day: 28,
    });

    await expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    );
  });
});
// src/modules/appointments/services/ListProviderDayAvailabilityService.spec.ts
