import { pool } from '../dataBase/connection.js';
import {CreatePasswordResetDTO} from '../dtos/CreatePasswordResetDTO.js';

export class PasswordResetService {
    async criar(data: CreatePasswordResetDTO): Promise<void> {
        await pool.query(
            `INSERT INTO password_reset (usuario_id, token expires_at)
            VALUES ($1, $2, $3)`, [data.usuario_id, data.token, data.expires_at]
        );
    }
}