import { Router } from 'express';
import animalRoutes from './AnimalRoutes.js';

const routes = Router();

routes.use('/animais', animalRoutes);

export default routes;