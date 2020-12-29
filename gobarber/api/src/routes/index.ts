import { Router } from 'express';
import appointmentsRoute from './appointments.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/appointments', appointmentsRoute);
routes.use('/users', usersRouter);

export default routes;
