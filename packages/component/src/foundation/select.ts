import { complementaryColor, completionHex, opacity } from '@frade-sam/samtools';
import { Size } from 'src/common/interfaces';
import { DefaultTheme, ThemeWithAnyProps } from 'src/theme';
import { ThemeWithOptionBaseProps, ThemeWithOptionBoxBaseProps, ThemeWithSelectBaseProps } from 'src/interfaces';

export function selectPadding(props: ThemeWithSelectBaseProps) {
    const theme = props.theme ?? DefaultTheme;
    const top = theme.mobile ? theme.spacing.padding[0]/theme.size : theme.spacing.padding[0];
    const left = theme.mobile ? theme.spacing.padding[1]/theme.size : theme.spacing.padding[1];
    return `${top}${theme.unit} ${left}${theme.unit}`;
}

export function selectBorderRadius(props: ThemeWithSelectBaseProps) {
    if(!props.theme.borderRadius) return 0;
    const theme = props.theme ?? DefaultTheme;
    const size = theme.mobile ? theme.spacing.radius[0]/theme.size : theme.spacing.radius[0];
    return `${size}${theme.unit}`;
}

export function selectBorder(props: ThemeWithSelectBaseProps) {
    return props.error ? props.theme.color.error : props.theme.color.transparent;
}

export function selectFontSize(props: ThemeWithAnyProps) {
    const theme = props.theme ?? DefaultTheme;
    console.log(theme);
    const size = theme.mobile ? theme.spacing.fontSize[Size[props.size]]/theme.size : theme.spacing.fontSize[Size[props.size]];
    return  `${size}${theme.unit}`;
}

export function optionPadding(props: ThemeWithOptionBaseProps) {
    const theme = props.theme ?? DefaultTheme;
    const top = theme.mobile ? theme.spacing.padding[0]/theme.size : theme.spacing.padding[0];
    const left = theme.mobile ? theme.spacing.padding[1]/theme.size : theme.spacing.padding[1];
    return `${top}${theme.unit} ${left}${theme.unit}`;
}

export function optionBoxBorderRadius(props: ThemeWithOptionBoxBaseProps) {
    const theme = props.theme ?? DefaultTheme;
    if(!props.theme.borderRadius) return 0;
    const size = theme.mobile ? theme.spacing.radius[0]/theme.size : theme.spacing.radius[0];
    return `${size}${theme.unit}`;
}

export function optionBoxShow(props: ThemeWithOptionBoxBaseProps) {
    return opacity(complementaryColor(props.theme.color.background), 0.05);
}

export function optionBackground(type?: 'hover' | 'active') {
    return function (props: ThemeWithOptionBaseProps) {
        if(!type) return props.theme.color.transparent;
        if(type === 'hover') return opacity(completionHex(props.theme.color.primary), 0.05);
        return opacity(completionHex(props.theme.color.primary), 0.1);
    };
}

export function selectBgColor(props: ThemeWithSelectBaseProps) {
    return opacity(complementaryColor(props.theme.color.background), 0.05);
}