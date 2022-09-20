/* eslint-disable @typescript-eslint/no-unused-vars */
import { isFunc } from '@frade-sam/samtools';
import React, { useEffect, useRef, useState } from 'react';
import { FieldContext } from './context';
import Field from './field';

export interface FieldContextProps {
  context: FieldContext;
  children: JSX.Element;
}

export function FieldComponent(props: FieldContextProps) {
    const { context } = props;
    const key = useRef(Date.now());
    const ele = context.component(props.children);
    const [value, setValue] = useState(context.field.value);
    const [error, setError] = useState(context.field.error);
    function onChangeEvent(_field: any) {
        setValue(_field);
    }
    function onError(this: FieldContext, field: Field) {
        setError(field.error);
    }

    function onChange(event: React.ChangeEvent<any>) {
        if(isFunc(props.children.props.onChange)) {
            props.children.props.onChange(event);
        }
        context.onChange.apply(context, [event]);
    }

    // TODO: 同一字段同一组件，第二次渲染的组件不刷新
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onChange.displayName = `onChange${key.current}`;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onError.displayName = `onError${key.current}`;
        context.addEventListener('error', onError);
        context.addEventListener('change', onChangeEvent);
        return () => {
            context.removeEventListener('change', onChangeEvent);
        };
    }, [key.current]);
    return React.cloneElement(ele, { ...props.children.props, value, error, onChange });
}