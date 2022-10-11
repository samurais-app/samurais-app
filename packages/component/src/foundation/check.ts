import { complementaryColor, opacity } from '@frade-sam/samtools';
import { Size } from '../common/interfaces';
import { mobileSize, mobileUnit } from '../common/utils';
import { ThemeWithCheckBaseProps, ThemeWithCheckGroupBaseProps } from '../interfaces';
import { DefaultTheme } from '../theme';


export function checkTextSpacing(props: ThemeWithCheckBaseProps) {
    const theme = props.theme ?? DefaultTheme;
    return `${mobileSize(theme.spacing.spacing[1], theme.size, theme.mobile)}${mobileUnit(theme.mobile)}`;
}

export function checkSize(props: ThemeWithCheckBaseProps) {
    const theme = props.theme ?? DefaultTheme;
    return `${mobileSize(props.theme.spacing.spacing[Size[props.size] + 1], theme.size, theme.mobile)}${mobileUnit(theme.mobile)}`;
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
    if(!props.theme.borderRadius) return 0;
    return props.theme && props.theme.spacing ? props.theme.spacing.radius[0] : DefaultTheme.spacing.radius[0];
}

export function checkGroupItemMargin(props: ThemeWithCheckGroupBaseProps) {
    const theme = props.theme ?? DefaultTheme;
    return theme.spacing.spacing[2];
}