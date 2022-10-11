import React from 'react';
import { useAppBarScroll } from './hooks';
import { AppBarBaseProps } from './interface';
import { AppBarStyled, AppHandlerStyled, AppLogoStyled, AppNavigationStyled, fixed } from './styles';

export interface AppBarProps extends AppBarBaseProps {
  logo?: JSX.Element | string;
  extends?:JSX.Element;
  children?: JSX.Element;
}

export function AppBar(props: AppBarProps) {
    useAppBarScroll(props);
    const logo = () => {
        return <AppLogoStyled>{props.logo}</AppLogoStyled>;
    };

    const navigation = () => {
        return <AppNavigationStyled>{props.children}</AppNavigationStyled>;
    };

    const extend = () => {
        return <AppHandlerStyled>{props.extends}</AppHandlerStyled>;
    };

    return (
        <AppBarStyled {...props} className={fixed(props)}>
            {logo()}
            {navigation()}
            {extend()}
        </AppBarStyled>
    );
}