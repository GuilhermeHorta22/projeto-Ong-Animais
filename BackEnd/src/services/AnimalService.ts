import { pool } from '../dataBase/connection.js';
import { Animal } from '../models/AnimalModel.js';

export class AnimalService {
    async listar(): Promise<Animal[] | null> { //listando todos os animais
        const result = await pool.query('SELECT * FROM animal');

        if(result.rows.length > 0)
            return result.rows;
        else
            return null;
    }

    async buscar(id: number): Promise<Animal | null> { //buscando um animal pelo id
        const result = await pool.query('SELECT * FROM animal WHERE id = $1', [id]);
        
        if(result.rows.length > 0)
            return result.rows[0];
        else
            return null;
    }

    async criar(animal: Omit<Animal, 'id'>): Promise<Animal> {
        const result = await pool.query(
            'INSERT INTO animal (nome, especie, raca, idade, porte, descricao, status, foto_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [
                animal.nome,
                animal.especie,
                animal.raca,
                animal.idade,
                animal.porte,
                animal.descricao,
                animal.status,
                animal.foto_url
            ]
        );
        return result.rows[0];
    }

    async deletar(id: number): Promise<void> { //deletando um animal
        await pool.query('DELETE FROM animal WHERE id = $1', [id]);
    }

    async atualizar(id: number, animal: Omit<Animal, 'id'>): Promise<Animal> { //atualiza o resgistro de um animal
        const result = await pool.query(
            'UPDATE animal SET nome = $1, especie = $2, raca = $3, idade = $4, porte = $5, descricao = $6, status = $7, foto_url = $8 RETURNING *',
            [
                animal.nome,
                animal.especie,
                animal.raca,
                animal.idade,
                animal.porte,
                animal.descricao,
                animal.status,
                animal.foto_url
            ]
        );
        return result.rows[0];
    }
}