import React from 'react'
import { useNavigate } from 'react-router'
import { useEffect } from 'react';


export default function RootRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/login');
    }, []);


    return (
        <div className="rootredirect">
        </div>
    )
}
