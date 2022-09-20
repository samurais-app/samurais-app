import { IAccount } from '@samurais-app/lib';
import api from './base';

export function login(data: IAccount) {
    api.post('/api/account/login', data);
}