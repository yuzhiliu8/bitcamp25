import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import LoginPage from './routes/LoginPage/LoginPage'
import HomePage from './routes/HomePage/HomePage' 
import RootRedirect from './routes/RootRedirect/RootRedirect'
import SignUpPage from './routes/SignUpPage/SignUpPage'
import AccountPage from './routes/AccountPage/AccountPage'

function App() {

    return (
        <div className="app">
            <BrowserRouter> 
                <Routes>
                    <Route path="/" element={<RootRedirect />}/>
                    <Route path="/login" element={<LoginPage />}/>
                    <Route path="/home" element={<HomePage />}/>
                    <Route path="/signup" element={<SignUpPage />}/>
                    <Route path="/account" element={<AccountPage />}/>

                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App