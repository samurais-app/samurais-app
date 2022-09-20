
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
    borderRadius?:boolean;
    color?: ThemeColor;
    spacing?: ThemeSpacing;
}
