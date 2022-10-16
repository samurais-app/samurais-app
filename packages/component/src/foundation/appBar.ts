import { completionHex, opacity } from '@frade-sam/samtools';
import { AppBarBaseProps, ThemeWithAppBarBaseProps } from 'src/interfaces';
import { DefaultTheme } from 'src/theme';


export function padding(props: ThemeWithAppBarBaseProps) {
    const theme = props?.theme ?? DefaultTheme;
    return `${theme.Size(theme.spacing.padding[1])}${theme.unit} ${theme.Size(theme.spacing.padding[4])}${theme.unit}`;
}

export function fixed(props: AppBarBaseProps) {
    return props.fixed ? 'fixed': '';
}

export function appBarBlur(props: AppBarBaseProps) {
    return props.transparent ? 'blur(12px)':'blur(0px)';
}

export function appBarBackground(props: ThemeWithAppBarBaseProps) {
    if(props.transparent) return opacity(completionHex(props.theme.color.background), 0.01);
    return props.background ? props.background : 'transparent';
}

export function navigationPadding(props: ThemeWithAppBarBaseProps) {
    const theme = props?.theme ?? DefaultTheme;
    return `0${theme.unit} ${theme.Size(theme.spacing.padding[1])}${theme.unit}`;
}