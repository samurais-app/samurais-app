import { isArray } from '@frade-sam/samtools';
import React, { useMemo } from 'react';
import { MenuBaseProps } from 'src/interfaces';
import { MenuStyled } from './index.styled';
import { MenuItem } from './item';

export interface MenuProps extends MenuBaseProps {
  children?:JSX.Element[]|JSX.Element;
}

export function Menu({
    children,
    size = 'middle'
}:MenuProps) {
    const childrens = useMemo(() => React.Children.map((isArray(children) ? children : [children]).filter((item) => !!item && React.isValidElement(item) && item.type === MenuItem), (child) => {
        return React.cloneElement(child, { size });
    }),[children, size]);
    return (
        <MenuStyled>
            {childrens}
        </MenuStyled>
    );
}

Menu.Item = MenuItem;