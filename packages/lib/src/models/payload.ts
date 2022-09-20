import { Model } from './model';
import { IPayload } from '..';
export class Payload<T = any> extends Model<IPayload<T>> implements IPayload<T> {
    get code() { return this._data.code; };
    set code(value: number) { this._data.code = value; };

    get message() { return this._data.message; };
    set message(value: string) { this._data.message = value; };

    get data() { return this._data.data; };
    set data(value: T) { this._data.data = value; }
}