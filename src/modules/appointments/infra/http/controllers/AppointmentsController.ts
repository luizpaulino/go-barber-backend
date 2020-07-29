import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import { parseISO } from 'date-fns';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;
    const user_id = request.user.id;

    console.log(date);

    // const parsedDate = parseISO(date);
    // TODO Avaliar esse parseISO
    const parsedDate = date;
    console.log(parsedDate);

    const createAppointments = container.resolve(CreateAppointmentService);

    const appointment = await createAppointments.execute({
      user_id,
      provider_id,
      date: parsedDate,
    });

    return response.json(appointment);
  }
}
