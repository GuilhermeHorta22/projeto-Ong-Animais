import { Request, Response } from 'express';
import { UsuarioService } from '../services/UsuarioService.js';
import { cpfValidation, telefoneValidation, emailValidation }  from '../utils/UsuarioValidation.js';

const service = new UsuarioService();

export const listarUsuario = async (req: Request, res: Response) => {
    const usuarios = await service.listar();

    if(usuarios === null)
        return res.status(200).json({message: 'Não tem usuários cadastrado!'});

    return res.json(usuarios);
};

export const buscarUsuario = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if(isNaN(id))
        return res.status(400).json({error: 'ID invalido!'});

    const usuario = await service.buscar(id);

    if(usuario === null)
        return res.status(200).json({message: 'Não tem usuario com esse ID!'});
    return res.json(usuario);
};

export const criarUsuario = async (req: Request, res: Response) => {
    const {nome, cpf, telefone, endereco, email, senha, tipo} = req.body;

    if(!nome || !cpf || !telefone || !endereco || !email || !senha || !tipo)
        return res.status(400).json({error: 'Dados obrigatorio faltando.'});

    const cpfValido = cpfValidation(cpf);
    const telefoneValido = telefoneValidation(telefone);

    if(cpfValido === null)
        return res.status(409).json({error: 'CPF inválido.'})
    if(telefoneValido === null)
        return res.status(409).json({error: 'Telefone inválido.'});
    if(emailValidation(email) === false)
        return res.status(409).json({error: 'Email inválido.'})

    const novoUsuario = await service.criar({nome, cpf:cpfValido, telefone:telefoneValido, endereco, email, senha, tipo});
    return res.json(novoUsuario);
};

export const deletarUsuario  = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const result = await service.buscar(id);

    if(result != null)
    {
        await service.deletar(id);
        return res.sendStatus(204);
    }
    else
        return res.status(404).json({message: 'Não existe um usuario com esse id.'});
};

export const atualizarUsuario = async(req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const {nome, cpf, telefone, endereco, email, senha, tipo} = req.body;

    const result = await service.buscar(id);

    if(result != null)
    {
        if(!nome || !cpf || !telefone || !endereco || !email || !senha || !tipo)
            return res.status(400).json({error: 'Dados obrigatório faltando.'});

        const cpfValido = cpfValidation(cpf);
        const telefoneValido = telefoneValidation(telefone);

        if(cpfValido === null)
            return res.status(409).json({error: 'CPF inválido.'});
        if(telefoneValido === null)
            return res.status(409).json({error: 'Telefone inválido.'});
        if(emailValidation(email) === false)
            return res.status(409).json({error: 'Email inválido.'});

        const novoUsuario = await service.alterar(id, {nome, cpf:cpfValido, telefone:telefoneValido, endereco, email, senha, tipo});
        return res.json(novoUsuario);
    }
    else
        return res.status(200).json({message: 'Usuario com id: '+ id +' não foi encontrado.'});
};