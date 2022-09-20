import React, { useContext, useEffect, useRef } from 'react';
import { ConfigContext } from '../config/config';
import { NavigationStyled, NavigationStyledProps, NavigationLogoStyled, NavigationItemsStyled } from './navigation.styled';

export type NavigationProps = {
  children: JSX.Element | JSX.Element[];
}


export default function Navigation(props: NavigationProps & NavigationStyledProps) {
    const { children, ...styles } = props;
    const dom = useRef<HTMLDivElement>();
    const { config, setStatusbar } = useContext(ConfigContext);

    useEffect(() => {
        if (dom.current) {
            if (config.statusbar !== dom.current.clientHeight) setStatusbar(dom.current.clientHeight);
        }
    }, [dom.current, config]);

    return (
        <NavigationStyled ref={dom} {...styles}>
            <NavigationLogoStyled />
            {props.children ? <NavigationItemsStyled>{props.children}</NavigationItemsStyled> : null}
        </NavigationStyled>
    );
}