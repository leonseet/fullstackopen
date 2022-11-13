import PropTypes from 'prop-types'

const Login = ({ username, password, setUsername, setPassword, handleLogin }) => {
  Login.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired
  }

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