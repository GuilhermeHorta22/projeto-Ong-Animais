import { Router } from 'express';
import {
    listarAnimal,
    buscarAnimal,
    criarAnimal,
    deletarAnimal,
    atualizarAnimal
} from '../controllers/AnimalController.js';
import { upload } from '../config/multer.js';
import { verificarToken, permitirTipos } from "../middleware/authMiddleware.js";

const router = Router();

router.get('/', verificarToken, permitirTipos("ADMIN", "ADOTANTE"), listarAnimal);
router.get('/:id', verificarToken, permitirTipos("ADMIN", "ADOTANTE"), buscarAnimal);
router.post('/', verificarToken, permitirTipos("ADMIN"), upload.single('foto'), criarAnimal);
router.delete('/:id', verificarToken, permitirTipos("ADMIN"), deletarAnimal);
router.put('/:id', verificarToken, permitirTipos("ADMIN"), atualizarAnimal);

export default router;