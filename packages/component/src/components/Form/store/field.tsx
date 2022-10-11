/* eslint-disable @typescript-eslint/no-empty-function */
import { EventsType, FieldOption, Rule } from './interface';

/* eslint-disable @typescript-eslint/no-unused-vars */


export default class Field {
    constructor(private _field: FieldOption) {}

    emit(event: EventsType, field: Field) { }


    private _error = '';

    get key() {
        return this._field.name;
    }

    get value() {
        return this._field.value;
    }
    set value(val: any) {
        this._field.value = val;
        this.emit('change', this);
    }
    get focus() { return this._field.focus; }
    set focus(value: boolean) { this._field.focus = value; this.emit('focus', this); }

    get error() { return this._error; }
    set error(value: string) {
        this._error = value;
        this.emit('error', this);
    }

    get rules() {
        return this._field.rules || [];
    }
    set rules(rules: Rule[]) {
        this._field.rules = this.initialVerification(rules);
    }

    private initialVerification(rules?: Rule[]) {
        if (!rules || !rules.length) return [];
        return rules.map((rule) => {
            if (typeof rule.verification !== 'function') rule.verification = this.verification.bind(this);
            return rule;
        });
    }


    private verification(rule: Rule, value: any, callback: (message?: string) => void) {
        if (rule.require && !value) callback(rule.message || 'require');
    }

    uninstall() {
        this.value = undefined;
        this.error = undefined;
        this.focus = undefined;
        this._field.rules = [];
    }

    check(): Promise<void | string[]> {
        return Promise.all(this._field.rules.map((rule) => {
            return new Promise<string>((resolve, reject) => {
                function callback(message?: string) {
                    if (typeof message === 'string' && !!message) return reject(message);
                    return resolve('');
                };
                rule.verification(rule, this.value, callback);
            });
        })).then((message) => message.filter(Boolean)).then((message) => {
            this.error = '';
            return message;
        });
    }

    update(_field: Omit<FieldOption, 'name'>) {
        this._field = { ...this._field, ..._field };
    }
}