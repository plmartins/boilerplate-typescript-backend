import { TUser, UserDocument } from '../models/user';
import { UserModel } from '../models/user';

export const userRepository = {
    create: async (userData: Omit<TUser, '_id' | 'createdAt' | 'updatedAt'>) => {
        const user = new UserModel(userData);
        return await user.save();
    },

    findById: async (id: string) => {
        return await UserModel.findById(id);
    },

    findByEmail: async (email: string) => {
        return await UserModel.findOne({ email });
    },

    findByCpf: async (cpf: string) => {
        return await UserModel.findOne({ cpf });
    },

    findAll: async () => {
        return await UserModel.find();
    },

    findByRole: async (role: 'admin' | 'manager' | 'cashier' | 'seller') => {
        return await UserModel.find({ role });
    },

    findByStore: async (storeId: string) => {
        return await UserModel.find({ storeIds: storeId });
    },

    update: async (_id: string, updateData: Partial<UserDocument>) => {
        return await UserModel.findByIdAndUpdate(_id, updateData, { new: true });
    },

    delete: async (_id: string) => {
        return await UserModel.findByIdAndDelete(_id);
    },

    updatePassword: async (_id: string, newPassword: string) => {
        return await UserModel.findByIdAndUpdate(_id, { password: newPassword }, { new: true });
    }
};
