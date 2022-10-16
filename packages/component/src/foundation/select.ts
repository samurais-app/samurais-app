import { complementaryColor, completionHex, opacity } from '@frade-sam/samtools';
import { Size } from 'src/common/interfaces';
import { DefaultTheme, ThemeWithAnyProps } from 'src/theme';
import { ThemeWithOptionBaseProps, ThemeWithOptionBoxBaseProps, ThemeWithSelectBaseProps } from 'src/interfaces';

export function selectPadding(props: ThemeWithSelectBaseProps) {
    const theme = props.theme ?? DefaultTheme;
    return `${theme.Size(theme.spacing.padding[0])}${theme.unit} ${theme.Size(theme.spacing.padding[1])}${theme.unit}`;
}

export function selectBorderRadius(props: ThemeWithSelectBaseProps) {
    if(!props.theme.borderRadius) return 0;
    const theme = props.theme ?? DefaultTheme;
    return `${theme.Size(theme.spacing.radius[0])}${theme.unit}`;
}

export function selectBorder(props: ThemeWithSelectBaseProps) {
    return props.error ? props.theme.color.error : props.theme.color.transparent;
}

export function selectFontSize(props: ThemeWithAnyProps) {
    const theme = props.theme ?? DefaultTheme;
    return `${theme.Size(theme.spacing.fontSize[Size[props.size]])}${theme.unit}`;
}

export function optionPadding(props: ThemeWithOptionBaseProps) {
    const theme = props.theme ?? DefaultTheme;
    return `${theme.Size(theme.spacing.padding[0])}${theme.unit} ${theme.Size(theme.spacing.padding[1])}${theme.unit}`;
}

export function optionBoxBorderRadius(props: ThemeWithOptionBoxBaseProps) {
    const theme = props.theme ?? DefaultTheme;
    if(!theme.borderRadius) return 0;
    return `${theme.Size(theme.spacing.radius[0])}${theme.unit}`;
}

export function optionBoxShow(props: ThemeWithOptionBoxBaseProps) {
    return opacity(complementaryColor(props.theme.color.background), 0.05);
}

export function optionBackground(type?: 'hover' | 'active') {
    return function (props: ThemeWithOptionBaseProps) {
        const theme = props.theme ?? DefaultTheme;
        if(!type) return theme.color.transparent;
        if(type === 'hover') return opacity(completionHex(theme.color.primary), 0.05);
        return opacity(completionHex(theme.color.primary), 0.1);
    };
}

export function selectBgColor(props: ThemeWithSelectBaseProps) {
    const theme = props.theme ?? DefaultTheme;
    return opacity(complementaryColor(theme.color.background), 0.05);
}