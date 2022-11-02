/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { ThemeConfig } from '@samurais-app/components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AnimatedSuspense, ConfigProvider } from './components';
import { MainLayout, AuthLayout } from './layouts';
import { Home, UserInfo, Login, Sign } from './pages';
import { theme } from './config';

export function App() {
    return (
        <React.Fragment>
            <ConfigProvider>
                <ThemeConfig theme={theme}>
                    <BrowserRouter>
                        <AnimatedSuspense>
                            <Routes>
                                <Route path="/" element={<MainLayout />}>
                                    <Route path="" element={<Home />} />
                                </Route>
                                <Route path="/app" element={<MainLayout />}>
                                    <Route path="user/info" element={<UserInfo />} />
                                </Route>
                                <Route path="/auth" element={<AuthLayout />}>
                                    <Route path="login" element={<Login />} />
                                    <Route path="sign" element={<Sign />} />
                                </Route>
                            </Routes>
                        </AnimatedSuspense>
                    </BrowserRouter>
                </ThemeConfig>
            </ConfigProvider>
        </React.Fragment>
    );
}
