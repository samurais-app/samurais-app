import React, { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup, SwitchTransition } from 'react-transition-group';
import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #000;
`;

export function AnimatedSuspense(props: any) {
    const { pathname } = useLocation();
    return <Suspense fallback={<Container>ajskdhahsg</Container>}>
        <SwitchTransition>
            <CSSTransition
                classNames={'fade'}
                key={pathname}
                timeout={100}>
                {props.children}
            </CSSTransition>
        </SwitchTransition>
    </Suspense>;
}