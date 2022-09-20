import styled from 'styled-components';

export type NavigationStyledProps = {
  fixed?: boolean;
  blur?: boolean;
  shadow?: string;
  background?: string;
}

export const NavigationStyled = styled.div<NavigationStyledProps>`
  padding: 10px 20px;
  width: 100vw;
  position: ${(props) => props.fixed ? 'fixed' : ''};
  top: ${(props) => props.fixed ? '0' : ''};
  transition: ${(props) => props.fixed ? 'top 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' : ''};
  display: flex;
  flex-direction: row;
  align-items: center;
  backdrop-filter: ${(props) => props.fixed && props.blur ? 'blur(10px)' : 'none'};
  box-shadow: ${(props) => props.shadow ? `inset 0px -1px 1px ${props.shadow}` : 'none'};
  background-color: ${(props) => props.background ? props.background : 'rgba(0,30,38,0.8)'};
`;

export const NavigationLogoStyled = styled.div``;

export const NavigationItemsStyled = styled.ul`
  flex: 1;
  list-style: none;
  margin: 0;
  padding: 0;
`;