import { Router } from 'express';
import animalRoutes from './animalRoutes.js';
import usuarioRoutes from './UsuarioRoutes.js';
import adocaoRoutes from './AdocaoRoutes.js';
import authRoutes from './AuthRoutes.js';

const routes = Router();

routes.use('/animais', animalRoutes);
routes.use('/usuarios', usuarioRoutes);
routes.use('/adocoes', adocaoRoutes);
routes.use('/auth', authRoutes);

export default routes;