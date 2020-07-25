import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileSevice from '@modules/users/services/UpdateProfileService';
import ShowProfileSevice from '@modules/users/services/ShowProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileSevice);

    const user = await showProfile.execute({ user_id });

    return response.json(user);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, old_password, password } = request.body;

    const updateProfile = container.resolve(UpdateProfileSevice);

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      old_password,
      password,
    });

    delete user.password;

    return response.json(user);
  }
}
