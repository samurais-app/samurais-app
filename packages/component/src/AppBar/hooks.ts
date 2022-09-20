import { useEffect, useState } from 'react';
import { AppBarProps } from '.';


export function useAppBarScroll(props: AppBarProps) {
    const [status, setStatus] = useState(false);

    function onScroll(event: any) {
        if ((event.documentElement.scrollTop || event.body.scrollTop) >= 10) {
            setStatus(true);
        }
    }

    useEffect(() => {
        if (props.fixed) {
            window.addEventListener('scroll', onScroll);
        }
            return () => {
                window.removeEventListener('scroll', onScroll);
            };
    }, []);
    return [status];
}