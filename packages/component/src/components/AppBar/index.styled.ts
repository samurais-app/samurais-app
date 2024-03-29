import styled from 'styled-components';
import { appBarBackground, appBarBlur, navigationPadding, padding } from 'src/foundation';

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

export const AppLogoStyled = styled.div`
    vertical-align: bottom;
`;

export const AppNavigationStyled = styled.div`
    flex: 1;
    padding: ${navigationPadding};
`;

export const AppHandlerStyled = styled.div``;