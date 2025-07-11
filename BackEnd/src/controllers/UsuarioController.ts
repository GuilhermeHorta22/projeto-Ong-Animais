import { Request, Response } from 'express';
import { UsuarioService } from '../services/UsuarioService.js';

const service = new UsuarioService();

export const listarUsuario = async (req: Request, res: Response) => {
    const usuarios = await service.listar();

    if(usuarios === null)
        return res.status(400).json({error: 'Não tem usuários cadastrado!'});

    return res.json(usuarios);
};

export const buscarUsuario = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if(isNaN(id))
        return res.status(400).json({error: 'ID invalido!'});

    const usuario = await service.buscar(id);

    if(usuario === null)
        return res.status(404).json({error: 'Não tem usuario com esse ID!'});
    return res.json(usuario);
};

export const criarUsuario = async (req: Request, res: Response) => {
    const {nome, cpf, telefone, endereco, email, senha, tipo} = req.body;

    if(!nome || !cpf || !email || !senha || !tipo)
        return res.status(400).json({error: 'Dados obrigatorio faltando.'});

    const novoUsuario = await service.criar({nome, cpf, telefone, endereco, email, senha, tipo});
    return res.json(novoUsuario);
};

export const deletarUsuario  = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const result = await service.buscar(id);

    if(result != null)
    {
        await service.deletar(id);
        return res.status(204);
    }
    else
        return res.status(400).json({error: 'Não existe um usuario com esse id.'});

};

export const atualizarUsuario = async(req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const {nome, cpf, telefone, endereco, email, senha, tipo} = req.body;

    const result = await service.buscar(id);

    if(result != null)
    {
        if(!nome || !cpf || !email || !senha || !tipo)
            return res.status(400).json({error: 'Dados obrigatório faltando.'});

        const novoUsuario = await service.alterar(id, {nome, cpf, telefone, endereco, email, senha, tipo});
        return res.json(novoUsuario);
    }
    else
        return res.status(404).json({error: 'Usuario com id: '+ id +' não foi encontrado.'});
};