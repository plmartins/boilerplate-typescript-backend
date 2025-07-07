import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';

export const rbacMiddleware = (requiredRole: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user) {
        throw new AppError('Usuário não autenticado', 401);
      }

      if (user.role !== requiredRole) {
        throw new AppError('Acesso negado', 403);
      }

      next();
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.name, message: error.message });
      } else {
        res.status(403).json({ error: 'Forbidden', message: 'Acesso negado' });
      }
    }
  };
};
