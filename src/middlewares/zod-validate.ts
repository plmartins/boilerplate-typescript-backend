import { NextFunction, Request, Response } from 'express';
import { ZodSchema, ZodError } from 'zod';

function formatZodError(error: ZodError) {
    return error?.errors?.[0]?.message || 'Instabilidade no servidor, consulte o suporte';
}

export function zodValidate(schema: ZodSchema<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const validatedData = schema.parse(req.body);
            req.body = validatedData;
            next();
        } catch (err) {
            if (err instanceof ZodError) {
                return res.status(400).json({
                    error: 'AppError',
                    message: formatZodError(err),
                });
            }
            next(err);
        }
    };
}