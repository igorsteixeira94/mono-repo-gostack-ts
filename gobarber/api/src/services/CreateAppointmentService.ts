import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider_id: string;
  date: Date;
}
class CreateAppointmentService {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentRepository);
    const findAppointmentInSameDate = await appointmentRepository.findByDate(
      date,
    );

    if (findAppointmentInSameDate)
      throw new Error('This appointment is already booked');

    const appointment = appointmentRepository.create({
      provider_id,
      date,
    });

    await appointmentRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
