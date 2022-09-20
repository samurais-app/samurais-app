

export class Model<T> {
    constructor(protected _data: T) { }

    empty() {
        return !Object.keys(this._data).length;
    }
}