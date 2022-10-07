import { isFunc } from '@frade-sam/samtools';
import React, { useMemo, useCallback } from 'react';
import { CheckBaseProps } from './interface';
import { CheckBox, CheckBoxContainer, CheckText } from './styles';

export interface CheckProps extends CheckBaseProps {
    children?: string;
}

export function Check({children, value, onChange, multiple = false, size = 'middle'}:Omit<CheckProps, 'active'>) {
    const _value = useMemo(() => {
        if(!multiple) return !!value;
        return value == children;
    }, [value, multiple, children]);

    const onClick = useCallback((event) => {
        if(!isFunc(onChange)) return;
        if(!multiple) {
            event.target.value = Number(!_value);
        } else {
            event.target.value = _value ? '' : _value;
        }
        onChange(event);
    },[_value, onChange]);
    return (
        <CheckBoxContainer value={value} onClick={onClick}>
            <CheckBox size={size} multiple={multiple} active={_value} />
            {children? <CheckText size={size}>{children}</CheckText> : null}
        </CheckBoxContainer>
    );
}