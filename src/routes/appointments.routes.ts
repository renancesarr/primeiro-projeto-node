/* eslint-disable no-shadow */
import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appointmentsRouter = Router();

interface Appointment {
  id: string;
  provider: string;
  date: Date;
}

const appointments: Appointment[] = [];

appointmentsRouter.get('/', (request, response) => {
  response.json({
    mensage: 'hello world',
  });
});

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parseDate = startOfHour(parseISO(date));

  const findAppointmentsInSamDate = appointments.find(appointment =>
    isEqual(parseDate, appointment),
  );

  if (findAppointmentsInSamDate) {
    return response.status(400).json({
      mensage: 'This appointments is already booked',
    });
  }

  const appointment = {
    id: uuid(),
    provider,
    date: parseDate,
  };

  appointments.push(appointment);

  response.json({
    appointment,
  });
});

export default appointmentsRouter;
