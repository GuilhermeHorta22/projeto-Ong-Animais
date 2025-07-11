import { Router } from 'express';
import {
    listarUsuario,
    buscarUsuario,
    criarUsuario,
    deletarUsuario,
    atualizarUsuario
} from '../controllers/UsuarioController.js'

const router = Router();

router.get('/', listarUsuario);
router.get('/:id', buscarUsuario);
router.post('/', criarUsuario);
router.delete('/:id', deletarUsuario);
router.put('/:id', atualizarUsuario);

export default router;