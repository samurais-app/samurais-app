import React, { useMemo } from 'react';
import { SelectBaseProps } from './interface';
import { OptionBoxStyled, OptionStyled, SelectStyled } from './styles';

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
        <SelectStyled>1</SelectStyled>
    );
}