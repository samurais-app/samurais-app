import { DefaultTheme, Theme } from 'src/theme';
import { ThemedStyledProps } from 'styled-components';
import { InputBaseProps, InputSize } from '../interface';

export function inputBorder(props: ThemedStyledProps<InputBaseProps,Theme>) {
    return props.error ? props.theme.color.error : props.theme.color.transparent;
}

export function inputBorderSize(props: ThemedStyledProps<InputBaseProps,Theme>) { return props.theme.spacing.fontSize[InputSize[props.size]];}

export function inputBorderRadius(props: ThemedStyledProps<InputBaseProps,Theme>) {
    if(!props.theme.borderRadius) return 0;
    return props.theme && props.theme.spacing ? props.theme.spacing.radius[0] : DefaultTheme.spacing.radius[0];
}