import { Request, Response } from 'express';
import { AnimalService } from '../services/AnimalService.js';

const service = new AnimalService();

export const listarAnimal = async (req: Request, res: Response) => {
    const animais = await service.listar();

    if(animais === null)
        return res.status(200).json({message: 'Não tem animais cadastrado!'});

    return res.json(animais);
};

export const buscarAnimal = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if(isNaN(id))
        return res.status(400).json({erro: 'ID inválido'});

    const animal = await service.buscar(id);

    if(animal === null)
        return res.status(200).json({message: 'O animal não foi encontrado!'});

    return res.json(animal);
};

export const criarAnimal = async (req: Request, res: Response) => {
    const foto_url = req.file?.filename;
    const {nome, especie, raca, idade, porte, descricao, status} = req.body;

    if(!nome || !especie || !porte || !status)
        return res.status(400).json({error: 'Dados obigatorio faltando'});

    const novoAnimal =  await service.criar({nome, especie, raca, idade, porte, descricao, status, foto_url});
    return res.status(201).json(novoAnimal);
};

export const deletarAnimal = async(req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const result = await service.buscar(id);

    if(result != null)
    {
        await service.deletar(id);
        return res.sendStatus(204);
    }
    else
        return res.status(200).json({message: 'Não existe animal com esse ID!'});
};

export const atualizarAnimal = async(req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const {nome, especie, raca, idade, porte, descricao, status, foto_url} = req.body;
    const idadeNumero = parseInt(idade);

    const result = await service.buscar(id);

    if(result != null)
    {
        if(!nome || !especie || !raca || isNaN(idadeNumero) || !porte || !descricao || !status)
            return res.status(400).json({error: 'Dados obrigatório faltando.'});
            
        const novoAnimal = await service.atualizar(id, {nome, especie, raca, idade: idadeNumero, porte, descricao, status, foto_url});
        return  res.json(novoAnimal);
    }
    else
        return res.status(200).json({message: 'Animal com id: '+ id +' não foi encontrado.'});
};