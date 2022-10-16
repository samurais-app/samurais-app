import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { isArray } from '@frade-sam/samtools';
import { SelectBaseProps } from 'src/interfaces';
import { OptionBox, Option } from './option';
import { SelectInputStyled, SelectStyled } from './index.styled';
import { usePosition, useSearch, useSelect } from './hooks';
import { useClickAwayListener } from 'src/common/hooks';

export interface SelectProps extends SelectBaseProps {
    children?: JSX.Element | JSX.Element[];
}

export function Select({ 
    children, 
    fetch,
    onChange: _onChange, 
    value:_value, 
    size = 'middle', 
    options:_options = [], 
    ..._props 
}: SelectProps) {
    const items = useMemo(() => {
        if (React.isValidElement(children) || !isArray(children)) return [];
        if (React.isValidElement(children)) return [children].filter((item: JSX.Element) => item.type === Option);
        return children.filter((item) => item.type === Option);
    }, [children]);
    const data = useMemo(() => items.length ? items.map((item) => ({ name: item.props.children, value: item.props.value })) : _options, [items, _options]);
    const { name, value, visible, show, close, onClick, onChange } = useSelect(_value, {
        onChange: _onChange,
        options: data,
    });
    const {loading, options, onSearch} = useSearch({ options: data, fetch });
    const [reference, floating, refs, styles] = usePosition();
    useClickAwayListener([refs.reference,refs.floating],close);
    return (
        <React.Fragment>
            <SelectStyled size={size} onClick={onClick} ref={reference as any} {..._props}>
                <SelectInputStyled value={name} placeholder={_props.placeholder} disabled />
            </SelectStyled>
            {visible && ReactDOM.createPortal(
                <OptionBox
                    size={size}
                    show={show}
                    ref={floating as any}
                    value={value}
                    onChange={onChange}
                    {...styles}
                >
                    {items}
                </OptionBox>,
                document.body)}
        </React.Fragment>
    );
}

Select.Option = Option;