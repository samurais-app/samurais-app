import React from 'react';
import { ButtonBaseProps } from 'src/interfaces';
import { ButtonStyled } from './index.styled';

export interface ButtonProps extends ButtonBaseProps {
  children: any;
}

export function Button(props: ButtonProps) {
    const { size = 'middle', children, ..._props } = props;
    return (<ButtonStyled size={size} {..._props}>{children}</ButtonStyled>);
}