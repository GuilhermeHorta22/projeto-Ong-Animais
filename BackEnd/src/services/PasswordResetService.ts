import { pool } from '../dataBase/connection.js';
import {CreatePasswordResetDTO} from '../dtos/CreatePasswordResetDTO.js';

export class PasswordResetService {
    async criar(data: CreatePasswordResetDTO): Promise<void> {
        await pool.query(
            `INSERT INTO password_reset (usuario_id, token expires_at)
            VALUES ($1, $2, $3)`, [data.usuario_id, data.token, data.expires_at]
        );
    }

    //buscando token valido
    async findValidToken(token: string) {
        const result = await pool.query(
            `SELECT * FROM password_reset
            WHERE token = $1
            AND used = false
            AND expires_at > NOW()`, [token]
        );

        if(result.rowCount === 0)
            return null;

        return result.rows[0];
    }

    //marcando token como usado
    async marcarComoUsado(id: number): Promise<void> {
        await pool.query(`
            UPDATE password_reset
            SET used = true
            WHERE id = $1`, [id]
        );
    }

    //invalidando tokens antigos do usuário
    async invalidarTokenDoUsuario(usuario_id: number): Promise<void> {
        await pool.query(`
            UPDATE password_reset
            SET used = true
            WHERE usuario_id = $1`, [usuario_id]
        );
    }
}