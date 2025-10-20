import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const verificarToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];

    //nosso token vem no formato "Bearer <token>"
    const token = authHeader && authHeader.split(" ")[1];

    if(!token)
        return res.status(401).json({ message: "Acesso negado. Token não fornecido."});

    try
    {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: number; tipo: string };
        (req as any).usuario = decoded;
        next();
    }
    catch(error)
    {
        return res.status(403).json({ message: "Token inválido ou expirado!"});
    }
}

export const permitirTipos = (...tiposPermitidos: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const usuario = (req as any).usuario;

        if(!usuario || !tiposPermitidos.includes(usuario.tipo))
            return res.status(403).json({ message: "Acesso não autorizado."});
        
        next();
    }
}