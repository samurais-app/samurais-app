import { isFunc } from '@frade-sam/samtools';
import React, { useCallback } from 'react';
import { CheckGroup } from './group';
import { CheckBaseProps } from 'src/interfaces';
import { CheckBox, CheckBoxContainer, CheckText } from './index.styled';

export interface CheckProps extends CheckBaseProps {
    children?: string;
}

export function Check({children, value = false, onChange, multiple = false, size = 'middle'}:Omit<CheckProps, 'active'>) {

    const onClick = useCallback((event) => {
        if(!isFunc(onChange)) return;
        event.target.value = Number(!value);
        onChange(event);
    },[value, onChange]);
    return (
        <CheckBoxContainer value={value} onClick={onClick}>
            <CheckBox size={size} multiple={multiple} active={value} />
            {children? <CheckText size={size}>{children}</CheckText> : null}
        </CheckBoxContainer>
    );
}

Check.Group = CheckGroup;