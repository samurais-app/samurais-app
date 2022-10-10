/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useLayoutEffect, useState } from 'react';
import { Field, FieldComponent, FieldContext } from './store';
import { FormItemStyled } from './FormItem.styled';
import { FieldOption } from './store/interface';
import { Context } from './Form';

export interface FormItemProps extends Partial<Omit<FieldOption, 'focus' | 'value'>> {
    children: JSX.Element;
}

export function FormItem(props: FormItemProps) {
    const { name, children, rules = [] } = props;
    const { form } = useContext(Context) as any;
    if (!props.children || !form) return null;
    const context = form.createContext({
        name,
        rules,
        focus: false,
        value: children.props.value || '',
    });
    const [error, setError] = useState(context.field.error);
    function onFieldError(this: FieldContext, field: Field) {
        setError(field.error);
    }
    useLayoutEffect(() => {
        context.addEventListener('error', onFieldError);
    }, [name]);
    return (
        <FormItemStyled error={error}>
            <FieldComponent context={context}>
                {children}
            </FieldComponent>
        </FormItemStyled>
    );
}