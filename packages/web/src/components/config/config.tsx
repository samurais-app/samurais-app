/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useCallback, useState } from 'react';

export type ConfigContextType = {
  statusbar: number
  background: string
}

export type IContext = {
  config: ConfigContextType;
  setStatusbar: (statusbar: number) => void;
  setBackground: (background: string) => void;
}

export const ConfigContext = createContext<IContext>({
    config: { statusbar: 0, background: '#fff' },
    setStatusbar: (_statusbar: number) => { },
    setBackground: (_background: string) => { },
});


export default function ConfigProvider(props: { children: JSX.Element }) {
    const [config, setConfig] = useState({
        statusbar: 0,
        background: '#fff',
    });

    const setStatusbar = useCallback((statusbar: number) => {
        setConfig({ ...config, statusbar });
    }, [config]);

    const setBackground = useCallback((background: string) => {
        setConfig({ ...config, background });
    }, [config]);


    return (
        <ConfigContext.Provider value={{ config, setStatusbar, setBackground }}>
            {props.children}
        </ConfigContext.Provider>
    );
}