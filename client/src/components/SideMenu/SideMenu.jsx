import React from 'react'
import { useNavigate } from 'react-router'
import { useState } from 'react';
import logo from '../../assets/full_logo.png'

import './SideMenu.css'

export default function SideMenu() {
    const [showMenu, setShowMenu] = useState(false)
    const navigate = useNavigate();

    return (
      <div className="hamburger">
        <div className="btn-container">
            <button className="hamburger-button" onClick={() => setShowMenu(!showMenu)}>
            {(!showMenu) ? (<>☰</>) : (<>X</>)}
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
