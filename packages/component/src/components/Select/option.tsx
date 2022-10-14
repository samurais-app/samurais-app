import { isArray, isFunc } from '@frade-sam/samtools';
import React, { useMemo } from 'react';
import { OptionBaseProps, OptionBoxBaseProps } from 'src/interfaces';
import { OptionBoxStyled, OptionsStyled, OptionStyled } from './option.styled';

export interface OptionProps extends OptionBaseProps {
    children: string;
    icon?:JSX.Element;
    onClick?: (event: any) => void;
}

/**
 * option选项
 * @param props 
 * @returns 
 */
export function Option(props: OptionProps) {
    const { value, children,size = 'middle', ..._props } = props;
    return (
        <OptionStyled size={size} className={props.isActive ? 'active' : ''} value={value} {..._props}>{children}</OptionStyled>
    );
}


export interface OptionBoxProps extends OptionBoxBaseProps {
    children?: JSX.Element | JSX.Element[]
    onChange?: (value: number | string) => void;
}
export const OptionBox = React.forwardRef(({ children, onChange, size = 'middle', ..._props }: OptionBoxProps, ref: any) => {

    const onClick = (event: any, callback?: any) => {
        if (isFunc(onChange)) onChange(event);
        if (isFunc(callback)) callback(event);
    };

    const childrens = useMemo(() => {
        const childs: JSX.Element[] = isArray(children) ? children : [children];
        return React.Children.map(childs.filter(Boolean), (child) => {
            if (child.type !== Option) return null;
            return React.cloneElement(child, { onClick: (event) => onClick(event, child.props.onClick), size, isActive: child.props.value == _props.value });
        });
    }, [children, _props.value, size]);

    return (<OptionBoxStyled ref={ref} {..._props}><OptionsStyled>{childrens}</OptionsStyled></OptionBoxStyled>);
});