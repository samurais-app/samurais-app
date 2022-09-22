import styled from 'styled-components';
import { appBarBackground, appBarBlur, padding } from './function';

export const AppBarStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${padding};
  box-sizing: border-box;
  width: 100%;
  backdrop-filter: ${appBarBlur};
  background-color: ${appBarBackground};
  &.fixed {
    position: sticky;
    top: 0;
    left: 0;
  }
  &.opacity {
    opacity: 0;
  }
`;

export const AppLogoStyled = styled.div``;

export const AppNavigationStyled = styled.div`
  flex: 1;
`;

export const AppHandlerStyled = styled.div``;