// should only have max:  index, show, create, update, delete
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUSerAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { classToClass } from 'class-transformer';

export default class UserAvatar {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvat = container.resolve(UpdateUSerAvatarService);

    const user = await updateUserAvat.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    // delete user.password;
    return response.json(classToClass(user));
  }
}
