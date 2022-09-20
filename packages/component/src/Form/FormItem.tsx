/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from 'react';
import { FormContext, Field, FieldComponent, FieldContext } from './store';
import { FormItemStyled } from './FormItem.styled';
import { FieldOption } from './store/interface';

export interface FormItemProps extends Partial<Omit<FieldOption, 'focus' | 'value'>> {
    children: JSX.Element;
}

export function FormItem(props: FormItemProps) {
    const { name, children, rules = [], dependent = [] } = props;
    const { form } = useContext(FormContext);
    if (!props.children || !form) return null;
    const context = form.createContext(new Field({
        name,
        rules,
        focus: false,
        value: children.props.value || '',
    }));
    const [error, setError] = useState(context.field.error);
    context.dependents(dependent);
    function onFieldError(this: FieldContext, field: Field) {
        setError(field.error);
    }
    context.addEventListener('error', onFieldError);
    return (
        <FormItemStyled error={error}>
            <FieldComponent context={context}>
                {children}
            </FieldComponent>
        </FormItemStyled>
    );
}