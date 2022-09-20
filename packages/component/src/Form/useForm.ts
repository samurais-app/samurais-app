import { useRef } from 'react';
import Form from './Form';
import { FormStore, FormStoreOption } from './store';

export function useForm<T = any>(options: Omit<FormStoreOption<T>, 'name'>) {
    const name = useRef(Form.getKey());
    const form = new FormStore({ ...options, name: name.current});
    return [form];
}