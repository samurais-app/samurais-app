import { isFunc } from '@frade-sam/samtools';
import React, { useCallback } from 'react';
import { Position } from 'src/common/hooks';
import { FloatElementContainerStyled } from './index.styled';

export interface FloatElementContainerProps {
  onClose?: (status?: any) => void;
  show?:boolean;
  children?:JSX.Element[]|JSX.Element|string;
  position: Position
}

export const FloatElementContainer =React.forwardRef(({
    position,
    children,
    show,
    onClose
}: FloatElementContainerProps, refs: any) => {
    if(!children) return;
    const close = useCallback(() => {isFunc(onClose) && onClose(false);}, [onClose]);
    return (<FloatElementContainerStyled onClick={close} show={show} ref={refs} position={position}>{children}</FloatElementContainerStyled>);
});