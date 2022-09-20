import React from 'react';
import { FormContext } from './store/context';
import { FormStyled } from './Form.styled';
import { FormItem } from './FormItem';
import { FormStore } from './store';
import { useForm } from './useForm';

export type FormProps<D = any> = {
    form: FormStore<D>;
    children: JSX.Element | JSX.Element[];
}

Form.getKey = function () {
    return new Date().getTime().toString();
};

export default function Form(props: FormProps) {
    const { children, form } = props;

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.verification();
    }

    return (
        <FormStyled onSubmit={onSubmit}>
            <FormContext.Provider value={{ form }}>
                {children}
            </FormContext.Provider>
        </FormStyled>
    );
}

Form.Item = FormItem;
Form.useForm = useForm;