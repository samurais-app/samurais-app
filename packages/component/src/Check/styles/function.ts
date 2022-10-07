import { complementaryColor, opacity } from '@frade-sam/samtools';
import { Size } from 'src/common/interfaces';
import { DefaultTheme, Theme } from 'src/theme';
import { ThemedStyledProps } from 'styled-components';
import { CheckBaseProps } from '../interface';


export function checkTextSpacing(props: ThemedStyledProps<CheckBaseProps,Theme>) {
    return props.theme.spacing.padding[0];
}

export function checkSize(props: ThemedStyledProps<CheckBaseProps,Theme>) {
    return props.theme.spacing.spacing[Size[props.size] + 1];
}

export function checkBgColor(props: ThemedStyledProps<CheckBaseProps,Theme>) {
    return opacity(complementaryColor(props.theme.color.background), 0.1);
}

export function checkBorder(props: ThemedStyledProps<CheckBaseProps,Theme>) {
    return props.error ? props.theme.color.error : props.theme.color.transparent;
}

export function checkActiveColor(props: ThemedStyledProps<CheckBaseProps,Theme>) {
    return props.theme.color.primary;
}


export function checkBorderRadius(props: ThemedStyledProps<CheckBaseProps,Theme>) {
    if(!props.theme.borderRadius) return 0;
    return props.theme && props.theme.spacing ? props.theme.spacing.radius[0] : DefaultTheme.spacing.radius[0];
}