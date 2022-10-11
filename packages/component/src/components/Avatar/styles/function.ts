import { Theme } from 'src/theme';
import { ThemedStyledProps } from 'styled-components';
import { AvatarBaseProps } from '../interface';


export function avatarBorderRadius(props: ThemedStyledProps<Pick<AvatarBaseProps, 'circular' | 'size'>, Theme>) {
    return props.circular ? '50%' : `${props.theme.spacing.radius[1]}px`;
}

export function avatarSize(props: ThemedStyledProps<Pick<AvatarBaseProps, 'circular' | 'size'>, Theme>) {
    return `${props.size}px`;
}

export function avatarTextMarginLeft(props: ThemedStyledProps<Pick<AvatarBaseProps, 'circular' | 'size'>, Theme>) {
    return `${props.theme.spacing.spacing[1]}px`;
}