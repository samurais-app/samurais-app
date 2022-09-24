import { complementaryColor, opacity } from '@frade-sam/samtools';
import { Size } from 'src/common/interface';
import { DefaultTheme, Theme } from 'src/theme';
import { ThemedStyledProps } from 'styled-components';
import { OptionBaseProps, OptionBoxBaseProps, SelectBaseProps } from '../interface';


export function selectBorderRadius(props: ThemedStyledProps<SelectBaseProps,Theme>) {
    if(!props.theme.borderRadius) return 0;
    return props.theme && props.theme.spacing ? props.theme.spacing.radius[0] : DefaultTheme.spacing.radius[0];
}

export function selectBorder(props: ThemedStyledProps<SelectBaseProps,Theme>) {
    return props.error ? props.theme.color.error : props.theme.color.transparent;
}

export function selectBorderSize(props: ThemedStyledProps<SelectBaseProps,Theme>) { return props.theme.spacing.fontSize[Size[props.size]];}

export function optionPadding(props: ThemedStyledProps<OptionBaseProps,Theme>) {
    return `${props.theme.spacing.padding[0]}px ${props.theme.spacing.padding[1]}px`;
}

export function optionBoxBorderRadius(props: ThemedStyledProps<OptionBoxBaseProps,Theme>) {
    if(!props.theme.borderRadius) return 0;
    return props.theme && props.theme.spacing ? props.theme.spacing.radius[0] : DefaultTheme.spacing.radius[0];
}

export function optionBoxShow(props: ThemedStyledProps<OptionBoxBaseProps,Theme>) {
    return opacity(complementaryColor(props.theme.color.background), 0.02);
}

export function optionBackground(type?: 'hover' | 'active') {
    return function (props: ThemedStyledProps<OptionBaseProps,Theme>) {
        if(!type) return props.theme.color.transparent;
        if(type === 'hover') return opacity(complementaryColor(props.theme.color.background), 0.05);
        return opacity(complementaryColor(props.theme.color.background), 0.1);
    };
}