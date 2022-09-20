import React, { useContext, useEffect } from 'react';
import { ConfigContext } from '../../components/config/config';
import { HomeStyled } from './index.styled';



export default function Home() {
    const { setBackground } = useContext(ConfigContext);
    useEffect(() => {
        setBackground('red');
    }, []);
    return (<HomeStyled>home</HomeStyled>);
}