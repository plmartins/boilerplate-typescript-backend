import jwt from 'jsonwebtoken';
import { typeUserRole } from '../models/user';
import { AppError } from './errors';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key' as jwt.Secret;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '365d';

export type JwtPayload = {
    sub: string;
    role: typeUserRole;
    iat: number;
};

export const jwtUtils = {
    generateToken: (userId: string, role: typeUserRole) => {
        const payload = {
            sub: userId,
            role,
            iat: Math.floor(Date.now() / 1000)
        };

        return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);
    },

    verifyToken: (token: string): JwtPayload => {
        try {
            return jwt.verify(token, JWT_SECRET) as JwtPayload;
        } catch (error) {
            throw new AppError('Token inválido ou expirado', 401);
        }
    },

    decodeToken: (token: string) => {
        try {
            return jwt.decode(token) as JwtPayload;
        } catch (error) {
            throw new AppError('Token inválido', 401);
        }
    }
};
