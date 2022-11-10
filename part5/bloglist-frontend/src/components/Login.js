const Login = ({ username, password, setUsername, setPassword, handleLogin }) => {
    return(
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input 
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}    
                    />
                </div>
                <div>
                    password
                    <input 
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}    
                    />
                </div>
                <button id="login-btn" type="submit">
                    login
                </button>
            </form>
        </div>
    )
}

export default Login