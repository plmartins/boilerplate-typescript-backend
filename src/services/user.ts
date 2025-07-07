import { TUser, UserDocument } from '../models/user';
import bcrypt from 'bcryptjs';
import { userRepository } from '../repositories/user';
import { AppError } from '../utils/errors';

export const userService = {
  
  createUser: async (userData: Omit<TUser, '_id' | 'createdAt' | 'updatedAt'>) => {
    const existingEmail = await userRepository.findByEmail(userData.email);
    if (existingEmail) throw new AppError('Email já cadastrado')

    const existingCpf = await userRepository.findByCpf(userData.cpf);
    if (existingCpf) throw new AppError('CPF já cadastrado')

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await userRepository.create({
      ...userData,
      password: hashedPassword
    });

    return user.toObject();
  },

  getUserById: async (id: string) => {
    const user = await userRepository.findById(id);
    if (!user) throw new AppError('Usuário não encontrado');

    const userObj = user.toObject() as any;
    delete userObj.password;
    return userObj;
  },

  getUserByEmail: async (email: string) => {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new AppError('Usuário não encontrado');
    return user;
  },

  updateUser: async (id: string, updateData: Partial<UserDocument>) => {
    const user = await userRepository.findById(id);
    if (!user) throw new AppError('Usuário não encontrado');

    if (updateData.password) updateData.password = await bcrypt.hash(updateData.password, 10);

    const updatedUser = await userRepository.update(id, updateData);
    
    const userObj = updatedUser?.toObject() as any;
    delete userObj.password;
    return userObj;
  },

  deleteUser: async (id: string) => {
    const user = await userRepository.findById(id);
    if (!user) throw new AppError('Usuário não encontrado');

    return await userRepository.delete(id);
  },

  validatePassword: async (email: string, password: string) => {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new AppError('Usuário não encontrado');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new AppError('Senha inválida');

    return user;
  }
};
