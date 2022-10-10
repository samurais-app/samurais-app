/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { isUndefined } from '@frade-sam/samtools';
import { Field } from '.';
import { EventsCallback, EventsType, FieldOption, FormContextOption } from './interface';

export class FieldContext {
    constructor(private _field: Field) {
        this._field.emit = this._emit.bind(this);
    }
    private static _fieldContext:FieldContext;
    private _events: Map<EventsType, EventsCallback<EventsType>[]> = new Map([]);

    private _emit(event: EventsType, field?: Field) {
        const events = this._events.get(event) || [];
        events.forEach((item) => {
            if(event === 'change') {
                item.apply(this, [field.value]);        
            } else {
                item.apply(this, [field]);
            }
        });
    }
    updateDependent(that?: FieldContext) { return; }

    get field() { return this._field; };

    onChange(event: React.ChangeEvent<HTMLInputElement>, transmit?: boolean) {
        this._field.value = event.target.value;
        this._field.check().then(() => {
            if (transmit) return;
            this.updateDependent();
        }).catch((message) => {
            this._field.error = message;
        });
    }

    onFocus() {
        this._field.focus = true;
    }

    onBlur() {
        this._field.focus = false;
    }

    /**
     * 注册状态监听
     * @param event 
     * @param fn 
     * @returns 
     */
    addEventListener<E extends EventsType>(event: E, fn: EventsCallback<E>) {
        // @ts-ignore
        if (this._events.has(event) && this._events.get(event).some((_fn) => _fn === fn)) return;
        const events = this._events.get(event) || [];
        events.push(fn);
        this._events.set(event, events);
    }

    removeEventListener<E extends EventsType>(event: EventsType, fn: EventsCallback<E>) {
        if (!this._events.has(event) || !this._events.get(event).includes(fn)) return;
        const events = this._events.get(event) || [];
        this._events.set(event, events.filter((item) => item !== fn));
    }

    dependents(dep: string[]) { return; }

    

    component(key: any, element?: JSX.Element) {
        return element; 
    }
}

export class FormContext<D = any> {
    constructor(private readonly option: FormContextOption) {
        if (FormContext.cache.has(this.option.name)) return FormContext.cache.get(this.option.name);
        FormContext.cache.set(this.option.name, this);
        return this;
    }


    private static cache: Map<string, FormContext> = new Map([]);
    private readonly _fields: Map<string, FieldContext> = new Map([]);
    private readonly _components: Map<string, JSX.Element> = new Map([]);
    get key() { return this.option.name; };

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

    createContext({ rules = [], name, value, ...options}: FieldOption) {
        let localField = this._fields.get(name);
        if (!localField) localField = this._fields.set(name, new FieldContext(new Field({ name, value, ...options }))).get(name);
        localField.field.update(options);
        localField.field.rules = rules;
        localField.component = this._component.bind(this, localField);
        return localField;
    }

    getContext(name: string):Pick<FieldContext, 'addEventListener' | 'removeEventListener'> {
        return this._fields.get(name) ?? this.createContext({ name });
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