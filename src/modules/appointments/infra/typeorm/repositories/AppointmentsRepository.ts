import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepositoy from '@modules/appointments/repositories/IAppointmentsRepository';
import IAppointmentCreateDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class AppointmentsRepositoy implements IAppointmentsRepositoy {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment || undefined;
  }

  public async create({
    provider_id,
    date,
  }: IAppointmentCreateDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      provider_id,
      date,
    });

    await this.ormRepository.save(appointment);
    return appointment;
  }
}

export default AppointmentsRepositoy;
