import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatars', 401);
    }

    if (user.avatar) {
      // If avatar already exists, delete it then save the new one
      await this.storageProvider.deleteFile(user.avatar);
    }

    // try {
    //   await this.storageProvider.saveFile(avatarFileName);
    // } catch (e) {
    //   // eslint-disable-next-line no-console
    //   console.log(e);
    // }
    const filename = await this.storageProvider.saveFile(avatarFileName);

    user.avatar = filename;

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
