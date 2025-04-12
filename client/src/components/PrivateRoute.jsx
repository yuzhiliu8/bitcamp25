import React from 'react'
import { useNavigate } from 'react-router'
import { useEffect, useState, cloneElement } from 'react'
import { API_URL } from '../util/Constants'

export default function PrivateRoute({ element }) {
    const navigate = useNavigate();
    const [session, setSession] = useState(null);

    useEffect(() => {
        const authenticate = async () => {
            const resp = await fetch(`${API_URL}/api/auth/authenticate-session`, {
                method: 'GET',
                credentials: 'include',
            });

            if (resp.status == 401){
                navigate('/login');
                return;
            }

            const s = await resp.json();
            console.log(s);
            setSession(s);
        }

        authenticate();
    }, []);

    if (!session) return null;

    return ( 
        cloneElement(element, {session})
    )
}
