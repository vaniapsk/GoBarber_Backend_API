import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentRepository;
let createAppointment: CreateAppointmentService;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2021, 3, 27, 12).getTime());

    const appointment = await createAppointment.execute({
      date: new Date(2021, 3, 27, 13),
      user_id: '123123',
      provider_id: '1231234',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1231234');
  });

  it('should not be able to create two appointments at the same time', async () => {
    const appointmentDate = new Date(2021, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: '123123',
      provider_id: '1234123',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: '123123',
        provider_id: '1234123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment in past date', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2021, 3, 27, 12).getTime());

    await expect(
      createAppointment.execute({
        date: new Date(2021, 3, 27, 11),
        user_id: '123123',
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2021, 3, 27, 12).getTime());

    await expect(
      createAppointment.execute({
        date: new Date(2021, 3, 27, 13),
        user_id: '123123',
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to outside available hours', async () => {
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2021, 3, 27, 12).getTime());

    await expect(
      createAppointment.execute({
        date: new Date(2021, 3, 27, 7),
        user_id: '123123',
        provider_id: '1231234',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2021, 3, 27, 18),
        user_id: '123123',
        provider_id: '1231234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
