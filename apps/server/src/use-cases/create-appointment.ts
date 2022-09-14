import { Appointment } from '../entities/appointment.interface';
import { AppointmentsRepository } from '../repositories/tests/appointment-repository';

interface CreateAppointmentProps {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

type CreateAppointmentResponse = Appointment;

export class CreateAppointment {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  async execute({
    customer,
    startsAt,
    endsAt,
  }: CreateAppointmentProps): Promise<CreateAppointmentResponse> {
    const overlappingAppointment =
      await this.appointmentsRepository.findOverlappingAppointment(
        startsAt,
        endsAt,
      );

    if (overlappingAppointment) {
      throw new Error('Another appointment overlaps this appointment dates');
    }

    const appointment = new Appointment({ customer, startsAt, endsAt });

    await this.appointmentsRepository.create(appointment);

    return appointment;
  }
}
