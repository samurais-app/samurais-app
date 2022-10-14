import styled from 'styled-components';
import logo from '../../assets/logo.png';
import { layoutExtendsMarginLeft } from './function';

export interface ApplicationProps {
  top?: number
}

export const Application = styled.div<ApplicationProps>`
  width: 100vw;
  min-height: 100vh;
`;

export const ApplicationLogo = styled.b`
  display: inline-block;
  width: 40px;
  height: 40px;
  background-image: url(${logo});
  background-size: cover;
  background-repeat: no-repeat;
`;
export const ApplicationExtends = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: ${layoutExtendsMarginLeft};
`;