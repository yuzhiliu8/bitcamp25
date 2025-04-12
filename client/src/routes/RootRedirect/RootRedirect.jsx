import React from 'react'
import { useNavigate } from 'react-router'
import { useEffect } from 'react';
import { API_URL } from '../../util/Constants';


export default function RootRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        const authenticate = async () => {
            const response = await fetch(`${API_URL}/api/auth/authenticate-session`, {
                method: "GET",
                credentials: "include",
            });

            if (response.status == 401){
                navigate('/login');
            }
            else if (response.ok){
                navigate('/home');
            }
        }
        authenticate();
    }, []);


    return (
        <div className="rootredirect">
        </div>
    )
}