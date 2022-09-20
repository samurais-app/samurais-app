/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from 'react';
import { Field, FormStore } from '.';
import { EventsCallback, EventsType, OmitType } from './interface';


export const FormContext = createContext<{ form?: FormStore }>({});

export class FieldContext {
    constructor(private _field: Field) {
        this._field.emit = this._emit.bind(this);
    }
    private _events: Map<EventsType, EventsCallback<EventsType>[]> = new Map([]);

    private _emit(event: OmitType, field?: Field) {
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

    addEventListener<E extends EventsType>(event: E, fn: EventsCallback<E>) {
        // @ts-ignore
        if (this._events.has(event) && this._events.get(event).some((_fn) => _fn.displayName === fn.displayName)) return;
        const events = this._events.get(event) || [];
        events.push(fn);
        this._events.set(event, events);
    }

    removeEventListener<E extends EventsType>(event: EventsType, fn: EventsCallback<E>) {
        if (!this._events.has(event) || !this._events.get(event).includes(fn)) return;
        const events = this._events.get(event) || [];
        this._events.set(event, events.filter((item) => item !== fn));
    }

    get dependentEvents() {
        return this._events.get('dependent') || [];
    }

    dependents(dep: string[]) { return; }

    

    component(key: any, element?: JSX.Element) {
        return element; 
    }
}