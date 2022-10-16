import { ThemedStyledProps } from 'styled-components';

export interface ThemeColor {
    primary?: string;
    background?: string;
    transparent?: string;
    error?: string;
}

export type Size = (num: number) => number;


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
    Size?: Size;
    borderRadius?:boolean;
    color?: ThemeColor;
    spacing?: ThemeSpacing;
}

export type ThemeWithAnyProps<P = any> = ThemedStyledProps<P,Theme>;