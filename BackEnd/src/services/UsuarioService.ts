import { pool } from '../dataBase/connection.js';
import { Usuario } from '../models/UsuarioModel.js';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export class UsuarioService {

    async existCpf(cpf: string, idIgnore?: number): Promise<boolean> {
        const idUsuario = idIgnore ? 'SELECT 1 FROM usuario WHERE cpf = $1 AND id <> $2' : 'SELECT 1 FROM usuario WHERE cpf = $1';

        const cpfUsuario = idIgnore ? [cpf, idIgnore] : [cpf];

        const result = await pool.query(idUsuario, cpfUsuario);
        if(result.rows.length > 0)
            return true;
        return false;
    }

    async existEmail(email: string, idIgnore?: number): Promise<boolean> {
        const idUsuario = idIgnore ? 'SELECT 1 FROM usuario WHERE email = $1 AND id <> $2' : 'SELECT 1 FROM usuario WHERE email = $1';

        const emailUsuario = idIgnore ? [email, idIgnore] : [email];

        const result = await pool.query(idUsuario, emailUsuario);
        if(result.rows.length > 0)
            return true;
        return false;
    }

    async findByEmail(email: string): Promise<Usuario | null> {
        const result = await pool.query(
            'SELECT * FROM usuario WHERE email = $1', [email]
        );

        if(result.rowCount === 0)
            return null;

        return result.rows[0];
    }

    async listar(): Promise<Usuario[] | null> {
        const result = await pool.query('SELECT * FROM usuario');

        if(result.rows.length > 0)
            return result.rows;
        else
            return null;
    }

    async buscar(id: number): Promise<Usuario | null> {
        const result = await pool.query('SELECT * FROM usuario WHERE id = $1', [id]);

        if(result.rows.length > 0)
            return result.rows[0];
        else
            return null;
    }

    async criar(usuario: Omit<Usuario, 'id'>): Promise<Usuario> {
        const senhaCriptografada = await bcrypt.hash(usuario.senha, saltRounds);

        if(await this.existCpf(usuario.cpf))
            throw new Error('CPF já cadastrado!');
        else
        {
            const result = await pool.query(
                'INSERT INTO usuario (nome, cpf, telefone, endereco, email, senha, tipo) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                [
                    usuario.nome,
                    usuario.cpf,
                    usuario.telefone,
                    usuario.endereco,
                    usuario.email,
                    senhaCriptografada,
                    usuario.tipo
                ]
            );

            return result.rows[0];
        }
    }

    async deletar(id: number): Promise<void> {
        await pool.query('DELETE FROM usuario WHERE id = $1', [id]);
    }

    async alterar(id: number, usuario: Omit<Usuario, 'id'>): Promise<Usuario> {
        const atual = await this.buscar(id);
        if(!atual)
            throw new Error("Usuário não encontrado.");

        if(usuario.cpf !== atual.cpf)
        {
            if(await this.existCpf(usuario.cpf, id))
                throw new Error('CPF já está em uso por outro usuário.');
        }

        if(usuario.email !== atual.email)
        {
            if(await this.existEmail(usuario.email, id))
                throw new Error('Email já está em uso por outro usuário.');
        }
            
        const result = await pool.query(
            'UPDATE usuario SET nome = $1, cpf = $2, telefone = $3, endereco = $4, email = $5, senha = $6, tipo = $7 WHERE id = $8 RETURNING *',
            [
                usuario.nome,
                usuario.cpf,
                usuario.telefone,
                usuario.endereco,
                usuario.email,
                usuario.senha,
                usuario.tipo,
                id
            ]
        );
        return result.rows[0];
    }
}