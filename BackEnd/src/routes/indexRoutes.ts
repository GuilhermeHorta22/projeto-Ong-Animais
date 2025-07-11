import { Router } from 'express';
import animalRoutes from './animalRoutes.js';
import usuarioRoutes from './UsuarioRoutes.js';

const routes = Router();

routes.use('/animais', animalRoutes);
routes.use('/usuarios', usuarioRoutes);

export default routes;