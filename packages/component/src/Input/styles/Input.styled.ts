import styled from 'styled-components';
import { InputBaseProps } from '../interface';
import { inputBgColor, inputBorder, inputBorderRadius, inputFontSize } from './function';


export const InputContainerStyled = styled.div<InputBaseProps>`
  box-sizing: border-box;
  width: 100%;
  background-color: ${inputBgColor};
  padding: 6px 8px;
  border-radius: ${inputBorderRadius}px;
  border: 1px solid ${inputBorder};
  transition: all 0.2s ease 0s;
  display: flex;
  flex-direction: row;
  position: relative;
  & input {
    font-size: ${inputFontSize}px;
  }
`;

export const InputStyled = styled.input`
  flex: 1;
  border: none;
  background-color: transparent;
  position: relative;
  letter-spacing: 1px;
  appearance: textfield;
  &::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
    appearance: none;
  };
  &::placeholder {
    color: #757575;
  };

  &:focus {
      outline: none;
  };
`;