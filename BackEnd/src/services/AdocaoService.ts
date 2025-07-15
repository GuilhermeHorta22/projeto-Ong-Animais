import { pool } from '../dataBase/connection.js';
import { Adocao } from '../models/AdocaoModel.js';

export class AdocaoService {
    async listar(): Promise<Adocao[] | null> {
        const result = await pool.query('SELECT * FROM adocao');

        if(result.rows.length > 0)
            return result.rows;
        return null;
    }

    async buscar(id: number): Promise<Adocao | null> {
        const result = await pool.query('SELECT * FROM adocao WHERE id = $1', [id]);

        if(result.rows.length > 0)
            return result.rows[0];
        return null;
    }

    async criar(adocao: Omit<Adocao, 'id'>): Promise<Adocao> {
        const result = await pool.query(
            'INSERT INTO adocao (id_animal, id_usuario, data_adocao) VALUES ($1, $2, $3) RETURNING *',
            [
                adocao.id_animal,
                adocao.id_usuario,
                adocao.data_adocao
            ]
        );
        return result.rows[0];
    }

    async deletar(id: number): Promise<void> {
        await pool.query('DELETE FROM adocao WHERE id = $1', [id]);
    }

    async alterar(id: number, adocao: Omit<Adocao, 'id'>): Promise<Adocao> {
        if(await this.buscar(id) === null)
            throw new Error("Adoção não encontrada.");

        const result = await pool.query(
            'UPDATE adocao SET id_animal = $1, id_usuario = $2, data_adocao = $3 WHERE id = $4 RETURNING *',
            [
                adocao.id_animal,
                adocao.id_usuario,
                adocao.data_adocao,
                id
            ]
        );

        return result.rows[0];
    }
}