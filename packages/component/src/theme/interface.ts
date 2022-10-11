import { ThemedStyledProps } from 'styled-components';

export interface ThemeColor {
    primary?: string;
    background?: string;
    transparent?: string;
    error?: string;
}


export interface ThemeSpacing {
    fontSize?: [number, number, number, number, number],
    radius?: [number, number, number, number, number],
    spacing?: [number, number, number, number, number],
    padding?:[number, number, number, number, number]
}


export interface Theme {
    size?: number;
    mobile?: boolean;
    unit?: string;
    borderRadius?:boolean;
    color?: ThemeColor;
    spacing?: ThemeSpacing;
}

export type ThemeWithAnyProps = ThemedStyledProps<any,Theme>;