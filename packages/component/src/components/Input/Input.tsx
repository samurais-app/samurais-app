/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback } from 'react';
import { isFunc } from '@frade-sam/samtools';
import { InputNumber, InputNumberProps } from './InputNumber';
import { InputText, InputTextProps } from './InputText';

function changeText(event: React.ChangeEvent<HTMLInputElement>, props: InputProps) {
    if(props.maxLength && event.target.value.length>props.maxLength) {
        event.target.value = props.value as unknown as string;
    }
}

function changeNumber(event: React.ChangeEvent<HTMLInputElement>, _props: InputProps) {
    if(!/(^[\-0-9][0-9]*(\.[0-9]+|\.)?)$/.test(event.target.value)) {
        event.target.value = '';
    }
}

const Components = {
    text: InputText,
    number: InputNumber,
};

const Funcs = {
    text: changeText,
    number: changeNumber,
};

export type InputProps = InputTextProps | InputNumberProps;

export default function Input(props: InputProps) {
    const {
        type = 'text',
        onChange,
        ..._props 
    } = props;
    const Com = Components[props.type];
    const _onChange = useCallback((event) => {
        if(!isFunc(onChange) || !isFunc(Funcs[type])) return;
        const func = Funcs[type];
        func(event, props);
        onChange(event);
    }, [type]);
    return <Com onChange={_onChange} {..._props} />;
}

Input.Number = InputNumber;