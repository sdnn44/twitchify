"use client";
import React from 'react'
import Loader from '../components/Loader/Loader';
import { GlobalProvider } from '../context/globalContextProvider';

interface Props {
    children: React.ReactNode;
}
const ContextProvider = ({ children }: Props) => {

    const [isReady, setIsReady] = React.useState(false);
    React.useEffect(() => {
        setTimeout(() => {
            setIsReady(true);
        }, 200);
    }, []);

    if (!isReady) {
        return <Loader />;
    }

    return <GlobalProvider>{children}</GlobalProvider>
}


export default ContextProvider