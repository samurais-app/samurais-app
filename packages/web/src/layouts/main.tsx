import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppBar } from '@samurais-app/components';
import { AuthLogin } from 'src/components/AuthLogin';
import { Application, ApplicationExtends, ApplicationLogo } from './layout.styled';

export default function Layout() {
    // const { update } = useContext(ThemeContent);
    const navigate = useNavigate();

    return (
        <Application>
            <AppBar 
                logo={<ApplicationLogo />} 
                extends={
                    <ApplicationExtends>
                        <AuthLogin onClick={() => navigate('/auth/login')} />
                    </ApplicationExtends>
                } 
                transparent 
                fixed
            >
                <div>自动change</div>
            </AppBar>
            <Outlet />
        </Application>
    );
}