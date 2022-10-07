import { Theme } from 'src/theme';
import styled, { ThemedStyledProps } from 'styled-components';
import { OptionBaseProps, OptionBoxBaseProps } from '../interface';
import { optionBoxBorderRadius, optionPadding, optionBoxShow, optionBackground } from './function';

export const OptionBoxStyled = styled.div<ThemedStyledProps<OptionBoxBaseProps, Theme>>`
  width: ${(props: OptionBoxBaseProps) => props.width}px;
  box-sizing: border-box;
  list-style: none;
  position: ${(props: OptionBoxBaseProps) => props.position};
  top: ${(props: OptionBoxBaseProps) => props.top}px;
  left: ${(props: OptionBoxBaseProps) => props.left}px;
  padding: 0;
  margin: 0;
  background-color: #fff;
  box-shadow: 0 0 10px 4px ${optionBoxShow};
  border-radius: ${optionBoxBorderRadius}px;
  transform-origin: 0 0;
  max-height: ${props => props.show ? 240 : 0}px;
  transform: scale(1, ${props => props.show ? 1 : 0});
  transition: max-height 0.3s linear, transform 0.2s linear;
  overflow: overlay;
`;

export const OptionsStyled = styled.ul`
  width: 100%;
  box-sizing: border-box;
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #fff;
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