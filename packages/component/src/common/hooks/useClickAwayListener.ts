import { useLayoutEffect, useCallback } from 'react';

export function useClickAwayListener(doms: any[], callback: () => void) {
    const click = useCallback((event: MouseEvent) => {
        if(!doms.some((dom) => event.composedPath().includes(dom.current))) {
            callback();
        }
    },[callback, doms]);

    useLayoutEffect(() => {
        window.addEventListener('click', click);
        return () => window.removeEventListener('click', click);
    },[click]);
}