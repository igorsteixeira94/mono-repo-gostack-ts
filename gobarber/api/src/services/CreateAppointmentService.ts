import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}
class CreateAppointmentService {
  private appointmentsRepository: AppointmentRepository;

  constructor(appointmentsRepository: AppointmentRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: Request): Appointment {
    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      date,
    );

    if (findAppointmentInSameDate)
      throw new Error('This appointment is already booked');

    const appointment = this.appointmentsRepository.create({
      provider,
      date,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
