import { Request, Response } from 'express';
import { userService } from '../services/user';
import { jwtUtils } from '../utils/jwt';
import { AppError } from '../utils/errors';

export const authController = {

    register: async (req: Request, res: Response) => {
        try {

            const user = await userService.createUser({ ...req.body, role: 'admin' });

            const token = jwtUtils.generateToken(user._id.toString(), user.role);

            res.status(201).json({ message: 'Bem vindo(a)!', token });
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ error: error.name, message: error.message });
            } else {
                console.log(error)
                res.status(500).json({ error: 'InternalServerError', message: 'Instabilidade ao registrar usuário, consulte o suporte' });
            }
        }
    },

    login: async (req: Request, res: Response) => {
        try {

            const user = await userService.validatePassword(req.body.email, req.body.password);

            const token = jwtUtils.generateToken(user._id.toString(), user.role);

            res.status(200).json({ message: 'Bem-vindo(a) de volta!', token });
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ error: error.name, message: error.message });
            } else {
                console.log(error)
                res.status(500).json({ error: 'InternalServerError', message: 'Erro ao obter informações do usuário' });
            }
        }
    },

    me: async (req: Request, res: Response) => {
        try {
            const user = req.user;
            if (!user) throw new AppError('Usuário não autenticado', 401);

            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                cpf: user.cpf
            });
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ error: error.name, message: error.message });
            } else {
                console.log(error)
                res.status(500).json({ error: 'InternalServerError', message: 'Erro ao obter informações do usuário' });
            }
        }
    }
};
