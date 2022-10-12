import { complementaryColor, opacity } from '@frade-sam/samtools';
import { Size } from '../common/interfaces';
import { ThemeWithCheckBaseProps, ThemeWithCheckGroupBaseProps } from '../interfaces';
import { DefaultTheme } from '../theme';


export function checkTextSpacing(props: ThemeWithCheckBaseProps) {
    const theme = props.theme ?? DefaultTheme;
    return `${theme.Size(theme.spacing.spacing[1])}${theme.unit}`;
}

export function checkSize(props: ThemeWithCheckBaseProps) {
    const theme = props.theme ?? DefaultTheme;
    return `${theme.Size(theme.spacing.spacing[Size[props.size] + 1])}${theme.unit}`;
}

export function checkBgColor(props: ThemeWithCheckBaseProps) {
    const theme = props.theme ?? DefaultTheme;
    return opacity(complementaryColor(theme.color.background), 0.1);
}

export function checkBorder(props: ThemeWithCheckBaseProps) {
    const theme = props.theme ?? DefaultTheme;
    return props.error ? theme.color.error : theme.color.transparent;
}

export function checkActiveColor(props: ThemeWithCheckBaseProps) {
    return props.theme.color.primary;
}


export function checkBorderRadius(props: ThemeWithCheckBaseProps) {
    const theme = props.theme ?? DefaultTheme;
    if(!theme.borderRadius) return 0;
    return `${theme.Size(props.theme.spacing.radius[0])}${theme.unit}`;
}

export function checkGroupItemMargin(props: ThemeWithCheckGroupBaseProps) {
    const theme = props.theme ?? DefaultTheme;
    return `${theme.Size(theme.spacing.spacing[2])}${theme.unit}`;
}