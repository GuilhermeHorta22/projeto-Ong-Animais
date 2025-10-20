import { Router } from 'express';
import {
    listarUsuario,
    buscarUsuario,
    criarUsuario,
    deletarUsuario,
    atualizarUsuario
} from '../controllers/UsuarioController.js';
import { verificarToken, permitirTipos } from "../middleware/authMiddleware.js";

const router = Router();

router.get('/', verificarToken, permitirTipos("ADMIN"), listarUsuario);
router.get('/:id',verificarToken, permitirTipos("ADMIN", "ADOTANTE"), buscarUsuario);
router.post('/', verificarToken, permitirTipos("ADMIN"), criarUsuario);
router.delete('/:id', verificarToken, permitirTipos("ADMIN"), deletarUsuario);
router.put('/:id', verificarToken, permitirTipos("ADMIN"), atualizarUsuario);

export default router;