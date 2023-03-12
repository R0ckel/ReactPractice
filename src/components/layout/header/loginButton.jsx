const LoginButton = (props) => {
    return (
        <div className="headerButton aright">
            <button className="btn white" onClick={props.login}>
                Login
            </button>
        </div>
    )
}

export default LoginButton