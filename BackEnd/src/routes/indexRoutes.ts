import { Router } from 'express';
import animalRoutes from './animalRoutes.js';

const routes = Router();

routes.use('/animais', animalRoutes);

export default routes;