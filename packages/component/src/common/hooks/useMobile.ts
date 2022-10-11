import { useState, useEffect } from 'react';
import { isMobile } from '../utils';


export function useMobile() {
    const [status, setStatus] = useState(isMobile());
    const update = () => {
        setStatus(isMobile());
    };

    useEffect(() => {
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    return status;
}