import React from 'react';
import { ButtonBaseProps } from './interface';
import { ButtonStyled } from './styles';

export interface ButtonProps extends ButtonBaseProps {
  children: any;
}

export function Button(props: ButtonProps) {
    const { size = 'middle', children, ..._props } = props;
    return (<ButtonStyled size={size} {..._props}>{children}</ButtonStyled>);
}