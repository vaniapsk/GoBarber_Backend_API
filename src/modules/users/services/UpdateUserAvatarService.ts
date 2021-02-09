import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

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
  ) {}

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatars', 401);
    }

    if (user.avatar) {
      // If avatar already exists, delete it. Find old file path so it can be deleted
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      // Chaeck if filePath exists
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      // if photo exists, remove it
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
