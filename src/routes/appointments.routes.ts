/* eslint-disable no-shadow */
import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();
  response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parseDate = startOfHour(parseISO(date));

  const findAppointmentsInSamDate = appointmentsRepository.findBtDate(
    parseDate,
  );

  if (findAppointmentsInSamDate) {
    return response.status(400).json({
      mensage: 'This appointments is already booked',
    });
  }

  const appointment = appointmentsRepository.create(provider, parseDate);

  response.json({
    appointment,
  });
});

export default appointmentsRouter;
