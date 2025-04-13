import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import LoginPage from './routes/LoginPage/LoginPage'
import HomePage from './routes/HomePage/HomePage' 
import RootRedirect from './routes/RootRedirect/RootRedirect'
import SignUpPage from './routes/SignUpPage/SignUpPage'
import ProfilePage from './routes/ProfilePage/ProfilePage'
import GoalPage from './routes/GoalPage/GoalPage'
import PrivateRoute from './components/PrivateRoute'


function App() {

    return (
        <div className="app">
            <BrowserRouter> 
                <Routes>
                    <Route path="/" element={<RootRedirect />}/>
                    <Route path="/login" element={<LoginPage />}/>
                    <Route path="/home" element={<PrivateRoute element={<HomePage />}/>}/>
                    <Route path="/signup" element={<SignUpPage />}/>
                    <Route path='/goal' element={<GoalPage />}/>
                    <Route path="/profile" element={<PrivateRoute element={<ProfilePage />}/>}/>

                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App