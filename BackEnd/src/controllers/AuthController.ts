import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { pool } from '../dataBase/connection.js';
import { Usuario } from '../models/UsuarioModel.js';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { UsuarioService } from '../services/UsuarioService.js';
import { PasswordResetService } from '../services/PasswordResetService.js';
import { sendEmail } from '../utils/Email.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

const usuarioService = new UsuarioService();
const passwordResetService = new PasswordResetService();

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
            { id: usuario.id, tipo: usuario.tipo },
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

export const forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    
    if(!email)
        return res.status(400).json({error: "Email é obrigatório."});

    const usuario = await usuarioService.findByEmail(email);

    if(!usuario)
        return res.status(200).json({message: "Se o email existir, enviaremos instruções."});

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await passwordResetService.criar({
        usuario_id: usuario.id,
        token,
        expires_at: expiresAt
    });

    const link = `http://localhost:5173/reset-senha/${token}`;

    await sendEmail(
        usuario.email,
        "Recuperação de senha",
        `Clique no link para redefinir sua senha: ${link}`
    );

    return res.json({ message: "Se o email existir, enviaremos instruções." });
}

export const resetPassword = async (req: Request, res: Response) => {
    const { token } = req.params;
    const { novaSenha } = req.body;

    const reset = await passwordResetService.buscarPorToken(token);

    const dataAtual = new Date();

    if(!reset || reset.used || reset.expires_at < dataAtual)
        return res.status(400).json({erro: "Token inválido ou expirado."});

    const hash = await bcrypt.hash(novaSenha, 10);

    await usuarioService.AtualizarSenha(reset.usuario_id, hash);

    await passwordResetService.marcarComoUsado(reset.id);

    return res.json({message: "Senha atualizada com sucesso."});
}
