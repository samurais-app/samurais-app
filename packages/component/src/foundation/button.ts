import { color } from '@frade-sam/samtools';
import { Size } from 'src/common/interfaces';
import { DefaultTheme, Theme } from 'src/theme';
import { ThemeWithButtonBaseProps } from 'src/interfaces';

export function backgroundColor(num?: number) {
    return function(props: ThemeWithButtonBaseProps) {
        const theme = props.theme ?? DefaultTheme;
        return theme.color.primary ? color(theme.color.primary, num) : theme.color.transparent;
    };
}

export function buttonPadding(props: ThemeWithButtonBaseProps) {
    const theme = props.theme ?? DefaultTheme;
    const pad:Record<keyof typeof Size, string> = {
        small: `${theme.spacing.padding[0]}px ${theme.spacing.padding[2]}px`,
        middle: `${theme.spacing.padding[1]}px ${theme.spacing.padding[3]}px`,
        large: `${theme.spacing.padding[2]}px ${theme.spacing.padding[4]}px`,
    };

    return `${pad[props.size]}`;
}


export function buttonBorderRadius(props: ThemeWithButtonBaseProps) {
    const theme = props.theme ?? DefaultTheme;
    if(!theme.borderRadius) return 0;
    return `${theme.Size(theme.spacing.radius[1])}${theme.unit}`;
}