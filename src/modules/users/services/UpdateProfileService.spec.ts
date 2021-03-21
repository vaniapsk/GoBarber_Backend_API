import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });
  it('should be able to update the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
    });
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Lala',
      email: 'johnlala@gmail.com',
    });

    expect(updatedUser.name).toBe('John Lala');
    expect(updatedUser.email).toBe('johnlala@gmail.com');
  });

  it('should not be able to update email to an existing email', async () => {
    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
    });
    const user = await fakeUserRepository.create({
      name: 'Test Doe',
      email: 'test@gmail.com',
      password: '123456',
    });
    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Test Lala',
        email: 'john@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
    });
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Lala',
      email: 'johnlala@gmail.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
    });
    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Lala',
        email: 'johnlala@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Lala',
        email: 'johnlala@gmail.com',
        old_password: '123123',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update profile of non existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-userId',
        name: 'Test Name',
        email: 'test@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
