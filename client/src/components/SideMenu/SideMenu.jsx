import React from 'react'
import { useNavigate } from 'react-router'
import { useState, useRef, useEffect } from 'react';
import logo from '../../assets/full_logo.png'

import './SideMenu.css'

export default function SideMenu() {
    const [showMenu, setShowMenu] = useState(false)
    const menuRef = useRef();
    const navigate = useNavigate();


    useEffect(() => {
        const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setShowMenu(false);
        }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
      <div className="hamburger" ref={menuRef}>
        <div className="btn-container">
            <button className="hamburger-button" onClick={() => setShowMenu(!showMenu)}>
            ☰
            </button>
        </div>
        {showMenu && (
          <div className="hamburger-menu">
            <img className="menu-logo" src={logo} alt="MacroMaster" />
            <button onClick={() => navigate('/profile') }>My Profile</button>
            <button onClick={() => navigate('/login') }>Sign Out</button>
          </div>
        )}
      </div>
  )
}
