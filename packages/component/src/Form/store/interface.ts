import Field from './field';
import { FieldContext } from './context';

export type OmitType = 'change' | 'error' | 'focus';
export type EventsType = 'dependent' | 'change' | 'error' | 'focus';

export type Events = {
    type: EventsType;
    field: Field
}
export type RuleCallback = (rule: Rule, value: any, callback: (message?: string) => void) => void;
export type EventsCallback<E extends EventsType> = E extends 'change' ? EventsValueCallback : EventsFieldCallback;
export type EventsFieldCallback = (this: FieldContext, ...args: [Field?]) => void;
export type EventsValueCallback = (this: FieldContext, ...args: [any?]) => void;
export type EventItem<E extends EventsType> = {
    event: E;
    fn: EventsCallback<E>;
}

export interface Rule {
    require?: boolean;
    rule?: RegExp;
    max?: number;
    min?: number;
    message?: string;
    verification?: RuleCallback
}
export type FieldOption = {
    name: string;
    value: string;
    focus: boolean; // 是否处在获取焦点的情况
    rules: Rule[];
    dependent: string[];
}