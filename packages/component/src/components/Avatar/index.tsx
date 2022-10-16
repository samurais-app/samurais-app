import React from 'react';
import { AvatarBaseProps } from 'src/interfaces';
import { AvatarContainerStyled, AvatarImageStyled, AvatarStyled, AvatarTextStyled } from './index.styled';


export interface AvatarProps extends AvatarBaseProps {
    children?: string;
}

export function Avatar({
    children,
    size = 36,
    src = '',
    circular = false,
    ellipsis = false,
    ...props
}:AvatarProps) {
    return (
        <AvatarStyled {...props}>
            <AvatarContainerStyled size={size} circular={circular} title={ellipsis ? children : undefined}>
                <AvatarImageStyled src={src} />
            </AvatarContainerStyled>
            {children && !ellipsis && <AvatarTextStyled>{children}</AvatarTextStyled>}
        </AvatarStyled>
    );
}