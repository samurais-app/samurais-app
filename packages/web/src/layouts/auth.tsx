import React from 'react';
import { Outlet } from 'react-router-dom';
import { Application } from './layout.styled';

export default function AuthLayout() {
    return (
        <Application>
            <Outlet />
        </Application>
    );
}