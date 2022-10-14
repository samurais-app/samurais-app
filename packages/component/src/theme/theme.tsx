import React, { useState } from 'react';
import deepmerge from 'deepmerge';
import { createGlobalStyle, ThemedStyledProps, ThemeProvider } from 'styled-components';
import { ThemeContent } from './context';
import themeConfig from './defaultConfig';
import { Theme } from './interface';
import { complementaryColor } from '@frade-sam/samtools';
import { useMobile } from 'src/common/hooks';

export interface ThemeContextProps {
    theme?: Omit<Theme, 'Size' | 'unit' | 'mobile'>;
    children: JSX.Element | JSX.Element;
}

const Global = createGlobalStyle<ThemedStyledProps<any,Theme>>`
    ::-webkit-scrollbar {
        width: 0.8em;
        height: 0.8em;
    }
    ::-webkit-scrollbar-thumb {
        background-color: ${props => complementaryColor(props.theme.color.background)};
        border-radius: 25px;
    }
    body {
        font-size: ${props => props.theme.size}px;
        margin: 0;
        padding: 0;
        height: 100vh;
        background-color: ${props => props.theme.color.background};
        overflow: overlay;
    }
    #app {
        margin: 0;
        padding: 0;
        height: 100vh;
    }
`;

export function ThemeConfig(props: ThemeContextProps) {
    const isMobile = useMobile();
    const [theme, setTheme] = useState<Theme>(deepmerge(themeConfig, { mobile: isMobile, unit: isMobile ? 'rem' : 'px', ...props.theme} || {}));

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