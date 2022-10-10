import React, { createContext } from 'react';
import { FormContext } from './store';
import { FormStyled } from './Form.styled';
import { FormItem } from './FormItem';
import { useForm } from './useForm';
import { useWatch } from './useWatch';

export const Context = createContext({});

export interface FormProps<D = any> extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'form'> {
    form: Pick<FormContext<D>, 'getContext'>;
    children: JSX.Element | JSX.Element[];
}

Form.getKey = function () {
    return new Date().getTime().toString();
};

export default function Form({
    form,
    children,
    ...props
}: FormProps) {

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        (form as unknown as Pick<FormContext, 'getContext' | 'verification'>).verification();
    }

    return (
        <FormStyled {...props} onSubmit={onSubmit}>
            <Context.Provider value={{ form }}>
                {children}
            </Context.Provider>
        </FormStyled>
    );
}

Form.Item = FormItem;
Form.useForm = useForm;
Form.useWatch = useWatch;