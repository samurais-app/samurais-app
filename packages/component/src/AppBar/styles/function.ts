import { Theme } from 'src/theme';
import { ThemedStyledProps } from 'styled-components';
import { AppBarBaseProps } from '../interface';


export function padding(props: ThemedStyledProps<AppBarBaseProps,Theme>) {
    return `${props.theme.spacing.padding[0]}px ${props.theme.spacing.padding[2]}px`;
}

export function fixed(props: AppBarBaseProps) {
    return props.fixed ? 'fixed': '';
}