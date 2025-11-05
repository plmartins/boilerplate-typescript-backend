import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';

export const errorHandlerMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        res.status(error.statusCode).json({
            error: error.name,
            message: error.message,
            details: process.env.NODE_ENV === 'development' ? error.details : undefined
        });
    } else {
        console.error('Erro não tratado:', error);
        res.status(500).json({
            error: 'InternalServerError',
            message: 'Erro interno do servidor',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
