import { Model } from './model';
import { IAccount } from '..';

export class Account extends Model<IAccount> implements IAccount {
    get account() {
        return this._data.account;
    }
    set account(value: string) {
        this._data.account = value;
    }

    get password() {
        return this._data.password;
    }
    set password(value: string) {
        this._data.password = value;
    }

    get code() {
        return this._data.code;
    }
    set code(value: string) {
        this._data.code = value;
    }
}