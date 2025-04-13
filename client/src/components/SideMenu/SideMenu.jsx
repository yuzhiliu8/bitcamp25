import React from 'react'
import { useNavigate } from 'react-router'
import { useState } from 'react';
import logo from '../../assets/full_logo.png'
import { API_URL } from "../../util/Constants"
import './SideMenu.css'

export default function SideMenu() {
    const navigate = useNavigate();

    async function signOut(){
      console.log("HISDFGHJKHGFDSASDFGHJKL")
      const del = await fetch(`${API_URL}/api/auth/delete-session`,{
            method: "POST",
            credentials: 'include'
          })
      console.log(del)
      navigate('/login')
    }


    return (
      <div className="hamburger">
        <div className="btn-container">
            <div className="hamburger-button"></div>
        </div>
        <div className="hamburger-menu">
        <img className="menu-logo" src={logo} alt="MacroMaster" />
        <button onClick={() => navigate('/profile') }>My Profile</button>
        <button onClick={() => navigate('/login') }>Sign Out</button>
        </div>
        {showMenu && (
          <div className="hamburger-menu">
            <img className="menu-logo" src={logo} alt="MacroMaster" />
            <button onClick={() => navigate('/profile') }>My Profile</button>
            <button onClick={signOut}>Sign Out</button>
          </div>
        )}
      </div>
  )
}
