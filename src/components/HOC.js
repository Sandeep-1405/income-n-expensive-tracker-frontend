import React, { useState, useEffect } from 'react';
import LoginPage from './Login';

export default function HOC(WrappedComponent) {
    return function AuthenticatedComponent() {
        const [isToken, setIsToken] = useState(null); 

        useEffect(() => {
            const token = localStorage.getItem('accessToken'); 
            if (token) {
                setIsToken(true);
            } else {
                setIsToken(false);
            }
        }, []);

        if (isToken === null) {
            return <div>Loading...</div>; 
        }
        return isToken ? <WrappedComponent  /> : <LoginPage />;
    };
}
