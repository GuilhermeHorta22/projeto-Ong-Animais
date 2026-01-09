export interface CreatePasswordResetDTO{
    usuario_id: number;
    token: string;
    expires_at: Date;
}