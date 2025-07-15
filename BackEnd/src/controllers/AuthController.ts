import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { pool } from '../dataBase/connection.js';
import { Usuario } from '../models/UsuarioModel.js';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const login = async (req: Request, res: Response) => {
    const { email, senha} = req.body;

    if(!email || !senha)
        return res.status(400).json({message: 'Email e senha são obrigatorios.'});

    try
    {
        const result = await pool.query('SELECT * FROM usuario WHERE email = $1', [email]);
        const usuario:  Usuario = result.rows[0];

        if(!usuario)
            return res.status(401).json({message: 'Usuário não encontrado.'});

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if(!senhaValida)
            return res.status(401).json({message: 'Senha incorreta.'});

        const token = jwt.sign(
            { if: usuario.id, tipo: usuario.tipo },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({token, tipo: usuario.tipo});
    }
    catch(error)
    {
        return res.status(500).json({error: 'Erro interno ao realiazr login.'});
    }
}
