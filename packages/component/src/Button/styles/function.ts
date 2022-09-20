import { color } from '@frade-sam/samtools';
import { Size } from 'src/common/interface';
import { DefaultTheme, Theme } from 'src/theme';
import { ThemedStyledProps } from 'styled-components';
import { ButtonBaseProps } from '../interface';

export function backgroundColor(num?: number) {
    return function(props: ThemedStyledProps<ButtonBaseProps,Theme>) {
        return props.theme.color.primary ? color(props.theme.color.primary, num) : props.theme.color.transparent;
    };
}

export function padding(props: ThemedStyledProps<ButtonBaseProps,Theme>) {
    const pad:Record<Size, string> = {
        small: `${props.theme.spacing.padding[0]}px ${props.theme.spacing.padding[2]}px`,
        middle: `${props.theme.spacing.padding[1]}px ${props.theme.spacing.padding[3]}px`,
        large: `${props.theme.spacing.padding[2]}px ${props.theme.spacing.padding[4]}px`,
    }; 

    return `${pad[props.size]}`;
}


export function buttonBorderRadius(props: ThemedStyledProps<ButtonBaseProps,Theme>) {
    if(!props.theme.borderRadius) return 0;
    return props.theme && props.theme.spacing ? props.theme.spacing.radius[1] : DefaultTheme.spacing.radius[1];
}