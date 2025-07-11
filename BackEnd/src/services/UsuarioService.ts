import { pool } from '../dataBase/connection.js';
import { Usuario } from '../models/UsuarioModel.js';

export class UsuarioService {
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
        const result = await pool.query(
            'INSERT INTO usuario (nome, cpf, telefone, endereco, email, senha, tipo) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [
                usuario.nome,
                usuario.cpf,
                usuario.telefone,
                usuario.endereco,
                usuario.email,
                usuario.senha,
                usuario.tipo
            ]
        );

        return result.rows[0];
    }

    async deletar(id: number): Promise<void> {
        await pool.query('DELETE FROM usuario WHERE id = $1', [id]);
    }

    async alterar(id: number, usuario: Omit<Usuario, 'id'>): Promise<Usuario> {
        const result = await pool.query(
            'UPDATE usuario SET nome = $1, cpf = $2, telefone = $3, endereco = $4, email = $5, senha $6, tipo = $7 RETURNING *',
            [
                usuario.nome,
                usuario.cpf,
                usuario.telefone,
                usuario.endereco,
                usuario.email,
                usuario.senha,
                usuario.tipo
            ]
        );
        
        return result.rows[0];
    }
}