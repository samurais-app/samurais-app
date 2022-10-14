import { isArray, isFunc, isUndefined } from '@frade-sam/samtools';
import React, { useCallback, useMemo } from 'react';
import { Check } from '.';
import { CheckGroupBaseProps } from 'src/interfaces';
import { CheckGroupStyled } from './group.styled';

export interface CheckGroupProps extends CheckGroupBaseProps {
    children?: JSX.Element[] | JSX.Element;
}

export function CheckGroup({
    value,
    onChange,
    multiple = false,
    children = [],
    ..._props
}:CheckGroupProps) {

    const _value = useMemo(() => {
        if(!isArray(value)) return [];
        return value.filter((i) => !isUndefined(i));
    },[value]);

    const onCustomChange = useCallback((e: any, name: string) => {
        if(!isFunc(onChange)) return;
        let val = JSON.parse(JSON.stringify(_value));
        if(!e.target.value) {
            val = val.filter((v) => v!== name);
        } else {
            if(!val.includes(name)) {
                multiple ? val.push(name) : val=[name];
            };
        }
        e.target.value = val;
        onChange(e);
    }, [onChange, _value, multiple]);
    const childrens = useMemo(() => {
        if(!children || (!isArray(children) && !React.isValidElement(children))) return [];
        if(React.isValidElement(children)) return [children];
        return children;
    },[children]);

    return (
        <CheckGroupStyled {..._props}>
            {React.Children.map(childrens.filter((item) => item.type === Check && !!item.props.children), (item) => {
                return React.cloneElement(item, { value: Number(_value.includes(item.props.children)), onChange: (e) => onCustomChange(e, item.props.children) });
            })}
        </CheckGroupStyled>
    );
}