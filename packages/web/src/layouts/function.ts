import { Theme } from '@samurais-app/components';
import { ThemedStyledProps } from 'styled-components';


export function layoutExtendsMarginLeft(props: ThemedStyledProps<any,Theme>) {
    return `${props.theme?.spacing?.spacing[4] || 4}px`;
}