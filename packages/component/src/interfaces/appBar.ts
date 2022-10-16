import { ThemedStyledProps } from 'styled-components';
import { Theme } from 'src/theme';

export interface AppBarBaseProps {
    background?: string;
    transparent?: boolean; // 是否透明
    fixed?:boolean; // 是否吸附
    mobile?: boolean; // 是否是移动端
}

export type ThemeWithAppBarBaseProps = ThemedStyledProps<AppBarBaseProps,Theme>