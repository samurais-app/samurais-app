import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar, ThemeContent } from '@samurais-app/components';
import { Application, ApplicationExtends, ApplicationLogo } from './layout.styled';

export default function Layout() {
    const { update } = useContext(ThemeContent);
    return (
        <Application>
            <AppBar logo={<ApplicationLogo />} extends={<ApplicationExtends>1</ApplicationExtends>} transparent fixed><div>自动change</div></AppBar>
            <Outlet />
        </Application>
    );
}