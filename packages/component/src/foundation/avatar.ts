import { ThemeWithAvatarBaseProps } from 'src/interfaces';
import { DefaultTheme } from 'src/theme';


export function avatarBorderRadius(props: ThemeWithAvatarBaseProps) {
    return props.circular ? '50%' : `${props.theme.spacing.radius[1]}px`;
}

export function avatarSize(props:ThemeWithAvatarBaseProps) {
    return `${props.size}px`;
}

export function avatarTextMarginLeft(props: ThemeWithAvatarBaseProps) {
    const theme = props?.theme ?? DefaultTheme;
    return `${theme.Size(theme.spacing.spacing[1])}${theme.unit}`;
}