import React from 'react';
import { OptionStyled } from './styles';

export interface OptionProps {
    name: string;
    value: string | number;
}

/**
 * option选项
 * @param props 
 * @returns 
 */
export function Option(props: OptionProps) {
    return (
        <OptionStyled></OptionStyled>
    );
}

export interface OptionBoxProps {
    width: number;
}

export function OptionBox(props: OptionBoxProps) {
    return (<div>1</div>);
}