import { createContext } from 'react';
import themeConfig from './defaultConfig';
import { Theme } from './interface';


export const ThemeContent = createContext({
    theme: themeConfig,
    update: (the:Theme) => {return;},
});