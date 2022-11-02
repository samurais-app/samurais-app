import { FieldProps, Size } from 'src/common/interfaces';
import { Theme } from 'src/theme';
import { ThemedStyledProps } from 'styled-components';


export interface MenuBaseProps extends Omit<React.InputHTMLAttributes<HTMLUListElement>, 'value' | 'onChange' | 'size'>, Omit<FieldProps, 'error'> {
  size?: keyof typeof Size
}

export interface MenuItemBaseProps extends  Omit<React.InputHTMLAttributes<HTMLLIElement>, 'value' | 'onChange' | 'size'> {
  size?: keyof typeof Size;
  background?:boolean;
}

export type ThemeWithMenuBaseProps = ThemedStyledProps<MenuBaseProps,Theme>;
export type ThemeWithMenuItemBaseProps = ThemedStyledProps<MenuItemBaseProps, Theme>;