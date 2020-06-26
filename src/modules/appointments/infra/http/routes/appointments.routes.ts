import { parseISO } from 'date-fns';
import { Router } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from 'modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointments = container.resolve(CreateAppointmentService);

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
