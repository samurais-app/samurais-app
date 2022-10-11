import React, { useCallback } from 'react';
import { InputStyled, InputContainerStyled } from './input.styled';
import { InputBaseProps } from 'src/interfaces';

export interface InputNumberProps extends InputBaseProps {
    type?: 'number';
};

export function InputNumber(props: InputNumberProps) {
    const { 
        size = 'small', 
        error,
        onChange,
        ..._props 
    } = props;
    const _change = useCallback((event) => {
        if(typeof onChange !== 'function') return;
        if(!/(^[\-0-9][0-9]*(\.[0-9]+|\.)?)$/.test(event.target.value)) {
            event.target.value = '';
        }
        onChange(event);
    }, []);

    return (
        <InputContainerStyled size={size} error={error}>
            <InputStyled type="number" onChange={_change} {..._props} />
        </InputContainerStyled>
    );
}