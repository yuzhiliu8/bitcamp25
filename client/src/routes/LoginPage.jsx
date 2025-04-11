import './LoginPage.css'

function LoginPage() {
    const localLoginData= {
        username: "",
        password: ""};

    const handleChange = (event) => {
        const {name, value}=event.target;
        localLoginData[name]=value;
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setLoginData(localLoginData);
    }

    return (
        <form onSubmit={handleSubmit}>
            Username:
            <input type="text" name="username" placeholder='Username' onChange={handleChange}/>
            Password:
            <input type="text" name="password" placeholder='Password' onChange={handleChange}/>
            <input type="submit" value="Login"/>
        </form>
    )
}

export default LoginPage