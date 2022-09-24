import React, { useCallback, useEffect } from 'react';
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
    const { refs, reference, floating, strategy, update, x, y } = useFloating({
        placement: 'bottom-start',
        strategy: 'fixed',
        middleware: [offset(5), shift(), flip()],
    });

    const onClick = useCallback(() => {
        return;
    }, []);

    useEffect(() => {
        if (refs.reference && refs.reference.current) {
            window.addEventListener('scroll', update);
            window.addEventListener('resize', update);
            return () => {
                window.removeEventListener('scroll', update);
                window.removeEventListener('resize', update);
            };
        }
    }, [refs.reference.current, update]);
    return (
        <SelectStyled size={size} onClick={onClick} ref={reference} {..._props}>
            <SelectInputStyled placeholder={props.placeholder} disabled />
            {ReactDOM.createPortal(
                <OptionBox
                    ref={floating}
                    value={props.value}
                    width={refs.reference?.current?.getBoundingClientRect().width}
                    position={strategy}
                    top={y ?? 0}
                    left={x ?? 0}
                    onChange={onChange}
                >
                    {props.children}
                </OptionBox>,
                document.getElementById('app'))}
        </SelectStyled>
    );
}

Select.Option = Option;