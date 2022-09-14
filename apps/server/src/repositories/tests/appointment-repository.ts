import { Appointment } from '../../entities/appointment.interface';

export interface AppointmentsRepository {
  create(appointment: Appointment): Promise<void>;

  findOverlappingAppointment(
    startsAt: Date,
    endsAt: Date,
  ): Promise<Appointment | null>;
}
