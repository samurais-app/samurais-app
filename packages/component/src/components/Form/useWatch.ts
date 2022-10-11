import { useEffect,  useState } from 'react';
import { FormContext } from './store';


export function useWatch<T = any>(name: string, store: Pick<FormContext<T>, 'getContext'>) {
    const [value, setValue] = useState();
    function onChangeField(e) {
        setValue(e);
    }

    useEffect(() => {
        const field = store.getContext(name);
        field.addEventListener('change', onChangeField);
        return () => {
            field.removeEventListener('change', onChangeField);
        };
    }, [store, name]);
    return value;
}