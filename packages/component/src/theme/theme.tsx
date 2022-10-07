import React, { useState } from 'react';
import deepmerge from 'deepmerge';
import { createGlobalStyle, ThemedStyledProps, ThemeProvider } from 'styled-components';
import { ThemeContent } from './context';
import themeConfig from './defaultConfig';
import { Theme } from './interface';
import { complementaryColor } from '@frade-sam/samtools';

export interface ThemeContextProps {
    theme?: Theme;
    children: JSX.Element | JSX.Element;
}

const Global = createGlobalStyle<ThemedStyledProps<any,Theme>>`
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: ${props => complementaryColor(props.theme.color.background)};
        border-radius: 25px;
    }
    body {
        margin: 0;
        padding: 0;
        height: 100vh;
        background-color: ${props => props.theme.color.background};
        overflow: overlay;
        font-size: 12px;
    }
    #app {
        margin: 0;
        padding: 0;
        height: 100vh;
    }
`;

export function ThemeConfig(props: ThemeContextProps) {
    const [theme, setTheme] = useState(deepmerge(themeConfig, props.theme || {}));

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