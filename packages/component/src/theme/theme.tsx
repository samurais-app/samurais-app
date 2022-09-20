import React, { useState } from 'react';
import deepmerge from 'deepmerge';
import { createGlobalStyle, ThemedStyledProps, ThemeProvider } from 'styled-components';
import { ThemeContent } from './context';
import themeConfig from './defaultConfig';
import { Theme } from './interface';

export interface ThemeContextProps {
    children: JSX.Element | JSX.Element;
}

const Global = createGlobalStyle<ThemedStyledProps<any,Theme>>`
    body {
        margin: 0;
        padding: 0;
        height: 100vh;
        background-color: ${props => props.theme.color.background};
    }
    #app {
        margin: 0;
        padding: 0;
        height: 100vh;
    }
`;

export function ThemeConfig(props: ThemeContextProps) {
    const [theme, setTheme] = useState(themeConfig);

    const update = (the: Theme) => {
        setTheme((data) => {
            return deepmerge(data, the);
        });
    };

    return (
        <ThemeContent.Provider value={{ theme, update }}>
            <ThemeProvider
                theme={theme}
            >
                <Global />
                {props.children}
            </ThemeProvider>
        </ThemeContent.Provider>
    );
}