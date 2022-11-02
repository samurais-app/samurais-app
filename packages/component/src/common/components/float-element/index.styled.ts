import styled from 'styled-components';
import { FloatElementContainerProps } from './element';

export type FloatElementContainerStyledProps = Pick<FloatElementContainerProps, 'show' | 'position'>;

export const FloatElementBoxStyled = styled.div``;

export const FloatElementContainerStyled = styled.div<FloatElementContainerStyledProps>`
  width: ${(props: FloatElementContainerStyledProps) => props.position.width}px;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  position: ${(props: FloatElementContainerStyledProps) => props.position.position};
  top: ${(props: FloatElementContainerStyledProps) => props.position.top}px;
  left: ${(props: FloatElementContainerStyledProps) => props.position.left}px;
  transform-origin: 0 0;
  max-height: ${props => props.show ? 'auto' : '0px'};
  transform: scale(1, ${props => props.show ? 1 : 0});
  transition: max-height 0.3s linear, transform 0.2s linear;
`;