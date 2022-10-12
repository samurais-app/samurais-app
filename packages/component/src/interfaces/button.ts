import { Size } from 'src/common/interfaces';
import { ThemedStyledProps } from 'styled-components';
import { Theme } from 'src/theme';

export enum borderRadiusSize {
    small = 14,
    middle = 18,
    large = 24
}

export interface ButtonBaseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: keyof typeof Size;
}


export type ThemeWithButtonBaseProps = ThemedStyledProps<ButtonBaseProps, Theme>;