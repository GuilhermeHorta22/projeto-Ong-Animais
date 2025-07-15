import { Router } from 'express';
import animalRoutes from './animalRoutes.js';
import usuarioRoutes from './UsuarioRoutes.js';
import adocaoRoutes from './AdocaoRoutes.js';

const routes = Router();

routes.use('/animais', animalRoutes);
routes.use('/usuarios', usuarioRoutes);
routes.use('/adocoes', adocaoRoutes);

export default routes;