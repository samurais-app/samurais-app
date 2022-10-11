import { complementaryColor, opacity } from '@frade-sam/samtools';
import { Size } from 'src/common/interfaces';
import { ThemeWithInputBaseProps } from 'src/interfaces';
import { DefaultTheme } from 'src/theme';

export function inputBorder(props: ThemeWithInputBaseProps) {
    return props.error ? props.theme.color.error : props.theme.color.transparent;
}

export function inputPadding(props: ThemeWithInputBaseProps) {
    const theme = props.theme ?? DefaultTheme;
    const top = theme.mobile ? theme.spacing.padding[0]/theme.size : theme.spacing.padding[0];
    const left = theme.mobile ? theme.spacing.padding[1]/theme.size : theme.spacing.padding[1];
    return `${top}${theme.unit} ${left}${theme.unit}`;
}

export function inputFontSize(props: ThemeWithInputBaseProps) {
    const theme = props.theme ?? DefaultTheme;
    const size = theme.mobile ? theme.spacing.fontSize[Size[props.size]]/theme.size : theme.spacing.fontSize[Size[props.size]];
    return `${size}${theme.unit}`;
}

export function inputBorderRadius(props: ThemeWithInputBaseProps) {
    const theme = props.theme ?? DefaultTheme;
    if(!props.theme.borderRadius) return 0;
    const size = theme.mobile ? theme.spacing.radius[0]/theme.size : theme.spacing.radius[0];
    return `${size}${theme.unit}`;
}

export function inputBgColor(props: ThemeWithInputBaseProps) {
    return opacity(complementaryColor(props.theme.color.background), 0.05);
}