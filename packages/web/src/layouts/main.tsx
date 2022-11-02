import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppBar, Menu } from '@samurais-app/components';
import { AuthLogin } from 'src/components/AuthLogin';
import { pkg } from '../config';
import { Application, ApplicationExtends, ApplicationLogo, ApplicationLogoBox, ApplicationLogoText } from './layout.styled';

export default function Layout() {
    // const { update } = useContext(ThemeContent);
    const navigate = useNavigate();

    return (
        <Application>
            <AppBar
                logo={
                    <ApplicationLogoBox>
                        <ApplicationLogo />
                        <ApplicationLogoText version={pkg.version}>samurais</ApplicationLogoText>
                    </ApplicationLogoBox>
                }
                extends={
                    <ApplicationExtends>
                        <AuthLogin onClick={() => navigate('/auth/login')} />
                    </ApplicationExtends>
                }
                transparent
                fixed
            >
                <Menu>
                    <Menu.Item accessory={[<Menu.Item>1</Menu.Item>]}>1231</Menu.Item>
                </Menu>
            </AppBar>
            <Outlet />
        </Application>
    );
}