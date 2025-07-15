import { Router } from 'express';
import {
    listarAdocao,
    buscarAdocao,
    criarAdocao,
    deletarAdocao,
    atualizarAdocao
} from '../controllers/AdocaoController.js';

const router = Router();

router.get('/', listarAdocao);
router.get('/:id', buscarAdocao);
router.post('/', criarAdocao);
router.delete('/:id', deletarAdocao);
router.put('/:id', atualizarAdocao);

export default router;