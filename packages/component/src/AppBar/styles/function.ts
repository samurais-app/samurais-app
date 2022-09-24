import { complementaryColor, opacity } from '@frade-sam/samtools';
import { Theme } from 'src/theme';
import { ThemedStyledProps } from 'styled-components';
import { AppBarBaseProps } from '../interface';


export function padding(props: ThemedStyledProps<AppBarBaseProps,Theme>) {
    return `${props.theme.spacing.padding[1]}px ${props.theme.spacing.padding[4]}px`;
}

export function fixed(props: AppBarBaseProps) {
    return props.fixed ? 'fixed': '';
}

export function appBarBlur(props: AppBarBaseProps) {
    return props.transparent ? 'blur(12px)':'blur(0px)';
}

export function appBarBackground(props: ThemedStyledProps<AppBarBaseProps, Theme>) {
    if(props.transparent) return opacity(complementaryColor(props.theme.color.background), 0.01);
    return props.background ? props.background : 'transparent';
}