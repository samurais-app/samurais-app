import React, { useCallback } from 'react';
import { InputStyled, InputContainerStyled } from './input.styled';
import { InputBaseProps } from 'src/interfaces';

export interface InputTextProps extends InputBaseProps {
    type?: 'text'
    maxLength?: number
};

export function InputText(props: InputTextProps) {
    const { 
        size = 'small',
        error,
        onChange,
        ..._props 
    } = props;
    const _change = useCallback((event) => {
        if(typeof onChange !== 'function') return;
        if(props.maxLength && event.target.value.length>props.maxLength) {
            event.target.value = props.value as unknown as string;
        }
        onChange(event);
    }, [_props.value]);

    return (
        <InputContainerStyled size={size} error={error}>
            <InputStyled onChange={_change} {..._props} />
        </InputContainerStyled>
    );
}