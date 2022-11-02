import { color, completionHex, opacity } from '@frade-sam/samtools';
import { Size } from 'src/common/interfaces';
import { ThemeWithMenuBaseProps, ThemeWithMenuItemBaseProps } from 'src/interfaces';
import { ThemeWithAnyProps, DefaultTheme } from 'src/theme';

export function menuRadius(props:ThemeWithMenuBaseProps | ThemeWithMenuItemBaseProps) {
    const theme = props?.theme ?? DefaultTheme;
    return `${theme.Size(theme.spacing.radius[0])}${theme.unit}`;
}

export function menuBackgroundColor(num: number) {
    return function (props:ThemeWithMenuBaseProps | ThemeWithMenuItemBaseProps) {
        const theme = props?.theme ?? DefaultTheme;
        return color(theme.color.background, num);
    };
}

export function menuBoxShadow(props:ThemeWithMenuBaseProps | ThemeWithMenuItemBaseProps) {
    const theme = props?.theme ?? DefaultTheme;
    return `0px 0px 10px 2px ${color(theme.color.background, 0.03, true)}`;
}

export function menuItemPadding(props: ThemeWithMenuItemBaseProps) {
    const theme = props.theme ?? DefaultTheme;
    return `${theme.Size(theme.spacing.padding[0])}${theme.unit} ${theme.Size(theme.spacing.padding[1])}${theme.unit}`;
}

export function menuItemBackground(type?: 'hover' | 'active') {
    return function (props: ThemeWithMenuItemBaseProps) {
        const theme = props.theme ?? DefaultTheme;
        if(!type || !props.background) return theme.color.transparent;
        if(type === 'hover') return opacity(completionHex(theme.color.primary), 0.05);
        return opacity(completionHex(theme.color.primary), 0.1);
    };
}


export function menuFontSize(scale = 0) {
    return function (props: ThemeWithAnyProps) {
        const theme = props.theme ?? DefaultTheme;
        return `${theme.Size(theme.spacing.fontSize[Size[props.size]]- scale)}${theme.unit}`;
    };
}