import { Request, Response, NextFunction } from 'express';
import { jwtUtils } from '../utils/jwt';
import { AppError } from '../utils/errors';
import { userRepository } from '../repositories/user';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new AppError('Token não fornecido', 401);

    const token = authHeader.split(' ')[1];
    if (!token) throw new AppError('Token inválido', 401);

    const decoded = jwtUtils.verifyToken(token);
    
    const user = await userRepository.findById(decoded.sub);
    if (!user) throw new AppError('Usuário não encontrado', 404);
    req.user = user;

    next();
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        error: error.name,
        message: error.message
      });
    } else {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'Erro de autenticação'
      });
    }
  }
};
