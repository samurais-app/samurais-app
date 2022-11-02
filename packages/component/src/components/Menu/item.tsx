import { isArray, isEmpty } from '@frade-sam/samtools';
import React, { useMemo } from 'react';
import { FloatElement } from 'src/common/components';
import { MenuItemBaseProps } from 'src/interfaces';
import { MenuItemBoxStyled, MenuItemsStyled, MenuItemStyled } from './item.styled';

export interface MenuItemProps extends MenuItemBaseProps {
  accessory?:JSX.Element[];
  children?:string;
}

export function MenuItem({
    children,
    accessory,
    size = 'middle',
    background = false,
}:MenuItemProps) {
    const accessorys = useMemo(() => {
        return React.Children.map((isArray(accessory) ? accessory : [accessory]).filter((item) => !!item && React.isValidElement(item) && item.type === MenuItem), (child) => {
            return React.cloneElement(child, { background: true });
        });
    },[children]);

    return <MenuItemBoxStyled size={size} background={background}>
        {!isEmpty(accessorys) ? <FloatElement element={<MenuItemsStyled>{accessorys}</MenuItemsStyled>}><MenuItemStyled>{children}</MenuItemStyled></FloatElement> : <MenuItemStyled>{children}</MenuItemStyled>}
    </MenuItemBoxStyled>;
}