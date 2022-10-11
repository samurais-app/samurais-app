import { useRef } from 'react';
import Form from './Form';
import { FormContext, FormContextOption } from './store';

export function useForm<T = any>(options: Omit<FormContextOption<T>, 'name'>):[Pick<FormContext<T>, 'getContext'>] {
    const name = useRef(Form.getKey());
    const form = new FormContext({ ...options, name: name.current});
    return [form];
}