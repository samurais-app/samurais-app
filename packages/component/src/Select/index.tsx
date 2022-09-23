import React, { useMemo } from 'react';
import { createPortal } from 'react-dom';
import { SelectBaseProps } from './interface';
import { OptionBoxStyled, OptionStyled } from './styles';
import { SelectStyled } from './styles/Select.styled';

export interface SelectProps extends SelectBaseProps {
    children?:JSX.Element | JSX.Element[];
}

export function Select(props: SelectProps) {
    const childrens = useMemo(()=> {
        if(props.children) return props.children;
        if(!props.options || !props.options.length) return [];
        return <OptionBoxStyled>{props.options.map((item) => <OptionStyled />)}</OptionBoxStyled>;
    },[props.children]);
    return (
        <SelectStyled />
    );
}