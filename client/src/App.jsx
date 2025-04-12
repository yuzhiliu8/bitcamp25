import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import LoginPage from './routes/LoginPage/LoginPage'
import HomePage from './routes/HomePage/HomePage' 
import RootRedirect from './routes/RootRedirect/RootRedirect'
import { useState } from 'react'

function App() {

    const [loginData, setLoginData] = useState({
        username:"",
        password:"",
    });

    return (
        <div className="app">
            <BrowserRouter> 
                <Routes>
                    <Route path="/" element={<RootRedirect />}/>
                    <Route path="/login" element={<LoginPage setLoginData={setLoginData} loginData={loginData} />}/>
                    <Route path="/home" element={<HomePage />}/>
                </Routes>
             
            </BrowserRouter>
        </div>
    )
}

export default App