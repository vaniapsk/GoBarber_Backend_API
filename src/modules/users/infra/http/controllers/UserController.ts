// should only have max:  index, show, create, update, delete
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';

interface IUserWithoutPassword {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatar: string;
  created_at: Date;
  updated_at: Date;
}
export default class UserControler {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
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

    return response.json(userNoPass);
  }
}
