// should only have max:  index, show, create, update, delete
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

interface IUserWithoutPassword {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  avatar: string;
  created_at: Date;
  updated_at: Date;
}
export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    // show profile
    const user_id = request.user.id;
    // eslint-disable-next-line object-curly-newline
    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    delete user.password;

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    // eslint-disable-next-line object-curly-newline
    const { name, email, old_password, password } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      old_password,
      password,
    });
    // So it doesn't return password
    //  delete user.password;

    const userNoPass: IUserWithoutPassword = {
      user_id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    // So it doesn't return password
    delete userNoPass.password;

    return response.json(userNoPass);
  }
}
