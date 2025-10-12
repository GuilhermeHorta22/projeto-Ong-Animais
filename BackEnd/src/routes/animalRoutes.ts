import { Router } from 'express';
import {
    listarAnimal,
    buscarAnimal,
    criarAnimal,
    deletarAnimal,
    atualizarAnimal
} from '../controllers/animalController.js';
import { upload } from '../config/multer.js'

const router = Router();

router.get('/', listarAnimal);
router.get('/:id', buscarAnimal);
router.post('/', upload.single('foto'), criarAnimal);
router.delete('/:id', deletarAnimal);
router.put('/:id', atualizarAnimal);

export default router;