import React, { useContext, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar, ThemeContent } from '@samurais-app/components';
import { ConfigContext } from '../components/config/config';
import { Application } from './layout.styled';

export default function Layout() {
    const { update } = useContext(ThemeContent);
    return (
        <Application>
            <AppBar fixed><div>测试</div></AppBar>
            <Outlet />
        </Application>
    );
}