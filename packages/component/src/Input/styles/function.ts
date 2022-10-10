import { complementaryColor, opacity } from '@frade-sam/samtools';
import { Size } from 'src/common/interfaces';
import { DefaultTheme, Theme } from 'src/theme';
import { ThemedStyledProps } from 'styled-components';
import { InputBaseProps } from '../interface';

export function inputBorder(props: ThemedStyledProps<InputBaseProps,Theme>) {
    return props.error ? props.theme.color.error : props.theme.color.transparent;
}

export function inputPadding(props: ThemedStyledProps<InputBaseProps,Theme>) {
    const theme = props.theme ?? DefaultTheme;
    return `${theme.spacing.padding[0]}px ${theme.spacing.padding[1]}px`;
}

export function inputFontSize(props: ThemedStyledProps<InputBaseProps,Theme>) { return props.theme.spacing.fontSize[Size[props.size]];}

export function inputBorderRadius(props: ThemedStyledProps<InputBaseProps,Theme>) {
    if(!props.theme.borderRadius) return 0;
    return props.theme && props.theme.spacing ? props.theme.spacing.radius[0] : DefaultTheme.spacing.radius[0];
}

export function inputBgColor(props: ThemedStyledProps<InputBaseProps,Theme>) {
    return opacity(complementaryColor(props.theme.color.background), 0.05);
}