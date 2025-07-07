import { z } from 'zod';

export const userRegisterSchema = z.object({
    name: z.string({ message: 'O nome é obrigatório' }).min(3, 'O nome deve ter pelo menos 3 caracteres'),
    email: z.string({ message: 'O email é obrigatório' }).email({ message: 'Email inválido' }),
    password: z.string({ message: 'A senha é obrigatória' }).min(6, 'A senha deve ter pelo menos 6 caracteres'),
    phone: z.string({ message: 'O número de celular é obrigatório' }).regex(/^[0-9]+$/, 'Número inválido').min(11, 'O número de celular deve ter pelo menos 11 caracteres'),
    cpf: z.string({ message: 'O CPF é obrigatório' }).regex(/^[0-9]+$/, 'CPF inválido').min(11, 'O CPF deve ter pelo menos 11 caracteres')
});

export const userLoginSchema = z.object({
    email: z.string({ message: 'O email é obrigatório' }).email('Email inválido'),
    password: z.string({ message: 'A senha é obrigatória' }).min(6, 'Senha inválida')
});