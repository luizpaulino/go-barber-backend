import { parseISO } from 'date-fns';
import { Router } from 'express';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from 'modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', async (request, response) => {
  const appointmentsRepository = new AppointmentsRepository();
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointments = new CreateAppointmentService(
    appointmentsRepository,
  );

  const appointment = await createAppointments.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(appointment);
});

// appointmentsRouter.get('/', async (request, response) => {
//   return response.json(await appointmentsRepository.find());
// });

export default appointmentsRouter;
