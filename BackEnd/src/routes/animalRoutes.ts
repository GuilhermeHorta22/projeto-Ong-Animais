import { Router } from 'express';
import {
    listarAnimal,
    buscarAnimal,
    criarAnimal,
    deletarAnimal,
    atualizarAnimal
} from '../controllers/AnimalController.js';

const router = Router();

router.get('/', listarAnimal);
router.get('/:id', buscarAnimal);
router.post('/', criarAnimal);
router.delete('/:id', deletarAnimal);
router.put('/:id', atualizarAnimal);

export default router;