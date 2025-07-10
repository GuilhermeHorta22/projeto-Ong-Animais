import { Request, Response } from 'express';
import { AnimalService } from '../services/AnimalService.js';

const service = new AnimalService();

export const listarAnimal = async (req: Request, res: Response) => {
    const animais = await service.listar();

    if(animais === null)
        return res.status(400).json({error: 'Não tem animais cadastrado!'});

    res.json(animais);
};

export const buscarAnimal = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if(isNaN(id))
        return res.status(400).json({erro: 'ID inválido'});

    const animal = await service.buscar(id);

    if(animal === null)
        return res.status(404).json({error: 'O animal não foi encontrado!'});

    res.json(animal);
};

export const criarAnimal = async (req: Request, res: Response) => {
    const foto_url = req.file?.filename;
    const {nome, especie, raca, idade, porte, descricao, status} = req.body;

    const novoAnimal =  await service.criar({nome, especie, raca, idade, porte, descricao, status, foto_url});
    res.status(201).json(novoAnimal);
};

export const deletarAnimal = async(req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const result = await service.buscar(id);

    if(result != null)
    {
        await service.deletar(id);
        res.sendStatus(204);
    }
    else
        res.status(404).json({error: 'Não existe animal com esse ID!'});
};

export const atualizarAnimal = async(req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const {nome, especie, raca, idade, porte, descricao, status, foto_url} = req.body;

    const result = await service.buscar(id);

    if(result != null)
    {
        const novoAnimal = await service.atualizar(id, {nome, especie, raca, idade, porte, descricao, status, foto_url});
        res.json(novoAnimal);
    }
    else
        res.status(404).json({error: 'Não existe um animal com esse ID!'});
};