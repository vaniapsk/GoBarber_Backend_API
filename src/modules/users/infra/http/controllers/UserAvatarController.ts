// should only have max:  index, show, create, update, delete
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUSerAvatarService from '@modules/users/services/UpdateUserAvatarService';

interface IUserWithoutPassword {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatar: string;
  created_at: Date;
  updated_at: Date;
}

export default class UserAvatar {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvat = container.resolve(UpdateUSerAvatarService);

    const user = await updateUserAvat.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    const userNoPass: IUserWithoutPassword = {
      id: user.id,

      name: user.name,
      email: user.email,
      password: user.password,
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    // So it doesn't return password
    delete userNoPass.password;

    // delete user.password;
    return response.json({ userNoPass });
  }
}
