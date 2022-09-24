import { isArray, isFunc } from '@frade-sam/samtools';
import React, { useMemo } from 'react';
import { OptionBaseProps, OptionBoxBaseProps } from './interface';
import { OptionBoxStyled, OptionStyled } from './styles';

export interface OptionProps extends OptionBaseProps {
    children: string;
    onClick?:(event: any) => void;
}

/**
 * option选项
 * @param props 
 * @returns 
 */
export function Option(props: OptionProps) {
    const {value, children, ..._props} = props;
    console.log(props);
    return (
        <OptionStyled className={props.isActive ? 'active' : ''} value={value} {..._props}>{children}</OptionStyled>
    );
}


export interface OptionBoxProps extends OptionBoxBaseProps {
    children?:JSX.Element | JSX.Element[]
    onChange?: (value: number | string) => void;
}
export const OptionBox = React.forwardRef((props:OptionBoxProps, ref: any) => {
    const { children, onChange, ..._props } = props;

    const onClick = (event: any, value: any, callback?: any) => {
        if(isFunc(onChange)) onChange(value);
        if(isFunc(callback)) callback(event);
    };
    console.log(props);
    const childrens = useMemo(() => {
        const childs:JSX.Element[] = isArray(children) ? children : [children];
        return React.Children.map(childs.filter(Boolean), (child) => {
            if(child.type !== Option) return null;
            return React.cloneElement(child, { onClick: (event) => onClick(event, child.props.value, child.props.onClick), isActive: child.props.value === props.value});
        });
    }, [children, props.value]);

    return (<OptionBoxStyled ref={ref} {..._props}>{childrens}</OptionBoxStyled>);
});