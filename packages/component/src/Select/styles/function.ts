import { Size } from 'src/common/interface';
import { DefaultTheme, Theme } from 'src/theme';
import { ThemedStyledProps } from 'styled-components';
import { SelectBaseProps } from '../interface';


export function selectBorderRadius(props: ThemedStyledProps<SelectBaseProps,Theme>) {
    if(!props.theme.borderRadius) return 0;
    return props.theme && props.theme.spacing ? props.theme.spacing.radius[0] : DefaultTheme.spacing.radius[0];
}

export function selectBorder(props: ThemedStyledProps<SelectBaseProps,Theme>) {
    return props.error ? props.theme.color.error : props.theme.color.transparent;
}

export function selectBorderSize(props: ThemedStyledProps<SelectBaseProps,Theme>) { return props.theme.spacing.fontSize[Size[props.size]];}