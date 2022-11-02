import { menuBackgroundColor, menuRadius } from 'src/foundation';
import { ThemeWithMenuBaseProps } from 'src/interfaces';
import styled from 'styled-components';


export const MenuStyled = styled.ul<ThemeWithMenuBaseProps>`
  width: fit-content;
  background-color: ${menuBackgroundColor(0)};
`;