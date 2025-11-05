import { Request } from 'express';
import { TUser } from '../../models/user';

declare global {
    namespace Express {
        interface Request {
            user?: TUser;
        }
    }
}