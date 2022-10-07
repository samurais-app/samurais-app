import { flip, offset, ReferenceType, shift, Strategy, useFloating } from '@floating-ui/react-dom';
import { isFunc } from '@frade-sam/samtools';
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Option, SearchParams, SelectBaseProps } from './interface';



export function usePosition(): [
    (node: ReferenceType) => void,
    (node: HTMLElement) => void,
    {
        reference: React.MutableRefObject<ReferenceType>;
        floating: React.MutableRefObject<HTMLElement>;
    },
    {
        position: Strategy;
        top: number;
        left: number;
        width: number;
    }] {
    const { refs, reference, floating, strategy, update, x, y } = useFloating({
        placement: 'bottom-start',
        strategy: 'fixed',
        middleware: [offset(8), shift(), flip()],
    });
    useEffect(() => {
        if (!refs.reference || !refs.reference.current) return;
        window.addEventListener('scroll', update);
        window.addEventListener('resize', update);
        return () => {
            window.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, [refs.reference.current, update]);
    return [reference, floating, refs, {
        position: strategy,
        top: y ?? 0,
        left: x ?? 0,
        width: refs.reference?.current?.getBoundingClientRect().width ?? 0,
    }];
}

export function useSelect(value: any, {
    options,
    onChange: _onChange,
}: Pick<SelectBaseProps, 'options' | 'onChange'>) {
    const [visible, setVisible] = useState(false);
    const [show, setShow] = useState(false);

    const name = useMemo(() => {
        return options.find((item) => item.value == value)?.name || '';
    }, [value, options]);

    const onClick = useCallback(() => {
        if (!visible) { setVisible(true); } else {
            setShow(!show);
        }
    }, [visible, show]);

    const onChange = useCallback((e) => {
        _onChange(e);
        setShow(false);
    }, [show, _onChange]);

    const close = () => setShow(false);

    useLayoutEffect(() => {
        if (visible) {
            setShow(true);
        }
    }, [visible]);

    return {
        visible,
        show,
        name,
        value,
        close,
        onClick,
        onChange,
    };
}

export function useSearch({
    options: data,
    fetch
}: Pick<SelectBaseProps, 'options' | 'fetch'>) {
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState<Option[]>(data);
    const [params, setParams] = useState<SearchParams>({ page: 1, size: 10, search: '' });

    const onSearch = useCallback((search: string) => {
        if (!isFunc(fetch)) return;
        setParams({ ...params, search });
        setLoading(true);
        fetch({ ...params, search })
            .then((res) => {
                setLoading(false);
                setOptions(res);
            })
            .catch(() => {
                setLoading(false);
                setOptions([]);
            });
    }, [params]);
    return {
        loading,
        options,
        onSearch,
    };
}