/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Field from './field';
import { FieldContext } from './context';

export type FormStoreOption<T = any> = {
    name: string;
    onSubmit: (data: T) => void;
}

export class FormStore<D = any> {
    constructor(private readonly option: FormStoreOption) {
        if (FormStore.cache.has(this.option.name)) return FormStore.cache.get(this.option.name);
        FormStore.cache.set(this.option.name, this);
        return this;
    }


    private static cache: Map<string, FormStore> = new Map([]);
    private readonly _fields: Map<string, FieldContext> = new Map([]);
    private readonly _dependents: Map<string, string[]> = new Map([]);
    private readonly _components: Map<string, JSX.Element> = new Map([]);
    get key() { return this.option.name; };

    private _dependent(name: string, dependents: string[]) {
        return dependents.forEach((item) => {
            const _dependents = this._dependents.get(item) || [];
            if (!_dependents.includes(name)) {
                _dependents.push(name);
                this._dependents.set(item, _dependents);
            };
        });
    }

    private _updateDependent(that: FieldContext) {
        const deps = this._dependents.get(that.field.key) || [];
        deps.map((item) => this._fields.get(item)).forEach((context) => {
            context.dependentEvents.forEach((item) => {
                item.apply(context, [that.field]);
            });
        });
    }

    private _component(context:FieldContext, element:JSX.Element) {
        if(this._components.has(context.field.key)) return this._components.get(context.field.key);
        this._components.set(context.field.key, element);
        return element;
    }

    private _translate(target:Record<string, any>, source: [string, any]){
        const [key, value] = source;
        const [current, ...keys] = key.split('.');
        if(!keys.length) {
            const val = typeof value === 'string' && /(^[\-0-9][0-9]*(\.[0-9]+)?)$/.test(value) ? Number(value) : value;
            return target[`${current}`] = val;
        };
        if(!target[`${current}`]) target[`${current}`] = {};
        this._translate(target[`${current}`], [keys.join('.'), value]);
    }

    createContext(field: Field) {
        let localField = this._fields.get(field.key);
        if (!localField) localField = this._fields.set(field.key, new FieldContext(field)).get(field.key);
        localField.field.update({ name: field.key, value: field.value, focus: field.focus, rules: field.rules });
        localField.updateDependent = this._updateDependent.bind(this, localField);
        localField.dependents = this._dependent.bind(this, localField.field.key);
        localField.component = this._component.bind(this, localField);
        return localField;
    }

    getContext(name: string) {
        return this._fields.get(name);
    }

    verification():Promise<D> {
        const fields = Array.from(this._fields.values());
        // @ts-ignore
        return Promise.all(fields.map((field) => field.field.check())).then((msg) => msg.reduce((a: string[],b: string[]) => { return a.concat(b); }, []))
            .then(() => {
                this.option.onSubmit(Array.from(this._fields.values()).reduce((a, b) => {{
                    this._translate(a, [b.field.key, b.field.value]);
                    return a;
                }}, {}));
            });
    }
}