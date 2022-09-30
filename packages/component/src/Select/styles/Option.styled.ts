import { Theme } from 'src/theme';
import styled, { keyframes, ThemedStyledProps } from 'styled-components';
import { OptionBaseProps, OptionBoxBaseProps } from '../interface';
import { optionBoxBorderRadius, optionPadding, optionBoxShow, optionBackground } from './function';

export const showAnimation = keyframes`
  0% {
    max-height: 0;
    transform: scale(1, 0);
  }
  100% {
    max-height: 400px;
    transform: scale(1, 1);
  }
`;

export const OptionBoxStyled = styled.ul<ThemedStyledProps<OptionBoxBaseProps, Theme>>`
  width: ${(props: OptionBoxBaseProps) => props.width}px;
  box-sizing: border-box;
  list-style: none;
  position: ${(props: OptionBoxBaseProps) => props.position};
  top: ${(props: OptionBoxBaseProps) => props.top}px;
  left: ${(props: OptionBoxBaseProps) => props.left}px;
  padding: 0;
  margin: 0;
  overflow: scroll;
  background-color: #fff;
  box-shadow: 0 0 10px 4px ${optionBoxShow};
  border-radius: ${optionBoxBorderRadius}px;
  transform-origin: 0 0;
  max-height: ${props => props.show ? 400 : 0}px;
  transition: height 0.2s linear;
  animation: ${showAnimation} 0.2s linear;
`;

export const OptionStyled = styled.li<ThemedStyledProps<OptionBaseProps, Theme>>`
  padding: ${optionPadding};
  background-color: ${optionBackground()};
  transition: all 0.2s ease 0s;
  &:hover {
    background-color: ${optionBackground('hover')};
  }
  &:active, &.active {
    background-color: ${optionBackground('active')};
  }
`;