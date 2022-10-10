import styled from 'styled-components';
import { ButtonBaseProps } from '../interface';
import { backgroundColor, buttonBorderRadius, padding } from './function';


export const ButtonStyled = styled.button<ButtonBaseProps>`
  background-color: ${backgroundColor()};
  border: none;
  cursor: pointer;
  padding: ${padding};
  border-radius: ${buttonBorderRadius}px;
  transition: background-color 0.2s ease 0s;
  outline: none;
  &:hover {
    background-color: ${backgroundColor(0.2)};
  }
  &:active {
    background-color: ${backgroundColor(0.4)};
  }
`;