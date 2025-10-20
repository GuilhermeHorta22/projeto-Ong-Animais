import { Router } from 'express';
import {
    listarAdocao,
    buscarAdocao,
    criarAdocao,
    deletarAdocao,
    atualizarAdocao
} from '../controllers/AdocaoController.js';
import { verificarToken, permitirTipos } from "../middleware/authMiddleware.js";

const router = Router();

router.get('/', verificarToken, permitirTipos("ADMIN", "ADOTANTE"), listarAdocao);
router.get('/:id', verificarToken, permitirTipos("ADMIN", "ADOTANTE"), buscarAdocao);
router.post('/', verificarToken, permitirTipos("ADMIN"), criarAdocao);
router.delete('/:id', verificarToken, permitirTipos("ADMIN"), deletarAdocao);
router.put('/:id', verificarToken, permitirTipos("ADMIN"), atualizarAdocao);

export default router;