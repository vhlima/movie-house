import { areIntervalsOverlapping } from 'date-fns';

import { Appointment } from '../../../entities/appointment.interface';

interface AppointmentsRepository {
  create(appointment: Appointment): Promise<void>;

  findOverlappingAppointment(
    startsAt: Date,
    endsAt: Date,
  ): Promise<Appointment | null>;
}

export class InMemoryAppointmentsRepository implements AppointmentsRepository {
  public appointments: Appointment[] = [];

  async create(appointment: Appointment): Promise<void> {
    this.appointments.push(appointment);
  }

  async findOverlappingAppointment(
    startsAt: Date,
    endsAt: Date,
  ): Promise<Appointment | null> {
    const overlappingAppointment = this.appointments.find(appointment =>
      areIntervalsOverlapping(
        {
          start: startsAt,
          end: endsAt,
        },
        {
          start: appointment.startsAt,
          end: appointment.endsAt,
        },
        {
          inclusive: true,
        },
      ),
    );

    if (!overlappingAppointment) {
      return null;
    }

    return overlappingAppointment;
  }
}
