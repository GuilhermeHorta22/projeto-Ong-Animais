import { Request, Response } from 'express';
import { AdocaoService } from '../services/AdocaoService.js';
import { isDataView } from 'util/types';

const service = new AdocaoService();

export const listarAdocao = async (req: Request, res: Response) => {
    const adocoes = await service.listar();

    if(adocoes === null)
        return res.status(200).json({message: 'Não tem adoções cadastrada.'});

    return res.json(adocoes);
}

export const buscarAdocao = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if(isNaN(id))
        return res.status(400).json({error: 'ID inválido.'});

    const adocao = await service.buscar(id);

    if(adocao === null)
        return res.status(404).json({message: 'Não existe essa adoção.'});
    return res.json(adocao);
}

export const criarAdocao = async (req: Request, res: Response) => {
    const {id_animal, id_usuario, data_adocao} = req.body;

    if(!id_animal || !id_usuario)
        return res.status(400).json({error: 'Dados obrigatorios faltando.'})

    const novaAdocao = await service.criar({id_animal, id_usuario, data_adocao});
    return res.json(novaAdocao);
}

export const deletarAdocao = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const result = await service.buscar(id);

    if(result !== null)
    {
        await service.deletar(id);
        return res.status(204);
    }
    else
        return res.status(400).json({error: 'Não existe uma adoção com esse id.'});
}

export const atualizarAdocao = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const {id_animal, id_usuario, data_adocao} = req.body;

    const result = await service.buscar(id);
    if(result !== null)
    {
        if(!id_animal || !id_usuario)
            return res.status(400).json({error: 'Dados obrigatorios faltando.'});

        const novaAdocao = await service.alterar(id, {id_animal, id_usuario, data_adocao});
        return res.json(novaAdocao);
    }
    else
        return res.status(404).json({error: 'Adocao com id: '+ id +' Não foi encontrado.'});
}