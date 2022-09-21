import React, { useContext, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar, ThemeContent } from '@samurais-app/components';
import { ConfigContext } from '../components/config/config';
import { Application } from './layout.styled';

export default function Layout() {
    const { update } = useContext(ThemeContent);
    return (
        <Application>
            <AppBar transparent fixed><div>自动change</div></AppBar>
            <Outlet />
        </Application>
    );
}