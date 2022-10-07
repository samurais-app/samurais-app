import React, { useCallback, useEffect, useMemo, useLayoutEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { flip, offset, shift, useFloating } from '@floating-ui/react-dom';
import { SelectBaseProps } from './interface';
import { OptionBox, Option } from './Option';
import { SelectInputStyled, SelectStyled } from './styles';
import { isArray } from '@frade-sam/samtools';

export interface SelectProps extends SelectBaseProps {
    onChange?: (value: any) => void;
    children?: JSX.Element | JSX.Element[];
}

export function Select({ size = 'middle', onChange: _onChange, children, ..._props }: SelectProps) {
    const [visible, setVisible] = useState(false);
    const [show, setShow] = useState(false);
    const { refs, reference, floating, strategy, update, x, y } = useFloating({
        placement: 'bottom-start',
        strategy: 'fixed',
        middleware: [offset(8), shift(), flip()],
    });
    const items = useMemo(() => {
        if(React.isValidElement(children) || !isArray(children)) return [];
        if(React.isValidElement(children)) return [children].filter((item: JSX.Element) => item.type === Option);
        return children.filter((item) => item.type === Option);
    }, [children]);

    const value = useMemo(() => {
        return items.find((item) => item.props.value == _props.value)?.props.children || '';
    },[_props.value, items]);

    const onClick = useCallback(() => {
        if(!visible) { setVisible(true); } else {
            setShow(!show);
        }
    }, [visible, show]);

    const onChange = useCallback((e) => {
        _onChange(e);
        setShow(false);
    }, [show, _onChange]);

    useEffect(() => {
        if (!refs.reference || !refs.reference.current) return;
        window.addEventListener('scroll', update);
        window.addEventListener('resize', update);
        return () => {
            window.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, [refs.reference.current, update]);


    useLayoutEffect(() => {
        if(visible) {
            setShow(true);
        }
    }, [visible]);

    return (
        <React.Fragment>
            <SelectStyled size={size} onClick={onClick} ref={reference} {..._props}>
                <SelectInputStyled value={value} placeholder={_props.placeholder} disabled />
            </SelectStyled>
            {visible && ReactDOM.createPortal(
                <OptionBox
                    show={show}
                    ref={floating}
                    value={_props.value}
                    width={refs.reference?.current?.getBoundingClientRect().width}
                    position={strategy}
                    top={y ?? 0}
                    left={x ?? 0}
                    onChange={onChange}
                >
                    {items}
                </OptionBox>,
                document.body)}
        </React.Fragment>
    );
}

Select.Option = Option;