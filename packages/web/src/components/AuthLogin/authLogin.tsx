import { Avatar } from '@samurais-app/components';
import React from 'react';
import { AuthLoginStyled } from './authLogin.styled';


export interface AuthLoginProps {
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export function AuthLogin({
    onClick
}:AuthLoginProps) {
    return (
        <AuthLoginStyled>
            <Avatar onClick={onClick} circular src='https://avatars.githubusercontent.com/u/54409768?s=40&v=4'>
                Login
            </Avatar>
        </AuthLoginStyled>
    );
}