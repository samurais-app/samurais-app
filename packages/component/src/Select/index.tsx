import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { flip, offset, shift, useFloating } from '@floating-ui/react-dom';
import { SelectBaseProps } from './interface';
import { OptionBox, Option } from './Option';
import { SelectInputStyled, SelectStyled } from './styles';

export interface SelectProps extends SelectBaseProps {
    onChange?: (value: any) => void;
    children?: JSX.Element | JSX.Element[];
}

export function Select(props: SelectProps) {
    const { size = 'middle', onChange, children, ..._props } = props;
    const [visible, setVisible] = useState(false);
    const [show, setShow] = useState(false);
    const { refs, reference, floating, strategy, update, x, y } = useFloating({
        placement: 'bottom-start',
        strategy: 'fixed',
        middleware: [offset(5), shift(), flip()],
    });

    const onClick = useCallback(() => {
        setShow(!show);
        if(visible) return;
        setVisible(!visible);
    }, [visible, show]);

    useEffect(() => {
        if (!refs.reference || !refs.reference.current) return;
        window.addEventListener('scroll', update);
        window.addEventListener('resize', update);
        return () => {
            window.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, [refs.reference.current, update]);
    return (
        <React.Fragment>
            <SelectStyled size={size} onClick={onClick} ref={reference} {..._props}>
                <SelectInputStyled placeholder={props.placeholder} disabled />
            </SelectStyled>
            {visible && ReactDOM.createPortal(
                <OptionBox
                    show={show}
                    ref={floating}
                    value={props.value}
                    onAnimationEnd={(e) => {
                        console.log(e.target, e.currentTarget);
                    }}
                    width={refs.reference?.current?.getBoundingClientRect().width}
                    position={strategy}
                    top={y ?? 0}
                    left={x ?? 0}
                    onChange={onChange}
                >
                    {props.children}
                </OptionBox>,
                document.body)}
        </React.Fragment>
    );
}

Select.Option = Option;