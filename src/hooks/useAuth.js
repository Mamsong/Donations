import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react';

export const useAuth = () => {

    const history = useHistory();
    const [ token, setToken] = useState();

    useEffect(() => {
        setToken(localStorage.getItem('token'))
    },[]);

    useEffect(() => {
        if(!localStorage.getItem('token')){
            history.push('/login');
        }
    },[token]);

    return { isLoggedIn: !!token }
}