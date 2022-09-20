import { Model } from './model';
import { IApplication } from 'src/interfaces';

export class Application extends Model<IApplication> {
    get name() {
        return this._data.name;
    }
    set name(value: string) {
        this._data.name = value;
    }

    get version() {
        return this._data.version;
    }
    set version(value: string) {
        this._data.version = value;
    }
}