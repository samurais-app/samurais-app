import React from 'react';
import styled from 'styled-components';

export const LoadingStyled = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #000;
`;

export function Loading(props) {
    console.log(props);
    return (<LoadingStyled>loading...</LoadingStyled>);
}