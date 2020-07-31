import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import { parseISO } from 'date-fns';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;
    const user_id = request.user.id;

    const createAppointments = container.resolve(CreateAppointmentService);

    const appointment = await createAppointments.execute({
      user_id,
      provider_id,
      date,
    });

    return response.json(appointment);
  }
}
