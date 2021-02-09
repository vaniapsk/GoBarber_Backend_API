// should only have max:  index, show, create, update, delete
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUsersService from '@modules/users/services/AuthenticateUserService';

interface IUserWithoutPassword {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatar: string;
  created_at: Date;
  updated_at: Date;
}
export default class SessionControler {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateUser = container.resolve(AuthenticateUsersService);

    const { user, token } = await authenticateUser.execute({ email, password });

    const UserWithoutPassword: IUserWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    delete UserWithoutPassword.password;
    return response.json({ UserWithoutPassword, token });
  }
}
