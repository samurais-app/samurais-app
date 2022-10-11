import styled from 'styled-components';
import { InputBaseProps } from 'src/interfaces';
import { inputBgColor, inputBorder, inputBorderRadius, inputFontSize, inputPadding } from 'src/foundation';


export const InputContainerStyled = styled.div<InputBaseProps>`
  box-sizing: border-box;
  width: 100%;
  background-color: ${inputBgColor};
  padding: ${inputPadding};
  border-radius: ${inputBorderRadius};
  border: 1px solid ${inputBorder};
  transition: all 0.2s ease 0s;
  display: flex;
  flex-direction: row;
  position: relative;
  & input {
    font-size: ${inputFontSize};
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