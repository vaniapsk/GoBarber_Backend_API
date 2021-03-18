import { container } from 'tsyringe';
import '@modules/users/providers';
import './providers';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
// import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

container.registerSingleton<IAppointmentRepository>(
  'AppointmentRepository', // id of repository
  AppointmentRepository,
);

container.registerSingleton<IUserRepository>(
  'UserRepository', // id of repository
  UserRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository', // id of repository
  UserTokensRepository,
);
