import React, { useCallback } from 'react';
import ReactDOM from 'react-dom';
import { useClickAwayListener, usePosition } from 'src/common/hooks';
import { FloatElementContainer } from './element';
import { FloatElementBoxStyled } from './index.styled';


export interface FloatElementProps {
  element?:JSX.Element;
  children?:JSX.Element|JSX.Element[]|string;
}

export function FloatElement({
    children,
    element
}:FloatElementProps) {
    if(!children) return;
    if(!element) return (<FloatElementBoxStyled>{children}</FloatElementBoxStyled>);
    const [reference, floating, refs, styles, { visible, show, onChange }] = usePosition();
    const close = useCallback(() => onChange(false), [onChange]);
    useClickAwayListener([refs.reference,refs.floating],close);
    return (
        <React.Fragment>
            <FloatElementBoxStyled ref={reference} onClick={onChange}>{children}</FloatElementBoxStyled>
            {visible && ReactDOM.createPortal(
                <FloatElementContainer show={show} position={styles} ref={floating}>
                    {element}
                </FloatElementContainer>,
                document.body)}
        </React.Fragment>
    );
}