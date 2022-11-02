import { complementaryColor } from '@frade-sam/samtools';
import { menuBackgroundColor, menuBoxShadow, menuFontSize, menuItemBackground, menuItemPadding, menuRadius } from 'src/foundation';
import { ThemeWithMenuItemBaseProps } from 'src/interfaces';
import styled from 'styled-components';


export const MenuItemsStyled = styled.ul<ThemeWithMenuItemBaseProps>`
  border-radius: ${menuRadius};
  background-color: ${menuBackgroundColor(0.2)};
  box-shadow: ${menuBoxShadow};
`;

export const MenuItemBoxStyled = styled.li<ThemeWithMenuItemBaseProps>`
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  background-color: ${menuItemBackground()};
  transition: all 0.2s ease 0s;
  font-size: ${menuFontSize(0)};
  line-height: ${menuFontSize(0)};
  cursor: pointer;
  color: ${(props: ThemeWithMenuItemBaseProps) => complementaryColor(props.theme.color.background)};
  &:hover {
    background-color: ${menuItemBackground('hover')};
  }
  &:active, &.active {
    background-color: ${menuItemBackground('active')};
  }
`;

export const MenuItemStyled = styled.div<ThemeWithMenuItemBaseProps>`
  width: 100%;
  box-sizing: border-box;
  padding: ${menuItemPadding};
`;