import { Request, Response } from 'express';
import { AdocaoService } from '../services/AdocaoService.js';
import { isDataView } from 'util/types';
import { AnimalService } from '../services/AnimalService.js';
import { UsuarioService } from '../services/UsuarioService.js';

const service = new AdocaoService();
const animalService = new AnimalService();
const usuarioService = new UsuarioService();

export const listarAdocao = async (req: Request, res: Response) => {
    const adocoes = await service.listar();

    if(adocoes === null)
        return res.status(200).json({message: 'Não tem adoções cadastrada.'});

    const adocaoObjeto = await Promise.all(
        adocoes.map(async (adocao) => {
            const [animal, usuario] = await Promise.all([
                animalService.buscar(adocao.id_animal),
                usuarioService.buscar(adocao.id_usuario)
            ]);

            return {
                id: adocao.id,
                data: adocao.data_adocao,
                animal: {
                    id: animal?.id,
                    nome: animal?.nome,
                    especie: animal?.especie,
                    raca: animal?.raca,
                    idade: animal?.idade,
                    porte: animal?.porte,
                    foto_url: animal?.foto_url
                },
                usuario: {
                    id: usuario?.id,
                    nome: usuario?.nome,
                    cpf: usuario?.cpf,
                    telefone: usuario?.telefone,
                    email: usuario?.email,
                    endereco: usuario?.endereco
                }
            };
        })
    );

    return res.json(adocaoObjeto);
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
    const {id_animal, id_usuario} = req.body;

    if(!id_animal || !id_usuario)
        return res.status(400).json({error: 'Dados obrigatorios faltando.'})

    const data_adocao = new Date();

    const novaAdocao = await service.criar({id_animal, id_usuario, data_adocao});

    await animalService.atualizarStatus(id_animal, "Adotado");
    return res.json(novaAdocao);
}

export const deletarAdocao = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const result = await service.buscar(id);

    if(result !== null)
    {
        await animalService.atualizarStatus(result.id_animal, "Disponível");
        await service.deletar(id);
        return res.sendStatus(204);
    }
    else
        return res.status(404).json({message: 'Não existe uma adoção com esse id.'});
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