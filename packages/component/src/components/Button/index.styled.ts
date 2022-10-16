import styled from 'styled-components';
import { ButtonBaseProps } from 'src/interfaces';
import { backgroundColor, buttonBorderRadius, buttonPadding } from 'src/foundation';


export const ButtonStyled = styled.button<ButtonBaseProps>`
  background-color: ${backgroundColor()};
  border: none;
  cursor: pointer;
  padding: ${buttonPadding};
  border-radius: ${buttonBorderRadius};
  transition: background-color 0.2s ease 0s;
  outline: none;
  &:hover {
    background-color: ${backgroundColor(0.2)};
  }
  &:active {
    background-color: ${backgroundColor(0.4)};
  }
`;