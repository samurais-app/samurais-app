import { lazy } from 'react';
export * from './loading';
export const Home = lazy(() => import('./home'));
export const UserInfo = lazy(() => import('./user/info'));
export const Login = lazy(() => import('./auth/login'));
export const Sign = lazy(() => import('./auth/sign'));