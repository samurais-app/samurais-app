import React from 'react';
import styled from 'styled-components';
import { CodeAnimationBaseProps } from './interfaces';

export interface CodeAnimationProps extends CodeAnimationBaseProps {
    children?:string;
}



const CodeAnimationStyled = styled.span``;

/**
 * 代码动画
 * @param param0 
 * @returns 
 */
export function CodeAnimation({
    children
}:CodeAnimationProps) {
    if(React.isValidElement(children))return;

    return (
        <CodeAnimationStyled>1</CodeAnimationStyled>
    );
}