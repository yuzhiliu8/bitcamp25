import './App.css'
import {useState} from 'react'
import HomePage from './routes/HomePage.jsx'
import LoginPage from './routes/LoginPage.jsx'
import PastLogs from './routes/PastLogs.jsx'
import SignUpPage from './routes/SignUpPage.jsx'

function App() {
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });

    return (
        <div>
                <LoginPage setLoginData={setLoginData} />
        </div>
    )
}

export default App